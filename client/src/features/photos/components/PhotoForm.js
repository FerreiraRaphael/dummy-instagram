import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { Switch } from '../../../shared/components/Switch';
import { TextInput } from '../../../shared/components/TextInput';
import DefaultImage from './PhotoForm-defaultImage.jpg';
import './PhotoForm.css';

export class PhotoForm extends React.Component {
  state = {
    imageFile: null,
    image: this.props.value.image,
    isPrivate: this.props.value.isPrivate,
    caption: this.props.value.caption,
    crop: null,
    imagePreview: null,
    cropping: false,
    errorMessage: null,
  };

  imageElement = null;

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            image: reader.result,
            cropping: true,
          }),
        false,
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleImageLoaded = (image) => {
    this.imageElement = image;
    this.setState({
      imagePreview: null,
      crop: {
        x: 0,
        y: 0,
        aspect: 4 / 4,
      },
    });
  };

  handleCropFinish(crop, cropPixel) {
    if (!crop.height || !crop.width) {
      this.setState({
        imagePreview: null,
        errorMessage: true,
      });
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = cropPixel.width;
    canvas.height = cropPixel.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      this.imageElement,
      cropPixel.x,
      cropPixel.y,
      cropPixel.width,
      cropPixel.height,
      0,
      0,
      cropPixel.width,
      cropPixel.height,
    );

    // As Base64 string
    const croppedImage = canvas.toDataURL();

    canvas.toBlob((file) => {
      this.setState({
        imagePreview: croppedImage,
        imageFile: file,
        errorMessage: false,
      });
    }, 'image/jpeg');
  }

  handleDoneCropping() {
    if (this.state.imagePreview) {
      this.setState({
        cropping: false,
      });
    } else {
      this.setState({
        errorMessage: true,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.imagePreview) return;
    const { imageFile, isPrivate, caption } = this.state;
    this.props.onSubmit({ image: imageFile, isPrivate, caption });
  }

  render() {
    const { id } = this.props;
    const {
      isPrivate,
      image,
      caption,
      cropping,
      crop,
      imagePreview,
      errorMessage,
    } = this.state;
    return (
      <form className="PhotoForm" onSubmit={(e) => this.handleSubmit(e)}>
        <div style={{ marginBottom: '0.5rem' }}>
          {!cropping && (
            <div className="PhotoForm-photoInput">
              <img src={imagePreview || DefaultImage} alt="Upload" />
              <input type="file" onChange={(e) => this.handleSelectFile(e)} />
              {!imagePreview && <button>Select a image !</button>}
            </div>
          )}
          {cropping && (
            <Fragment>
              <ReactCrop
                src={image}
                crop={crop}
                onImageLoaded={this.handleImageLoaded}
                onComplete={(cropChange, cropPixel) =>
                  this.handleCropFinish(cropChange, cropPixel)
                }
                onChange={(cropChange) => this.handleChange('crop', cropChange)}
              />
              {errorMessage && <p>Please crop this image.</p>}
              <button
                style={{ display: 'block' }}
                type="button"
                onClick={() => this.handleDoneCropping()}
              >
                Done
              </button>
            </Fragment>
          )}
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <TextInput
            id={`${id}-caption`}
            value={caption}
            label="Caption"
            onChange={(e) => this.handleChange('caption', e.target.value)}
          />
          <div style={{ marginBottom: '0.5rem' }}>
            <Switch
              label="Is Private ?"
              id={`${id}-isPrivate`}
              value={isPrivate}
              onChange={(value) => this.handleChange('isPrivate', value)}
            />
          </div>
        </div>
        <button disabled={!this.state.imagePreview} type="submit">
          Save Photo
        </button>
      </form>
    );
  }
}

PhotoForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.shape({
    image: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    caption: PropTypes.string.isRequired,
  }),
};

PhotoForm.defaultProps = {
  value: {
    image: '',
    isPrivate: false,
    caption: '',
  },
};
