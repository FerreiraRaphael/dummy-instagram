import React from 'react';
import UploadPhotoForm from '../containers/UploadPhotoForm';
import { Card } from '../../../shared/components/Card';

export const UploadPhotoPage = () => (
  <Card>
    <div style={{ padding: '0.5rem' }}>
      <h3>Upload a photo</h3>
      <UploadPhotoForm />
    </div>
  </Card>
);
