import logo from './logo.svg';
import './App.css';
import Allroutes from './router/Allroutes';
import Navbar from './Component/Navbar';

function App() {
  return (
    <div className="App overflow-x-hidden">
      {/* <h1 className=''>React App</h1> */}
      <Navbar/>
      <Allroutes/>
    </div>
  );
}

export default App;
