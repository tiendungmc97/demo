import { Form, FormItemProps, Select, SelectProps } from "antd";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ISelectInputFieldProps<TFormValues extends FieldValues>
  extends SelectProps {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  required?: boolean;
  layout?: FormItemProps["layout"];
}

export const SelectField = <TFormValues extends FieldValues>({
  control,
  name,
  options,
  label,
  layout = "vertical",
  required = false,
  ...props
}: ISelectInputFieldProps<TFormValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <Form.Item
        validateStatus={error ? "error" : ""}
        help={error?.message}
        colon={false}
        label={label}
        layout={layout}
        required={required}
      >
        <Select
          data-rhf={name}
          value={value}
          onChange={(selectedValue) => {
            onChange(selectedValue);
          }}
          {...props}
          filterOption={(input, option) =>
            String(option?.label).toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      </Form.Item>
    )}
  />
);
