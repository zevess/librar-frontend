import type { BaseFieldProps, GenericObject } from 'vee-validate'

// export const bookFormInputs: IBookFormInputs[] = [
//     {
//         variant: 'input',
//         model:
//     }
// ]

export interface IBookFormInputs {
  variant: 'input' | 'textarea'
  model: string
  bindAttr: BaseFieldProps & GenericObject
  placeholder: string
  errorTitle?: string | undefined
}
