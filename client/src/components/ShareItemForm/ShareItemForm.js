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

import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION} from '../../apollo/queries';


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

  generateTagsText=(tags, selected)=> {
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

  saveItem = (values, tags, addItem) => {
    const newTags = tags
      .filter(tag =>
      this.state.selectedTags.indexOf(tag.id)>=0)
      .map(tag => ({ id: tag.id, title: tag.title }))
    const item = { ...values, tags: [...newTags] };
    addItem({variables:{item}})
  }

  render() {
    const { tags } = this.props;
    return (
      <Mutation mutation={ADD_ITEM_MUTATION}>
        {(addItem) => (
          <div>
            <Form
              onSubmit={(values) => this.saveItem(values, tags, addItem)}
              render={({ handleSubmit, pristine, invalid, form})=> (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, this.props.updateItem);
                      }
                      return '';
                    }}
                  />
                  <input
                    hidden
                    ref={this.fileInput}
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
                        value={input.value} />
                    )} />
                  <Field name="tags">
                    {({ input, meta }) => {
                      return (
                        <Select
                          multiple
                          value={this.state.selectedTags}
                          onChange={e => this.handleSelectTag(e)}
                          renderValue={selected => {
                            return this.generateTagsText(tags, selected);
                          }}
                        >
                          {tags &&
                            tags.map(tag => (
                              <MenuItem key={tag.id} value={tag.id}>
                                <Checkbox
                                  checked={
                                    this.state.selectedTags.indexOf(
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
                  <Button type="submit" size="small" color="primary">
                    Share
                  </Button>
                </form>
              )}
            />
          </div>
        )}
        
      </Mutation>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateItem(item) { dispatch(updateItem(item)) },
  resetItem() { dispatch(resetItem()) },
  resetImage() { dispatch(resetImage()) },
  
});

export default connect(null,mapDispatchToProps)(ShareForm);
