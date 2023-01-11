import { useSelector } from 'react-redux';
import { selectGrid } from '../../features/grid/gridSlice';

import GridRow from './GridRow';

export default function Grid() {
  const grid = useSelector(selectGrid);

  return (
    <div className='grid'>
      {grid.map((gridRow, i) => <GridRow gridRow={gridRow} key={i}/>)}
    </div>
  );
}