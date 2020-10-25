import React, {useState , useCallback, useRef} from 'react';

const StartBtn = (props) => {
    const [run, setRun] = useState(false)

    const handleStart = e => {
        e.preventDefault();
        setRun(!run)
    }

    const runRef = useRef(run);
    runRef.current = run;

    const handleRun = useCallback(() => {
        if (!runRef.current) {
            return;
        }

        for (let i = 0; i < props.numRows; i++) {
            for (let k = 0; k < props.numCols; k++) {

            }
        }
        setTimeout(handleRun, 1000);
    }, []);

    return (
        <button 
            className='btn startBtn'
            onClick={handleStart}>{run ? 'Stop' : 'Start'}
        </button>
    )
}

export default StartBtn;