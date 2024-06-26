import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import getData from "@/api/getData";

const ConcertCard = ({ name, artist, handlePress }) => {
  const artistInfo = getData('/users/getUser', {"email": artist}).data;

  return (
    <TouchableOpacity 
      className="flex flex-col items-center mb-14"
      onPress={handlePress}>
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={icons.concert}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}
            >
              Name: {name}
            </Text>
            <Text
              className="text-xs text-gray-100 font-regular"
              numberOfLines={1}
            >
              Artist: {artistInfo.name + " " + artistInfo.last_name}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ConcertCard;