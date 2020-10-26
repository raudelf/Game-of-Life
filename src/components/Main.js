import React, {useState} from 'react';
import Grid from './Grid.js';

const Main = () => {
  const [theme, setTheme] = useState(false)

  const handleTheme = () => {
    setTheme(!theme)
  }
  
    return (
      <div className='mainContainer' style={{backgroundColor: !theme ? '#0396A6' : '#F01B31'}}>
        <h1>The Game of Life</h1>
        <section>
          <button className='btn' onClick={handleTheme}>Toggle Theme</button>
        </section>
        <Grid 
        theme={theme}/>
        <section className='textContainer'>
          <h3>Rules of the Game</h3>
          <p>In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.</p>
          <ol>
            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
          </ol>
          <p>From those four rules, many types of "creatures" can be created that move around the "landscape".</p>
        </section>
      </div>
    )
  };

export default Main;