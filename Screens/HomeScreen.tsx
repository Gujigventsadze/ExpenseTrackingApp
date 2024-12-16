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
  ScrollView,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import ExpenseBox from "../Components/ExpenseBox";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, selectTransactions } from "../Redux/transactionSlice";
import Balance from "../Components/Balance";

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
  const [transactionName, setTransactionName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  //Profit/Expense

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const dispatch = useDispatch();
  const selector = useSelector(selectTransactions);

  //Handling Add transaction
  const handleAddTransaction = () => {
    if (
      transactionAmount === 0 ||
      transactionName.length === 0 ||
      value === null
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const currentDate = new Date();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const newTransaction = {
        id: currentDate.toString().split(" ").join("").toLocaleLowerCase(),
        name: transactionName,
        amount: transactionAmount,
        date: `${day}-${month} ${hours}:${minutes}`,
        type: value,
      };

      dispatch(addTransaction(newTransaction));

      setTransactionAmount(0);
      setTransactionName("");
      setValue(null);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    const income = selector.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc;
    }, 0);
    const expense = selector.reduce((acc, transaction) => {
      return transaction.type === "expense" ? acc + transaction.amount : acc;
    }, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  }, [selector]);

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
      <Balance
        income={totalIncome.toFixed(2)}
        expense={totalExpense.toFixed(2)}
        profit={(totalIncome - totalExpense).toFixed(2)}
      />
      <ScrollView>
        {[...selector].reverse().map((item, index) => (
          <ExpenseBox
            key={index}
            transactionType={item.name}
            amount={item.amount.toFixed(2)}
            isIncome={item.type === "income"}
            date={item.date}
          />
        ))}
      </ScrollView>
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
                    onChangeText={(text: string) => setTransactionName(text)}
                  />
                  <Text style={styles.inputLabel}>Transaction Amount</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="E.G. 300..."
                    placeholderTextColor="gray"
                    keyboardType="number-pad"
                    onChangeText={(text: string) =>
                      setTransactionAmount(Number(text))
                    }
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
                {error && (
                  <Text style={styles.errorMsg}>
                    Make Sure to Fill Out Everything
                  </Text>
                )}
                <Pressable
                  style={({ pressed }) => [
                    styles.btn,
                    pressed && styles.pressedBtn,
                  ]}
                  onPress={handleAddTransaction}
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
  errorMsg: {
    textAlign: "center",
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },
});
