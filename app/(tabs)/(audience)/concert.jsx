import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useMemo } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import Concert from '@/api/Concert'
import BottomSheet from '@gorhom/bottom-sheet';


const AudienceConcert = () => {
  const concert = new Concert();
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
          data={concert.getSongRequests()}
          order_by="request_id"
          header_text="Songs requested by audience"
          add={true}
        >

        </ListComponent>

        <ListComponent
          data={concert.getSongQueue()}
          order_by="date_created"
          header_text="Songs artist will play"
        />

        <ListComponent
          data={concert.getSongsPlayed()}
          order_by="played_element_id"
          header_text="Songs artist already played"
        />

      </Canvas>
    </GestureHandlerRootView>
  )
}

export default AudienceConcert