import { Text, FlatList, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConcertCard from '@/components/ConcertCard'
import Header from '../../../components/Header';
import { useGlobalContext } from "@/context/GlobalProvider";
import { useState } from 'react';
import getData from '@/api/getData.js'

const Concert = () => {
  const { user, concert } = useGlobalContext();
  const [form, setForm] = useState({
    played_name: "",
    queue_name: "",
  });
  const pin = concert.pin
  const { data: songRequests } = getData('/concerts/getSongRequests', {"pin": pin});
  const { data: songQueue } = getData('/concerts/getSongQueue', {"pin": pin});
  const { data: songsPlayed } = getData('/concerts/getSongsPlayed', {"pin": pin});

  const addPlayed = async () => {

  }

  const addQueue = async () => {
    
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
        <Header username={user?.name} />

        <FlatList
          data={songRequests}
          keyExtractor={(item) => item.request_id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ConcertCard
              name={item.name}
              artist={item.artist}
            />
          )}
          ListHeaderComponent={() => (
            <Text className="text-lg font-semibold text-gray-100 my-6">
              Songs requested by audience:
            </Text>
            )}
        />

        <FlatList
          data={songQueue}
          keyExtractor={(item) => item.date_created}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ConcertCard
              name={item.name}
              artist={item.artist}
            />
          )}
          ListHeaderComponent={() => (
            <Text className="text-lg font-semibold text-gray-100 my-6">
              Songs you will play:
            </Text>
            )}
        />

        <FlatList
          data={songsPlayed}
          keyExtractor={(item) => item.played_element_id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ConcertCard
              name={item.name}
              artist={item.artist}
            />
          )}
          ListHeaderComponent={() => (
            <Text className="text-lg font-semibold text-gray-100 my-6">
              Songs you already played:
            </Text>
            )}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Concert