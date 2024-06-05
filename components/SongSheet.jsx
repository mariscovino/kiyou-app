import { View, StyleSheet, Alert } from 'react-native'
import { useMemo, useState } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { Octicons } from '@expo/vector-icons';


const SongSheet = ({ bottomSheetRef, submitType }) => {
    const snapPoints = useMemo(() => ['40%', '50%', '70%'], []);
    const handleClosePress = () => bottomSheetRef.current?.close();
    const [form, setForm] = useState({
        song_name: "",
        song_artist: "",
      });

      const submit = () => {
        try {
            if (submitType === "queue") {
                // add song to queue
              } else if (submitType === "requests") {
                  // add song to requests
              } else {
                  // add song to played
              }
      
              handleClosePress();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
      }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{backgroundColor: '#0f0f0f'}}
      handleIndicatorStyle={{backgroundColor: '#ffffff'}}
      animateOnMount={true}>
        <View style={styles.container}>

            <View className='items-end'>
                <Octicons name="chevron-down" size={28} color="#ffffff" onPress={handleClosePress} />
            </View>

            <FormField
                title="Song name"
                value={form.song_name}
                handleChangeText={(e) => setForm({ ...form, song_name: e })}
            />

            <FormField
                title="Song artist"
                value={form.song_artist}
                handleChangeText={(e) => setForm({ ...form, song_artist: e })}
                otherStyles="mt-7"
            />

            <CustomButton
                title="Submit"
                handlePress={submit}
                containerStyles="mt-7"
            />
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
      marginTop: 8,
      marginBottom: 20,
      borderRadius: 16,
      borderColor: "#232533",
      fontSize: 16,
      lineHeight: 24,
      padding: 8,
      backgroundColor: 'rgba(151, 151, 151, 0.25)',
      height: 64,
      fontFamily: 'Nunito-SemiBold',
      color: 'rgb(255 255 255)',
    },
  });

export default SongSheet