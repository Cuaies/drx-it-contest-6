import { FormProvider, useForm } from "react-hook-form";
import { Input, type InputProps } from "../input";
import "./register.scss";
import { useProvideAuth } from "../../../hooks";

enum FormFields {
  Name = "name",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

const FORM_DATA: { [key in FormFields]: InputProps } = {
  [FormFields.Name]: {
    label: "Full Name",
    id: FormFields.Name,
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
    id: FormFields.PhoneNumber,
    required: true,
  },
  [FormFields.Password]: {
    label: "Password",
    type: "password",
    id: FormFields.Password,
    required: true,
  },
  [FormFields.ConfirmPassword]: {
    label: "Confirm Password",
    type: "password",
    id: FormFields.ConfirmPassword,
    required: true,
  },
};

export const RegisterForm = () => {
  const auth = useProvideAuth();
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data: any) => auth.register(data));

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className="form-container"
        >
          <div className="flex items-center justify-center gap-5 grid">
            <Input {...FORM_DATA[FormFields.Name]} />
            <Input {...FORM_DATA[FormFields.Email]} />
            <Input {...FORM_DATA[FormFields.PhoneNumber]} />
            <Input {...FORM_DATA[FormFields.Password]} />
            <Input {...FORM_DATA[FormFields.ConfirmPassword]} />
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
