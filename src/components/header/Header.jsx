import './header.css';

export default function Header() {

  return (
    <header>
      <div className='title'>
        Word Search Maker
      </div>
      <div className='instructions'>
        Enter the words you want in the boxes below and click Generate Word Search.
      </div>
    </header>
  );
}