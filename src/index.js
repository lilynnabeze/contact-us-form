import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css";
import "./index.css";
import ContactUsForm from './components/ContactUsForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContactUsForm />
  </React.StrictMode>
);


