import { Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "../../../../constants/images";
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField'
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { useState } from 'react';
import { Link } from 'expo-router';
import { createConcert } from '../../../../lib/appwrite'
import { router } from 'expo-router';

const NewArtist = () => {
    const { user } = useGlobalContext();
    const [form, setForm] = useState({
      name: "",
    });

    const submit = async () => {
      if (form.name === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
  
      try {
        await createConcert(form.name, "mscovino");
        
        router.replace("/../../(screens)/concert");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
  
    return (
      <SafeAreaView className='bg-primary h-full'>
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between items-start flex-row mb-6'>
              <View>
                  <Text className='font-medium text-sm text-gray-100'>Welcome Back</Text>
                  <Text className='text-2xl font-semibold text-secondary-200'>{user.username}</Text>
                </View>
  
                <View className="mt-1.5">
                  <Image
                    source={images.logo}
                    className="w-[150px] h-[35px]"
                    resizeMode="contain"
                  />
                </View>
              </View>
              
              <FormField
                title="Concert name"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                otherStyles="mt-7"
              />

            <CustomButton
              title="Create"
              handlePress={submit}
              containerStyles="mt-7"
            />

            <Text className="text-lg text-gray-100 font-regular">
              Go back?
            </Text>
            <Link
              href="/screens/audience/new-concert.jsx"
              className="text-lg font-semibold text-secondary-200"
            >
              New concert - Audience
            </Link>
          </View>
      </SafeAreaView>
    )
  }
  
  export default NewArtist