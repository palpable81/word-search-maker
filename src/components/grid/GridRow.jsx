import './grid.css';

export default function GridRow(props) {
  const gridRow = props.gridRow;

  return (
    <div className='grid-row'>
      {gridRow.map((char, i) => <div className={char ? 'filled' : 'empty'} key={i}>{char || '•'}</div>)}
    </div>
  );
}