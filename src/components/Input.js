import React, { useState } from "react";
import { nanoid } from "nanoid";

const INITIAL_STATE = { name: "", email: "", subject: "", message: "" };

const VALIDATION = {
  name: [
    {
      isValid: (value) => !!value,
      message: "Is required",
    },
    {
      isValid: (value) => /^[A-Za-z\s]*$/.test(value),
      message: "Invalid field",
    },
  ],

  email: [
    {
      isValid: (value) => !!value,
      message: "Is required",
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email address",
    },
  ],

  message: [
    {
      isValid: (value) => !!value,
      message: "Is required",
    },
  ],
};

const getErrorFields = (form, touched, submitted) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    if (submitted) {
      // Return empty array for all fields when submitted is true
      return { ...acc, [key]: [] };
    }

    const errorsPerField = VALIDATION[key]
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      .filter((errorPerField) => !errorPerField.isValid);

    if (form[key] === "" && (touched[key] || submitted)) {
      errorsPerField.push({ message: "Is required" });
    }

    return { ...acc, [key]: errorsPerField };
  }, {});

const ContactForm = (props) => {
  const { loading } = props;
  const { submitForm } = props;
  const [form, setForm] = useState(INITIAL_STATE);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;

    console.log(event);

    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setTouched((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const errorFields = getErrorFields(form, touched, submitted);

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyRequiredFields = Object.keys(form).some(
      (key) => form[key] === "" && !touched[key] && VALIDATION[key]
    );

    if (hasEmptyRequiredFields) {
      setTouched(
        Object.fromEntries(Object.keys(form).map((key) => [key, true]))
      );
      return;
    }

    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) {
      setSubmitted(false);
      return;
    }
    const userId = nanoid();

    console.log("Id: " + nanoid());
    console.log("name: " + form.name);
    console.log("Email: " + form.email);
    console.log("Subject: " + form.subject);
    console.log("Message: " + form.message);

    submitForm(form, userId);
    setForm(INITIAL_STATE);
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      {submitted && (
        <div className="success-message">Form submitted successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <h1>ContactUs</h1>
        <div className="form-field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          {errorFields.name?.length && (touched.name || submitted) ? (
            <span className="error-message">{errorFields.name[0].message}</span>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={form.email}
            onChange={handleChange}
          />
          {errorFields.email?.length && (touched.email || submitted) ? (
            <span className="error-message">
              {errorFields.email[0].message}
            </span>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            rows="10"
            cols="70"
            id="message"
            type="text"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          {errorFields.message?.length && (touched.message || submitted) ? (
            <span className="error-message">
              {errorFields.message[0].message}
            </span>
          ) : null}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
