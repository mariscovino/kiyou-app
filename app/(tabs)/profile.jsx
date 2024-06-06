import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { useGlobalContext } from "../../context/GlobalProvider";
import client from '@/api/client.js';
import getData from '@/api/getData.js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/api/User";

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const user = User.getInstance();
  
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('email');
  
      await user.signOut();
  
      setUser(null);
      setIsLogged(false);
  
      router.push("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user.getName()}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <InfoBox
              title={user.getAllConcerts().length || 0}
              subtitle="Concerts"
              titleStyles="text-xl"
            />

            <View className="mt-5 flex">
            </View>
          </View>
    </SafeAreaView>
  );
};

export default Profile;