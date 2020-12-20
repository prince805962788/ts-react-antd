import React from 'react';
import './styles/index.scss';
import Button, { ButtonType,ButtonSize} from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={()=>{console.log('this is button')}}>Prince</Button>
        <Button disabled size={ButtonSize.Small}>PrinceLee</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href='www.baidu.com' target="_blank">Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
