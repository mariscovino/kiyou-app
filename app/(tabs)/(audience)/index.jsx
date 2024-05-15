import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput";
import ConcertCard from '@/components/ConcertCard'
import CustomButton from '@/components/CustomButton';
import useAppwrite from "@/lib/useAppwrite";
import { getAudienceConcerts, addConcert } from '@/lib/appwrite';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import FormField from '@/components/FormField';
import { useState } from 'react';
import Header from '../../../components/Header';

const Audience = () => {
    const { user } = useGlobalContext();
    const { data: concerts } = useAppwrite(() => getAudienceConcerts(user.username));
    const [form, setForm] = useState({
      pin: "",
    });
    
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
      <ScrollView className='my-6 px-4 space-y-6'>
          <Header username={user.username} />

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