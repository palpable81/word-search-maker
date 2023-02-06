import './wordbank.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWordStatus, selectWordbank } from '../../features/wordbank/wordbankSlice';
import { placeWord, fillRemainingSquares, clearGrid } from '../../features/grid/gridSlice';

import Word from './Word';

export default function Wordbank() {
  const wordbank = useSelector(selectWordbank);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const sortedWords = wordbank.filter(wordEntry => wordEntry.word
    ).map((wordEntry, i) => {
      return {
        id: i,
        word: wordEntry.word
      }
    }).sort((a, b) => {
      return b.word.length - a.word.length;
    });
    
    dispatch(clearGrid());

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function fillGrid () { // We need to wrap the loop into an async function for this to work
      for(let i=0; i < sortedWords.length; i++) {
        const wordEntry = sortedWords[i];

        await timer(300);
        const result = dispatch(placeWord(wordEntry.word.replace(/ /g,'')));
        dispatch(setWordStatus({
          id: wordEntry.id,
          word: wordEntry.word,
          triedToPlace: true, 
          placedSuccessfully: result
        }));

        if(i === sortedWords.length - 1) {
          await timer(600);
          dispatch(fillRemainingSquares());
        }
      };
    }

    fillGrid();
  };

  return (
    <div className='wordbank'>
      {wordbank.map((wordEntry, i) => <Word wordEntry={wordEntry} key={i} id={i}/>)}
      <button className='generate-button' onClick={handleOnClick} >
        GENERATE WORD SEARCH
      </button>
    </div>
);
}