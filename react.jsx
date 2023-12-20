import react from 'react';
import reactDOM from 'react-dom/client';

const { ref: nameRef, ...nameControl }
  = register('name', { required: true });

