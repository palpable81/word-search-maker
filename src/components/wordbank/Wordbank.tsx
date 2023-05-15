import './wordbank.css';
import { useAppSelector } from '../../app/hooks';
import { Word, selectWordbank } from '../../features/wordbank/wordbankSlice';
import WordBox from './WordBox';

export default function Wordbank() {
  const wordbank = useAppSelector(selectWordbank);

  return (
    <div className='wordbank'>
      {wordbank.map((wordEntry: Word) => <WordBox wordEntry={wordEntry} key={wordEntry.id} />)}
    </div>
  );
}