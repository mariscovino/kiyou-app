import { Text, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConcertCard from '@/components/ConcertCard'
import Header from '../../../components/Header';
import { useGlobalContext } from "@/context/GlobalProvider";

const Concert = () => {
  const { user, concert } = useGlobalContext();
  const songRequests = concert.songRequests;
  const songQueue = concert.songQueue;
  const songsPlayed  = concert.songsPlayed;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
        <Header username={user.username} />

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