import './sidebar.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAnimation, setDiagonal, setBackwards, 
         selectDisplayAnimation, selectDiagonal, selectBackwards } from '../../features/settings/settingsSlice';

export default function Sidebar() {
  const displayAnimation = useSelector(selectDisplayAnimation);
  const diagonal = useSelector(selectDiagonal);
  const backwards = useSelector(selectBackwards);
  const dispatch = useDispatch();

  const handleGenerationAnimationChange = () => {
    dispatch(toggleAnimation());
  }

  const handleBackwardsChange = (e) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setBackwards(newValue));
  }
  
  const handleDiagonalChange = (e) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setDiagonal(newValue));
  }

  useEffect(() => {
    const handleOutsideClick = e => {
      if (e.target.id !== 'sidebar' && 
          e.target.className !== 'sidebar_toggler' &&
          e.target.className !== 'switch' &&
          e.target.className !== 'radio') {
        const sidebar = document.querySelector('#sidebar');
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
      <div className="sidebar_content sidebar_body">
        <ul>
          <li>
            <input id="displayAnimation" type="checkbox" className="switch" checked={displayAnimation} onChange={handleGenerationAnimationChange}/>
            <label htmlFor="displayAnimation">Display Animation When Generating Word Search</label>
          </li>
        </ul>
        <ul>
          <li>
            <input id="diagonalFalse" type="radio" className="radio" name="diagonal" value="false" checked={!diagonal} onChange={handleDiagonalChange}/>
            <label htmlFor="diagonalFalse">Diagonals Not Allowed</label>
          </li>
          <li>
            <input id="diagonalTrue" type="radio" className="radio" name="diagonal" value="true" checked={diagonal} onChange={handleDiagonalChange}/>
            <label htmlFor="diagonalTrue">Diagonals Allowed</label>
          </li>
        </ul>
        <ul>
          <li>
            <input id="backwardsFalse" type="radio" className="radio" name="backwards" value="false" checked={!backwards} onChange={handleBackwardsChange}/>
            <label htmlFor="backwardsFalse">Forwards Only</label>
          </li>
          <li>
            <input id="backwardsTrue" type="radio" className="radio" name="backwards" value="true" checked={backwards} onChange={handleBackwardsChange}/>
            <label htmlFor="backwardsTrue">Forwards and Backwards</label>
          </li>
        </ul>
      </div>
    </aside>
  );
}