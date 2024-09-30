import { StyleSheet } from "react-native";

export const st = StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
    title: {
      color: "teal",
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "500",
      marginVertical: 8,
    },
    input: {
      borderColor: "teal",
      borderWidth: 2,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 4,
      fontSize: 16,
    },
    todoButton: {
      marginVertical: 8,
    },
    todoCard: {
      borderColor: "teal",
      borderWidth: 2,
      borderRadius: 4,
      marginVertical:8,
      paddingHorizontal: 6,
      paddingVertical: 10,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    todoEditText: {
      marginRight: 30,
      color: "teal",
      fontWeight: "600",
    },
    todoRemoveText: {
      marginRight: 20,
      color: "red",
      fontWeight: "600",
    },
  });