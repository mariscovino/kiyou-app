import React from 'react'
import { Stack } from 'expo-router'

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="new-concert" options={{ headerShown: false }}/>
      <Stack.Screen name="concert" options={{ headerShown: false }}/>
      <Stack.Screen name="(artist)" options={{ headerShown: false }}/>
      <Stack.Screen name="(audience)" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default ScreensLayout