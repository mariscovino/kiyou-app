import { FlatList, Text, View, Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';
import Concert from '@/api/Concert';

const ListComponent = ({ data, order_by, header_text, listType, add, bottomSheetRef, children }) => {
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const { refresh } = useGlobalContext();
  const concert = new Concert();

  return (
      <View>
          <FlatList
              data={data}
              keyExtractor={(item) => item[order_by]}
              scrollEnabled={false}
              extraData={refresh}
              renderItem={({ item }) => (

                  <SongCard
                    name={item.song_name}
                    artist={item.song_artist}
                  >
                  { children }

                  {listType == 'requests' && (
                    <CustomIcon
                    name="check"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert.acceptSong(item.song_name, item.song_artist);
                        Alert.alert("Success", "Song request accepted");
                      } catch (error) {
                        Alert.alert("Error", error.message);
                      }
                    }}
                    />
                  )}

                  {listType == 'requests' && (
                    <CustomIcon
                      name="x"
                      styles="mr-4"
                      handlePress={async () => {
                        try {
                          await concert.denySong(item.song_name, item.song_artist);
                          Alert.alert("Success", "Song request denied");
                        } catch (error) {
                          Alert.alert("Error", error.message);
                        }
                      }}
                    />
                  )}

                  {listType == 'queue' && (
                      <CustomIcon
                      name="check"
                      styles="mr-4"
                      handlePress={async () => {
                        try {
                          await concert.createSongsPlayed(item.song_name, item.song_artist);
                          await concert.removeSongQueue(item.song_name, item.song_artist);
                          Alert.alert("Success", "Song added to songs played list");
                        } catch (error) {
                          Alert.alert("Error", error.message);
                        }
                      }}
                    />
                  )}

                  {listType == 'queue' && (
                    <CustomIcon
                    name="trash"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert.removeSongQueue(item.song_name, item.song_artist);
                        Alert.alert("Success", "Song removed from queue");
                      } catch (error) {
                        Alert.alert("Error", error.message);
                      }
                    }}
                    />
                  )}

                  {item.status == 'accepted' &&
                    <CustomIcon
                      name="check-circle"
                      styles="mr-4"
                    />
                  }

                  {item.status == 'denied' &&
                    <CustomIcon
                      name="x-circle"
                      styles="mr-4"
                    />
                  }

                  {item.status == 'pending' &&
                    <CustomIcon
                      name="clock"
                      styles="mr-4"
                    />
                  }

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
                        handlePress={handleOpenPress}
                      />
                    )}
                  </View>
                )}
          />
      </View>
  )
}

export default ListComponent