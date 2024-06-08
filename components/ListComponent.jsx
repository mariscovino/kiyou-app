import { FlatList, Text, View, Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';
import Concert from '@/api/Concert';
import User from '@/api/User';

const ListComponent = ({ listType, bottomSheetRef }) => {
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const concert = new Concert();
  const songQueue = concert.getSongQueue();
  const songRequests = concert.getSongRequests();
  const songsPlayed = concert.getSongsPlayed();
  const { extraData, setExtraData } = useGlobalContext();
  const isArtist = concert.isArtist();

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

  return (
      <View>
          <FlatList
              data={data}
              extraData={extraData}
              // keyExtractor={(item) => item.orderBy}
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

                  {(listType == 'queue' && isArtist) && (
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

                  {(listType == 'queue' && isArtist) && (
                    <CustomIcon
                    name="trash"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert.removeSongQueue(item.song_name, item.song_artist);
                        const {data: refetch} = await concert.getSongQueueAsync();
                        setExtraData([...refetch]);
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