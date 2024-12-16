import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import store from "./Redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#4682B4" },
            headerTintColor: "#fff",
            contentStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Expense Tracker",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
