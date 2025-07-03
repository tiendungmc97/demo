import { Form, FormItemProps, Input, InputProps } from "antd";
import { ReactNode } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface IInputFieldProps<TFormValues extends FieldValues> extends Omit<InputProps, "name"> {
  name: keyof TFormValues;
  label: ReactNode;
  required?: boolean;
  layout?: FormItemProps["layout"];
}

export const InputTextField = <TFormValues extends FieldValues>({
  name,
  layout = "vertical",
  label,
  required = false,
  ...props
}: IInputFieldProps<TFormValues>) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name as string}
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
            onBlur={() => {
              const trimmed = value?.trim();
              setValue(name as string, trimmed, { shouldValidate: true });
            }}
            value={value}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
