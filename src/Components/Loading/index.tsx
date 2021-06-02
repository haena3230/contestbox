import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Styles } from "~/Styles";

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="small" color="#3A9BFF" />
  </View>
);

export const LastData=()=>{
  return(
    <View style={styles.info}>
        <Text style={Styles.s_m_font}>
            더이상 대회가 없습니다.
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  info:{
    alignItems:'center', 
    paddingBottom:30,
    margin:10
  }
});

export default Loading;