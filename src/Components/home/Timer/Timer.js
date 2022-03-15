import { Button, Select } from '@mui/material';
import { useEffect, useState, useContext, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "./Timer.css"
import { TimerContext } from './timerContext';


export const Timer = () => {
    // creating a state variable to hold all of the different timers from my API
    const [timers, setTimer] = useState([])

    // creating a state variable for if the timer is paused or not
    // the initial value with be true so that the timer waits
    // for you to tell it to start
    const [isPaused, setIsPaused] = useState(true)

    // creating a state variable for the seconds left on the timer

    const [secondsLeft, setSecondsLeft] = useState(0)

    // creating a state variable for work mode and rest mode. 
    // there will be 3 modes. work, rest, and pause
    const [mode, setMode] = useState('rest')
    
    // defining the work and rest variables and setter functions
    // with useContext to be accessed in the timer module.
    const { workMinutes,
        restMinutes,
        setWorkMinutes,
        setRestMinutes } = useContext(TimerContext)
        

    // you cannot access state variables inside an interval.
    // you have to use referances.
    
        const secondsleftRef = useRef(secondsLeft)
        const isPausedRef = useRef(isPaused)
        const modeRef = useRef(mode)
        

        // defining a function that takes nextMode as an argument. 
        const switchMode = (nextMode) => {
            // the function names a variable whos value is a conditional.
            //  if nextMode is work mode then workMinutes. if it is rest then restMinutes, witchever it is times it by 60
            const nextSeconds = (nextMode === 'work' ? workMinutes : restMinutes) * 60
            // then invoke the setMode function that is excepting nextMode as an argument
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

    // this function is to start the timer.
    // it sets the secondsLeft state variable to the work minutes * 60
    const startTimer = () => {
        // work minutes times 60 gives you the amount of seconds
        setSecondsLeft(workMinutes * 60)
    }
 
  
    useEffect(
        () => {

            // first invoking the start timer function
            startTimer();

            // defining a variable whos value is the setInterval function. 
            // setInterval is a method that calls a function or runs some code after specific intervals of time, as specified through the second parameter.
            const interval = setInterval(
                () => {
                    //  a conditional that says if the timer is paused do nothing.
                    if (isPausedRef.current) {
                        return;
                    }
                    // and if there are zero seconds left on the current timer then switch to the other timer. 
                    if (secondsleftRef.current === 0) {
                        // declaring the variable next mode. its value is a conditional. the conditional is, is the mode work?
                        // if so then the next mode is rest.
                        // if the mode is rest then the next mode is work
                         const nextMode = modeRef.current === 'work' ? 'rest' : 'work';
                        //  if the secondsLeft currently is 0 then invoke
                        // switchMode with next mode passed as an argument
                        return switchMode(nextMode)
                    }
                    // if its not either of those invoking the tick function to tell the timer
                    // what incriment to count down in
                    tick();
                    // this is the functions second perameter. 
                    // it tells the setInterval function how often to run 
                    // it counts in milliseconds
                }, 10) 
                
                // returning a function invoking the clearInterval function
                // it accepts the interval variable as a an argument.
                // this will stop the interval from running if it is paused
                // because of the isPaused conditional we put inside of interval.
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
                            Start
                        </Button>
                    </div>
                    :
                    <div>
                        <Button className='pause' onClick={() => { setIsPaused(true); isPausedRef.current = true }}>
                            Stop
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

