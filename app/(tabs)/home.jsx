import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import Canvas from "../../components/Canvas";
import ConcertList from '../../components/ConcertList'
import getData from '@/api/getData.js'

const Home = () => {
  const { user } = useGlobalContext();
  const { data: concerts } =  getData('/users/getAllConcerts', {"email": user.email});
  return (
    <Canvas>
      <SearchInput />
      <ConcertList
        data={concerts}
      />
    </Canvas>
  )
}

export default Home