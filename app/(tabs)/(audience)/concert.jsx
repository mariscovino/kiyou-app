import { Text, FlatList, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConcertCard from '@/components/ConcertCard'
import Header from '../../../components/Header';
import { useGlobalContext } from "@/context/GlobalProvider";
import getData from '@/api/getData.js'
import SongCard from '@/components/SongCard'


const Concert = () => {
  const { user, concert } = useGlobalContext();
  const pin = concert.pin
  const { data: songRequests } = getData('/concerts/getSongRequests', {"pin": pin});
  const { data: songQueue } = getData('/concerts/getSongQueue', {"pin": pin});
  const { data: songsPlayed } = getData('/concerts/getSongsPlayed', {"pin": pin});

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
        <Header username={user?.name} />

        <FlatList
          data={songRequests}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <SongCard
              name={item.song_name}
              artist={item.song_artist}
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
            <SongCard
              name={item.song_name}
              artist={item.song_artist}
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
            <SongCard
              name={item.song_name}
              artist={item.song_artist}
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