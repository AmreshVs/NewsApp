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
  url: `${API_URL}/latest-news?page=1&size=10`,
}

export const TOP_SECTION = {
  url: `${API_URL}/top-section`,
}