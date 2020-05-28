import { API_URL } from '@const';

export const LOGIN = {
  url: `${API_URL}/login`,
  method: 'POST',
}

export const SIGNUP = {
  url: `${API_URL}/signup`,
  method: 'POST'
}

export const SEND_OTP = {
  url: `${API_URL}/send-otp`,
  method: 'POST'
}

export const LATEST_NEWS = {
  url: `${API_URL}/latest-news?`,
  method: 'GET'
}

export const TOP_SECTION = {
  url: `${API_URL}/top-section`,
  method: 'GET'
}

export const GET_NEWS_DETAIL = {
  url: `${API_URL}/get-news-detail?id=`,
  method: 'GET'
}

export const GET_VIDEO_DETAIL = {
  url: `${API_URL}/get-video-detail?id=`,
  method: 'GET'
}

export const ADD_COMMENT = {
  url: `${API_URL}/add-comment`,
  method: 'POST',
  header:{
    'Content-Type' : 'application/json'
  }
}

export const ADD_FAVOURITES = {
  url: `${API_URL}/add-favourites`,
  method: 'POST',
  header:{
    'Content-Type' : 'application/json'
  }
}

export const GET_FAV_ITEMS = {
  url: `${API_URL}/get-fav-items`,
  method: 'GET'
}