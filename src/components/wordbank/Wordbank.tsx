import './wordbank.css';
import { useSelector } from 'react-redux';
import { selectWordbank } from '../../features/wordbank/wordbankSlice';

import Word from './Word';

export default function Wordbank() {
  const wordbank = useSelector(selectWordbank);

  return (
    <div className='wordbank'>
      {wordbank.map((wordEntry: any, i: any) => <Word wordEntry={wordEntry} key={i} id={i}/>)}
    </div>
  );
}