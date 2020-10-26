import React, {useState , useCallback, useRef} from 'react';
import {operations, numRows, numCols} from './clearBtn.js';
import produce from 'immer';

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
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;

                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
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

        props.setGeneration(gen => {
            return gen + 1
        })
        setTimeout(handleRun, 100);
    }, []);

    return (
        <button 
            className='btn startBtn'
            onClick={handleStart}>{run ? 'Stop' : 'Start'}
        </button>
    )
}

export default StartBtn;