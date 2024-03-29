// components/MiniButton.tsx
import React from 'react';

const MiniButton = ({ size = 'text-lg', fullWidth = false, ...props }) => {
  const buttonClasses = `
    ${size}
    ${fullWidth ? 'w-full' : ''}
    text-lime-800
    bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500
    hover:bg-gradient-to-br
    focus:ring-4
    focus:outline-none
    focus:ring-lime-300
    dark:focus:ring-lime-800
    shadow-lg
    shadow-lime-500/50
    dark:shadow-lg
    dark:shadow-lime-800/80
    rounded-lg
    px-5
    py-0.5
    text-center
    me-2
    mb-2
  `;

  return (
    <button className={buttonClasses} {...props} />
  );
};

export default MiniButton;
