import React from 'react'
import { Stack } from 'expo-router'

const ArtistLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="concert" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default ArtistLayout