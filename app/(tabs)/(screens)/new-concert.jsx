import { Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../../constants/images';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from 'expo-router';

const New = () => {
  const { user } = useGlobalContext();
  
  const artist = async () => {router.push("../(screens)/(artist)/new-concert")}
  const audience = async () => {router.push("../(screens)/(audience)/new-concert")}

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
            <Text className="text-lg font-regular text-gray-100 mb-3 w-full">
                Select role:
            </Text>

            <CustomButton
            title="Artist"
            handlePress={artist}
            containerStyles="mt-7 my-4"
            />
            <CustomButton
            title="Audience"
            handlePress={audience}
            containerStyles="mt-7 my-4"
            />
        </View>
    </SafeAreaView>
  )
}

export default New