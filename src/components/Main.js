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
          <button onClick={handleTheme}>Toggle Theme</button>
        </section>
        <Grid 
        theme={theme}/>
      </div>
    )
  };

export default Main;