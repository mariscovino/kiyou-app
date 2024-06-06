import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import Canvas from "../../components/Canvas";
import ConcertList from '../../components/ConcertList'
import getData from '@/api/getData.js'
import User from "@/api/User";

const Home = () => {

  return (
    <Canvas>
      <SearchInput />
      <ConcertList
        data={User.getInstance().getAllConcerts()}
      />
    </Canvas>
  )
}

export default Home