import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput";
import ConcertCard from '@/components/ConcertCard'
import CustomButton from '@/components/CustomButton';
import useAppwrite from "@/lib/useAppwrite";
import Header from '../../../components/Header';
import { getArtistConcerts, createConcert } from '@/lib/appwrite';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import FormField from '@/components/FormField';
import { useState } from 'react';

const Artist = () => {
    const { user } = useGlobalContext();
    const { data: concerts } = useAppwrite(() => getArtistConcerts(user.username));
    const [form, setForm] = useState({
      name: "",
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
  
    return (
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView className='my-6 px-4 space-y-6'>
            <Header username={user.username} />
  
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
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default Artist