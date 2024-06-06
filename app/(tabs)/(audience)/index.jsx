import { Text, View, FlatList, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "@/components/SearchInput";
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import FormField from '@/components/FormField';
import { useState } from 'react';
import Canvas from '@/components/Canvas'
import ConcertList from '@/components/ConcertList'
import User from "@/api/User"

const Audience = () => {
    const { setConcert } = useGlobalContext();
    const [form, setForm] = useState({
      pin: "",
    });
    
    const join = async () => {
        if (form.pin != "") {
            try {
            const concert = await User.joinConcert(form.pin);
            setConcert(concert.data);
            router.replace("/../(audience)/concert");
            } catch (error) {
            Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert("Error", "Please fill in all fields");
        }
    };

  return (
    <Canvas>
          <SearchInput />
            <Text className="text-lg font-semibold text-gray-100 mb-3 mt-7">
              Join existing concert
            </Text>

            <FormField
              title="Concert pin"
              value={form.pin}
              handleChangeText={(e) => setForm({ ...form, pin: e })}
              otherStyles="mt-3"
            />

          <CustomButton
            title="Join"
            handlePress={join}
            containerStyles="mt-7"
          />

          <ConcertList
            data={User.getInstance().getAudienceConcerts()}
          />

    </Canvas>
  )
}

export default Audience