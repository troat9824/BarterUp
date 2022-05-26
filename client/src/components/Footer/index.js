import React from 'react';


const Footer = () => {
    // change the return content to be whatever you want
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        &copy;{new Date().getFullYear()} by Lernantino
      </div>
    </footer>
  );
};

export default Footer;