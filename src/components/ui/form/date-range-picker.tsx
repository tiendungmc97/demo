import { DatePicker, Form, FormItemProps } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";
import utc from "dayjs/plugin/utc";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

dayjs.extend(utc);

const { RangePicker } = DatePicker;

interface IDateRangePickerFieldProps<TFormValues extends FieldValues>
  extends Omit<RangePickerProps, "name"> {
  control: Control<TFormValues>;
  name: keyof TFormValues;
  label?: string;
  layout?: FormItemProps["layout"];
  required?: boolean;
}

export const DateRangePickerField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  layout = "vertical",
  required = false,
  ...props
}: IDateRangePickerFieldProps<TFormValues>) => (
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
        <RangePicker
          data-rhf={name}
          className="w-full"
          value={
            value
              ? ([dayjs(value[0]), dayjs(value[1])] as [Dayjs, Dayjs])
              : null
          }
          onChange={(dates) => {
            const utcDates = dates
              ? (dates as [Dayjs, Dayjs]).map((date, index) =>
                  date
                    ? index === 0
                      ? date.startOf("day").utc().format()
                      : date.endOf("day").utc().format()
                    : null
                )
              : null;
            onChange(utcDates);
          }}
          {...props}
        />
      </Form.Item>
    )}
  />
);