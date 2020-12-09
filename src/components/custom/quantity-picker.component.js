import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import "./quantity-picker.style.scss"

const QuantityPicker = ({ quantity, onQuantityIncremented, onQuantityDecremented }) => {

    let clickable = quantity > 1

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button disabled={!clickable} onClick={onQuantityDecremented}>-</Button>
            <Button disabled><span className="counter">{quantity}</span></Button>
            <Button onClick={onQuantityIncremented}>+</Button>
        </ButtonGroup>
    );
}

export default QuantityPicker;
