import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { CameraComponent } from "./src/pages/multimedia";
import { DataSaved } from "./src/pages/list";
import AntDesign from "@expo/vector-icons/AntDesign";

const tab = createBottomTabNavigator();

export default function app() {
  return (
    <NavigationContainer>
      <tab.Navigator
        screenOptions={{
          activeTintColor: "#960000",
          inactiveTintColor: "#fff",
          tabBarActiveTintColor: "#960000",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#D87CFF",
          },
        }}
      >
        <tab.Screen
          name="Multimedia"
          component={CameraComponent}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#D87CFF",
            },
            tabBarIcon: () => {
              return <AntDesign name="camera" size={24} color="#960000" />;
            },
          }}
        ></tab.Screen>
        <tab.Screen
          name="Archivos Guardados"
          component={DataSaved}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#D87CFF",
            },
            tabBarIcon: () => {
              return <AntDesign name="bars" size={24} color="#960000" />;
            },
          }}
        ></tab.Screen>
      </tab.Navigator>
    </NavigationContainer>
  );
}
