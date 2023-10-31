import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import sendImagePrediction from "./utils/facePredictionHelper";

function App() {
  //States
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  const onInputChange = (evt) => {
    setInput(evt.target.value);
  };

  const onBtnSubmit = () => {
    setImageURL(input);
    sendImagePrediction(imageURL);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit} />
      <FaceRecognition imageURL={imageURL} />
    </div>
  );
}

export default App;
