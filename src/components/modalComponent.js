import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export default function ModalComponent(){

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <Modal>

        </Modal>
    )
}

/*
dataArray.length > 0 ? (
        image == null ? (
          dataArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={style.mainContainer}
              onPress={() => open(item)}
            >
              <Text style={style.font}>Imagen #{index + 1}</Text>
              <Image source={{ uri: item.token }} />
              <Text> Descripción: {item.comm}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <ImageBackground style={style.imagePreview} source={{ uri: image }}>
            <CameraButton
              icon="back"
              color="white"
              onPress={deleteSavedImage}
            />
          </ImageBackground>
        )
      ) : (
        <Text>No hay imagenes disponibles</Text>
      )}

      {dataVideoArray.length > 0 ? (
       video == null ? (dataVideoArray.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={style.mainContainer}
            onPress={() => openVideo(item)}
          >
            <Text style={style.font}>Video #{index + 1}</Text>
            <Image source={{ uri: item.token }} />
            <Text> Descripción: {item.comm}</Text>
          </TouchableOpacity>
        ))):
        <View>
          <CameraButton
              icon="back"
              color="white"
              onPress={deleteSavedVideo}
            />
            <Video
            style={style.imagePreview}
            source={{ uri: video }}
            useNativeControls
            isLoopign
            />
        </View>
      ) : (
        <Text>No hay Videos disponibles</Text>
      )

*/