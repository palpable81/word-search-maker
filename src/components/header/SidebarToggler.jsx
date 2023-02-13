import './sidebar.css';
export default function SidebarToggler() {

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