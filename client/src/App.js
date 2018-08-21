import React, { Fragment } from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import { UploadPhoto } from './features/photos/pages/UploadPhoto';
import { LoginPage } from './features/auth/pages/LoginPage';
import './App.css';
import { AuthenticatedRoute } from './shared/containers/AuthenticatedRoute';
import { UserProvider, UserContext } from './core/UserContext';
import LogoutLink from './features/auth/containers/LogoutLink';
import { AnonymousRoute } from './shared/containers/AnonymousRoute';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { AllPhotosPage } from './features/photos/pages/AllPhotosPage';

const App = () => (
  <BrowserRouter>
    <UserProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Dummy Instagram</h1>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {user && (
                  <Fragment>
                    <li>
                      <Link to="/upload">Upload</Link>
                    </li>
                    <li>
                      <LogoutLink />
                    </li>
                  </Fragment>
                )}
                {!user && (
                  <Fragment>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </header>
            <div>
              <Route exact path="/" component={AllPhotosPage} />
              <AuthenticatedRoute
                path="/upload"
                redirectTo="/login"
                component={UploadPhoto}
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
      </UserContext.Consumer>
    </UserProvider>
  </BrowserRouter>
);

export default App;
