/**
 * The interface that is used for the login page
 * 
 * @field formData - The form data
 * @field validationErrors - The Error validators
 * @field handleInputChange - The Input Handler
 * @field setStep - The Step for the form validation
 * @field handleSubmit - The submit handler
 */
export interface LoginInterface {
    formData: any,
    validationErrors?: any,
    handleInputChange?: any,
    setStep: any,
    handleSubmit?: any
}