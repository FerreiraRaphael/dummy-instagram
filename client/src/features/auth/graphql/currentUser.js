import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { UserContext } from '../../../core/UserContext';

const CURRENT_USER = gql`
  query ME {
    me {
      id
      name
    }
  }
`;

export const CurrentUser = ({ children }) => (
  <UserContext.Consumer>
    {({ user, setCurrentUser }) => {
      if ((user && !user.id) || !user) {
        return (
          <Query
            query={CURRENT_USER}
            fetchPolicy="network-only"
            onCompleted={(data) => {
              if (data.me) {
                setCurrentUser(data.me);
              }
            }}
            onError={() => {
              setCurrentUser(null);
            }}
          >
            {({ loading }) => children({ currentUser: user, loading })}
          </Query>
        );
      }
      return children({ currentUser: user, loading: false });
    }}
  </UserContext.Consumer>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired,
};
