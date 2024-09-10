import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
  useMicrophonePermissions,
} from "expo-camera";
import CameraButton from "../components/cameraButtons.js";
import AntDesign from "@expo/vector-icons/AntDesign";

export const CameraComponent = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [text, setText] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isVideoCameraVisible, setIsVideoCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("back");
  const cameraRef = useRef(null);

  MediaLibrary.requestPermissionsAsync();

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted || !hasMicrophonePermission) {
    return (
      <View>
        <Text style={styles.text}>
          Necesitamos sus permisos de camara para ejecutar la aplicacion
        </Text>
        <TouchableOpacity
          style={styles.buttonPermission}
          onPress={setHasPermission}
        >
          <Text>Obtener permisos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPermission}
          onPress={setHasMicrophonePermission}
        >
          <Text>Obtener permisos de Microfono</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleOpenCamera() {
    setIsCameraVisible(true);
  }
  function handleCloseCamera() {
    setIsCameraVisible(false);
  }

  function handleOpenVideoCamera() {
    setIsVideoCameraVisible(true);
  }
  function handleCloseVideoCamera() {
    setIsVideoCameraVisible(false);
    setIsRecording(false);
  }

  function deleteSavedImage() {
    setImage(null);
    setText("");
  }

  function deleteSavedVideo() {
    setVideo(null);
    setText("");
  }

  function toggleCameraFacing() {
    setCameraFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
        console.log(picture.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const recordVideo = () => {
    if (cameraRef) {
      try {
        setIsRecording(true);
        cameraRef.current.recordAsync().then((recVideo) => {
          setVideo(recVideo);
          setIsRecording(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef) {
      try {
        setIsRecording(false);
        cameraRef.current.stopRecording();
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function saveImage() {
    if (image) {
      try {
        const picture = await MediaLibrary.createAssetAsync(image);
        alert("Imagen guardada");
        console.log(picture.uri);
        console.log(text);

        const newImage = {
          token: picture.uri,
          comm: text,
        };

        let Images = await AsyncStorage.getItem("Image");

        if (Images != null || Images != undefined) {
          const updateImages = JSON.parse(Images);
          updateImages.push(newImage);
          await AsyncStorage.setItem("Image", JSON.stringify(updateImages));
        } else {
          const array = [newImage];
          await AsyncStorage.setItem("Image", JSON.stringify(array));
        }
        setText(null);
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const saveVideo = async () => {
    if (video) {
      try {
        const record = await MediaLibrary.createAssetAsync(video.uri);
        console.log(record.uri);
        alert("Video guardado con exito");

        const newVideo = {
          token: record.uri,
          comm: text,
        };

        let videos = await AsyncStorage.getItem("Video");

        if (videos != null || videos != undefined) {
          const updateVideos = JSON.parse(videos);
          updateVideos.push(newVideo);
          await AsyncStorage.setItem("Video", JSON.stringify(updateVideos));
        } else {
          const array = [newVideo];
          await AsyncStorage.setItem("Video", JSON.stringify(array));
        }

        setText(null);
        setVideo(null);
      } catch (e) {
        console.log("Multimedia", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        image === null ? (
          <CameraView
            style={styles.cameraView}
            facing={cameraFacing}
            ref={cameraRef}
          >
            <View style={styles.containerCameraButtons1}>
              <CameraButton
                icon="circle"
                color="#D4D4D4"
                onPress={takePicture}
              />
              <CameraButton
                icon="back"
                color="#FF8383"
                onPress={handleCloseCamera}
              />
            </View>
          </CameraView>
        ) : (
          <ImageBackground source={{ uri: image }} style={styles.camera}>
            <View style={styles.saveScreen}>
              <CameraButton
                icon="retweet"
                color="white"
                onPress={deleteSavedImage}
              />
              <CameraButton icon="check" color="white" onPress={saveImage} />
              <TextInput
                style={styles.input}
                placeholder="Guarda un comentario"
                onChangeText={(commentary) => setText(commentary)}
              ></TextInput>
            </View>
          </ImageBackground>
        )
      ) : isVideoCameraVisible ? (
        video === null ? (
          <CameraView
            style={styles.cameraView}
            facing={cameraFacing}
            ref={cameraRef}
            mode="video"
          >
            <View style={styles.containerCameraButtons1}>
              <CameraButton
                icon={isRecording ? "controller-stop" : "controller-record"}
                color={isRecording ? "#9D9D9D" : "red"}
                onPress={isRecording ? stopRecording : recordVideo}
              />
              <CameraButton
                icon="back"
                color="#FF8383"
                onPress={handleCloseVideoCamera}
              />
            </View>
          </CameraView>
        ) : (
          <View style={styles.camera}>
            <Video
              style={styles.camera}
              source={{ uri: video.uri }}
              useNativeControls
              isLoopign
            ></Video>
            <View style={styles.saveVideoScreen}>
              <CameraButton
                icon="retweet"
                color="white"
                onPress={deleteSavedVideo}
              />
              <CameraButton icon="check" color="white" onPress={saveVideo} />
              <TextInput
                style={styles.input}
                placeholder="Guarda un comentario"
                onChangeText={(commentary) => setText(commentary)}
              ></TextInput>
            </View>
          </View>
        )
      ) : (
        <>
          <TouchableOpacity
            style={styles.containerButtonMain}
            onPress={handleOpenCamera}
          >
            <AntDesign name="camera" size={50} color="black" />
            <Text>Fotografia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerButtonMain}
            onPress={handleOpenVideoCamera}
          >
            <AntDesign name="videocamera" size={50} color="black" />
            <Text>Video</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
  },
  containerCameraButtons1: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginLeft: windowWidth * 0.45,
    gap: windowWidth * 0.3,
    marginBottom: 10,
  },
  buttonPermission: {
    backgroundColor: "#197500",
    padding: 10,
    color: "white",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    alignSelf: "center",
    marginBottom: 20,
  },
  containerButtonMain: {
    backgroundColor: "yellow",
    padding: 10,
    margin: 10,
    marginTop: 30,
    borderRadius: 15,
    minWidth: 150,
    minHeight: 100,
    maxHeight: 110,
    alignItems: "center",
  },
  camera: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  input: {
    color: "white",
    backgroundColor: "#A8A8A8",
    borderRadius: 15,
    padding: 5,
    flex: 1,
  },
  saveScreen: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  saveVideoScreen: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    marginTop: "auto",
    backgroundColor: "#A8A8A8",
  },
  utility: {
    flexGrow: 1,
  },
  cameraView: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
  },
});
