import { FlatList, Text, View, Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';
import SongCard from './SongCard';
import CustomIcon from './CustomIcon';

const ListComponent = ({ listType, bottomSheetRef }) => {
  const { 
    concert, 
    songRequestsExtraData, 
    setSongRequestsExtraData, 
    songQueueExtraData, 
    setSongQueueExtraData, 
    songsPlayedExtraData, 
    setSongsPlayedExtraData } = useGlobalContext();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  var songQueue = concert?.getSongQueue();
  var songRequests = concert?.getSongRequests();
  var songsPlayed = concert?.getSongsPlayed();
  var isArtist = concert?.isArtist();
  

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

  function removeItem(arr, name, artist) {
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

  function changeSongStatus(item, status) {
    var obj = {
      "concert_id": item.concert_id,
      "song_name": item.song_name,
      "song_artist": item.song_artist,
      "request_id": item.request_id,
      "user_email": item.user_email,
      "status": status
    };

    songRequests.push(obj);
    
    if (status == 'accepted') {
      songQueue.push(obj);
    }
  }


  return (
      <View>
          <FlatList
              data={data}
              // keyExtractor={(item) => item.orderBy}
              extraData={
                listType == 'requests' ? songRequestsExtraData : 
                listType == 'queue' ? songQueueExtraData : 
                listType == 'played' ? songsPlayedExtraData: 
                null
              }
              scrollEnabled={false}
              renderItem={({ item }) => (

                  <SongCard
                    name={item.song_name}
                    artist={item.song_artist}
                  >

                  {(listType == 'requests' && isArtist) && (
                    <CustomIcon
                    name="check"
                    styles="mr-4"
                    handlePress={async () => {
                      try {
                        await concert?.acceptSong(item.song_name, item.song_artist);

                        removeItem(songRequests, item.song_name, item.song_artist);
                        changeSongStatus(item, 'accepted');
                        setSongRequestsExtraData(songRequests);
                        setSongQueueExtraData(songQueue);
                        console.log(songQueueExtraData);

                        Alert.alert("Success", "Song request accepted");
                      } catch (error) {
                        Alert.alert("Error", error.message);
                      }
                    }}
                    />
                  )}

                  {(listType == 'requests' && isArtist) && (
                    <CustomIcon
                      name="x"
                      styles="mr-4"
                      handlePress={async () => {
                        try {
                          await concert?.denySong(item.song_name, item.song_artist);

                          removeItem(songRequests, item.song_name, item.song_artist);
                          changeSongStatus(item, 'denied');
                          setSongRequestsExtraData(songRequests);
                          setSongQueueExtraData(songQueue);

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
                          await concert?.createSongsPlayed(item.song_name, item.song_artist);
                          
                          await concert?.removeSongQueue(item.song_name, item.song_artist);
                          removeItem(songQueue, item.song_name, item.song_artist);
                          setSongQueueExtraData(songQueue);
                          songsPlayed?.push(item);
                          setSongsPlayedExtraData(songsPlayed);
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
                        await concert?.removeSongQueue(item.song_name, item.song_artist);

                        removeItem(songQueue, item.song_name, item.song_artist);
                        setSongQueueExtraData(songQueue);
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