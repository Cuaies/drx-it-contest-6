import { FormProvider, useForm } from "react-hook-form";
import { Input, type InputProps } from "../input";
import "./register.scss";

enum FormFields {
  FullName = "fullName",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Password = "password",
  PasswordConfirmation = "passwordConfirmation",
}

const FORM_DATA: { [key in FormFields]: InputProps } = {
  [FormFields.FullName]: {
    label: "Full Name",
    id: FormFields.Email,
    required: true,
  },
  [FormFields.Email]: {
    label: "Email",
    type: "email",
    id: FormFields.Email,
    required: true,
  },
  [FormFields.PhoneNumber]: {
    label: "Phone Number",
    type: "tel",
    id: FormFields.Email,
    required: true,
  },
  [FormFields.Password]: {
    label: "Password",
    type: "password",
    id: FormFields.Password,
    required: true,
  },
  [FormFields.PasswordConfirmation]: {
    label: "Confirm Password",
    type: "password",
    id: FormFields.PasswordConfirmation,
    required: true,
  },
};

export const RegisterForm = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data: any) => {});

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className="form-container"
        >
          <div className="flex items-center justify-center gap-5 grid">
            <Input {...FORM_DATA[FormFields.FullName]} />
            <Input {...FORM_DATA[FormFields.Email]} />
            <Input {...FORM_DATA[FormFields.PhoneNumber]} />
            <Input {...FORM_DATA[FormFields.Password]} />
            <Input {...FORM_DATA[FormFields.PasswordConfirmation]} />
            <span className="flex justify-center">
              Already a member?&nbsp;<a href="/login">Login</a>
            </span>
            <button className="btn-primary" onClick={onSubmit}>
              Register
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
