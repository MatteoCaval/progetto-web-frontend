import React from "react"
import { Grid, Switch, TextField, Typography } from "@material-ui/core"
import "./timetable-item.style.scss"
import { initialDinnerState, initialLaunchState } from "./timetable.component"
import { TimePicker } from '@material-ui/pickers';

const TimeTableItem = ({ day, onDayChanged }) => {
    const handleLaunchStart = (date) => {
        const newDay = { ...day, launch: { ...day.launch, ['timeStart']: { hour: date.getHours(), minute: date.getMinutes() } } }
        onDayChanged(newDay)
    }

    const handleLaunchEnd = (date) => {
        const newDay = { ...day, launch: { ...day.launch, ['timeEnd']: { hour: date.getHours(), minute: date.getMinutes() } } }
        onDayChanged(newDay)
    }

    const handleDinnerStart = (date) => {
        const newDay = { ...day, dinner: { ...day.dinner, ['timeStart']: { hour: date.getHours(), minute: date.getMinutes() } } }
        onDayChanged(newDay)
    }

    const handleDinnerEnd = (date) => {
        const newDay = { ...day, dinner: { ...day.dinner, ['timeEnd']: { hour: date.getHours(), minute: date.getMinutes() } } }
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
            dinner : checked ? initialDinnerState : null
        }

        onDayChanged(newDay)
    }

    const getDate = (hour, minute) => {
        console.log('Enter in getDate -> ' + hour + ' - ' + minute)
        let date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return date;
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
                            <TimePicker
                                ampm={false}
                                label="Inizio"
                                value={getDate(day.launch.timeStart.hour, day.launch.timeStart.minute)}
                                minutesStep={30}
                                onChange={handleLaunchStart}
                            />
                            <span className="timetable-space">-</span>
                            <TimePicker
                                ampm={false}
                                label="Fine"
                                value={getDate(day.launch.timeEnd.hour, day.launch.timeEnd.minute)}
                                minutesStep={30}
                                onChange={handleLaunchEnd}
                            />
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
                                <TimePicker
                                    ampm={false}
                                    label="Inizio"
                                    value={getDate(day.dinner.timeStart.hour, day.dinner.timeStart.minute)}
                                    minutesStep={30}
                                    onChange={handleDinnerStart}
                                />
                                <span className="timetable-space">-</span>
                                <TimePicker
                                    ampm={false}
                                    label="Fine"
                                    value={getDate(day.dinner.timeEnd.hour, day.dinner.timeEnd.minute)}
                                    minutesStep={30}
                                    onChange={handleDinnerEnd}
                                />
                            </div>
                        ) : null
                }
            </Grid>
        </Grid>
    )
}

export default TimeTableItem