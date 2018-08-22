import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PhotoForm } from '../components/PhotoForm';
import { UploadPhoto } from '../graphql/uploadPhoto';
import { LayoutContext } from '../../../core/LayoutContext';

const UploadPhotoForm = ({ history }) => (
  <LayoutContext.Consumer>
    {({ setLoadingLayout }) => (
      <UploadPhoto
        onCompleted={() => {
          setLoadingLayout(false);
          history.push('/');
        }}
        onError={() => {
          setLoadingLayout(false);
        }}
      >
        {(uploadPhotoMutation) => (
          <PhotoForm
            id="UploadPhotoForm"
            onSubmit={({ image, caption, isPrivate }) => {
              setLoadingLayout(true);
              uploadPhotoMutation({ variables: { image, caption, isPrivate } });
            }}
          />
        )}
      </UploadPhoto>
    )}
  </LayoutContext.Consumer>
);

UploadPhotoForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(UploadPhotoForm);
