import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useEffect, useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

function App() {
  //States
  const [imgURL, setImgURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const sendImagePrediction = async (img) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "94a0bdd792b64b2592527b1686e3ec5c";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "clarifai";
    const APP_ID = "main";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: img,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    try {
      const response = await fetch(
        "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
        requestOptions
      );
      const result = await response.json();
      if (result.status.code === 10000) {
        const response = await fetch("http://localhost:3000/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id }),
        });
        const count = await response.json();
        setUser((preVal) => {
          return { ...preVal, entries: count };
        });
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  };
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
    let data = await sendImagePrediction(imgURL, user.id);
    let faceCalcData = await calcFaceLoc(data);
    await displayFaceBox(faceCalcData);
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const loadUser = (currUser) => {
    setUser(currUser);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      <div>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onBtnSubmit={onBtnSubmit}
          />
          <FaceRecognition box={box} imageURL={imgURL} />
      </div>
    </div>
  );
}

export default App;
