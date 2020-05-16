import React, { useState, useEffect } from "react";

import {
    Button,
    ButtonGroup
} from "@material-ui/core";

const QuantityPicker = ({onValueChanged}) => {
    const [value, setValue] = useState(1);
    useEffect(() => {
        onValueChanged(value)
    }, [value]);

    const handleIncrement = () => {
        setValue(value + 1)
    }

    const handleDecrement = () => {
        setValue(value - 1)
    }

    let clickable = value > 1

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button disabled={!clickable} onClick={handleDecrement}>-</Button>
            <Button disabled>{value}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    );
}


export default QuantityPicker;
