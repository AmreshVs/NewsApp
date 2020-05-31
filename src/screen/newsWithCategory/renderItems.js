import React from 'react';

import NewsBig from '@comp/home/newsBig';
import NewsSmall from '@comp/home/newsSmall';
import VideoBig from '@comp/home/videoBig';

const RenderItems = ({ id, item, index }) => {

  if (item.type === 'news') {
    return index % 4 === 0
      ?
        <NewsBig key={item.id} data={item} />
      :
        <NewsSmall key={item.id} data={item} />
  }
  else {
    return (
      <VideoBig key={item.id} data={item} />
    )
  }
}

export default React.memo(RenderItems);