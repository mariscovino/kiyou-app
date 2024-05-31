import { Text, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Header from '@/components/Header'
import SearchInput from "../../components/SearchInput";
import ConcertCard from '../../components/ConcertCard'
import client from '@/api/client.js';
import getData from '@/api/getData.js'

const Home = () => {
  const { user } = useGlobalContext();

  const { data: concerts } =  getData('/users/getAllConcerts', {"email": user.email});

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='my-6 px-4'>
          <Header username={user?.name} />

      <SearchInput />

        <FlatList
          data={concerts}
          keyExtractor={(item) => item.$concert_id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ConcertCard
              name={item.concert_name}
              artist={item.artist_email}
            />
          )}
          ListHeaderComponent={() => (
            <Text className="text-lg font-semibold text-gray-100 my-6">
              All concerts:
            </Text>
            )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home