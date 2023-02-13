import './sidebar.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAnimation, selectDisplayAnimation } from '../../features/settings/settingsSlice';

export default function Sidebar() {
  const displayAnimation = useSelector(selectDisplayAnimation);
  const dispatch = useDispatch();

  const handleOutsideClick = e => {
    if (e.target.id !== 'sidebar' && e.target.className !== 'sidebar_toggler' &&
        e.target.className !== 'switch') {
      const sidebar = document.querySelector('#sidebar');
      sidebar.classList.remove('show');
    }
  };

  const handleGenerationAnimationClick = () => {
    dispatch(toggleAnimation());
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
        window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <aside id="sidebar">
      <div class="sidebar_content sidebar_body">
        <ul>
          <li>
            <input id="displayAnimation" type="checkbox" class="switch" checked={displayAnimation} onClick={handleGenerationAnimationClick}/>
            <label for="displayAnimation">Display Animation</label>
          </li>
        </ul>
      </div>
    </aside>
  );
}