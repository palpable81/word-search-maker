import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setWordStatus, selectWordbank } from '../../features/wordbank/wordbankSlice';
import { placeWord, fillRemainingSquares, clearGrid, setIsGenerating,
         selectFinished, selectIsGenerating } from '../../features/grid/gridSlice';
import { selectDisplayAnimation } from '../../features/settings/settingsSlice';

export default function GenerateButton() {
  const wordbank = useAppSelector(selectWordbank);
  const finished = useAppSelector(selectFinished);
  const isGenerating = useAppSelector(selectIsGenerating);
  const displayAnimation = useAppSelector(selectDisplayAnimation);
  const dispatch = useAppDispatch();

  let wordDelay = displayAnimation ? 300 : 0;
  let fillDelay = displayAnimation ? 600 : 0;

  const handleOnClick = () => {
    const enteredWords = wordbank.filter((wordEntry: any) => wordEntry.word);

    if(!isGenerating && enteredWords.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      dispatch(setIsGenerating(true));
      dispatch(clearGrid());

      const sortedWords = enteredWords.map((wordEntry: any, i: any) => {
          return {
            id: i,
            word: wordEntry.word
          }
        }).sort((a: any, b: any) => {
          return b.word.length - a.word.length;
        });
  
      // Returns a Promise that resolves after "ms" Milliseconds
      const timer = (ms: any) => new Promise(res => setTimeout(res, ms))
  
      const fillGrid = async () => { // We need to wrap the loop into an async function for this to work
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