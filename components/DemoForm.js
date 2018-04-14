import React from 'react'
import { reduxForm, Field } from 'redux-form'
import showResults from './showResults'
import isValidEmail from 'sane-email-validation'
import provinces from '../data/provinces'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength3 = maxLength(3)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const province = value => value === "Burgos" ? "Invalid location": undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const nameVal = value =>
  value === "aa" ? 'Incorrect name' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

 const renderSelect = ({ input, label, meta: { touched, error, warning }, children }) =>(
  <div>
  <label>{label}</label>
  <div>
    
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    <select {...input}>
     {children}
   </select>
  </div>
</div>
   
 )

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text"
        component={renderField} label="Username"
        validate={[ required, maxLength3 ]}
        warn={nameVal}
      />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={email}
        warn={aol}
      />
      <Field name="age" type="number"
        component={renderField} label="Age"
        validate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <Field name="province" label="Province" type="province" component={renderSelect} validate={[ required, province ]} >
      <option />
      {provinces.map(province =>
        <option key={province} value={province}>
          {province}
        </option>
      )}
    </Field>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'demo' // a unique identifier for this form
})(FieldLevelValidationForm)
