import { FlatList, Text, View } from 'react-native'
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';
import SongSheet from './SongSheet';
import client from '../api/client';

const List = ({ data, order_by, header_text, add, url, email, children }) => {
  const addList = async () => {
    <SongSheet
      url={url}
      email={email}
    />
  }

  return (
    <View>
        <FlatList
            data={data}
            keyExtractor={(item) => item[order_by]}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <SongCard
                name={item.song_name}
                artist={item.song_artist}
                >
                { children }

                </SongCard>
            )}
            ListHeaderComponent={() => (
                <View className='flex items-center flex-row flex-1'>
                  <Text className="text-lg font-semibold text-gray-100 my-6">
                  {header_text}
                  </Text>
                  {add && (
                    <CustomIcon
                      name="plus"
                      styles="ml-5"
                      handlePress={addList}
                    />
                  )}
                </View>
              )}
        />
    </View>
    
  )
}

export default List