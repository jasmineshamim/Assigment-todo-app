'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1C1C1C] to-[#7D3C98] text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm py-5">
           &copy; {new Date().getFullYear()} Jasmine Sheikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
