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

  const handleBackwardsChange = (e: any) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setBackwards(newValue));
  }
  
  const handleDiagonalChange = (e: any) => {
    let newValue = false;
    if(e.target.value === "true") {
      newValue = true;
    }
    dispatch(setDiagonal(newValue));
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.id !== 'sidebar' && 
          e.target.className !== 'sidebar_toggler' &&
          e.target.className !== 'switch' &&
          e.target.className !== 'radio') {
        const sidebar = document.querySelector('#sidebar');
        if(sidebar) {
          sidebar.classList.remove('show');
        }
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
          Place Words Diagonally?
        </div>
        <div>
          <input id="diagonalTrue" type="radio" className="radio" name="diagonal" value="true" checked={diagonal} onChange={handleDiagonalChange}/>
        </div>
        <div className="label">
          <label htmlFor="diagonalTrue">Yes</label>
        </div>
        <div>
          <input id="diagonalFalse" type="radio" className="radio" name="diagonal" value="false" checked={!diagonal} onChange={handleDiagonalChange}/>
        </div>
        <div className="label">
          <label htmlFor="diagonalFalse">No</label>
        </div>
        <div className="heading">
          Place Words Backwards?
        </div>
        <div>
          <input id="backwardsTrue" type="radio" className="radio" name="backwards" value="true" checked={backwards} onChange={handleBackwardsChange}/>
        </div>
        <div className="label">
          <label htmlFor="backwardsTrue">Yes</label>
        </div>
        <div>
          <input id="backwardsFalse" type="radio" className="radio" name="backwards" value="false" checked={!backwards} onChange={handleBackwardsChange}/>
        </div>
        <div className="label">
          <label htmlFor="backwardsFalse">No</label>
        </div>
        
      </div>
    </aside>
  );
}