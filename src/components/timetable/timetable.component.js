import React from "react"
import TimeTableItem from "./timetable-item.component"
import { Container, Grid } from "@material-ui/core"


const timetable = [
    {
        day: 'Monday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Tuesday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Wednesday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Thursday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Friday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Saturday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    },
    {
        day: 'Sunday',
        launchTimeStart: {
            hours: 11,
            minutes: '30'
        },
        launchTimeEnd: {
            hours: 14,
            minutes: '00'
        },
        dinnerTimeStart: {
            hours: 18,
            minutes: '30'
        },
        dinnerTimeEnd: {
            hours: 23,
            minutes: '00'
        }
    }
]

const TimeTablePage = () => {
    return (

        <Container maxWidth='md'>
        {
            timetable.map(day => {
                return (
                    <TimeTableItem day={day}/>
                )
            })
        }
        </Container>
    )
}

export default TimeTablePage