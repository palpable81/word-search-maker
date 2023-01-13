import { setWord } from '../../features/wordbank/wordbankSlice';
import { useDispatch } from "react-redux";

export default function Word(props) {
  const dispatch = useDispatch();
  const id = props.id;
  const word = props.wordEntry.word;

  const handleChange = ({target}) => {
    const allowedChars = target.value.replace(/[^a-zA-Z ]/gi, '').toUpperCase().trimStart();

    dispatch(setWord({
      id: id,
      word: allowedChars,
    }));
  }

  return (
    <div className='word'>
      <input type="text" value={word} placeholder="Enter Word..." onChange={handleChange} />
    </div>
  );
}