import { Text, FlatList, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConcertCard from '@/components/ConcertCard'
import Header from '../../../components/Header';
import { useGlobalContext } from "@/context/GlobalProvider";
import client from '@/api/client.js'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const Concert = () => {
  const { user, concert } = useGlobalContext();
  const pin = concert.pin
  const songRequests = client.post('/concerts/getSongRequests', {"pin": pin})
  const songQueue = client.post('/concerts/getSongQueue', {"pin": pin});
  const songsPlayed  = client.post('/concerts/getSongsPlayed', {"pin": pin});

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
              Songs artist will play:
            </Text>
            )}
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
              Songs artist already played:
            </Text>
            )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Concert