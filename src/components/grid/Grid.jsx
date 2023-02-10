import { useSelector } from 'react-redux';
import { selectGrid } from '../../features/grid/gridSlice';

import GridRow from './GridRow';

export default function Grid() {
  const grid = useSelector(selectGrid);

  return (
    <div className='grid'>
      <div className='grid-outline'>
        {grid.map((gridRow, i) => <GridRow gridRow={gridRow} key={i}/>)}
      </div>
    </div>
  );
}