import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PhotoForm } from '../components/PhotoForm';
import { EditPhoto } from '../graphql/editPhoto';
import { LayoutContext } from '../../../core/LayoutContext';
import PhotoData from '../graphql/photo';
import { DeletePhoto } from '../graphql/deletePhoto';

const UploadPhotoForm = ({ history, id }) => (
  <LayoutContext.Consumer>
    {({ setLoadingLayout }) => (
      <PhotoData
        onError={() => {
          history.goBack();
        }}
        id={id}
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          return (
            <DeletePhoto
              onCompleted={() => {
                setLoadingLayout(false);
                history.push('/');
                window.location.reload();
              }}
              onError={() => {
                setLoadingLayout(false);
              }}
            >
              {(deletePhotoMutation) => (
                <EditPhoto
                  onCompleted={() => {
                    setLoadingLayout(false);
                    history.push(`/photo/${id}`);
                    window.location.reload();
                  }}
                  onError={() => {
                    setLoadingLayout(false);
                  }}
                >
                  {(editPhotoMutation) => (
                    <PhotoForm
                      isNew={false}
                      initialValue={data ? data.photo : {}}
                      id="UploadPhotoForm"
                      onSubmit={({ caption, isPrivate }) => {
                        setLoadingLayout(true);
                        editPhotoMutation({
                          variables: { id, caption, isPrivate },
                        });
                      }}
                      onDelete={() => {
                        setLoadingLayout(true);
                        deletePhotoMutation({
                          variables: { id },
                        });
                      }}
                    />
                  )}
                </EditPhoto>
              )}
            </DeletePhoto>
          );
        }}
      </PhotoData>
    )}
  </LayoutContext.Consumer>
);

UploadPhotoForm.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(UploadPhotoForm);
