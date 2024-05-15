import { Text, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "../../components/SearchInput";
import ConcertCard from '../../components/ConcertCard'
import useAppwrite from "../../lib/useAppwrite";
import { getAllConcerts, createConcert, addConcert } from '../../lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router';
import { useState } from 'react';
import Header from '@/components/Header'

const Home = () => {
  const { user } = useGlobalContext();
  const { data: concerts } = useAppwrite(() => getAllConcerts(user.username));
  const [form, setForm] = useState({
    name: "",
    pin: "",
  });

  const create = async () => {
    if (form.name != "") {
      try {
        await createConcert(form.name, "mscovino");
        
        router.replace("/../../(screens)/(artist)/concert");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const join = async () => {
    if (form.pin != "") {
      try {
        await addConcert(parseInt(form.pin), user.username);
        
        router.replace("/../../(screens)/(audience)/concert");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
          <Header username={user.username} />

      <SearchInput />

        <FlatList
          data={concerts}
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
              All concerts:
            </Text>
            )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home