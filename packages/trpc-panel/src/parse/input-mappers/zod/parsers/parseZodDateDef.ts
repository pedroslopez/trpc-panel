import { DateNode, ParseFunction } from "../../../parseNodeTypes";
import { ZodDateDef } from "zod";
import { nodePropertiesFromRef } from "@src/parse/utils";

export const parseZodDateDef: ParseFunction<ZodDateDef, DateNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "date",
    ...nodePropertiesFromRef(refs),
  };
};
