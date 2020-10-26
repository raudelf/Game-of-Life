import React, {useState, useRef} from 'react';
import produce, { setAutoFreeze } from 'immer';

// Buttons
import StartBtn from './buttons/startBtn.js';
import RandomBtn from './buttons/randomBtn.js';
import { generateEmptyGrid } from './buttons/clearBtn.js';


const Grid = (props) => {
    
    const [gridSize, setGridSize] = useState({
        numRows: 50,
        numCols: 50
    })
    
    const [grid, setGrid] = useState(() => {        
        return generateEmptyGrid(gridSize.numRows, gridSize.numCols)
    })
    const [generation, setGeneration] = useState(0)

    const sizeRef = useRef(gridSize)
    sizeRef.current = gridSize

    return(
        <div className='contentContainer'>  
            <h3>Current Grid Dimensions: {sizeRef.current.numRows}x{sizeRef.current.numCols}</h3>

            <section className='btnContainer'>
                <StartBtn
                gridSize={gridSize}
                setGrid={setGrid}
                setGeneration={setGeneration} />

                <RandomBtn 
                setGrid={setGrid}
                gridSize={gridSize} />

                <button
                className='btn clearBtn'
                onClick={() => {
                    setGrid(generateEmptyGrid(sizeRef.current.numRows, sizeRef.current.numCols))
                    setGeneration(0)
                }}>Clear</button>

                <p>Grid Size: </p>
                <button className='btn' onClick={() => {
                    sizeRef.current.numRows = 25
                    sizeRef.current.numCols = 25
                    setGrid(generateEmptyGrid(sizeRef.current.numRows, sizeRef.current.numCols))
                }}>25x25</button>

                <button className='btn' onClick={() => {
                    sizeRef.current.numRows = 50
                    sizeRef.current.numCols = 50
                    setGrid(generateEmptyGrid(sizeRef.current.numRows, sizeRef.current.numCols))
                }}>50x50</button>

                <button className='btn' onClick={() => {
                    sizeRef.current.numRows = 75
                    sizeRef.current.numCols = 75
                    setGrid(generateEmptyGrid(sizeRef.current.numRows, sizeRef.current.numCols))
                }}>75x75</button>
            </section>


            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${sizeRef.current.numCols}, 20px)`,
                margin: '1% auto'
            }}>
                {grid.map((rows, i) => 
                    rows.map((col, j) => 
                        <div
                        key={`${i}–${j}`}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][j] ? (!props.theme ? '#73DEE4' : `#F04A58`) : '#FEF8FA',
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
        </div>
    )
};

export default Grid;