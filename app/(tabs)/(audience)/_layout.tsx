import React from 'react'
import { Stack } from 'expo-router'

const AudienceLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="concert" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default AudienceLayout