import { Checkbox, CheckboxProps, Form, FormItemProps } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ICheckboxFieldProps<TFormValues extends FieldValues> extends Omit<CheckboxProps, "name"> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  layout?: FormItemProps["layout"];
  required?: boolean;
}

export const CheckBoxField = <TFormValues extends Record<string, any>>({
  name,
  control,
  label,
  layout = "horizontal",
  required,
  ...props
}: ICheckboxFieldProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
          layout={layout}
          colon={false}
          required={required}
        >
          <Checkbox
            data-rhf={name}
            onChange={onChange}
            checked={!!value}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
