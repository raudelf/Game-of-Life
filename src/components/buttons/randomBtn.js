import React from 'react';

const RandomBtn = (props) => {
    const handleRandomize = () => {
        const rows = [];

        for (let i = 0; i < props.gridSize.numRows; i++) {
            rows.push(Array.from(Array(props.gridSize.numCols), () => Math.random() > .8 ? 1 : 0))
        }
        
        props.setGrid(rows)
    }

    return (
        <button className='btn randomBtn' onClick={handleRandomize}>Randomize</button>
    )
}

export default RandomBtn;