import logo from './logo.svg';
import './App.css';
import Grid from '../components/grid/Grid';
import Wordbank from '../components/wordbank/Wordbank';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Grid/>
      <Wordbank/>
    </div>
  );
}

export default App;
