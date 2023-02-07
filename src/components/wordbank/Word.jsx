import { setWord } from '../../features/wordbank/wordbankSlice';
import { ROWS, COLS } from '../../features/grid/gridSlice';
import { useDispatch } from "react-redux";

export default function Word(props) {
  const dispatch = useDispatch();
  const id = props.id;
  const word = props.wordEntry.word;

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
      <input type="text" value={word} placeholder="Enter Word..." onChange={handleChange} />
    </div>
  );
}