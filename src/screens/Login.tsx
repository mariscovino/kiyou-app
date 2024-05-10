import * as React from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { FontSize, Padding, Border, Color, FontFamily } from "../components/styles";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Constants
import { RootStackParamList } from "../App";

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Login = () => {
  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={styles.login}>
      <View style={[styles.email, styles.emailLayout]}>
        <Text style={[styles.eMail, styles.eMailTypo]}>E-mail</Text>
        <TextInput style={styles.inputField} />
      </View>
      <View style={[styles.password, styles.emailLayout]}>
        <Text style={[styles.password1, styles.eMailTypo]}>Password</Text>
        <TextInput style={styles.inputField} />
      </View>
      <Pressable 
        style={[styles.logInButton, styles.buttonFlexBox]}
        onPress ={() => navigation.navigate('Home')}
        >
        <Text style={[styles.logIn, styles.eMailTypo]}>Log in</Text>
      </Pressable>
      <Text style={[styles.welcomeBack, styles.eMailTypo1]}>Welcome Back</Text>
      <Image
        style={styles.footerIcon}
        contentFit="cover"
        source={require("../../assets/footer2.png")}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  emailLayout: {
    width: 353,
    left: 20,
  },
  eMailTypo: {
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  buttonFlexBox: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_152xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Border.br_10xl,
    top: "50%",
    position: "absolute",
  },
  eMailTypo1: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
  },
  eMail: {
    width: 42,
    height: 17,
    color: Color.colorGray_200,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  inputField: {
    paddingLeft: 15,
    height: 53,
    marginTop: 14,
    borderWidth: 1,
    borderColor: Color.colorDarkslategray,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_10xl,
    width: 353,
    color: Color.colorGray_200,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
  },
  email: {
    marginTop: -288,
    height: 84,
    top: "50%",
    position: "absolute",
    width: 353,
  },
  password1: {
    width: 70,
    height: 17,
    color: Color.colorGray_200,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  password: {
    marginTop: -179,
    height: 82,
    top: "50%",
    position: "absolute",
    width: 353,
  },
  logIn: {
    width: 70,
    color: Color.colorGray_100,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: FontSize.size_xs,
  },
  logInButton: {
    marginTop: -55,
    backgroundColor: Color.colorMediumslateblue,
    height: 55,
    width: 353,
    left: 20,
  },
  welcomeBack: {
    marginTop: -344,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    width: 208,
    height: 21,
    color: Color.colorGray_200,
    left: 20,
    top: "50%",
    position: "absolute",
  },
  footerIcon: {
    marginLeft: -330,
    bottom: -60,
    width: 660,
    height: 300,
    left: "50%",
    position: "absolute",
  },
  dontHaveAn: {
    fontWeight: "500",
    fontFamily: FontFamily.nunitoMedium,
    color: Color.colorMediumslateblue,
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  registerButton: {
    marginTop: -88,
    left: 144,
    width: 229,
    height: 25,
    backgroundColor: Color.colorWhite,
  },
  login: {
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default Login