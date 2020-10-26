import React, {useState} from 'react';
import produce from 'immer';

// Buttons
import StartBtn from './buttons/startBtn.js';
import RandomBtn from './buttons/randomBtn.js';
import { generateEmptyGrid } from './buttons/clearBtn.js';


const Grid = () => {
    const [grid, setGrid] = useState(() => {        
        return generateEmptyGrid()
    })

    const [generation, setGeneration] = useState(0)

    return(
        <>  
            <StartBtn 
            setGrid={setGrid}
            setGeneration={setGeneration} />
            <RandomBtn 
            setGrid={setGrid} />
            <button
            className='btn clearBtn'
            onClick={() => {
                setGrid(generateEmptyGrid())
                setGeneration(0)
            }}>Clear</button>
            <div className='gridContainer'>
                {grid.map((rows, i) => 
                    rows.map((col, j) => 
                        <div
                        className='gridBoxes'
                        key={`${i}–${j}`}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = grid[i][j] ? 0 : 1;
                            })
                            setGrid(newGrid)
                        }} 
                        style={{
                            backgroundColor: grid[i][j] ? 'blue' : undefined,
                        }}/>
                    ))}
            </div>
            <h3>Generation: {generation}</h3>
        </>
    )
};

export default Grid;