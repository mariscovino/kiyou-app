import { useGlobalContext } from "@/context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import Canvas from "../../components/Canvas";
import ConcertList from '../../components/ConcertList'
import User from "@/api/User";
import { GlobalContextType } from "@/context/GlobalContextType";
import { useContext } from "react";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <Canvas>
      <SearchInput />
      <ConcertList
        data={user?.getAllConcerts()}
      />
    </Canvas>
  )
}

export default Home