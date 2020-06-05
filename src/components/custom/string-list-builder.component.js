import React, { useState, useEffect } from "react";
import { Grid, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Button } from "@material-ui/core";
import './string-list-builder.style.scss'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { keys } from "@material-ui/core/styles/createBreakpoints";

const StringListPicker = ({ strings, addItem, updateItem, removeItem }) => {
    const [inputVisible, setInputVisible] = useState(false)
    const [selectedValue, setSelectedValue] = useState()
    const [oldValue, setOldValue] = useState()
    let [values, setValues] = useState()

    useEffect(() => {
        setValues(strings)
    }, [strings]);

    const handleListItemClick = (stringValue) => {
        setOldValue(stringValue)
        setInputVisible(true)
        setSelectedValue(stringValue)
    }

    const handleDeletePressed = (stringValue) => {
        setInputVisible(false)
        removeItem(stringValue)
    }

    const handleAddPressed = () => {
        setOldValue(null)
        setInputVisible(true)
        setSelectedValue("")
    }

    const handleSaveInputPressed = () => {
        if (oldValue) {
            updateItem(oldValue, selectedValue)
        } else {
            addItem(selectedValue)
        }
        setInputVisible(false)
    }

    const handleTextChange = event => {
        const { value } = event.target
        setSelectedValue(value);
    }

    return (
        <Container>
            <List>
                {values && values.map((stringValue, index) => (
                    <ListItem button onClick={() => handleListItemClick(stringValue)} key={index}>
                        <ListItemText primary={stringValue} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePressed(stringValue)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <div className="add-to-list-container">
                {
                    inputVisible ? null : (
                        <Button
                            className="add-to-list-button"
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddPressed}>
                            Add to list
                        </Button>)
                }
            </div>
            {
                inputVisible ? (
                    <div className="input-field-container">
                        <TextField
                            className="input-string-value"
                            id="string-input"
                            variant="outlined"
                            fullWidth
                            value={selectedValue}
                            onChange={handleTextChange}
                            label="Input new value">
                        </TextField>
                        <IconButton color="primary" onClick={handleSaveInputPressed}>
                            <SaveIcon />
                        </IconButton>
                    </div>
                ) : null
            }
        </Container>
    );
}

export default StringListPicker;
