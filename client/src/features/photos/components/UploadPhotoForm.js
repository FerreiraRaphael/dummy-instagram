import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($image: Upload!) {
    uploadPhoto(image: $image) {
      id
    }
  }
`;

export const UploadPhotoForm = () => (
  <Mutation mutation={UPLOAD_PHOTO}>
    {(uploadPhotoMutation, { data, loading, error }) => {
      const handleChange = ({
        target: {
          validity,
          files: [image],
        },
      }) =>
        validity.valid &&
        uploadPhotoMutation({
          variables: { image },
          update(
            proxy,
            {
              data: { uploadPhoto },
            },
          ) {
            console.log('update', proxy, uploadPhoto);
          },
        });
      return (
        <Fragment>
          {loading && <p>Loading...</p>}
          {error && (
            <div>
              <p>Error :( Please try again</p>
              <p>{JSON.stringify(error, '\\n', 2)}</p>
            </div>
          )}
          {data && <p>{JSON.stringify(data, '\\n', 2)}</p>}

          <input type="file" required onChange={handleChange} />
          {/* <input type="submit"/> */}
        </Fragment>
      );
    }}
  </Mutation>
);

UploadPhotoForm.propTypes = {};
