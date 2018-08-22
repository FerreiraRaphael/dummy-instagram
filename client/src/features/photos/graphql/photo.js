import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_PHOTO = gql`
  query getPhoto($id: ID!) {
    photo(id: $id) {
      id
      width
      height
      image
      caption
      isPrivate
      owner {
        id
        name
      }
    }
  }
`;

const PhotoData = ({ id, onError, onCompleted, ...props }) => (
  <Query
    query={GET_PHOTO}
    onCompleted={onCompleted}
    onError={onError}
    variables={{ id }}
    {...props}
  />
);

PhotoData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

PhotoData.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
export default PhotoData;
