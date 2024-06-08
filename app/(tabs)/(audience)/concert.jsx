import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import Concert from '@/api/Concert'
import SongSheet from '@/components/SongSheet'

const AudienceConcert = () => {
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
          listType="requests"
          bottomSheetRef={bottomSheetRef}
        >

        </ListComponent>

        <ListComponent
          listType="queue"
        />

        <ListComponent
          listType="played"
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