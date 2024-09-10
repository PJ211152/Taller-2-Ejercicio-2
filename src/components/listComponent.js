import * as React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraButton from "./cameraButtons";
import Entypo from "@expo/vector-icons/Entypo";

export default function ListComponent() {
  const [dataArray, setDataArray] = useState([]);
  const [dataVideoArray, setDataVideoArray] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [tempText, setTempText] = useState('');
  const [tempIndex, setTempIndex] = useState(0);
  const [tempDesc, setTempDesc] = useState('');
  const [viewMode, setViewMode] = useState("I");
  const [editVisible, setEditVisible] = useState(false);

  async function getImagesFromAsyncStorage() {
    const images = await AsyncStorage.getItem("Image");

    if (images) {
      const array = JSON.parse(images);
      setDataArray(array);
    } else {
      console.log("No hay imagenes Guardadas");
    }
  }

  async function getVideosFromAsyncStorage() {
    const videos = await AsyncStorage.getItem("Video");

    if (videos) {
      const array = JSON.parse(videos);
      setDataVideoArray(array);
    } else {
      console.log("No hay Videos Guardados");
    }
  }

  const open = (item) => {
    setImage(item.token);
    setDescription(item.comm);
    console.log("presionado", item, image, description);
  };

  const openVideo = (item) => {
    setVideo(item.token);
    setDescription(item.comm);
    console.log("presionado", item, image, description);
  };

  function changeCameraMode() {
    setViewMode("I");
    refresh();
    setImage(null);
    setVideo(null);
    setEditVisible(false);
  }

  function changeVideoMode() {
    setViewMode("V");
    refresh();
    setImage(null);
    setVideo(null);
    setEditVisible(false);
  }

  function deleteSavedImage() {
    setImage(null);
    setDescription("");
  }

  function deleteSavedVideo() {
    setVideo(null);
    setDescription("");
  }

  function refresh() {
    getImagesFromAsyncStorage();
    getVideosFromAsyncStorage();
  }

  function openEditPage(index, descri){
    setEditVisible(true);
    setTempIndex(index);
    setTempDesc(descri);
    setTempText(descri);
    console.log(tempDesc, tempIndex)
  }

  function openEditVideo (index, descri){
    setEditVisible(true);
    setTempIndex(index);
    setTempDesc(descri);
    setTempText(descri);
    console.log(tempDesc, tempIndex)
  }

  async function deleteVideo(index) {
    const videos = await AsyncStorage.getItem("Video");

    if (videos) {
      const array = JSON.parse(videos);
      delete array[index];
      for (let i = 0; array.length > i; i++) {
        if (array[i] === null || array[i] === undefined) {
          array.splice(i, 1);
          i--;
        }
      }
      console.log("Arreglo", array, "Numero", array.length);

      await AsyncStorage.setItem("Video", JSON.stringify(array));
      refresh();
    } else {
      console.log("No hay Videos Guardados");
    }
  }

  async function deleteImage(index) {
    const image = await AsyncStorage.getItem("Image");

    if (image) {
      const array = JSON.parse(image);
      delete array[index];
      for (let i = 0; array.length > i; i++) {
        if (array[i] === null || array[i] === undefined) {
          array.splice(i, 1);
          i--;
        }
      }
      console.log("Arreglo", array, "Numero", array.length);

      await AsyncStorage.setItem("Image", JSON.stringify(array));
      refresh();
    } else {
      console.log("No hay Imagnes Guardadas");
    }
  }

  async function editImage() {
    const image = await AsyncStorage.getItem("Image");

    if (image) {
      const array = JSON.parse(image);
      array[tempIndex].comm = tempText;
      console.log("Arreglo", array);

      await AsyncStorage.setItem("Image", JSON.stringify(array));
      setTempText('');
      setTempIndex(0);
      setTempDesc('')
      setEditVisible(false)
      refresh();
    } else {
      console.log("No hay Imagnes Guardadas");
    }
  }

  async function editVideo() {
    const image = await AsyncStorage.getItem("Video");

    if (image) {
      const array = JSON.parse(image);
      array[tempIndex].comm = tempText;
      console.log("Arreglo", array);

      await AsyncStorage.setItem("Video", JSON.stringify(array));
      setTempText('');
      setTempIndex(0);
      setTempDesc('')
      setEditVisible(false)
      refresh();
    } else {
      console.log("No hay Imagnes Guardadas");
    }
  }

  useEffect(() => {
    getImagesFromAsyncStorage();
    getVideosFromAsyncStorage();
    console.log("Imagenes", dataArray, "Videos", dataVideoArray);
  }, []);

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.containerButtons}>
          <CameraButton
            icon="camera"
            color="black"
            onPress={changeCameraMode}
          ></CameraButton>
          <CameraButton
            icon="video-camera"
            color="black"
            onPress={changeVideoMode}
          ></CameraButton>
        </View>
        {dataArray.length > 0 && viewMode === "I" ? (
          image != null ? (
            <ImageBackground style={style.imagePreview} source={{ uri: image }}>
              <CameraButton
                icon="back"
                color="white"
                onPress={deleteSavedImage}
              />
            </ImageBackground>
          ) : editVisible == true ? (
            <View style={style.saveScreen}>
              <CameraButton
                icon="retweet"
                color="red"
                onPress={() => setEditVisible(false)}
              />
              <CameraButton icon="check" color="green" onPress={editImage} />
              <TextInput
                style={style.input}
                placeholder="Guarda un comentario nuevo"
                onChangeText={(commentary) => setTempText(commentary)}
              ></TextInput>
            </View>
          ) : (
            dataArray.map((item, index) => (
              <View style={style.mainContainer} key={index}>
                <TouchableOpacity onPress={() => open(item)}>
                  <Text style={style.font}>Imagen #{index + 1}</Text>
                  <Image style={style.imageCard} source={{ uri: item.token }} />
                  <Text style={style.description}>
                    {" "}
                    Descripción: {item.comm}
                  </Text>
                </TouchableOpacity>
                <View style={style.optionButtons}>
                  <TouchableOpacity
                    onPress={() => deleteImage(index)}
                    style={{ padding: 5, marginLeft: 20 }}
                  >
                    <Entypo name="trash" size={30} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openEditPage(index, item.comm)}
                    style={{ padding: 5, marginLeft: 20 }}
                  >
                    <Entypo name="pencil" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        ) : (
          <Text></Text>
        )}

        {dataVideoArray.length > 0 && viewMode === "V" ? (
          video != null ? (
            <View>
              <CameraButton
                icon="back"
                color="black"
                onPress={deleteSavedVideo}
              />
              <Video
                style={style.imagePreview}
                source={{ uri: video }}
                resizeMode="contain"
                useNativeControls
                isLoopign
              />
            </View>
          ) : (
            editVisible == true ? (
              <View style={style.saveScreen}>
              <CameraButton
                icon="retweet"
                color="red"
                onPress={() => setEditVisible(false)}
              />
              <CameraButton icon="check" color="green" onPress={editVideo} />
              <TextInput
                style={style.input}
                placeholder="Guarda un comentario nuevo"
                onChangeText={(commentary) => setTempText(commentary)}
              ></TextInput>
            </View>
            ) : (
              dataVideoArray.map((item, index) => (
                <View style={style.mainContainer} key={index}>
                  <TouchableOpacity onPress={() => openVideo(item)}>
                    <Text style={style.font}>Video #{index + 1}</Text>
                    <Image style={style.imageCard} source={{ uri: item.token }} />
                    <Text style={style.description}>
                      {" "}
                      Descripción: {item.comm}
                    </Text>
                  </TouchableOpacity>
                  <View style={style.optionButtons}>
                    <TouchableOpacity
                      onPress={() => deleteVideo(index)}
                      style={{ padding: 5, marginLeft: 20 }}
                    >
                      <Entypo name="trash" size={30} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openEditVideo(index, item.comm)} style={{ padding: 5, marginLeft: 20 }}>
                      <Entypo name="pencil" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )
          )
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const style = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#9C9C9C",
    padding: 30,
    color: "white",
    borderRadius: 15,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 10,
  },
  font: {
    color: "black",
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  imagePreview: {
    display: "flex",
    flexDirection: "column",
    minHeight: windowHeight * 0.75,
    minWidth: windowWidth * 0.75,
  },
  imageCard: {
    height: windowHeight * 0.5,
    borderRadius: 15,
  },
  containerButtons: {
    display: "flex",
    flexDirection: "row",
    gap: windowWidth * 0.5,
    marginBottom: 10,
    marginLeft: windowWidth * 0.1,
  },
  containerCameraButtons1: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginLeft: windowWidth * 0.45,
    gap: windowWidth * 0.3,
    marginBottom: 10,
  },
  optionButtons: {
    display: "flex",
    alignSelf: "flex-end",
    marginTop: 10,
    flexDirection: "row",
  },
  input: {
    color: "white",
    backgroundColor: "#A8A8A8",
    borderRadius: 15,
    padding: 5,
    flex: 1
  },
  saveScreen: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
});
