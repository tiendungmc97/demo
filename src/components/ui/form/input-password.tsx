import { Form, FormItemProps, Input, InputProps } from "antd";
import { ReactNode } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface IInputFieldProps<TFormValues extends FieldValues> extends Omit<InputProps, "name"> {
  name: keyof TFormValues;
  label: ReactNode;
  required?: boolean;
  layout?: FormItemProps["layout"];
}

export const InputPasswordField = <TFormValues extends FieldValues>({
  name,
  layout = "vertical",
  label,
  required = false,
  ...props
}: IInputFieldProps<TFormValues>) => {
  const { control, setValue } = useFormContext<TFormValues>();
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
          <Input.Password
            data-rhf={name}
            autoComplete="off"
            onChange={onChange}
            onBlur={() => {
              const trimmed = value?.trim();
              setValue(name as any, trimmed, { shouldValidate: true });
            }}
            value={value}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
