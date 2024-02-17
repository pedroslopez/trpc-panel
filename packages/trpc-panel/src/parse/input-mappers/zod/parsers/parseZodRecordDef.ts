import { nodePropertiesFromRef } from "@src/parse/utils";
import { ZodRecordDef } from "zod";
import { ParseFunction, RecordNode } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodRecordDef: ParseFunction<ZodRecordDef, RecordNode> = (
  def,
  refs
) => {
  const { valueType } = def;
  const valueTypeParsed = zodSelectorFunction(valueType._def, {
    ...refs,
    path: [],
  });

  // assumes keys are strings
  return {
    type: "record",
    valueType: valueTypeParsed,
    ...nodePropertiesFromRef(refs),
  };
};
