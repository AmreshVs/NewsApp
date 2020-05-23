import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import moment from 'moment';

const current_date = new Date();

var cmin = current_date.getMinutes();
var cday = current_date.getDate();
var chrs = current_date.getHours();

const PostedTime = (posted_date) => {

  if(moment(posted_date).fromNow() === 'a few seconds ago'){
    return 'now';
  }
  else{
    return moment(posted_date).fromNow()
  }

  // TimeAgo.addLocale(en);
  // const timeAgo = new TimeAgo('en-US');

  // let min = posted_date.getMinutes();
  // let day = posted_date.getDate();
  // let hrs = posted_date.getHours();

  // if (cmin == min) {
  //   // Just Now
  //   return timeAgo.format(posted_date);
  // }
  // else if (cday <= day && cmin < min && chrs >= hrs) {
  //   // Mins
  //   return timeAgo.format(posted_date - 60 * 1000);
  // }
  // else if (cday <= day && cmin > min && chrs > hrs) {
  //   // Hrs
  //   return timeAgo.format(posted_date - 2 * 60 * 60 * 1000);
  // }
  // else if (cday > day && cmin > min && chrs > hrs) {
  //   // Days
  //   return timeAgo.format(posted_date - 24 * 60 * 60 * 1000);
  // }
}

export default PostedTime;