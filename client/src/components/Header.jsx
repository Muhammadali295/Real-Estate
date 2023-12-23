import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='box-decoration-slice bg-gradient-to-r from-indigo-600 to-red-500 px-2'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-white'>Profit</span>
            <span className='box-decoration-slice bg-gradient-to-r from-indigo-600 to-red-500 text-black'>Builders</span>
          </h1>
        </Link>
        <form className='bg-red-100 p-3 rounded-lg flex items-center'>
          <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-red-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-white font-mono'>Home</li>
          </Link>
          <Link to='/about'>
          <li className='hidden sm:inline text-white font-mono'>About</li>
          </Link>
          <Link to='/sign-in'>
          <li className=' text-white font-mono'>Signin</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
