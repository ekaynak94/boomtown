import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

function Input({ label, value, placeholder, onChange, meta }) {
  return (
    <div className="line">
      <div>
        <InputLabel shrink>{label}</InputLabel>
        <TextField
          placeholder={placeholder}
          value={value}
          error={meta.touched && meta.error}
          onChange={onChange}
        />
        {meta.touched && meta.error
          ? (<FormHelperText id="component-error-text">{meta.error}</FormHelperText>)
          : null
        }
      </div>
    </div>
  );
}

function validateName(name) {
  
}

function validateDescription(description) {
 
}

const FormConfig = {
  label: {
    name: 'Name',
    description: 'description',
  },
  placeholder: {
    name: 'Name your item',
    description: 'Describe your item',
  },
  validate: {
    name: validateName,
    description: validateDescription,
  }
};

function FormView({ handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Field name="name"
        render={({ input, meta }) => (
          <Input
            label={FormConfig.label[input.name]}
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            value={input.value} />
        )} />

      <Field name="description"
        render={({ input, meta }) => (
          <Input
            label={FormConfig.label[input.name]}
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            value={input.value}/>
        )} />

      <Button size="small" color="primary">
        Share
      </Button>
    </form>
  );
}

function validate(state) {
  const errors = Object.entries(FormConfig.validate)
    .map(([k, validateFn]) => [k, validateFn(state[k])])
    .reduce((a, [k, e]) => { a[k] = e; return a; }, {})
    ;
  return errors;
}

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(finalState) {
    alert(`Form is Valid!\n${JSON.stringify(finalState)}`);
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={this.onSubmit.bind(this)}
          validate={validate}
          render={props => (<FormView {...props} />)}
        />
      </div>
    );
  }
}

export default ShareForm;
