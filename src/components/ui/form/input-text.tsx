import { Form, FormItemProps, Input, InputProps } from "antd";
import { ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface IInputFieldProps<TFormValues extends FieldValues> extends Omit<InputProps, "name"> {
  control: Control<TFormValues>;
  name: keyof TFormValues;
  label: ReactNode;
  required?: boolean;
  layout?: FormItemProps["layout"];
}

export const InputTextField = <TFormValues extends FieldValues>({
  control,
  name,
  layout = "vertical",
  label,
  required = false,
  ...props
}: IInputFieldProps<TFormValues>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          validateStatus={error ? "error" : ""}
          help={error?.message}
          label={label}
          layout={layout}
          required={required}
        >
          <Input
            data-rhf={name}
            onChange={onChange}
            value={value}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
