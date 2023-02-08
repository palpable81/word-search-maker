import { useSelector } from 'react-redux';
import { selectGrid, selectFinished } from '../../features/grid/gridSlice';

import GridRow from './GridRow';

export default function Grid() {
  const grid = useSelector(selectGrid);
  const finished = useSelector(selectFinished);

  const handleOnClick = () => {
    window.print();
  };

  return (
    <div>
      <div className='grid'>
        <div className='grid-outline'>
          {grid.map((gridRow, i) => <GridRow gridRow={gridRow} key={i}/>)}
        </div>
      </div>
      <button className={finished ? 'print-button' : 'print-button hidden'} onClick={handleOnClick}>
        PRINT THIS!
      </button>
    </div>
  );
}