import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, Platform } from "react-native";
import images from "../../constants/images";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import User from "@/api/User";
import client from "@/api/client";
import { KeyboardAvoidingView } from "react-native";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      // const result = await user.signIn(form.email, form.password);
      await client.post('/users/signIn', form);
      const result = await client.post('/users/getUser', { "email": form.email });

      setUser(result.data);
      setIsLogged(true);
      
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-[#161622]">
      <KeyboardAvoidingView
        enabled
        className='flex-1'
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Image
              source={images.logo}
              className="w-[255px] h-[75px]"
              resizeMode="contain"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-semibold">
              Log in to Kiyou
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-regular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-semibold text-secondary-200"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;