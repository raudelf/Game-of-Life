import React, {useState} from 'react';
import produce from 'immer';

// Buttons
import StartBtn from './buttons/startBtn.js';

const numRows = 50;
const numCols = 50;

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        const rows = [];

        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        
        return rows
    })

    return(
        <>  
            <StartBtn />
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
        </>
    )
};

export default Grid;