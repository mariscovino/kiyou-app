import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput";
import ConcertCard from '@/components/ConcertCard'
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import FormField from '@/components/FormField';
import { useState } from 'react';
import Header from '../../../components/Header';
import client from '@/api/client.js';
import getData from '@/api/getData.js'

const Audience = () => {
    const { user, setConcert } = useGlobalContext();
    const { data: concerts } = getData('/users/getAudienceConcerts', {"email": user.email});
    const [form, setForm] = useState({
      pin: "",
    });
    
    const join = async () => {
        if (form.pin != "") {
            try {
            const concert = client.post('/users/joinConcert', {"pin": form.pin});
            setConcert(concert);
            router.replace("/../(audience)/concert");
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
            <Text className="text-lg font-semibold text-gray-100 mb-3">
              Join existing concert
            </Text>

            <FormField
              title="Concert pin"
              value={form.pin}
              handleChangeText={(e) => setForm({ ...form, pin: e })}
              otherStyles="mt-3"
            />

          <CustomButton
            title="Join"
            handlePress={join}
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
              Your audience concerts:
            </Text>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Audience