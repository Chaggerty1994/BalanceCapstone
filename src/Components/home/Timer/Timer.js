import { Button } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export const Timer = () => {
    return (
     <div style={{ width: 250, height: 250 }}>
            <CircularProgressbar className="progressbar" value={100} text={`60%`} />;
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
        </div>
      
    )
}