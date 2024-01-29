import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../textInput/TextInput";
import Button from "../button/Button";

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextInput label="First Name" name="firstName" type="text" />
        <TextInput label="LastName" name="lastName" type="text" />
        <TextInput label="Email" name="email" type="email" />

        <Button type="submit" text="Submit"/>
      </Form>
    </Formik>
  );
};

export default SignupForm;
