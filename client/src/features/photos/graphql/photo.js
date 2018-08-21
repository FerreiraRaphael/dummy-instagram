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
      owner {
        id
        name
      }
    }
  }
`;

const PhotoData = ({ id, ...props }) => (
  <Query query={GET_PHOTO} variables={{ id }} {...props} />
);

PhotoData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.func.isRequired,
};

export default PhotoData;
