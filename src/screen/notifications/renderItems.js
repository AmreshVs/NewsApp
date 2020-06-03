import React from 'react';
import { Icon } from '@ui-kitten/components';

import Notification from '@comp/notification';
import DrawerNav from '@comp/drawerNav';

const RenderItems = ({ item, index, refresh }) => {

  const Top = () => {
    if (index === 0) {
      const RefreshIcon = (props) => {
        return <Icon {...props} name='sync-outline' onPress={refresh} />
      }
      return (
        <>
          <DrawerNav rightAction={RefreshIcon}/>
        </>
      )
    }
    else {
      return null;
    }
  }

  return (
    <>
      <Top/>
      <Notification notification={item} />
    </>
  )
}

export default React.memo(RenderItems);