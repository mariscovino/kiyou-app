import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserConcerts } from "../../lib/appwrite";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { data: concerts } = useAppwrite(() => getUserConcerts("663edad10025dbd9f622","mscovino"));
  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
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
                source={{ uri: "https://cloud.appwrite.io/v1/avatars/initials?name=mscovino&project=663e865c003df7277444"}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={"mscovino"}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <InfoBox
              title={concerts.length || 0}
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