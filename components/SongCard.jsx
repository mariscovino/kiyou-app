import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import Octicons from '@expo/vector-icons/Octicons';

const SongCard = ({ name, artist, handlePress }) => {

  return (
    <View 
      className="flex flex-col items-center mb-6"
      onPress={handlePress}>
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex justify-center flex-1 gap-y-1">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              className="text-xs text-gray-100 font-regular"
              numberOfLines={1}
            >
              by {artist}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="pt-2 px-2">
          <Octicons name="check" size={20} color="white"/>
        </TouchableOpacity>

        <TouchableOpacity className="pt-2">
          <Octicons name="trash" size={20} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongCard;