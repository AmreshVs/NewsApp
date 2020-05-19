import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  videoPlayer:{
    width: '100%',
    height: '100%',
  },
  theme:{
    title: '#FFF',
    more: '#446984',
    center: '#7B8F99',
    fullscreen: '#446984',
    volume: '#A5957B',
    scrubberThumb: '#234458',
    scrubberBar: '#DBD5C7',
    seconds: '#DBD5C7',
    duration: '#DBD5C7',
    progress: '#446984',
    loading: '#DBD5C7'
  }
})

export default themedStyle;