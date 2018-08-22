import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../containers/RegisterForm';
import { Card } from '../../../shared/components/Card';
import './RegisterPage.css';

export const RegisterPage = () => (
  <div className="RegisterPage">
    <Card>
      <div className="RegisterPage-card">
        <h3>Sign up now !</h3>
        <RegisterForm />
        <ul>
          <li>
            <Link to="/login">Already have a account ? Sign in now !</Link>
          </li>
        </ul>
      </div>
    </Card>
  </div>
);
