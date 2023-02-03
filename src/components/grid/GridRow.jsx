import './grid.css';

export default function GridRow(props) {
  const gridRow = props.gridRow;

  return (
    <div className='grid-row'>
        {gridRow.map((char, i) => (
          <div className='grid-box'>
            <div className={char ? 'grid-letter filled' : 'grid-letter empty'} key={i}>
              {char || ''}
            </div>
          </div>
        ))}
    </div>
  );
}