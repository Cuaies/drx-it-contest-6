import { Input, type InputProps } from "../input";
import { FormProvider, useForm } from "react-hook-form";
import "./login.scss";

enum FormFields {
  Email = "email",
  Password = "password",
}

const FORM_DATA: { [key in FormFields]: InputProps } = {
  [FormFields.Email]: {
    label: "Email",
    type: "text",
    id: FormFields.Email,
    required: true,
  },
  [FormFields.Password]: {
    label: "Password",
    type: "password",
    id: FormFields.Password,
    required: true,
  },
};

export const LoginForm = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {});

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="form-container"
      >
        <div className="flex items-center justify-center gap-5 grid">
          <Input {...FORM_DATA[FormFields.Email]} />
          <Input {...FORM_DATA[FormFields.Password]} />
          <span className="flex justify-center">
            Not a member yet?&nbsp;<a href="/register">Register</a>
          </span>
          <button className="btn-primary" onClick={onSubmit}>
            Login
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
