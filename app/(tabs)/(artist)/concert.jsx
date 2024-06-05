import { View, Text, Button } from 'react-native'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import CustomIcon from '@/components/CustomIcon';
import Concert from '@/api/Concert'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import SongSheet from '@/components/SongSheet';

const ArtistConcert = () => {
  const concert = new Concert();
  const bottomSheetRef = useRef(null);

  const acceptRequest = async () => {

  }

  const denyRequest = async () => {

  }

  const addQueue = async () => {
    
  }

  const removeQueue = async () => {

  }

  return (
    <GestureHandlerRootView>
      <Canvas>

        <ListComponent
        data={concert.getSongRequests()}
        order_by="request_id"
        header_text="Songs requested by audience"
        >
          <CustomIcon
            name="check"
            styles="mr-4"
            handlePress={acceptRequest}
          />

          <CustomIcon
            name="x"
            styles="mr-4"
            handlePress={denyRequest}
          />
        </ListComponent>

        <ListComponent
        data={concert.getSongQueue()}
        order_by="date_created"
        header_text="Songs you will play"
        add={true}
        bottomSheetRef={bottomSheetRef}
        >
          <CustomIcon
            name="check"
            styles="mr-4"
            handlePress={addQueue}
          />

          <CustomIcon
            name="trash"
            styles="mr-4"
            handlePress={removeQueue}
          />
        </ListComponent>

        <ListComponent
        data={concert.getSongsPlayed()}
        order_by="played_element_id"
        header_text="Songs you already played"
        />

      </Canvas>
      <SongSheet bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  )
}

export default ArtistConcert