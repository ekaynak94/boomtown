import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { updateItem, resetItem, resetImage } from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';


const Input =({ value, placeholder, onChange, meta })=> {
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
    title: 'Name your item',
    description: 'Describe your item',
  }
};

const FormView = ({generateTagsText, handleSelectTag,selectedTags,updateItem, dispatchUpdate, fileInput, tags, handleSubmit, pristine, invalid, form }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormSpy
        subscription={{ values: true }}
        component={({ values }) => {
          if (values) {
            dispatchUpdate(values, tags, updateItem);
          }
          return '';
        }}
      />
      <input
        hidden
        ref={fileInput}
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
      <Field name="title"
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
      <Field name="tags">
        {({ input, meta }) => {
          return (
            <Select
              multiple
              value={selectedTags}
              onChange={e => handleSelectTag(e)}
              renderValue={selected => {
                return generateTagsText(tags, selected);
              }}
            >
              {tags &&
                tags.map(tag => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Checkbox
                      checked={
                        selectedTags.indexOf(
                          tag.id,
                        ) > -1
                      }
                    />
                    <ListItemText primary={tag.title} />
                  </MenuItem>
                ))}
            </Select>
          );
        }}
      </Field>
      <Button size="small" color="primary">
        Share
      </Button>
    </form>
  );
}

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: [],
    };
  }

  handleSelectTag=(event)=> {
    this.setState({
      selectedTags: event.target.value
    });
   }

  handleSelectFile=(event)=> {
    this.setState({
      fileSelected:this.fileInput.current.files[0]
    })
  }

  applyTags = (tags) => {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url = () => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  resetFileInput = () =>{
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({
      fileSelected: false
    });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  dispatchUpdate = (values, tags, updateItem) => {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  render() {
    const { tags } = this.props;
    return (
      <div>
        <Form
          onSubmit={(values)=>this.saveItem(values,tags)}
          render={props => (<FormView
            updateItem={this.props.updateItem}
            dispatchUpdate={this.dispatchUpdate}
            fileInput={this.fileInput}
            handleSelectTag={this.handleSelectTag}
            selectedTags={this.state.selectedTags}
            generateTagsText={this.generateTagsText}
            tags={tags} {...props} />)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateItem(item) { dispatch(updateItem(item)) },
  resetItem() { dispatch(resetItem()) },
  resetImage() { dispatch(resetImage()) },
  
});

export default connect(null,mapDispatchToProps)(ShareForm);
