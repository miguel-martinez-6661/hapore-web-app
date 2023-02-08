import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface InputSelectOption {
  label: string;
  value: string;
}

interface InputSelectProps {
  name: string;
  label: string;
  value?: string;
  options: InputSelectOption[];
  onChange: ({}) => void;
  required?: boolean;
}

export const InputSelect = ({
  name,
  label,
  value,
  options,
  onChange,
  required,
}: InputSelectProps) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          required={required}
          onChange={onChange}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
