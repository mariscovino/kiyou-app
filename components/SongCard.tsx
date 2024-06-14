import { View, Text } from "react-native";

const SongCard = ({ name, artist, children }: any) => {

  return (
    <View className="flex flex-col items-center mb-6">
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

        { children }

      </View>
    </View>
  );
};

export default SongCard;