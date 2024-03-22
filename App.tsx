import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video, {
  OnPictureInPictureStatusChangedData,
  OnVideoErrorData,
  ResizeMode,
  VideoRef,
} from 'react-native-video';

function App(): React.JSX.Element {
  const videoRef = useRef<VideoRef>();
  const [PiP, setPiP] = useState<boolean>(false);

  const onError = useCallback((error: OnVideoErrorData) => {
    console.log({error});
  }, []);
  const onPictureInPictureStatusChanged = useCallback(
    (data: OnPictureInPictureStatusChangedData) => {
      console.log({data});
      if (!data.isActive) {
        setPiP(false);
      }
    },
    [],
  );
  const onRestoreUserInterfaceForPictureInPictureStop = useCallback(() => {
    console.log('onRestoreUserInterfaceForPictureInPictureStop');
    videoRef.current?.restoreUserInterfaceForPictureInPictureStopCompleted(
      true,
    );
  }, []);

  console.log({PiP});
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{
            uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          onError={onError}
          style={styles.backgroundVideo}
          resizeMode={ResizeMode.CONTAIN}
          pictureInPicture={PiP}
          controls={false}
          onPictureInPictureStatusChanged={onPictureInPictureStatusChanged}
          onRestoreUserInterfaceForPictureInPictureStop={
            onRestoreUserInterfaceForPictureInPictureStop
          }
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setPiP(true);
          }}>
          <Text>PiP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: '100%',
    height: 500,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
