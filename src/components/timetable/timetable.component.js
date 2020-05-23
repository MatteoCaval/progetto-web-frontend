import React, { useState } from "react"
import TimeTableItem from "./timetable-item.component"
import { Container } from "@material-ui/core"

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

const TimeTablePage = () => {

    const [timetable, setTimetable] = useState(
        [
            {
                name: 'Monday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            },
            {
                name: 'Tuesday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            },
            {
                name: 'Wednesday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            },
            {
                name: 'Thursday',
                launchOpen: false,
                dinnerOpen: true,
                launch: null,
                dinner: initialDinnerState
            },
            {
                name: 'Friday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            },
            {
                name: 'Saturday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            },
            {
                name: 'Sunday',
                launchOpen: true,
                dinnerOpen: true,
                launch: initialLaunchState,
                dinner: initialDinnerState
            }
        ]
    )

    const updateDay = day => {
        console.log(day)

        setTimetable(timetable.map(d => {
            return d.name === day.name ? day : d
        }))
    }

    return (
        <Container maxWidth='md'>
            {
                timetable.map(day => {
                    return (
                        <TimeTableItem key={day.name} day={day} onDayChanged={updateDay} />
                    )
                })
            }
        </Container>
    )
}

export default TimeTablePage