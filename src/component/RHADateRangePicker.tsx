import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
type Props<T extends FieldValues> = {
  name: Path<T>
}

const RHADateRangePicker = <T extends FieldValues>(
  {
    name,
  }: Props<T>) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker {...restField} value={Array.isArray(value) ? value : [null, null]} />
        </LocalizationProvider>
      )}
    />
  )
}

export default RHADateRangePicker