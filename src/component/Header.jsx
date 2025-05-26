import icon from '../assets/icon.png';
import '../app.css'
export default function Header() {
  return (
      <header className='header'>
          <img src={icon} alt="icon" className='icon' />
        <h1>Chef Claude</h1>
    </header>
  );
}