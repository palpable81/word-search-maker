import logo from './logo.svg';
import './App.css';
import Header from '../components/header/Header';
import Grid from '../components/grid/Grid';
import Wordbank from '../components/wordbank/Wordbank';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Wordbank/>
        <Grid/>
      </main>
    </div>
  );
}

export default App;
