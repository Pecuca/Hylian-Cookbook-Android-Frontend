import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';

export default function BackgroundVideo() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Video
        source={require('../../assets/videos/background.mp4')}
        style={StyleSheet.absoluteFillObject}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
      />
      <BlurView intensity={30} style={StyleSheet.absoluteFillObject} tint="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
