import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { updateItem, resetItem, resetImage } from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';
import validate from './helpers/validation';

import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION} from '../../apollo/queries';


const Input =({ className,value, placeholder, onChange, meta })=> {
  return (
    <div className="line">
      <div>
        <TextField
          className={className.textField}
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
    tags:'Add some tags'
  }
};
const initialState = {
  fileSelected: false,
  done: false,
  selectedTags: [],
};

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.classes = props.classes;
    this.state = {...initialState};
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

  saveItem = (values, tags, addItem,form) => {
    const newTags = tags
      .filter(tag =>
      this.state.selectedTags.indexOf(tag.id)>=0)
      .map(tag => ({ id: tag.id, title: tag.title }))
    const item = { ...values, tags: [...newTags] };
    const success = addItem({ variables: { item } });
    return success;
  }

  render() {
    const { tags } = this.props;
    return (
      <Mutation mutation={ADD_ITEM_MUTATION}>
        {(addItem) => (
          <div className={this.classes.form}>
            <Typography variant="headline" component="h1" className={this.classes.headline}>
              Share. Borrow. Prosper.
            </Typography>
            <Form
              onSubmit={(values, form) => {
                const res=this.saveItem(values, tags, addItem);
                form.reset();
                this.setState({ ...initialState });
                this.props.resetItem();
                res?alert('Form Submitted'):alert('could not submit');
              }}
              validate={validate.bind(this)}
              render={({ handleSubmit, pristine, invalid, form }) => (
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
                  <Field name="imageurl"
                    render={({ input, meta }) => (
                        <div>
                          <input
                            hidden
                            ref={this.fileInput}
                            accept="image/*"
                            id="contained-button-file"
                            onChange={e => this.handleSelectFile(e)}
                            type="file"
                          />
                          <label htmlFor="contained-button-file">
                          <Button
                            className={this.classes.imagebtn}
                            variant="contained"
                            component="span"
                            >
                              Select an Image
                            </Button>
                        </label>
                      </div>
                    )} />
                  <Field name="title"
                    render={({ input, meta }) => (
                      <Input
                        className={this.classes}
                        placeholder={FormConfig.placeholder[input.name]}
                        onChange={input.onChange}
                        meta={meta}
                        value={input.value} />
                    )} />

                  <Field name="description"
                    render={({ input, meta }) => (
                      <Input
                        className={this.classes}
                        placeholder={FormConfig.placeholder[input.name]}
                        onChange={input.onChange}
                        meta={meta}
                        value={input.value} />
                    )} />
                  <Field name="tags" render={({ input, meta }) => {
                    return (
                      <FormControl className={this.classes.select}>
                        <InputLabel className={this.classes.selectLabel} htmlFor="tag-select">{FormConfig.placeholder[input.name]}</InputLabel>
                        <Select
                          className={this.classes.select}
                          inputProps={{
                            id: 'tag-select',
                          }}
                          meta={meta}
                          multiple
                          value={this.state.selectedTags}
                          onChange={e => {
                            this.handleSelectTag(e);
                            input.onChange(e);
                          }}
                          value={this.state.selectedTags}
                          renderValue={selected => {
                            return this.generateTagsText(tags, selected);
                          }}
                        >
                          {tags &&
                            tags.map(tag => (
                              <MenuItem  key={tag.id} value={tag.id}>
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
                        </FormControl>
                      );
                    }}
                  />
                  <Button  disabled={pristine || invalid} type="submit" className={this.classes.sharebtn}>
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

export default withStyles(styles)(connect(null,mapDispatchToProps)(ShareForm));