import React from "react";
import ContactForm from "../components/Input";
import axios from "axios";
import { useState } from "react";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const contactUs = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        form
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Submission was not successful. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <ContactForm submitForm={contactUs} submitting={loading} />
    </div>
  );
};

export default ContactUsForm;
