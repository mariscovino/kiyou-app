import { Text, FlatList, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConcertCard from '@/components/ConcertCard'
import Header from '../../../components/Header';
import { useGlobalContext } from "@/context/GlobalProvider";
import client from '@/api/client.js'
import { useState } from 'react';
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const Concert = () => {
  const { user, concert } = useGlobalContext();
  const [form, setForm] = useState({
    played_name: "",
    queue_name: "",
  });
  const pin = concert.pin
  const songRequests = client.post('/concerts/getSongRequests', {"pin": pin})
  const songQueue = client.post('/concerts/getSongQueue', {"pin": pin});
  const songsPlayed  = client.post('/concerts/getSongsPlayed', {"pin": pin});

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
          keyExtractor={(item) => item.id}
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

        <View className="w-full flex-1">
          <Text className="text-lg font-semibold text-gray-100 mb-3">
            Add song
          </Text>
        </View>
  
        <FormField
            title="Song name"
            value={form.queue_name}
            handleChangeText={(e) => setForm({ ...form, queue_name: e })}
            otherStyles="mt-3"
          />

        <CustomButton
          title="Add"
          handlePress={addQueue}
          containerStyles="mt-7"
        />

        <FlatList
          data={songsPlayed}
          keyExtractor={(item) => item.id}
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

        <View className="w-full flex-1">
          <Text className="text-lg font-semibold text-gray-100 mb-3">
            Add song
          </Text>
        </View>
  
        <FormField
            title="Song name"
            value={form.played_name}
            handleChangeText={(e) => setForm({ ...form, played_name: e })}
            otherStyles="mt-3"
          />

        <CustomButton
          title="Add"
          handlePress={addPlayed}
          containerStyles="mt-7"
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Concert