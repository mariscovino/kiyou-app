import { FlatList, Text, View, Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';
import Concert from '@/api/Concert';

const ListComponent = ({ listType, bottomSheetRef }) => {
  const { user, concert, refreshing } = useGlobalContext();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const globalConcert = new Concert(concert, user);
  var songQueue = globalConcert.getSongQueue();
  var songRequests = globalConcert.getSongRequests();
  var songsPlayed = globalConcert.getSongsPlayed();
  var isArtist = globalConcert.isArtist();
  

  var data
  var orderBy
  var headerText
  var add

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

  const refreshControl = () => {
    try {
      globalConcert.getSongQueue();
      globalConcert.getSongRequests();
      globalConcert.getSongsPlayed();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
      <View>
          <FlatList
              data={data}
              // keyExtractor={(item) => item.orderBy}
              refreshing={refreshing}
              onRefresh={() => refreshControl()}
              scrollEnabled={false}
              renderItem={({ item }) => (

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
                        await globalConcert.acceptSong(item.song_name, item.song_artist);
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
                          await globalConcert.denySong(item.song_name, item.song_artist);
                          Alert.alert("Success", "Song request denied");
                        } catch (error) {
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
                          await globalConcert.createSongsPlayed(item.song_name, item.song_artist);
                          await globalConcert.removeSongQueue(item.song_name, item.song_artist);
                          Alert.alert("Success", "Song added to songs played list");
                        } catch (error) {
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
                        await globalConcert.removeSongQueue(item.song_name, item.song_artist);
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