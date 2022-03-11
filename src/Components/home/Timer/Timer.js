import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "./Timer.css"

export const Timer = () => {
// creating a state variable to hold all of the different timers from my API
    const [timers, setTimer] = useState([])
// creating a state variable for work minutes. its initial state will be 20
    const [workMinutes, setWorkMinutes] = useState(20)
// creating a state variable for rest minutes. its initial value will be 5
    const [restMinutes, setRestMinutes] = useState(5)
// creating a state variable for work mode and rest mode. 
// there will be 3 modes. work, rest, and pause
    const [mode, setMode] = useState('work')



    // creating a state variable
    // const [isPaused, setIsPaused] = useState(true);

    useEffect(
        () => {
            fetch("http://localhost:8088/timers")
                .then(res => res.json())
                .then((timerArray) => {
                    setTimer(timerArray)
                })
        },
        []
    )


    return (
        <div style={{ width: 250, height: 250 }} className='timer'>
            <CircularProgressbar className="progressbar" value={50} text={`50%`} />
            <div className="timerButtons">
                <div>
                    <Button className='A'>
                        A
                    </Button>
                </div>
                <div>
                    <Button className='play-pause'>
                        Play/Pause
                    </Button>
                </div>
                <div>
                    <Button className='B'>
                        B
                    </Button>
                </div>
            </div>
            <div className='timerdropdown'>
                <select

                    // onChange={
                    //     (evt) => {
                    //         const copy = { ...task }
                    //         copy.timerId = evt.target.value
                    //         newTask(copy)
                    //     }
                    // }


                    required autoFocus
                    type="select"
                    className="form-control"
                    placeholder="timer"
                >
                    <option value="0" key={`location--`}>Pick a Timer</option>
                    {
                        timers.map(
                            (timerObject) => {
                                return <option value={timerObject.id} key={`timer--${timerObject.id}`}>{timerObject.aLength} : {timerObject.bLength}</option>
                            }

                        )
                    }
                </select>
            </div>
        </div>

    )
}