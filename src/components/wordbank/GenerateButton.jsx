import { useSelector, useDispatch } from 'react-redux';
import { setWordStatus, selectWordbank } from '../../features/wordbank/wordbankSlice';
import { placeWord, fillRemainingSquares, clearGrid, setIsGenerating,
         selectFinished, selectIsGenerating } from '../../features/grid/gridSlice';
import { selectDisplayAnimation } from '../../features/settings/settingsSlice';

export default function GenerateButton() {
  const wordbank = useSelector(selectWordbank);
  const finished = useSelector(selectFinished);
  const isGenerating = useSelector(selectIsGenerating);
  const displayAnimation = useSelector(selectDisplayAnimation);
  const dispatch = useDispatch();

  let wordDelay = displayAnimation ? 300 : 0;
  let fillDelay = displayAnimation ? 600 : 0;

  const handleOnClick = () => {
    const enteredWords = wordbank.filter(wordEntry => wordEntry.word);

    if(!isGenerating && enteredWords.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      dispatch(setIsGenerating(true));
      dispatch(clearGrid());

      const sortedWords = enteredWords.map((wordEntry, i) => {
          return {
            id: i,
            word: wordEntry.word
          }
        }).sort((a, b) => {
          return b.word.length - a.word.length;
        });
  
      // Returns a Promise that resolves after "ms" Milliseconds
      const timer = ms => new Promise(res => setTimeout(res, ms))
  
      async function fillGrid () { // We need to wrap the loop into an async function for this to work
        for(let i=0; i < sortedWords.length; i++) {
          const wordEntry = sortedWords[i];
  
          await timer(wordDelay);
          const result = dispatch(placeWord(wordEntry.word.replace(/ /g,''))); //remove spaces when placing
          dispatch(setWordStatus({
            id: wordEntry.id,
            word: wordEntry.word,
            triedToPlace: true, 
            placedSuccessfully: result
          }));
  
          if(i === sortedWords.length - 1) {
            await timer(fillDelay);
            dispatch(fillRemainingSquares());
            dispatch(setIsGenerating(false));
          }
        };
      }
  
      fillGrid();
    }
  };

  return (
    <div className='generate-button-container'>
      <button id='generate-button' className='button' onClick={handleOnClick} disabled={isGenerating}>
        {finished ? 'GENERATE NEW SEARCH' : 'GENERATE WORD SEARCH'}
      </button>
    </div>
  );
}