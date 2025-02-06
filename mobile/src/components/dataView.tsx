import { Text, View, StyleSheet } from "react-native";

interface DataViewProps {
  name: string;
  value: any;
}

const styles = StyleSheet.create({
  Data: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  Name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  Value: {
    fontSize: 14,
  },
});

const DataView = ({ name, value }: DataViewProps) => {
  return (
    <View style={styles.Data}>
      <Text style={styles.Name}>{`${name}: `}</Text>
      <Text style={styles.Value}>{value}</Text>
    </View>
  );
};

export default DataView;
