const fetch = require('node-fetch');

const fetchPlaceholderImage = async (type, width, height) => {
  const url = `http://place${type}.com/${width}/${height}`;
  const res = await fetch(url);
  const imageBuffer = await res.buffer();
  return imageBuffer.toString('base64');
};

const testUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }].map(
  ({ id, name }) => ({
    _id: id,
    name,
    password: 'testPassword'
  })
);

const testPhotos = async () =>
  Promise.all(
    [
      {
        id: 1,
        ownerId: 1,
        caption: 'Cat 1',
        animal: 'kitten',
        width: 800,
        height: 600
      },
      {
        id: 2,
        ownerId: 2,
        caption: 'Cat 2',
        animal: 'kitten',
        width: 1200,
        height: 800
      },
      {
        id: 3,
        ownerId: 2,
        caption: 'Bear!',
        animal: 'bear',
        width: 800,
        height: 600
      },
      {
        id: 4,
        ownerId: 1,
        caption: 'Ape!',
        animal: 'ape',
        isPrivate: true,
        width: 800,
        height: 600
      }
    ].map(async ({ id, animal, width, height, isPrivate, ...image }) => ({
      _id: id,
      ...image,
      width,
      height,
      private: !!isPrivate,
      image: await fetchPlaceholderImage(animal, width, height),
      createdAt: new Date()
    }))
  );

module.exports = {
  up: async db => {
    await db.users.insert(testUsers);
    await db.photos.insert(await testPhotos());
  }
};
