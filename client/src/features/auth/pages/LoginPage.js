import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import { Card } from '../../../shared/components/Card';
import './LoginPage.css';

export const LoginPage = () => (
  <div className="LoginPage">
    <Card>
      <div className="LoginPage-card">
        <h3>Sign in now !</h3>
        <LoginForm />
        <ul>
          <li>
            <Link to="/register">
              Do not have a account yet ? Register now !
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  </div>
);
