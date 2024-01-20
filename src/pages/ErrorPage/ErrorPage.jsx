import React, { useTransition } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import './ErrorPage.scss';

export default function ErrorPage() {
  const [startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      <Loader />
    });
  };

  return (
    <div className='error-page-container'>
      <nav>
        <div className="logo-container">
          <img src='/images/logo.png' className="logo-img" alt="Logo" />
          <h3 className="brand-text">dashboard</h3>
        </div>
        <Link to='/' onClick={handleClick} className='back-link'>
          back to home
        </Link>
      </nav>
      <div className="error-content">
        <h1 className='error-code'>404</h1>
        <h2 className='error-main-text'>page not found</h2>
        <span className='error-sub-text'>The URL may be misplaced or the pahe you are looking is no longer available.</span>
      </div>
    </div>
  );
}
