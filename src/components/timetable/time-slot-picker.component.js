import React from "react"
import { Card, Container, TextField } from "@material-ui/core"
import "./time-slot-picker.style.scss"

const TimeSlotPicker = ({ slot }) => {
    return (
        <Card className="time-slot-picker-container" variant='outlined'>
            <TextField
                id='launchTimeStart'
                name='launchTimeStart'
                autoComplete='off'
                type="number"
                InputProps={{ inputProps: { min: 0, max: 24, step: 1 } }}
                label='h' />
            <span>:</span>
            <TextField
                id='launchTimeStart'
                name='launchTimeStart'
                autoComplete='off'
                type="number"
                InputProps={{ inputProps: { min: 0, max: 59, step: 30 } }}
                label='min' />
        </Card>
    )
}

export default TimeSlotPicker