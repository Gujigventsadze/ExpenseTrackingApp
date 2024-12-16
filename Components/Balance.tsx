import { StyleSheet, Text, View } from "react-native";

interface BalanceProps {
  income: string;
  expense: string;
  profit: string;
}

const Balance: React.FC<BalanceProps> = ({ income, expense, profit }) => {
  return (
    <View style={styles.mainContainer}>
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
        <Text style={styles.prText}>{profit}</Text>
        <Text style={styles.generalText}>Total Profit</Text>
      </View>
    </View>
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
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
  },
});
