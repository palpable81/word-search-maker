import { setWord } from '../../features/wordbank/wordbankSlice';
import { ROWS } from '../../features/grid/gridSlice';
import { useAppDispatch } from "../../app/hooks";

export default function Word(props: any) {
  const dispatch = useAppDispatch();
  const id = props.id;
  const word = props.wordEntry.word;

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowDown") {
      const currId = ~~event.target.id[event.target.id.length - 1];
      if(currId < 9) {
        const nextId = currId+1;
        const nextElement = document.getElementById('word'+nextId);
        if(nextElement) {
          nextElement.focus();
        }
        event.preventDefault();
      }
    }
    else if (event.key === "ArrowUp") {
      const currId = ~~event.target.id[event.target.id.length - 1];
      if(currId > 0) {
        const prevId = currId-1;
        const prevElement = document.getElementById('word'+prevId);
        if(prevElement) {
          prevElement.focus();
        }
        event.preventDefault();
      }
    }
    else if (event.key === 'Enter') {
      const generateButton = document.getElementById('generate-button');
      if(generateButton) {
        generateButton.click();
      }
    }
  }

  const handleChange = ({target}: any) => {
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