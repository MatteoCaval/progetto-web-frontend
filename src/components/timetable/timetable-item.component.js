import React from "react"
import { Container, Grid, Typography, TextField } from "@material-ui/core"
import "./timetable-item.style.scss"
import TimeSlotPicker from "./time-slot-picker.component"
const TimeTableItem = ({ day }) => {
    return (
        <Grid container spacing={2}>
            <Grid className="day-name" item xs={12} sm={12}>
                <Typography variant='h6' color='textPrimary'>
                    {day.day}
                </Typography>
            </Grid>
            <Grid className="day-component" item xs={12} sm={6}>
                <Typography color='textPrimary'>
                    Launch
                </Typography>
                <div className="time-selector-container">
                    <TimeSlotPicker slot={day.launchTimeStart} />
                    <span className="timetable-space">-</span>
                    <TimeSlotPicker slot={day.launchTimeEnd} />
                </div>
            </Grid>
            <Grid className="day-component" item xs={12} sm={6}>
                <Typography color='textPrimary'>
                    Dinner
                </Typography>
                <div className="time-selector-container">
                    <TimeSlotPicker slot={day.dinnerTimeStart} />
                    <span className="timetable-space">-</span>
                    <TimeSlotPicker slot={day.dinnerTimeEnd} />
                </div>
            </Grid>
        </Grid>
    )
}

export default TimeTableItem