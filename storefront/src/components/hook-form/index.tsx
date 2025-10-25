import { RHFCombobox } from "./rhf-combobox"
import { RHFInput } from "./rhf-input"
import { RHFSelect } from "./rhf-select"
import { RHFTextarea } from "./rhf-textarea"
import { RHFUpload } from "./rhf-upload"

export * from "./form-provider"
export * from "./types"

export const Field = {
  input: RHFInput,
  textArea: RHFTextarea,
  select: RHFSelect,
  combobox: RHFCombobox,
  upload: RHFUpload,
}
