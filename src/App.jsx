import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useEffect, useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import sendImagePrediction from "./utils/facePredictionHelper";
import SignIn from "./components/SignIn/SignIn";

function App() {
  //States
  const [imgURL, setImgURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calcFaceLoc = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - faceBox.right_col * width,
      bottomRow: height - faceBox.bottom_row * height,
    };
  };

  const displayFaceBox = (boxData) => {
    setBox(boxData);
  };

  const onInputChange = (evt) => {
    setImgURL(evt.target.value);
  };

  useEffect(() => {}, [setImgURL]);

  const onBtnSubmit = async () => {
    let data = await sendImagePrediction(imgURL);
    let faceCalcData = await calcFaceLoc(data);
    console.log(faceCalcData);
    await displayFaceBox(faceCalcData);
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      setRoute("signin");
      setIsSignedIn(false);
    } else if (route === "home") {
      setRoute("home");
      setIsSignedIn(true);
    } else {
      setRoute("register");
    }
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onBtnSubmit={onBtnSubmit}
          />
          <FaceRecognition box={box} imageURL={imgURL} />
        </div>
      ) : (
        <SignIn onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
