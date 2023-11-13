import React from "react";

function Photo({ photographer, src }) {
  return (
    <div className="pic">
      <a href={src}>
        <img src={src} alt="Photo" />
      </a>
      <h1 className="photo-info">
        Photo by <i>{photographer}</i>
      </h1>
    </div>
  );
}

export default Photo;
