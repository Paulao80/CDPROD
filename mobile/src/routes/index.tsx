import React, { useContext } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AuthContext from "../contexts/Auth";
import AppRoutes from "./app.routes";
import AuthRotes from "./auth.routes";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  const styles = StyleSheet.create({
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#FABE36',       
    },
  });

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

  return signed ? <AppRoutes /> : <AuthRotes />;
};

export default Routes;
