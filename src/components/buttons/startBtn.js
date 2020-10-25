import React, {useState , useCallback, useRef} from 'react';
import produce from 'immer';

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
]
const StartBtn = (props) => {
    const [run, setRun] = useState(false)

    const handleStart = e => {
        e.preventDefault();
        setRun(!run);
        if (!run) {
            runRef.current = true;
            handleRun()
        }
    }

    const runRef = useRef(run);
    runRef.current = run;

    const handleRun = useCallback(() => {
        if (!runRef.current) {
            return;
        }

        props.setGrid(grid => {
            return produce(grid, gridCopy => {
                for (let i = 0; i < props.numRows; i++) {
                    for (let j = 0; j < props.numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;

                            if (newI >= 0 && newI < props.numRows && newJ >= 0 && newJ < props.numCols) {
                                neighbors += grid[newI][newJ]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (grid[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        })
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