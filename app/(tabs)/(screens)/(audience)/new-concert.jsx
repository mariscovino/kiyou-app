import { Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "../../../../constants/images";
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField'
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { useState } from 'react';
import { Link } from 'expo-router';
import { addConcert } from '../../../../lib/appwrite'
import { router } from 'expo-router';

const NewAudience = () => {
    const { user } = useGlobalContext();
    const [form, setForm] = useState({
      pin: "",
    });

    const submit = async () => {
      if (form.pin === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
  
      try {
        await addConcert(parseInt(form.pin), user.username);
        
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
                title="Concert pin"
                value={form.pin}
                handleChangeText={(e) => setForm({ ...form, pin: e })}
                otherStyles="mt-7"
              />

            <CustomButton
              title="Join"
              handlePress={submit}
              containerStyles="mt-7"
            />

            <View className="flex justify-center flex-row">
              <Text className="text-lg text-gray-100 font-regular">
                Go back?
              </Text>
              <Text> </Text>
              <Link
                href="/../../(screens)/(artist)/new-concert"
                className="text-lg font-semibold text-secondary-200"
              >
                New concert - Artist
              </Link>
            </View>
          </View>
      </SafeAreaView>
    )
  }
  
  export default NewAudience