import { FlatList, Text } from 'react-native'
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import ConcertCard from "@/components/ConcertCard";
import Concert from '@/api/Concert';

const ConcertList = (data) => {
    const { user, setConcert } = useGlobalContext();

  return (
    <FlatList
        data={data.data}
        keyExtractor={(item) => item.concert_id}
        scrollEnabled={false}
        renderItem={({ item }) => (
        <ConcertCard
            name={item.concert_name}
            artist={item.artist_email}
            handlePress={() => {
                setConcert(new Concert(item, user));
                if (item.artist_email == user?.email) {
                    router.replace("/../(artist)/concert");
                } else {
                    router.replace("/../(audience)/concert");
                }
            }}
        />
        )}
        ListHeaderComponent={() => (
        <Text className="text-lg font-semibold text-gray-100 my-6">
            All concerts:
        </Text>
        )}
    />
  )
}

export default ConcertList