'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#6A1E55] text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
           &copy; {new Date().getFullYear()} Jasmine Sheikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
