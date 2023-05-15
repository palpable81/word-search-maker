import './grid.css';

interface GridRowProps {
  gridRow: (string | null)[],
  key: number 
}

export default function GridRow(props: GridRowProps) {
  const gridRow = props.gridRow;

  return (
    <div className='grid-row'>
        {gridRow.map((char: string | null, i: number) => (
          <div className='grid-box' key={i}>
            <div className={char ? 'grid-letter filled' : 'grid-letter empty'} key={i}>
              {char || ''}
            </div>
          </div>
        ))}
    </div>
  );
}