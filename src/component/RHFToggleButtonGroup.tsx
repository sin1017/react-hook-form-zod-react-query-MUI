import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

type Props<T extends FieldValues> = {
  name: Path<T>
  options?: Option[]
  label: string
}

const RHFToggleButtonGroup = <T extends FieldValues>({ name, options }: Props<T>) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue)
            }
          }}
          value={value.length ? value : [options?.[0].id]} // default 值
        >
          {options?.map((option) => (
            <ToggleButton
              key={option.id}
              value={option.id}
            >
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  )
}

export default RHFToggleButtonGroup