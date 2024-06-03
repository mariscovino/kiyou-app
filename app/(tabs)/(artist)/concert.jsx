import { useGlobalContext } from "@/context/GlobalProvider"
import { useState } from 'react'
import Canvas from '@/components/Canvas'
import List from '@/components/List';
import CustomIcon from '@/components/CustomIcon';
import getData from '@/api/getData.js'

const Concert = () => {
  const { user, concert } = useGlobalContext();
  const [form, setForm] = useState({
    played_name: "",
    queue_name: "",
  });
  const pin = concert.pin
  const { data: songRequests } = getData('/concerts/getSongRequests', {"pin": pin});
  const { data: songQueue } = getData('/concerts/getSongQueue', {"pin": pin});
  const { data: songsPlayed } = getData('/concerts/getSongsPlayed', {"pin": pin});

  const acceptRequest = async () => {

  }

  const denyRequest = async () => {

  }

  const addQueue = async () => {
    
  }

  const removeQueue = async () => {

  }

  return (
    <Canvas>

      <List
      data={songRequests}
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
      </List>

      <List
      data={songQueue}
      order_by="date_created"
      header_text="Songs you will play"
      add={true}
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
      </List>

      <List
      data={songsPlayed}
      order_by="played_element_id"
      header_text="Songs you already played"
      />

    </Canvas>
  )
}

export default Concert