import React from "react"
import { Container, Grid, Typography, TextField, Switch } from "@material-ui/core"
import "./timetable-item.style.scss"
import {initialLaunchState, initialDinnerState} from "./timetable.component"
const TimeTableItem = ({ day, onDayChanged }) => {
    const handleLaunchChange = (e) => {
        const { value, name } = e.target

        let splitted = value.split(":");
        const newDay = { ...day, launch: { ...day.launch, [name]: { hours: splitted[0], minutes: splitted[1] } } }
        onDayChanged(newDay)
    }

    const handleDinnerChange = (e) => {
        const { value, name } = e.target

        let splitted = value.split(":");
        const newDay = { ...day, [name]: { hours: splitted[0], minutes: splitted[1] } }
        onDayChanged(newDay)
    }

    const handleLaunchSwitch = e => {
        const { checked, name } = e.target

        const newDay = { 
            ...day, 
            [name]: checked,
            launch: checked ? initialLaunchState : null
        }

        onDayChanged(newDay)
    }    
    
    const handleDinnerSwitch = e => {
        const { checked, name } = e.target


        const newDay = { 
            ...day, 
            [name]: checked,
            dinner: checked ? initialDinnerState : null
        }

        onDayChanged(newDay)
    }

    return (
        <Grid container spacing={2}>
            <Grid className="day-name" item xs={12} sm={12}>
                <Typography variant='h6' color='textPrimary'>
                    {day.name}
                </Typography>
            </Grid>

            <Grid className="day-component" item xs={12} sm={6}>
                <div className="day-header-container">
                    <Typography color='textPrimary'>
                        Launch
                    </Typography>
                    <Switch
                        checked={day.launchOpen}
                        onChange={handleLaunchSwitch}
                        color="primary"
                        name="launchOpen"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                {
                    day.launchOpen ? (
                        <div className="time-selector-container">
                            <TextField
                                id="timeStart"
                                name="timeStart"
                                label="Inizio"
                                type="time"
                                onChange={handleLaunchChange}
                                value={day.launchOpen ? `${day.launch.timeStart.hour}:${day.launch.timeStart.minute}` : '00:00'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }} />
                            <span className="timetable-space">-</span>
                            <TextField
                                id="launchTimeEnd"
                                name="launchTimeEnd"
                                label="Fine"
                                type="time"
                                onChange={handleLaunchChange}
                                value={day.launchOpen ? `${day.launch.timeEnd.hour}:${day.launch.timeEnd.minute}` : '00:00'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }} />
                        </div>
                    ) : null
                }
            </Grid>
            <Grid className="day-component" item xs={12} sm={6}>
                <div className="day-header-container">
                    <Typography color='textPrimary'>
                        Dinner
                </Typography>
                    <Switch
                        checked={day.dinnerOpen}
                        onChange={handleDinnerSwitch}
                        color="primary"
                        name="dinnerOpen"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                {
                    day.dinnerOpen ?
                        (
                            <div className="time-selector-container">
                                <TextField
                                    id="dinnerTimeStart"
                                    name="dinnerTimeStart"
                                    label="Inizio"
                                    type="time"
                                    onChange={handleDinnerChange}
                                    value={day.dinnerOpen ? `${day.dinner.timeStart.hour}:${day.dinner.timeStart.minute}` : '00:00'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 1800, // 30 min
                                    }} />
                                <span className="timetable-space">-</span>
                                <TextField
                                    id="dinnerTimeEnd"
                                    name="dinnerTimeEnd"
                                    label="Fine"
                                    type="time"
                                    onChange={handleDinnerChange}
                                    value={day.dinnerOpen ? `${day.dinner.timeEnd.hour}:${day.dinner.timeEnd.minute}` : '00:00'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 1800, // 30 min
                                    }} />
                            </div>
                        ) : null
                }
            </Grid>
        </Grid>
    )
}

export default TimeTableItem