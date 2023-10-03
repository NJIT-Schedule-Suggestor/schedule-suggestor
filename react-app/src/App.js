import './App.css';
import { BoxContainer } from './components/BoxContainer';
import { SideNav } from './components/SideNav';

function App() {
  return (
    <div className="App">
        <div name="top-bar-div">
          <hr className='top-bar'></hr>
        </div>
        <SideNav />
        <BoxContainer/>
    </div>
  );
}

export default App;
