import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import SelectForm from '../SelectForm'
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

function Input({ value, placeholder, onChange, meta }) {
  return (
    <div className="line">
      <div>
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

const FormConfig = {
  placeholder: {
    name: 'Name your item',
    description: 'Describe your item',
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
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            value={input.value} />
        )} />

      <Field name="description"
        render={({ input, meta }) => (
          <Input
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            value={input.value}/>
        )} />
      <SelectForm/>
      <Button size="small" color="primary">
        Share
      </Button>
    </form>
  );
}

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={()=>console.log('submitted')}
          render={props => (<FormView {...props} />)}
        />
      </div>
    );
  }
}

export default ShareForm;
