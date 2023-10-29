import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/* <ImageLinkForm />
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
