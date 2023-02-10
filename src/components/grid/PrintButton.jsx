import { useSelector } from 'react-redux';
import { selectFinished } from '../../features/grid/gridSlice';

export default function PrintButton() {
  const finished = useSelector(selectFinished);

  const handleOnClick = () => {
    window.print();
  };

  return (
    <div>
      <button className={finished ? 'button' : 'button hidden'} onClick={handleOnClick}>
        PRINT THIS!
      </button>
    </div>
  );
}