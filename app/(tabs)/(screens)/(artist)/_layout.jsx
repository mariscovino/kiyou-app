import React from 'react'
import { Stack } from 'expo-router'

const ArtistLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="new-concert" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default ArtistLayout