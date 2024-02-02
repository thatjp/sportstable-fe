import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import TextInput from "../textInput/TextInput";
import Button from "../button/Button";

interface SignupFormProps {
  request: (email: string, password: string) => {};
  email: any;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
  .required("No password provided.")
  .min(3, "Password is too short - should be 8 chars minimum.")
  .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const SignupForm = ({ request }: SignupFormProps) => {
  const navigate = useNavigate();
  
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const data = await request(values.email, values.password);
        if (data) {
          localStorage.setItem('token', JSON.stringify(data));
          return navigate('/user/dashboard')
        }
      }}
    >
      <Form className="w-full flex flex-col items-center">
        <TextInput label="Email" name="email" type="text" isPassword={false} />
        <TextInput
          label="Password"
          name="password"
          type="text"
          isPassword={true}
        />
        <Button type="submit" text="Submit" />
      </Form>
    </Formik>
  );
};

export default SignupForm;
