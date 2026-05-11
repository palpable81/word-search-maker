import './sidebar.css';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleAnimation, setDiagonal, setBackwards, setGridSize,
         selectDisplayAnimation, selectAllowDiagonal, selectAllowBackwards, selectGridSize } from '../../features/settings/settingsSlice';
import { clearGrid } from '../../features/grid/gridSlice';
import { truncateWords } from '../../features/wordbank/wordbankSlice';

export default function Sidebar() {
  const displayAnimation = useAppSelector(selectDisplayAnimation);
  const allowDiagonal = useAppSelector(selectAllowDiagonal);
  const allowBackwards = useAppSelector(selectAllowBackwards);
  const gridSize = useAppSelector(selectGridSize);
  const dispatch = useAppDispatch();

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value, 10);
    dispatch(setGridSize(size));
    dispatch(truncateWords(size));
    dispatch(clearGrid(size));
  }

  const handleGenerationAnimationChange = () => {
    dispatch(toggleAnimation());
  }

  const handleBackwardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setBackwards(newValue));
  }
  
  const handleDiagonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setDiagonal(newValue));
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.className === 'sidebar_toggler') return;
      const sidebar = document.querySelector('#sidebar');
      if (sidebar && !sidebar.contains(e.target)) {
        sidebar.classList.remove('show');
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
        window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <aside id="sidebar">
      <div className="sidebar_content">
        <div>
          <input id="displayAnimation" type="checkbox" className="switch" checked={displayAnimation} onChange={handleGenerationAnimationChange}/>
        </div>
        <div className="label">
          <label htmlFor="displayAnimation">Display Animation When Generating Word Search</label>
        </div>
        <div className="heading">
          Grid Size
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <select value={gridSize} onChange={handleGridSizeChange} className="select">
            {[8, 9, 10, 11, 12].map(n => (
              <option key={n} value={n}>{n}×{n}</option>
            ))}
          </select>
        </div>
        <div className="heading">
          Place Words Diagonally?
        </div>
        <div>
          <input id="diagonalTrue" type="radio" className="radio" name="diagonal" value="true" checked={allowDiagonal} onChange={handleDiagonalChange}/>
        </div>
        <div className="label">
          <label htmlFor="diagonalTrue">Yes</label>
        </div>
        <div>
          <input id="diagonalFalse" type="radio" className="radio" name="diagonal" value="false" checked={!allowDiagonal} onChange={handleDiagonalChange}/>
        </div>
        <div className="label">
          <label htmlFor="diagonalFalse">No</label>
        </div>
        <div className="heading">
          Place Words Backwards?
        </div>
        <div>
          <input id="backwardsTrue" type="radio" className="radio" name="backwards" value="true" checked={allowBackwards} onChange={handleBackwardsChange}/>
        </div>
        <div className="label">
          <label htmlFor="backwardsTrue">Yes</label>
        </div>
        <div>
          <input id="backwardsFalse" type="radio" className="radio" name="backwards" value="false" checked={!allowBackwards} onChange={handleBackwardsChange}/>
        </div>
        <div className="label">
          <label htmlFor="backwardsFalse">No</label>
        </div>
        
      </div>
    </aside>
  );
}