import React from 'react';
import { VscHome } from "react-icons/vsc";
import { CgSearch } from "react-icons/cg";
import { SlLocationPin } from "react-icons/sl";
import './FooterBar.css';

interface FooterBarProps {
  onHomeClick: () => void;

}

const FooterBar: React.FC<FooterBarProps> = ({ onHomeClick }) => {


  return (
    <footer className='footer-bar'>
      <VscHome className='icon' onClick={onHomeClick} />
      <CgSearch className='icon' />
      <SlLocationPin className='icon' />
    </footer>
  );
};

export default FooterBar;
