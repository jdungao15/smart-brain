import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 tc">
      <Tilt
        className="Tilt br2 shadow-2 parallax-effect-glare-scale"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
        style={{
          height: "150px",
          width: "150px",
        }}
      >
        <img className="pa3 pt3" src={brain} alt="logo" />
      </Tilt>
    </div>
  );
};

export default Logo;
