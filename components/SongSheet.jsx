import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useMemo, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { Octicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Concert from '@/api/Concert';


const SongSheet = ({ bottomSheetRef, submitType }) => {
    const concert = new Concert();
    const { refresh, setRefresh } = useGlobalContext();

    const snapPoints = useMemo(() => ['40%', '50%', '70%'], []);
    const handleClosePress = () => bottomSheetRef.current?.close();
    const [form, setForm] = useState({
        song_name: "",
        song_artist: "",
      });

      const submit = () => {
        try {
          if (submitType === "queue") {
              concert.createSongQueue(form.song_name, form.song_artist);
          } else if (submitType === "requests") {
              concert.createSongRequest(form.song_name, form.song_artist);
          } else {
              concert.createSongsPlayed(form.song_name, form.song_artist);
          }
  
          Alert.alert("Success", "Song added successfully");

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
          <SafeAreaView className="h-full">
            <KeyboardAvoidingView
              enabled
              className='flex-1'
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <ScrollView>
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
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
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