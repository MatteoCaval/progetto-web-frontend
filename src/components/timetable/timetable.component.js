import React, { useState, useEffect } from "react"
import TimeTableItem from "./timetable-item.component"
import { Container, Button } from "@material-ui/core"
import { updateTimetable, fetchTimetable } from "../../redux/admin/admin.actions";
import { connect } from "react-redux";
import "./timetable.style.scss"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


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

const TimeTablePage = ({ currentTimetable, updateTimetable, fetchTimetable }) => {

    const [timetable, setTimetable] = useState(
        []
    )

    useEffect(() => {
        fetchTimetable()
    }, [fetchTimetable])

    useEffect(() => {
        setTimetable(currentTimetable)
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
                        timetable && timetable.map(day => {
                            return (
                                <TimeTableItem key={day.name} day={day} onDayChanged={updateDay} />
                            )
                        })
                    }
                    <div className="save-button-container">
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'>
                            Save
                    </Button>
                    </div>
                </form>
            </Container>
        </MuiPickersUtilsProvider>
    )
}

const mapStateToProps = state => {
    console.log(state.adminData.timetable)

    return {
        currentTimetable: state.adminData.timetable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTimetable: (timetable) => dispatch(updateTimetable(timetable)),
        fetchTimetable: () => dispatch(fetchTimetable())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTablePage)