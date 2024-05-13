import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "../../components/SearchInput";
import ConcertCard from '../../components/ConcertCard'
import images from "../../constants/images";
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import useAppwrite from "../../lib/useAppwrite";
import { getUserConcerts } from '@/lib/appwrite';

const Home = () => {
  const { data: concerts } = useAppwrite(() => getUserConcerts("663edad10025dbd9f622","mscovino"));

  const [form, setForm] = useState({
    new: "",
  });

  const submit = async () => {}

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={concerts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ConcertCard
            name={item.name}
            artist={item.artist}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-medium text-sm text-gray-100'>Welcome Back</Text>
                <Text className='text-2xl font-semibold text-secondary-200'>mscovino</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logo}
                  className="w-[150px] h-[35px]"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1">
              <Text className="text-lg font-regular text-gray-100 mb-3">
                Your concerts:
              </Text>
            </View>
            <CustomButton
            title="New concert"
            handlePress={submit}
            containerStyles="mt-7 my-4"
          />
          </View>
        )}
        />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})