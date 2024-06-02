import { FlatList, Text, View, useState } from 'react-native'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import SongCard from './SongCard';

const List = (data, order_by, header_text, add, add_text, handlePress) => {
  const [form, setForm] = useState({
    song_name: "",
  });

  return (
    <View>
        <FlatList
            data={data.data}
            keyExtractor={(item) => item[order_by]}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <SongCard
                name={item.song_name}
                artist={item.song_artist}
                />
            )}
            ListHeaderComponent={() => (
                <Text className="text-lg font-semibold text-gray-100 my-6">
                {header_text}
                </Text>
                )}
        />

        {add && 
            <View>
              <View className="w-full flex-1">
                <Text className="text-lg font-semibold text-gray-100 mb-3">
                  {add_text}
                </Text>
              </View>
  
              <FormField
                  title="Song name"
                  value={form.song_name}
                  handleChangeText={(e) => setForm({ ...form, song_name: e })}
                  otherStyles="mt-3"
                />

              <CustomButton
                title="Add"
                handlePress={handlePress}
                containerStyles="mt-7"
              />
            </View>
        }
    </View>
    
  )
}

export default List