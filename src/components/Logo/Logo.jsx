import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2 parallax-effect-glare-scale"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
        style={{
          height: "300px",
          width: "300px",
        }}
      >
        <h1>React Parallax Tilt 👀</h1>
      </Tilt>
    </div>
  );
};

export default Logo;
