import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import Concert from '@/api/Concert'
import SongSheet from '@/components/SongSheet'

const AudienceConcert = () => {
  const concert = new Concert();
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
          data={concert.getSongRequests()}
          order_by="request_id"
          header_text="Songs requested by audience"
          add={true}
          bottomSheetRef={bottomSheetRef}
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

      <SongSheet
        bottomSheetRef={bottomSheetRef}
        submitType="requests"
      />
    </GestureHandlerRootView>
  )
}

export default AudienceConcert