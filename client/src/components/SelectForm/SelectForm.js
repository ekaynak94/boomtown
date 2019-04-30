import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5'
];

class MultipleSelect extends React.Component {
    state = {
        name: [],
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            name: value,
        });
    };

    render() {
        const { classes,tags } = this.props;

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultipleSelect);