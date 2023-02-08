import { setWord } from '../../features/wordbank/wordbankSlice';
import { ROWS, COLS } from '../../features/grid/gridSlice';
import { useDispatch } from "react-redux";

export default function Word(props) {
  const dispatch = useDispatch();
  const id = props.id;
  const word = props.wordEntry.word;

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      const currId = ~~event.target.id[event.target.id.length - 1];
      if(currId < 9) {
        const nextId = currId+1;
        const nextElement = document.getElementById('word'+nextId);
        nextElement.focus();
        event.preventDefault();
      }
    }
    else if (event.key === "ArrowUp") {
      const currId = ~~event.target.id[event.target.id.length - 1];
      if(currId > 0) {
        const prevId = currId-1;
        const prevElement = document.getElementById('word'+prevId);
        prevElement.focus();
        event.preventDefault();
      }
    }
    else if (event.key === 'Enter') {
      const generateButton = document.getElementById('generate-word-search');
      generateButton.click();
    }
  }

  const handleChange = ({target}) => {
    const allowedChars = target.value.replace(/[^a-zA-Z ]/gi, '').toUpperCase().trimStart();
    let newWord = "";
    let strLengthWithoutSpaces = 0;
    for(let i=0; i<allowedChars.length; i++) {
      newWord += allowedChars[i];
      if(allowedChars[i] !== ' ') {
        strLengthWithoutSpaces++;
      }
      if(strLengthWithoutSpaces >= ROWS) {
        break;
      }
    }

    dispatch(setWord({
      id: id,
      word: newWord,
    }));
  }

  return (
    <div className='word'>
      <input type="text" id={'word'+props.id} className={word ? 'word-input' : 'word-input empty'} value={word} placeholder="Enter Word..." onChange={handleChange} onKeyDown={handleKeyDown}/>
    </div>
  );
}