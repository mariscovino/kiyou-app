import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput"
import ConcertCard from '@/components/ConcertCard'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from "@/context/GlobalProvider"
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import { useState } from 'react'
import client from '@/api/client.js'
import getData from '@/api/getData.js'
import Canvas from '@/components/Canvas'
import ConcertList from '@/components/ConcertList'
import User from "@/api/User"

const Artist = () => {
    const user = User.getInstance();
    const { setConcert } = useGlobalContext();
    const [form, setForm] = useState({
      name: "",
    });
  
    const create = async () => {
      if (form.name != "") {
        try {
          const concert = await user.createConcert(form.name);
          setConcert(concert.data);
          router.replace("/../(artist)/concert");
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else {
        Alert.alert("Error", "Please fill in all fields");
      }
    };
  
    return (
      <Canvas>
        <SearchInput />
        <View className="w-full flex-1">
          <Text className="text-lg font-semibold text-gray-100 mb-3 mt-7">
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

        <ConcertList
          data={user.getArtistConcerts()}
        />
      </Canvas>
    )
}

export default Artist