import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Types/NavigationTypes";
import { useLayoutEffect } from "react";

interface ExpenseScreenProps {
  navigation: any;
}

type ExpenseScreenRoute = RouteProp<RootStackParamList>;

const ExpenseScreen: React.FC<ExpenseScreenProps> = ({ navigation }) => {
  const route = useRoute<ExpenseScreenRoute>();

  const params = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.name,
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Transaction Details</Text>
      <Text style={styles.transactionHeader}>Transaction Name</Text>
      <Text style={styles.transactionText}>{params?.name}</Text>
      <Text style={styles.transactionHeader}>Transaction Date</Text>
      <Text style={styles.transactionText}>{params?.date}</Text>
      <Text style={styles.transactionHeader}>Transaction Amount</Text>
      <Text style={styles.transactionText}>{params?.amount}</Text>
      <Text style={styles.transactionHeader}>Transaction Type</Text>
      <Text style={styles.transactionText}>
        {params?.isIncome ? "Income" : "Expense"}
      </Text>
    </View>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 40,
  },
  transactionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 25,
    color: "gray",
  },
});
