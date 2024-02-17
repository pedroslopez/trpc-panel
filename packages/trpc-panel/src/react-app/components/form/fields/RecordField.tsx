import React, { ReactNode, useState } from "react";
import { Control } from "react-hook-form";
import type { ParsedInputNode } from "@src/parse/parseNodeTypes";
import { Field } from "@src/react-app/components/form/Field";
import ObjectIcon from "@mui/icons-material/DataObjectOutlined";
import { InputGroupContainer } from "../../InputGroupContainer";
import { AddItemButton } from "../../AddItemButton";
import { BaseTextField } from "./base/BaseTextField";
import Add from "@mui/icons-material/Add";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

export function RecordField({
  label,
  control,
  node,
  overrideIconElement,
}: {
  label: string;
  control: Control<any>;
  node: ParsedInputNode & { type: "record" };
  topLevel?: boolean;
  overrideIconElement?: ReactNode;
}) {
  const [newFieldName, setNewFieldName] = useState("");
  const [fieldNames, setFieldNames] = useState<string[]>([]);

  const addField = () => {
    if(!newFieldName) return;
    setFieldNames([...fieldNames, newFieldName]);
    setNewFieldName("");
  }

  const removeField = (index: number) => {
    setFieldNames(fieldNames.filter((_, i) => i !== index));
  }

  return (
    <>
    <InputGroupContainer
      title={label}
      iconElement={overrideIconElement ?? <ObjectIcon className="mr-1" />}
    >
      {fieldNames.map((fieldName, i) => (
        <span key={i + ""} className="flex flex-row items-start">
          <span className="flex flex-1 flex-col">
            <Field
              inputNode={{
                ...node.valueType,
                path: node.path.concat([fieldName]),
              }}
              control={control}
              key={fieldName}
            />
          </span>
          <button
            type="button"
            className="ml-2"
            onClick={() => {removeField(i)}}
          >
            <CloseOutlined className="w-5 h-5 mt-[0.45rem] mr-2" />
          </button>
        </span>

      ))}
    </InputGroupContainer>
    <InputGroupContainer title={"Add field"} iconElement={<Add />}>
    <BaseTextField value={newFieldName} onChange={setNewFieldName} label={"Field name"} />
      <AddItemButton onClick={addField} />
    </InputGroupContainer>
    
    </>
  );
}
