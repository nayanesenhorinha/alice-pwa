import React, { useState } from "react";

const Navigation = ({ onNext, goToSummary, goToCover, onPrev }) => {
  

  return (

    
    <div className="navigation">
      
      
        {goToSummary && (<button onClick={goToSummary}>
          <img
            src="https://raw.githubusercontent.com/nayanesenhorinha/servidor_estaticos/refs/heads/main/alice/fi-rr-menu-burger.png"
            alt="Cover"
            className="nav-icon"
            loading="lazy"
          />
        </button>)}

     

      {onPrev && (
        <button onClick={onPrev}>
          <img
            src="https://raw.githubusercontent.com/nayanesenhorinha/servidor_estaticos/refs/heads/main/alice/fi-rr-angle-small-left.png"
            alt="Cover"
            className="nav-icon"
            loading="lazy"
          />
        </button>
      )}

      {onNext && (
        <button onClick={onNext}>
          <img
            src="https://raw.githubusercontent.com/nayanesenhorinha/servidor_estaticos/refs/heads/main/alice/fi-rr-angle-small-right.png"
            alt="Next"
            className="nav-icon"
            loading="lazy"
          />
        </button>
      )}
    </div>
  );
};

export default Navigation;
