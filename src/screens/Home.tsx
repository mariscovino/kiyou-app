import * as React from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Padding, Border, FontFamily, FontSize, Color } from "../components/styles.js";

const Home = () => {
  return (
    <View style={styles.home}>
      <View style={[styles.navbar, styles.home1FlexBox]}>
        <Pressable style={styles.home1FlexBox}>
          <Image
            style={styles.homeIcon}
            contentFit="cover"
            source={require("../../assets/home.png")}
          />
          <Text style={styles.audience}>Home</Text>
        </Pressable>
        <Pressable style={[styles.profile, styles.home1FlexBox]}>
          <Image
            style={styles.testAccountIcon}
            contentFit="cover"
            source={require("../../assets/test-account.png")}
          />
          <Text style={styles.audience}>Profile</Text>
        </Pressable>
      </View>
      <Text style={styles.helloMariYour}>{`Hello Mari,
Your concerts`}</Text>
      <Pressable style={[styles.newConcert, styles.concertPosition]}>
        <Text style={[styles.newConcert1, styles.concertTypo]}>
          New Concert
        </Text>
      </Pressable>
      <Pressable style={[styles.concert2, styles.concertPosition]}>
        <Image
          style={styles.microphoneIcon}
          contentFit="cover"
          source={require("../../assets/microphone.png")}
        />
        <Text style={[styles.concert21, styles.concertTypo]}>Concert 2</Text>
      </Pressable>
      <Pressable style={[styles.concert1, styles.concertPosition]}>
        <Image
          style={styles.microphoneIcon}
          contentFit="cover"
          source={require("../../assets/microphone.png")}
        />
        <Text style={[styles.concert21, styles.concertTypo]}>Concert 1</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  home1FlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  concertPosition: {
    paddingBottom: Padding.p_sm,
    paddingRight: Padding.p_267xl,
    paddingTop: Padding.p_sm,
    paddingLeft: Padding.p_base,
    height: 57,
    width: 363,
    left: 15,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  concertTypo: {
    width: 80,
    fontFamily: FontFamily.nunitoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    textAlign: "center",
  },
  homeIcon: {
    height: 40,
    width: 50,
  },
  audience: {
    fontSize: FontSize.size_3xs,
    fontWeight: "600",
    fontFamily: FontFamily.nunitoSemiBold,
    marginTop: 8,
    textAlign: "center",
    color: Color.colorGray_100,
  },
  testAccountIcon: {
    height: 50,
    width: 50,
  },
  profile: {
    width: 49,
    height: 35,
    marginLeft: 60,
  },
  navbar: {
    marginLeft: -196.5,
    bottom: 25,
    left: "50%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 393,
    height: 107,
    flexDirection: "row",
    borderRadius: Border.br_xl,
    alignItems: "center",
    backgroundColor: Color.colorMediumslateblue,
    position: "absolute",
  },
  helloMariYour: {
    top: 85,
    left: 20,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FontFamily.nunitoBold,
    color: "#29262e",
    textAlign: "left",
    width: 273,
    height: 51,
    position: "absolute",
  },
  newConcert1: {
    color: "#838288",
  },
  newConcert: {
    top: 161,
    backgroundColor: "#edecef",
  },
  microphoneIcon: {
    width: 30,
    height: 30,
  },
  concert21: {
    marginLeft: 10,
    color: Color.colorGray_100,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  concert2: {
    top: 325,
    backgroundColor: Color.colorMediumslateblue,
    paddingRight: Padding.p_267xl,
    paddingTop: Padding.p_sm,
    paddingLeft: Padding.p_base,
    height: 57,
    width: 363,
    left: 15,
  },
  concert1: {
    top: 243,
    backgroundColor: Color.colorMediumslateblue,
    paddingRight: Padding.p_267xl,
    paddingTop: Padding.p_sm,
    paddingLeft: Padding.p_base,
    height: 57,
    width: 363,
    left: 15,
  },
  home: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default Home;
