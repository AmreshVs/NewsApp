import React from 'react';
import NewsBig from '@comp/home/newsBig';
import NewsSmall from '@comp/home/newsSmall';
import VideoBig from '@comp/home/videoBig';
import Statusbar from '@comp/statusbar';
import TopSection from '@comp/home/topSection';

const NewsItems = (item, index) => {
  if(index === 0){
    return(
      <>
        <Statusbar/>
        <TopSection/>
      </>
    )
  }
  if(item.type === 'news'){
    return index % 4 === 0 ? <NewsBig key={item.id} id={item.id} title={item.title} featured_img={item.featured_img} posted_on={item.posted_on} /> : <NewsSmall key={item.id} id={item.id} title={item.title} featured_img={item.featured_img} posted_on={item.posted_on} />
  }
  else if(item.type === 'videos'){
    return <VideoBig key={item.id} id={item.id} title={item.title} url={item.url} featured_img={item.featured_img} posted_on={item.posted_on} />
  }
}

export default NewsItems;
