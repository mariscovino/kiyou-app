import { View, Text, Image } from 'react-native'
import images from "@/constants/images";

const Header = ({username}) => {
  return (
    <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='font-medium text-sm text-gray-100'>Welcome Back</Text>
              <Text className='text-2xl font-semibold text-secondary-200'>{username}</Text>
            </View>

            <View className="mt-1.5">
              <Image
                source={images.logo}
                className="w-[150px] h-[35px]"
                resizeMode="contain"
              />
            </View>
          </View>
  )
}

export default Header