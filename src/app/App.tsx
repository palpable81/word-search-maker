import './App.css';
import Header from '../components/header/Header';
import Wordbank from '../components/wordbank/Wordbank';
import GenerateButton from '../components/wordbank/GenerateButton';
import Grid from '../components/grid/Grid';
import PrintButton from '../components/grid/PrintButton';


function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Wordbank/>
        <GenerateButton/>
        <Grid/>
        <PrintButton/>
      </main>
    </div>
  );
}

export default App;
