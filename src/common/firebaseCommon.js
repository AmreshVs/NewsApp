import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

import { navigate } from '@routes/outsideRoute';

export const NotificationListeners = () => {
  getToken();

  // Background Handler
  messaging().onNotificationOpenedApp(payload => {
    console.log(
      'Notification caused app to open from background state:',
      payload,
    );

    handleNotification(payload.data);
  });

  // Quit Handler
  messaging().getInitialNotification()
    .then(payload => {
      if (payload) {
        console.log(
          'Notification caused app to open from quit state:',
          payload.notification,
        );
        setTimeout(() => {
          handleNotification(payload.data);
        }, 1000)
      }
    });

  // Foreground Handler
  messaging().onMessage((payload) => {
    console.log('Message received. ', payload);
    let title = payload.notification.title;
    let body = payload.notification.body;
    Alert.alert(
      title, body,
      [
        { text: 'Open', onPress: () => handleNotification(payload.data) },
      ],
      { cancelable: true },
    );
    
  });
}

export const getToken = async () => {
  console.log(await messaging().getToken());
}

const handleNotification = (data) => {
  if(data.type === 'news'){
    if(data.display === 'detail'){
      navigate('NewsDetail', { id: data.id, type: data.type });
    }
  }
  
  if(data.type === 'videos'){
    if(data.display === 'detail'){
      navigate('NewsDetail', { id: data.id, type: data.type });
    }
    else{
      navigate('VerticalFullScreenVideo', { url: data.url })
    }
  }
  
  if(data.type === 'pdf'){
    if(data.display === 'detail'){
      navigate('PDFViewer', { url: data.url });
    }
  }
}