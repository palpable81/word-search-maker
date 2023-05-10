import { useAppSelector } from '../../app/hooks';
import { selectFinished } from '../../features/grid/gridSlice';

export default function PrintButton() {
  const finished = useAppSelector(selectFinished);

  const handleOnClick = () => {
    window.print();
  };

  return (
    <div>
      <button className='button' disabled={!finished} onClick={handleOnClick}>
        PRINT THIS!
      </button>
    </div>
  );
}