import React from 'react';

function Hashtags({ text }) {
  const coloredText = text.text
    .split(' ')
    .map((word) => {
      if (word.startsWith('#')) {
        return <span style={{ color: 'red' }}>{word}</span>; // change 'red' to your desired color
      }
      return word;
    })
    .join(' ');
  return <div className="caption">{coloredText}</div>;
}

export default Hashtags;
