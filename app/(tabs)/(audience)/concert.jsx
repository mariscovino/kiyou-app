import { useGlobalContext } from "@/context/GlobalProvider"
import { useState } from 'react'
import Canvas from '@/components/Canvas'
import ListComponent from '@/components/ListComponent';
import CustomIcon from '@/components/CustomIcon';
import getData from '@/api/getData.js'


const Concert = () => {
  const { user, concert } = useGlobalContext();
  const pin = concert.pin
  const { data: songRequests } = getData('/concerts/getSongRequests', {"pin": pin});
  const { data: songQueue } = getData('/concerts/getSongQueue', {"pin": pin});
  const { data: songsPlayed } = getData('/concerts/getSongsPlayed', {"pin": pin});

  return (
    <Canvas>

      <ListComponent
        data={songRequests}
        order_by="request_id"
        header_text="Songs requested by audience"
        add={true}
        url="/concerts/createSongRequests"
        email={true}
      >

      </ListComponent>

      <ListComponent
        data={songQueue}
        order_by="date_created"
        header_text="Songs artist will play"
      />

      <ListComponent
        data={songsPlayed}
        order_by="played_element_id"
        header_text="Songs artist already played"
      />

    </Canvas>
  )
}

export default Concert