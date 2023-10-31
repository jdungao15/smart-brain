const sendImagePrediction = (image) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "94a0bdd792b64b2592527b1686e3ec5c";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "jdungao15";
  const APP_ID = "faceDetectionApp";
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
            url: image,
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

  fetch(
    "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) =>
      console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
    )
    .catch((error) => console.log("error", error));
};

export default sendImagePrediction;
