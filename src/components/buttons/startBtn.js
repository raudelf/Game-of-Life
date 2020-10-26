import React, {useState , useCallback, useRef, useEffect} from 'react';
import {operations} from './clearBtn.js';
import produce from 'immer';

const StartBtn = (props) => {
    const [run, setRun] = useState(false)

    const handleStart = () => {
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
        let gridDim = props.gridSize
        console.log(gridDim.numRows, 'NUMROWS')
        props.setGrid(grid => {
            return produce(grid, gridCopy => {
                for (let i = 0; i < gridDim.numRows; i++) {
                    for (let j = 0; j < gridDim.numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;

                            if (newI >= 0 && newI < gridDim.numRows && newJ >= 0 && newJ < gridDim.numCols) {
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