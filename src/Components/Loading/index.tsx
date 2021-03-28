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
    <View style={{alignItems:'center', paddingHorizontal:20,paddingBottom:20}}>
        <Text style={Styles.ss_font}>
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
});

export default Loading;