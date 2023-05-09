import './grid.css';

export default function GridRow(props: any) {
  const gridRow = props.gridRow;

  return (
    <div className='grid-row'>
        {gridRow.map((char: any, i: any) => (
          <div className='grid-box' key={i}>
            <div className={char ? 'grid-letter filled' : 'grid-letter empty'} key={i}>
              {char || ''}
            </div>
          </div>
        ))}
    </div>
  );
}