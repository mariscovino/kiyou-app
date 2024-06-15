import { FlatList, Text, View, Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';

const ListComponent = ({ listType, bottomSheetRef }: any) => {
  const { concert } = useGlobalContext();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  var songQueue = concert?.getSongQueue();
  var songRequests = concert?.getSongRequests();
  var songsPlayed = concert?.getSongsPlayed();
  var isArtist = concert?.isArtist();
  

  var data
  var orderBy
  var headerText: string
  var add: boolean

  if (listType == 'requests') {
    data = songRequests;
    orderBy = 'request_id';
    headerText = "Songs requested by audience";

    if (!isArtist) {
      add = true;
    }

  } else if (listType == 'queue') {
    orderBy = 'date_created';
    data = songQueue;

    if (isArtist) {
      headerText = "Songs you will play";
      add = true;
    } else {
      headerText = "Songs artist will play";
    }
  } else {
    data = songsPlayed;
    orderBy = 'played_element_id';

    if (isArtist) {
      headerText = "Songs you already played";
    } else {
      headerText = "Songs artist already played";
    }
  }

  function removeItem(arr: any, name: string, artist: string) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].song_name === name && arr[i].song_artist == artist) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }


  return (
      <View>
          <FlatList
              data={data}
              // keyExtractor={(item) => item.orderBy}
              scrollEnabled={false}
              renderItem={({ item }: any) => (

                  <SongCard
                    name={item.song_name}
                    artist={item.song_artist}
                  >

                  {listType == 'requests' && (
                    <CustomIcon
                    name="check"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert?.acceptSong(item.song_name, item.song_artist);

                        removeItem(songRequests, item.song_name, item.song_artist);
                        Alert.alert("Success", "Song request accepted");
                      } catch (error: any) {
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
                          await concert?.denySong(item.song_name, item.song_artist);
                          Alert.alert("Success", "Song request denied");
                        } catch (error: any) {
                          Alert.alert("Error", error.message);
                        }
                      }}
                    />
                  )}

                  {(listType == 'queue' && isArtist) && (
                      <CustomIcon
                      name="check"
                      styles="mr-4"
                      handlePress={async () => {
                        try {
                          await concert?.createSongsPlayed(item.song_name, item.song_artist);
                          
                          await concert?.removeSongQueue(item.song_name, item.song_artist);
                          removeItem(songQueue, item.song_name, item.song_artist);
                          Alert.alert("Success", "Song added to songs played list");
                        } catch (error: any) {
                          Alert.alert("Error", error.message);
                        }
                      }}
                    />
                  )}

                  {(listType == 'queue' && isArtist) && (
                    <CustomIcon
                    name="trash"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert?.removeSongQueue(item.song_name, item.song_artist);

                        removeItem(songQueue, item.song_name, item.song_artist);

                        Alert.alert("Success", "Song removed from queue");
                      } catch (error: any) {
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
                    {headerText}
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