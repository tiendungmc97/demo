import { Form, TimePicker, TimePickerProps } from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

interface ITimePickerFieldProps<TFormValues> extends Omit<TimePickerProps, "name" | "control"> {
  name: keyof TFormValues;
}

export const TimePickerField = <TFormValues extends Record<string, any>>({
  name,
  ...props
}: ITimePickerFieldProps<TFormValues>) => {
  const { control } = useForm<TFormValues>();
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <TimePicker
            value={value ? dayjs(value) : null}
            data-rhf={name}
            onChange={(time) => onChange(time ? time.format("HH:mm:ss") : null)}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
};
