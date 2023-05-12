import { useAppSelector } from '../../app/hooks';
import { selectGrid } from '../../features/grid/gridSlice';

import GridRow from './GridRow';

export default function Grid() {
  const grid = useAppSelector(selectGrid);

  return (
    <div className='grid'>
      <div className='grid-outline'>
        {grid.map((gridRow: (string | null)[], i: number) => <GridRow gridRow={gridRow} key={i}/>)}
      </div>
    </div>
  );
}