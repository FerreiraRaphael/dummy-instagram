import React, { Fragment } from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';

import { UploadPhotoPage } from './features/photos/pages/UploadPhotoPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { AuthenticatedRoute } from './shared/containers/AuthenticatedRoute';
import { UserProvider } from './core/UserContext';
import LogoutLink from './features/auth/containers/LogoutLink';
import { AnonymousRoute } from './shared/containers/AnonymousRoute';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { AllPhotosPage } from './features/photos/pages/AllPhotosPage';
import { Loading } from './shared/components/Loading';
import { LayoutContext, LayoutProvider } from './core/LayoutContext';

import './App.css';
import { CurrentUser } from './features/auth/graphql/currentUser';

function isLoading(layoutConext, userContext) {
  return layoutConext.loading || layoutConext.overlay || userContext.loading;
}

const App = () => (
  <BrowserRouter>
    <UserProvider>
      <LayoutProvider>
        <CurrentUser>
          {({ currentUser, ...userContext }) => (
            <div className="App">
              <LayoutContext.Consumer>
                {(layoutConext) => (
                  <div
                    className={
                      isLoading(layoutConext, userContext) ? 'App-overlay' : ''
                    }
                    style={{ height: '100%' }}
                  >
                    {isLoading(layoutConext, userContext) && <Loading />}
                    <header className="App-header">
                      <div className="App-header-content">
                        <Link to="/">Home</Link>
                        {currentUser && <Link to="/upload">Upload</Link>}
                        <div style={{ marginLeft: 'auto' }}>
                          {!currentUser ? (
                            <Fragment>
                              <Link to="/login">Login</Link>
                              <Link to="/register">Register</Link>
                            </Fragment>
                          ) : (
                            <LogoutLink />
                          )}
                        </div>
                      </div>
                    </header>
                    <div className="App-content">
                      <Route exact path="/" component={AllPhotosPage} />
                      <AuthenticatedRoute
                        path="/upload"
                        redirectTo="/login"
                        component={UploadPhotoPage}
                      />
                      <AnonymousRoute
                        path="/login"
                        redirectTo="/"
                        component={LoginPage}
                      />
                      <AnonymousRoute
                        path="/register"
                        redirectTo="/"
                        component={RegisterPage}
                      />
                    </div>
                  </div>
                )}
              </LayoutContext.Consumer>
            </div>
          )}
        </CurrentUser>
      </LayoutProvider>
    </UserProvider>
  </BrowserRouter>
);

export default App;
