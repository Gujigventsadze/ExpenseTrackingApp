import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ExpenseBoxProps {
  transactionType: string;
  date: string;
  amount: number;
  isIncome: boolean;
}

const ExpenseBox: React.FC<ExpenseBoxProps> = ({
  transactionType,
  date,
  amount,
  isIncome,
}) => {
  return (
    <View style={styles.mainContainer}>
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
    </View>
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
});
