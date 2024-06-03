import { useState, useRef, useMemo } from 'react';
import { Modal, Alert, Text, View } from 'react-native'
import { useGlobalContext } from "@/context/GlobalProvider"
import FormField from './FormField';
import client from '../api/client';

const SongSheet = (url, email) => {
    const { user, concert } = useGlobalContext();
    const [form, setForm] = useState({
        pin: concert.pin,
        song_name: "",
        song_artist: "",
        ...(email && { email: user.email })
    });

    const submit = async () => {
        try {
            await client.post(url, form);
            isOpen = false;
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

  return (
    <Modal
        className='bg-primary'
        visible={true}
        transparent
        animationType='fade'
        statusBarTranslucent
        >
            <View>
                <Text>Enter Song</Text>
                <FormField
                    title="Song Name"
                    value={form.song_name}
                    placeholder="Enter song name"
                    handleChangeText={(e) => setForm({ ...form, name: e })}
                />
                <FormField
                    title="Song artist"
                    value={form.song_artist}
                    placeholder="Enter song artist"
                    handleChangeText={(e) => setForm({ ...form, artist: e })}
                />
                <CustomButton
                    title="Submit"
                    handlePress={submit}
                />
            </View>            
    </Modal>
  )
}

export default SongSheet