import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import Concert from '@/api/Concert'
import SongSheet from '@/components/SongSheet';

const ArtistConcert = () => {
  const concert = new Concert();
  const songQueue = concert.getSongQueue();
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
          data={concert.getSongRequests()}
          order_by="request_id"
          header_text="Songs requested by audience"
          listType="requests"
        >
        </ListComponent>

        <ListComponent
          data={songQueue}
          order_by="date_created"
          header_text="Songs you will play"
          listType="queue"
          add={true}
          bottomSheetRef={bottomSheetRef}
        >
          
        </ListComponent>

        <ListComponent
          data={concert.getSongsPlayed()}
          order_by="played_element_id"
          header_text="Songs you already played"
        />

      </Canvas>
      <SongSheet
        bottomSheetRef={bottomSheetRef}
        submitType="queue"
      />
    </GestureHandlerRootView>
  )
}

export default ArtistConcert