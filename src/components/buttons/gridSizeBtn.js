import React from 'react';
import {numRows, numCols} from './clearBtn.js';

const SizeBtn = () => {
    return(
        <select>
            <option>25x25</option>
            <option selected>50x50</option>
        </select>
    )
}

export default SizeBtn;