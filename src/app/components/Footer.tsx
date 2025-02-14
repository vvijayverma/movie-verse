import TMDB from '../../assets/images/TMDB.svg';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-[#0d2e38] text-white text-center h-full flex flex-col justify-between py-12">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 px-40 gap-8 items-start justify-center">
        <div>
          <img src={TMDB} alt='Movie-Verse' width={200} height={200} />
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-bold'>The Basics</h2>
          <Link to={'#'}>About TMDB</Link>
          <Link to={'#'}>Contact Us</Link>
          <Link to={'#'}>Support Forums</Link>
          <Link to={'#'}>API</Link>
          <Link to={'#'}>System Status</Link>
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-bold'>Get Involved</h2>
          <Link to={'#'}>Contribution Bible</Link>
          <Link to={'#'}>Add New Movie</Link>
          <Link to={'#'}>Add New TV Show</Link>
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-bold'>Community</h2>
          <Link to={'#'}>Guidelines</Link>
          <Link to={'#'}>Discussions</Link>
          <Link to={'#'}>Leaderboard</Link>
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-bold'>Legal</h2>
          <Link to={'#'}>Terms of Use</Link>
          <Link to={'#'}>API Terms of Use</Link>
          <Link to={'#'}>Privacy Policy</Link>
          <Link to={'#'}>DMCA Policy</Link>
        </div>
      </div>
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Movie-Verse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
