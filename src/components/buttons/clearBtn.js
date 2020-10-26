export const numCols = 50;
export const numRows = 50;

export const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
]

export const generateEmptyGrid = props => {
    const rows = [];

        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        
        return rows
}
