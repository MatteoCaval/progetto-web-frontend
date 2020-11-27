import React, { useState, useEffect } from "react"
import TimeTableItem from "./timetable-item.component"
import { Container, Button } from "@material-ui/core"
import { updateTimetable, fetchTimetable } from "../../redux/admin/admin.actions";
import { connect } from "react-redux";
import "./timetable.style.scss"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Progress from "../common/progress.component";


export const initialLaunchState = {
    timeStart: {
        hour: '12',
        minute: '00'
    },
    timeEnd: {
        hour: '14',
        minute: '00'
    }
}

export const initialDinnerState = {
    timeStart: {
        hour: '18',
        minute: '00'
    },
    timeEnd: {
        hour: '22',
        minute: '00'
    }
}

export const initialTimeTable = [
    {
        name: 'Monday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Tuesday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Wednesday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Thursday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Friday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Saturday',
        launchOpen: false,
        dinnerOpen: false
    },
    {
        name: 'Sunday',
        launchOpen: false,
        dinnerOpen: false
    }
]

const TimeTablePage = ({ currentTimetable, updateTimetable, fetchTimetable, error, loading }) => {

    const [timetable, setTimetable] = useState(
    )

    useEffect(() => {
        fetchTimetable()
    }, [fetchTimetable])

    useEffect(() => {
        if (currentTimetable != null && currentTimetable.length > 0){
            setTimetable(currentTimetable)
        }
    }, [currentTimetable])

    const updateDay = day => {
        console.log(day)

        setTimetable(timetable.map(d => {
            return d.name === day.name ? day : d
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTimetable(timetable)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <Container maxWidth='md'>
                <form onSubmit={handleSubmit}>
                    {
                        timetable && (timetable.map(day => {
                            return (
                                <TimeTableItem key={day.name} day={day} onDayChanged={updateDay} />
                            )
                        }))
                    }
                    {
                        timetable && (
                            <div className="save-button-container">
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'>
                                    Save
                                </Button>
                            </div>
                        )
                    }

                </form>
                <Progress loading={loading} />
            </Container>
        </MuiPickersUtilsProvider>
    )
}

const mapStateToProps = state => {
    return {
        currentTimetable: state.adminData.timetable,
        error: state.adminData.timetableError,
        loading: state.adminData.timetableLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTimetable: (timetable) => dispatch(updateTimetable(timetable)),
        fetchTimetable: () => dispatch(fetchTimetable())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTablePage)