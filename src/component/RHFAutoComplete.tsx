import { Autocomplete, Box, Checkbox, TextField } from '@mui/material'
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Option } from '../types/option'

type Props<T extends FieldValues> = {
  name: Path<T>
  options?: Option[]
  label: string
}

const RHFAutoComplete = <T extends FieldValues>({ name, options, label }: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        options?.length ? (
          <Autocomplete
            options={options}
            value={
              value?.map((id: number) => options?.find(item => item.id === id))
            }
            getOptionLabel={(option) => options?.find((item) => item.id === option.id)?.label ?? " "}
            isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
            onChange={(_, newValue) => {
              onChange(newValue.map((item) => item.id));
            }}
            disableCloseOnSelect
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
                label={label}
              />
            )}
            renderOption={(props, option, { selected }) => {
              const { key, ...other } = props
              return <Box component="li" key={key} {...other}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            }
            }
          />
        ) : <></>
      )}
    />
  )
}

export default RHFAutoComplete


