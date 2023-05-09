import './header.css';
import Sidebar from './Sidebar';
import SidebarToggler from './SidebarToggler';

export default function Header() {

  return (
    <header>
      <Sidebar/>
      <SidebarToggler/>
      <div className='title'>
        Word Search Maker
      </div>
      <div className='instructions'>
        Enter the words you want in the boxes below and click Generate Word Search.
      </div>
    </header>
  );
}