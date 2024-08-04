import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

import css from "./ContactForm.module.css";

const numberRegExp = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const ContactValidationSchema = Yup.object().shape({
  contactName: Yup.string()
    .required("Required")
    .min(3, "Too Short!")
    .max(50, "Too Long!"),
  contactNumber: Yup.string()
    .matches(numberRegExp, "Requited format 'xxx-xx-xx'")
    .required("Required")
    .min(3, "Too Short!")
    .max(50, "Too Long!"),
});

const INITIAL_VALUES = {
  contactName: "",
  contactNumber: "",
};

const AddContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, actions) => {
    const contactObject = {
      id: nanoid(),
      name: values.contactName,
      number: values.contactNumber,
    };

    onAddContact(contactObject);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={ContactValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name</span>
            <Field type="text" name="contactName" />
            <ErrorMessage
              className={css.errorText}
              name="contactName"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Number</span>
            <Field type="tel" name="contactNumber" />
            <ErrorMessage
              className={css.errorText}
              name="contactNumber"
              component="span"
            />
          </label>

          <button
            disabled={Object.keys(errors).length > 0}
            className={css.submitBtn}
            type="submit"
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddContactForm;
