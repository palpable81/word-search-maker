import './wordbank.css';
import { useAppSelector } from '../../app/hooks';
import { selectWordbank } from '../../features/wordbank/wordbankSlice';
import WordBox from './WordBox';

export default function Wordbank() {
  const wordbank = useAppSelector(selectWordbank);

  return (
    <div className='wordbank'>
      {wordbank.map((wordEntry: any, i: any) => <WordBox wordEntry={wordEntry} key={i} id={i}/>)}
    </div>
  );
}