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

export const HOME = {
    url: `${API_URL}/home?page=1&size=10`,
    method: 'GET',
  }