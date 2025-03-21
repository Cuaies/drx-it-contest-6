import axios from "axios";
import { Input, type InputProps } from "../input";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Toast } from "../../toast";

enum FormFields {
  Name = "name",
  Description = "description",
  Height = "estimatedHeight",
  Weight = "estimatedWeight",
  Width = "estimatedWidth",
  BomId = "bomId",
}

const FORM_DATA: { [key in FormFields]: InputProps } = {
  [FormFields.Name]: {
    label: "Name",
    type: "text",
    id: FormFields.Name,
    required: true,
  },
  [FormFields.Description]: {
    label: "Description",
    type: "text",
    id: FormFields.Description,
    required: true,
  },
  [FormFields.Height]: {
    label: "Height",
    type: "number",
    id: FormFields.Height,
    required: false,
  },
  [FormFields.Weight]: {
    label: "Weight",
    type: "number",
    id: FormFields.Weight,
    required: false,
  },
  [FormFields.Width]: {
    label: "Width",
    type: "number",
    id: FormFields.Width,
    required: false,
  },
  [FormFields.BomId]: {
    label: "BOM ID",
    type: "text",
    id: FormFields.BomId,
    required: false,
  },
};

export const CreateProductForm = () => {
  const methods = useForm();
  const [created, setCreated] = useState(false);

  const onSubmit = methods.handleSubmit((data: any) =>
    axios
      .post("http://localhost:3000/products", data, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => (res.status === 201 ? setCreated(true) : null)),
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="form-container"
      >
        {created && (
          <Toast type="info" message={"Resource created"} durationMs={5000} />
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input {...FORM_DATA[FormFields.Name]} />
          <Input {...FORM_DATA[FormFields.Description]} />
          <Input {...FORM_DATA[FormFields.Height]} />
          <Input {...FORM_DATA[FormFields.Weight]} />
          <Input {...FORM_DATA[FormFields.Width]} />
          <Input {...FORM_DATA[FormFields.BomId]} />
          <button className="btn-primary" onClick={onSubmit}>
            Create Product
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
