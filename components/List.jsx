import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const List = (data, order_by) => {

  return (
    <View>
        <FlatList
            data={data.data}
            keyExtractor={(item) => item[order_by]}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <ConcertCard
                name={item.name}
                artist={item.artist}
                />
            )}
            ListHeaderComponent={() => (
                <Text className="text-lg font-semibold text-gray-100 my-6">
                Songs you will play:
                </Text>
                )}
        />
    </View>
    
  )
}

export default List