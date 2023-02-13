import './sidebar.css';
import { useEffect } from 'react';

export default function Sidebar() {

  const handleOutsideClick = e => {
    const sidebar = document.querySelector('#sidebar');
    if (e.target.id !== 'sidebar' && e.target.className !== 'sidebar_toggler') {
      sidebar.classList.remove('show');
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
        window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <aside id="sidebar">
      <div className="sidebar_content sidebar_head">
          <h1>Sidebar</h1>
      </div>

      <div className="sidebar_content sidebar_body">
          <nav className="side_navlinks">
              <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
          </nav>
      </div>

      <div className="sidebar_content sidebar_foot">
          <p>
              &#169;
              <script>
                  document.write(new Date().getFullYear());
              </script>
              &#160;JavaScript Sidebar.
          </p>
      </div>
    </aside>
  );
}