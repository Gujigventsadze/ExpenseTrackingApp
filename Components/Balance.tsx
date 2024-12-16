import { Pressable, StyleSheet, Text, View } from "react-native";

interface BalanceProps {
  income: string;
  expense: string;
  profit: string;
}

const Balance: React.FC<BalanceProps> = ({ income, expense, profit }) => {
  return (
    <Pressable style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.profitText}>{income}</Text>
          <Text style={styles.generalText}>Income</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.expenseText}>{expense}</Text>
          <Text style={styles.generalText}>Expense</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <Text
          style={[
            styles.prText,
            { color: Number(income) - Number(expense) >= 0 ? "green" : "red" },
          ]}
        >
          {profit}
        </Text>
        <Text style={styles.generalText}>Total Profit</Text>
      </View>
    </Pressable>
  );
};

export default Balance;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  infoBox: {
    alignItems: "center",
  },
  generalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profitText: {
    color: "green",
    fontSize: 25,
    fontWeight: "bold",
  },
  expenseText: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
  },
  prText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  pressedBox: {
    opacity: 0.7,
  },
});
