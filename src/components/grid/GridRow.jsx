import './grid.css';

export default function GridRow(props) {
  const gridRow = props.gridRow;

  return (
    <div className='grid-row'>
      {gridRow.map((char, i) => <div key={i}>{char || 'X'}</div>)}
    </div>
  );
}