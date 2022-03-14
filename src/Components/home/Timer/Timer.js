import { Button, Select } from '@mui/material';
import { useEffect, useState, useContext, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "./Timer.css"
import { TimerContext } from './timerContext';


export const Timer = () => {
    // creating a state variable to hold all of the different timers from my API
    const [timers, setTimer] = useState([])

    // creating a state variable to store the id of the selected timer


    // declaring a variable to hold the context i set with useContext.
    // const timerContext = useContext(TimerContext)

    // creating a state variable
    const [isPaused, setIsPaused] = useState(true)

    // creating a state variable for the seconds left on the timer

    const [secondsLeft, setSecondsLeft] = useState(0)

    // creating a state variable for work mode and rest mode. 
    // there will be 3 modes. work, rest, and pause
    const [mode, setMode] = useState('rest')


    const secondsleftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)


    // defining a variable whos value is the useContext hook 
    // passing in 
    const { workMinutes,
        restMinutes,
        setWorkMinutes,
        setRestMinutes } = useContext(TimerContext)


    const switchMode = (nextMode) => {
        // const nextMode = modeRef.current === 'work' ? 'rest' : 'work';
        const nextSeconds = (nextMode === 'work' ? workMinutes : restMinutes) * 60
        setMode(nextMode);
        modeRef.current = nextMode
        setSecondsLeft(nextSeconds);
        secondsleftRef.current = nextSeconds
    }

    // defining a function that will make the clock countdown
    const tick = () => {
        secondsleftRef.current = secondsleftRef.current - 1;
        setSecondsLeft(secondsleftRef.current)
    }
    const startTimer = () => {

        setSecondsLeft(workMinutes * 60)
    }



    // using useEffect to invoke the start timer function. then check to see
    // if the timer is paused or if its time to switch to the next mode.
    // then invoke the tick function to tell the seconds to count down by 1.
    // directly after the tick function we are telling the timer how many
    // how many milliseconds to take for each second.
    useEffect(
        () => {


            startTimer();

            // defining a variable whos value is a function. the functions job is 
            //  a conditional that says if the timer is paused do nothing.
            // and if there are zero seconds left on the current timer then switch to 
            // the other timer. 
            const interval = setInterval(
                () => {
                    if (isPausedRef.current) {
                        return;
                    }
                    if (secondsleftRef.current === 0) {
                         const nextMode = modeRef.current === 'work' ? 'rest' : 'work';
                        return switchMode(nextMode)
                    }
                    // if (modeRef.current === 'work') {

                    // }

                    tick();
                }, 10)
            return () => { clearInterval(interval) }

        },
        [workMinutes, restMinutes]
    )

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


    const totalSeconds = mode === 'work' ?

        workMinutes * 60
        :
        restMinutes * 60;


    const percentage = Math.round(secondsLeft / totalSeconds * 100)


    const minutes = Math.floor(secondsLeft /  60);

  

    let seconds = secondsLeft % 60;

    if (seconds < 10) seconds = '0' + seconds




    return (
        <div style={{ width: 250, height: 250 }} className='timer'>
            <CircularProgressbar
                className="progressbar"
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    pathColor: `#3e98c7`,
                    textColor: '#f88',
                    trailColor: '#fd9333',
                   
                })}

            />
            <div className="timerButtons">

                <div>
                    <Button
                        className='A'
                        onClick={() => {
                            switchMode('work');
                        }}
                        // value={modeRef.current}
                    >
                        A
                    </Button>
                </div>


                {isPaused ?
                    <div>
                        <Button className='play' onClick={() => { setIsPaused(false); isPausedRef.current = false }} >
                            Play
                        </Button>
                    </div>
                    :
                    <div>
                        <Button className='pause' onClick={() => { setIsPaused(true); isPausedRef.current = true }}>
                            Pause
                        </Button>
                    </div>}


                <div>
                    <Button
                        className='B'
                        onClick={(e) => {
                            switchMode('rest'); 
                        }}
                        // value={modeRef.current}
                    >
                        B
                    </Button>
                </div>

            </div>
            <div className='timerdropdown'>
                <select

                    onChange={
                        (evt) => {


                            const matchTimer = timers.find(time => time.id === parseInt(evt.target.value))
                            setWorkMinutes(matchTimer.aLength)
                            setRestMinutes(matchTimer.bLength)
                           



                        }
                    }

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

