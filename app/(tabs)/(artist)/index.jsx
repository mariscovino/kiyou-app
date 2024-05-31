import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput"
import ConcertCard from '@/components/ConcertCard'
import CustomButton from '@/components/CustomButton'
import Header from '../../../components/Header'
import { useGlobalContext } from "@/context/GlobalProvider"
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import { useState } from 'react'
import client from '@/api/client.js'
import getData from '@/api/getData.js'

const Artist = () => {
    const { user, setConcert } = useGlobalContext();
    const { data: concerts } = getData('/users/getArtistConcerts', {"email": user.email});
    const [form, setForm] = useState({
      name: "",
    });
  
    const create = async () => {
      if (form.name != "") {
        try {
          const concert = client.post('/users/createConcert', {"concert_name": form.name, "email": form.email})
          setConcert(concert);
          router.replace("/../(artist)/concert");
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else {
        Alert.alert("Error", "Please fill in all fields");
      }
    };
  
    return (
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView className='my-6 px-4 space-y-6'>
            <Header username={user.name} />
  
            <SearchInput />
  
            <View className="w-full flex justify-centerpx-4">
  
              <View className="w-full flex-1">
                <Text className="text-lg font-semibold text-gray-100 mb-3">
                  Create new concert 
                </Text>
              </View>
  
              <FormField
                  title="Concert name"
                  value={form.name}
                  handleChangeText={(e) => setForm({ ...form, name: e })}
                  otherStyles="mt-3"
                />
  
              <CustomButton
                title="Create"
                handlePress={create}
                containerStyles="mt-7"
              />
  
          <FlatList
            data={[concerts]}
            keyExtractor={(item) => item.concert_id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ConcertCard
                name={item.concert_name}
                artist={item.artist_email}
              />
            )}
            ListHeaderComponent={() => (
              <Text className="text-lg font-semibold text-gray-100 my-6">
                All concerts:
              </Text>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default Artist