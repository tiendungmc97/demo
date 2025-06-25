import { Form, FormItemProps, InputNumber, InputNumberProps } from "antd";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IInputNumberFieldProps<TFormValues extends FieldValues> extends Omit<InputNumberProps, "name"> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  required?: boolean;
  layout?: FormItemProps["layout"];
}

export const InputNumberField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  layout = "vertical",
  ...props
}: IInputNumberFieldProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? "error" : ""}
          help={error?.message}
          layout={layout}
        >
          <InputNumber
            data-rhf={name}
            className="w-full"
            value={value}
            onChange={onChange}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
