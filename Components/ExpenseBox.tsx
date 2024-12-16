import { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Types/NavigationTypes";

interface ExpenseBoxProps {
  transactionType: string;
  date: string;
  amount: string;
  isIncome: boolean;
}
type NavigationProps = NavigationProp<RootStackParamList>;

const ExpenseBox: React.FC<ExpenseBoxProps> = ({
  transactionType,
  date,
  amount,
  isIncome,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate("ExpenseScreen", {
      name: transactionType,
      amount: amount,
      date: date,
      isIncome: isIncome,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.mainContainer,
        pressed && styles.pressedBox,
      ]}
      onPress={handlePress}
    >
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.textContainer}>{transactionType}</Text>
        </View>
        <View>
          <Text style={styles.bottomContainer}>{date}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textContainer}>
          {isIncome ? "+ " : "- "}
          {amount}
        </Text>
      </View>
      <View
        style={[
          styles.expenseBar,
          { backgroundColor: isIncome ? "green" : "red" },
        ]}
      ></View>
    </Pressable>
  );
};

export default ExpenseBox;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    minHeight: 90,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  bottomContainer: {
    fontSize: 15,
    color: "gray",
  },
  textContainer: {
    fontSize: 25,
  },
  expenseBar: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 90,
    width: 10,
  },
  pressedBox: {
    opacity: 0.7,
    backgroundColor: "#d2d2d2",
  },
});
