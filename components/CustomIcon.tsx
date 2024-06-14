import { TouchableOpacity } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons'

const CustomIcon = ({ name, styles, handlePress }: any) => {
  return (
    <TouchableOpacity
        className={styles}
        onPress={handlePress}
        activeOpacity={0.7}>
        <Octicons name={name} size={20} color="white"/>
    </TouchableOpacity>
  )
}

export default CustomIcon