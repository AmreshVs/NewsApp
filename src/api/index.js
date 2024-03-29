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

export const GET_ALL_USER_PDF = {
  url: `${API_URL}/get-all-user-pdf`,
  method: 'GET'
}

export const GET_ALL_USER_CATEGORY = {
  url: `${API_URL}/get-all-user-category`,
  method: 'GET'
}

export const PDF_BY_CATEGORY = {
  url: `${API_URL}/pdf-by-category`,
  method: 'GET'
}

export const NEWS_BY_CATEGORY = {
  url: `${API_URL}/news-by-category`,
  method: 'GET'
}

export const LIST_NOTIFICATIONS = {
  url: `${API_URL}/list-notifications`,
  method: 'GET'
}

export const VIEW_NOTIFICATION = {
  url: `${API_URL}/view-notification`,
  method: 'GET'
}

export const VIEW_PROFILE = {
  url: `${API_URL}/view-profile`,
  method: 'GET'
}

export const EDIT_PROFILE = {
  url: `${API_URL}/edit-profile`,
  method: 'POST',
  headers:{
    'Content-Type' : 'application/json'
  }
}

export const GET_USER_PDF = {
  url: `${API_URL}/get-user-pdf`,
  method: 'GET'
}

export const SUB_TO_TOPIC = {
  url: `${API_URL}/sub-to-topic`,
  method: 'POST'
}