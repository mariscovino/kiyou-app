import { Text, Alert } from 'react-native'
import SearchInput from "@/components/SearchInput";
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from 'expo-router';
import FormField from '@/components/FormField';
import { useState } from 'react';
import Canvas from '@/components/Canvas'
import ConcertList from '@/components/ConcertList'
import Concert from '@/api/Concert'

const Audience = () => {
    const { user, setConcert } = useGlobalContext();
    const [form, setForm] = useState({
      pin: "",
    });
    
    const join = async () => {
        if (form.pin != "") {
            try {
            const concert = await user.joinConcert(form.pin);
            setConcert(new Concert(concert.data, user));
            router.replace("/../(audience)/concert");
            } catch (error: any) {
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
              handleChangeText={(e: any) => setForm({ ...form, pin: e })}
              otherStyles="mt-3"
            />

          <CustomButton
            title="Join"
            handlePress={join}
            containerStyles="mt-7"
          />

          <ConcertList
            data={user.getAudienceConcerts()}
          />

    </Canvas>
  )
}

export default Audience