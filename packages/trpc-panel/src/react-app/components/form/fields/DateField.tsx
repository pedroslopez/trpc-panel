import { Control, Controller, useController } from "react-hook-form";
import React from "react";
import type { ParsedInputNode } from "@src/parse/parseNodeTypes";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import TextField from "@mui/material/TextField";

export function DateField({
  name,
  label,
  control,
}: {
  name: string;
  label: string;
  control: Control;
  node: ParsedInputNode;
}) {

  return (
    <>
    <Controller
      name={name}
      control={control}
      render={
          ({ field: { onChange, value, ...restField } }) =>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                  label={label}
                  value={value ? value : null}
                  onChange={(event: luxon.DateTime) => { onChange(event?.toJSDate()); }}
                  renderInput={(params) =>
                  <TextField
                      {...params}
                  />}
                  {...restField}
              />
          </LocalizationProvider>
        }
    /> 
    </>
  );
}
