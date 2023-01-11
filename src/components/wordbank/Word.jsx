import { setWord, selectWordbank } from '../../features/wordbank/wordbankSlice';
import { placeWord } from '../../features/grid/gridSlice';
import { useDispatch, useSelector } from "react-redux";

export default function Word(props) {
  const dispatch = useDispatch();
  const id = props.id;
  const word = useSelector(selectWordbank)[id];

  const handleChange = ({target}) => {
    console.log('Dispatching...');
    dispatch(setWord({
      word: target.value,
      id: id
    }));
  }

  const handleOnClick = () => {
    console.log('Placing word...');
    dispatch(placeWord(word));
  }

  return (
    <div className='word'>
      <input placeholder="Enter Word..." onChange={handleChange}/>
      <button onClick={handleOnClick} >
        Add Word
      </button>
    </div>
  );
}