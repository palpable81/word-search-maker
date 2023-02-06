import { useSelector } from 'react-redux';
import { selectGrid } from '../../features/grid/gridSlice';

import GridRow from './GridRow';

export default function Grid() {
  const grid = useSelector(selectGrid);

  const handleOnClick = () => {
    
  };

  return (
    <div>
      <div className='grid'>
        <div className='grid-outline'>
          {grid.map((gridRow, i) => <GridRow gridRow={gridRow} key={i}/>)}
        </div>
      </div>
      <button className='print-button' onClick={handleOnClick} >
        PRINT
      </button>
    </div>
  );
}