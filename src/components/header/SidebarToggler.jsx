import './sidebar.css';
export default function SidebarToggler() {

  const sidebarToggler = document.querySelector('.sidebar_toggler');

  const handleOnClick = () => {
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.toggle('show');
  };

  return (
    <div className="sidebar_toggler" onClick={handleOnClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  );
}