import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import TextInput from "../textInput/TextInput";
import Button from "../button/Button";

interface SignupFormProps {
  request: (
    username: string,
    email: string,
    password: string,
    password2: string
  ) => {};
  data: any;
}

interface Data  {
  token: {token: string, refresh: string}
}

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(3, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  password2: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const SignupForm = ({ request }: SignupFormProps) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", password2: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const data:{token?:object} = await request(
          values.username,
          values.email,
          values.password,
          values.password2
        );
        if (data) {
          localStorage.setItem('token', JSON.stringify(data.token));
          return navigate('/user/dashboard') 
        }
      }}
    >
      <Form className="w-full flex flex-col justify-center items-center">
        <TextInput label="Username" name="username" type="text" isPassword={false}/>
        <TextInput label="Email" name="email" type="email" isPassword={false}/>
        <TextInput label="Password" name="password" type="text" isPassword={true}/>
        <TextInput
          label="Confirm Passord"
          name="password2"
          type="text"
          isPassword={true}
        />
        <Button type="submit" text="Submit" />
      </Form>
    </Formik>
  );
};

export default SignupForm;
