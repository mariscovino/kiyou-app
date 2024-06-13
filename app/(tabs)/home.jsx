import { useGlobalContext } from "@/context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import Canvas from "../../components/Canvas";
import ConcertList from '../../components/ConcertList'
import User from "@/api/User";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <Canvas>
      <SearchInput />
      <ConcertList
        data={User.getInstance(user).getAllConcerts()}
      />
    </Canvas>
  )
}

export default Home