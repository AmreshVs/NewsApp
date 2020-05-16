import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { ThemeContext } from '../../theme/themeContext';

const Main = ({ navigation }) => {

  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>OPEN DETAILS</Button>
        <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
      </Layout>
    </>
  );
};

export default Main;