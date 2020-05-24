import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet } from 'react-native';

export const FullscreenOpen = () => {
  return (
    <Icon size={20} color='#FFF' name='resize-full-screen' />
  )
};

export const FullscreenClose = () => {
  return (
    <Icon size={20} color='#FFF' name='resize-100-' />
  )
};

export const VideoPlay = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-play' />
  )
};

export const VideoPause = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-paus' />
  )
};

export const VideoSkipBack = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-fast-backward' />
  )
};

export const VideoSkipForward = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-fast-forward' />
  )
};

export const VideoNext = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-next' />
  )
};


export const VideoPrevious = () => {
  return (
    <Icon size={20} color='#FFF' name='controller-jump-to-start' />
  )
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});