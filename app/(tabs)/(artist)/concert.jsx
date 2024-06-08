import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef, useState } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import Concert from '@/api/Concert'
import SongSheet from '@/components/SongSheet';

const ArtistConcert = () => {
  const bottomSheetRef = useRef(null);
  const concert = new Concert();
  const [extraData, setExtraData] = useState([]);
  // console.log(extraData);

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
          listType="requests"
        >
        </ListComponent>

        <ListComponent
          listType="queue"
          bottomSheetRef={bottomSheetRef}
        >
          
        </ListComponent>

        <ListComponent
          listType="played"
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