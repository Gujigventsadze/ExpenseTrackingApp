import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import ExpenseBox from "../Components/ExpenseBox";
import DropDownPicker from "react-native-dropdown-picker";

interface HomeScreenProps {
  navigation: any;
}

const { height: screenHeight } = Dimensions.get("window");

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
  ]);
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;

  const toggleModal = () => {
    if (isModalVisible) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={toggleModal}
          style={({ pressed }) => (pressed ? styles.pressedBtn : null)}
        >
          <Ionicon name="add-outline" size={35} color="white" />
        </Pressable>
      ),
    });
  }, [navigation, isModalVisible]);

  return (
    <View style={styles.container}>
      <ExpenseBox
        transactionType="Cash"
        amount={300}
        isIncome={true}
        date="29-07-2003"
      />

      <Modal
        transparent
        visible={isModalVisible}
        animationType="none"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backdrop}>
            <Pressable style={styles.overlay} onPress={toggleModal} />
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <KeyboardAvoidingView
                behavior="padding"
                style={styles.avoidingView}
              >
                <View style={styles.modalInnerContent}>
                  <View style={styles.modalTop}>
                    <Text style={styles.modalText}>Add New Transaction</Text>
                    <Pressable onPress={toggleModal}>
                      <Ionicon name="close" size={40} />
                    </Pressable>
                  </View>
                  <Text style={styles.inputLabel}>Transaction Type</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="E.G. Cash..."
                    placeholderTextColor="gray"
                  />
                  <Text style={styles.inputLabel}>Transaction Amount</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="E.G. Cash..."
                    placeholderTextColor="gray"
                    keyboardType="number-pad"
                  />
                  <Text style={styles.inputLabel}>Transaction Type</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Type"
                    style={styles.modalInput}
                    dropDownContainerStyle={styles.dropDown}
                  />
                </View>
                <Pressable
                  style={({ pressed }) => [
                    styles.btn,
                    pressed && styles.pressedBtn,
                  ]}
                >
                  <Text style={styles.btnText}>Add Transaction</Text>
                </Pressable>
              </KeyboardAvoidingView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pressedBtn: {
    opacity: 0.7,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "70%", //Modal Height
  },
  avoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalInnerContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalInput: {
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    fontSize: 20,
    borderColor: "white",
  },
  inputLabel: {
    fontSize: 17,
    marginTop: 10,
  },
  dropDown: {
    borderColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    overflow: "visible",
    marginTop: 5,
  },
  btn: {
    backgroundColor: "black",
    padding: 20,
    marginVertical: 20,
    borderRadius: 50,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  btnPressed: {
    opacity: 0.7,
  },
});
