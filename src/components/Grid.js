import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';

// Buttons
import StartBtn from './buttons/startBtn.js';
import {operations} from './buttons/clearBtn.js';
import RandomBtn from './buttons/randomBtn.js';
import { generateEmptyGrid } from './buttons/clearBtn.js';


const Grid = () => {
    
    const [gridSize, setGridSize] = useState({
        numRows: 50,
        numCols: 50
    })
    
    const [grid, setGrid] = useState(() => {        
        return generateEmptyGrid(gridSize.numRows, gridSize.numCols)
    })
    const [generation, setGeneration] = useState(0)

    // HERE
    const [run, setRun] = useState(false)

    const handleStart = () => {
        setRun(!run);
        if (!run) {
            runRef.current = true;
            handleRun()
        }
    }

    const sizeRef = useRef(gridSize)
    sizeRef.current = gridSize
    console.log(sizeRef, 'size')

    const runRef = useRef(run);
    runRef.current = run;

    const handleRun = useCallback(() => {
        if (!runRef.current) {
            return;
        }

        setGrid(grid => {
            return produce(grid, gridCopy => {
                for (let i = 0; i < sizeRef.current.numRows; i++) {
                    for (let j = 0; j < sizeRef.current.numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;

                            if (newI >= 0 && newI < sizeRef.current.numRows && newJ >= 0 && newJ < sizeRef.current.numCols) {
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

        setGeneration(gen => {
            return gen + 1
        })
        setTimeout(handleRun, 100);
    }, []);
    // END

    return(
        <>  
            <h3>Current Grid Dimensions: {gridSize.numRows}x{gridSize.numCols}</h3>
        
            <button onClick={handleStart}>{run ? 'Stop' : 'Start'}</button>

            <RandomBtn 
            setGrid={setGrid}
            gridSize={gridSize} />

            <button
            className='btn clearBtn'
            onClick={() => {
                setGrid(generateEmptyGrid(gridSize.numRows, gridSize.numCols))
                setGeneration(0)
            }}>Clear</button>

            <p>Grid Size: </p>
            <button onClick={() => {
                setGridSize({...gridSize, numRows: 25, numCols: 25})
                generateEmptyGrid(gridSize.numRows, gridSize.numCols)
            }}>25x25</button>

            <button onClick={() => {
                setGridSize({...gridSize, numRows: 50, numCols: 50})
                generateEmptyGrid(gridSize.numRows, gridSize.numCols)
            }}>50x50</button>

            <button onClick={() => {
                setGridSize({...gridSize, numRows: 75, numCols: 75})
                generateEmptyGrid(gridSize.numRows, gridSize.numCols)
            }}>75x75</button>


            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize.numCols}, 20px)`
            }}>
                {grid.map((rows, i) => 
                    rows.map((col, j) => 
                        <div
                        key={`${i}–${j}`}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][j] ? 'blue' : undefined,
                            border: 'solid 1px black'
                        }}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = grid[i][j] ? 0 : 1;
                            })
                            setGrid(newGrid)
                        }} 
                        />
                    ))}
            </div>
            <h3>Generation: {generation}</h3>
        </>
    )
};

export default Grid;