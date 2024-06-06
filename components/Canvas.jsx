import { SafeAreaView, ScrollView, Image, Text, View } from 'react-native'
import { useGlobalContext } from "@/context/GlobalProvider";
import images from "@/constants/images";

const Canvas = ({ children }) => {
    const { user } = useGlobalContext();

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
        <View className='justify-between items-start flex-row mb-6'>
            <View>
                <Text className='font-medium text-sm text-gray-100'>Welcome Back</Text>
                <Text className='text-2xl font-semibold text-secondary-200'>{user?.name}</Text>
            </View>

            <View className="mt-1.5">
                <Image
                source={images.logo}
                className="w-[150px] h-[35px]"
                resizeMode="contain"
                />
            </View>
        </View>

      { children }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Canvas