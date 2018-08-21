const { ForbiddenError } = require('apollo-server');
const sharp = require('sharp');

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream
      .on('error', reject)
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => resolve(Buffer.concat(chunks)));
  });
}

function resizeImage(imageBuffer, width, height) {
  return sharp(imageBuffer)
    .resize(width, height)
    .jpeg()
    .toBuffer();
}

async function getNextPhotoId(idSeqRepository) {
  const seq = await idSeqRepository.findOne({
    _id: 'photo',
  });
  if (!seq) {
    const newSeq = await idSeqRepository.insert({
      _id: 'photo',
      value: 1,
    });
    return newSeq.value;
  }
  const newId = seq.value + 1;
  return idSeqRepository
    .update({ _id: 'photo' }, { value: newId })
    .then(() => newId);
}

function getUserPhotoCriteriaSearch(currentUser) {
  return currentUser
    ? {
        $or: [
          {
            $and: [
              { isPrivate: true },
              { ownerId: parseInt(currentUser._id, 10) },
            ],
          },
          { isPrivate: false },
        ],
      }
    : { isPrivate: false };
}

const PHOTO_ADDED = 'photoAdded';
const PHOTO_EDITED = 'photoEdited';
const PHOTO_DELETED = 'photoDeleted';

/**
 * Service responsible for managing the Photos Repository.
 */
class PhotoService {
  constructor(db, getCurrentUser) {
    this.photoRepository = db.photos;
    this.idSeqRepository = db.idSeq;
    this.getCurrentUser = getCurrentUser;
  }

  /**
   * Find all user photos, only shows private photos, if current user is the same.
   */
  async findUserPhotos(userId) {
    const user = await this.getCurrentUser();
    return this.photoRepository
      .cfind({
        $and: [{ ownerId: userId }, getUserPhotoCriteriaSearch(user)],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Find all available photos for the current user.
   * If not logged in, shows all not private photos.
   */
  async findPhotos() {
    const user = await this.getCurrentUser();
    return this.photoRepository
      .cfind(getUserPhotoCriteriaSearch(user))
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Finds a photos, by it's id.
   * If the photo is private, only it's owner fetch it.
   */
  async findPhoto(id) {
    const user = await this.getCurrentUser();
    return this.photoRepository.findOne({
      $and: [{ _id: parseInt(id, 10) }, getUserPhotoCriteriaSearch(user)],
    });
  }

  /**
   * Uploads a image, resizing it to 640x640, transforming to jpeg,
   * and creating a photo entity on the db.
   */
  async uploadPhoto({ image, caption = '', isPrivate = false }) {
    const user = await this.getCurrentUser();
    const imageObject = await image;
    const fileStream = imageObject.stream;
    const imageBuffer = await streamToBuffer(fileStream);
    const base64Image = await resizeImage(imageBuffer, 640, 640).then(
      (buffer) => buffer.toString('base64'),
    );
    const nextPhotoId = await getNextPhotoId(this.idSeqRepository);
    return this.photoRepository.insert({
      _id: nextPhotoId,
      caption,
      ownerId: user._id,
      isPrivate,
      image: base64Image,
      width: 640,
      height: 640,
      createdAt: new Date(),
    });
  }

  /**
   * Updates a Photo caption and is privacy.
   * Only the photo owner can perform this action.
   */
  async editPhoto({ id, caption, isPrivate }) {
    const user = await this.getCurrentUser();
    const photo = await this.photoRepository.findOne({ _id: +id });
    if (photo.ownerId !== user._id) {
      throw new ForbiddenError('only the photo owner can update it');
    }
    return this.photoRepository
      .update(
        { _id: +id },
        {
          ...photo,
          ...{
            caption: caption || photo.caption,
            isPrivate:
              isPrivate === undefined || isPrivate === null
                ? photo.isPrivate
                : isPrivate,
          },
        },
      )
      .then(() => this.photoRepository.findOne({ _id: +id }));
  }

  /**
   * Deletes a Photo.
   * Only the photo owner can perform this action.
   */
  async deletePhoto(id) {
    const user = await this.getCurrentUser();
    const photo = await this.photoRepository.findOne({ _id: +id });
    if (photo.ownerId !== user._id) {
      throw new ForbiddenError('only the photo owner can delete it');
    }
    return this.photoRepository
      .remove({ _id: +id })
      .then((numRemoved) => !!numRemoved);
  }
}

module.exports = {
  PhotoService,
  PHOTO_ADDED,
  PHOTO_DELETED,
  PHOTO_EDITED,
};
