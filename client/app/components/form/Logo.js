import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../../assets/routifyf.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 100,
    width: 250,
    height: 180,
    marginLeft: 56,
    marginBottom: 80,
  },
});
