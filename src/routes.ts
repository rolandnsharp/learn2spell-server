import { registerUser } from './controller/user/registerUser'
import { authUser } from './controller/auth/authUser'
import { getAuth } from './controller/auth/getAuth'
import confirmEmail from './controller/user/confirmEamil'
import resetPassword from './controller/user/resetPassword'
import { resetPasswordRequest } from './controller/user/resetPasswordRequest'
import changePassword from './controller/user/changePassword'
import deleteUser from './controller/user/deleteUser'
import getUsers from './controller/user/getUsers'
import { deleteAuth } from './controller/auth/deleteAuth'

export const AppRoutes = [
  {
    path: '/user',
    method: 'post',
    action: registerUser
  },
  {
    path: '/auth',
    method: 'post',
    action: authUser
  },
  {
    path: '/auth',
    method: 'get',
    action: getAuth
  },
  {
    path: '/confirm',
    method: 'get',
    action: confirmEmail
  },
  {
    path: '/reset_password_request',
    method: 'put',
    action: resetPasswordRequest
  },
  {
    path: '/reset_password',
    method: 'put',
    action: resetPassword
  },
  {
    path: '/change_password',
    method: 'put',
    action: changePassword
  },
  {
    path: '/user',
    method: 'delete',
    action: deleteUser
  },
  {
    path: '/user',
    method: 'get',
    action: getUsers
  },
  {
    path: '/auth',
    method: 'delete',
    action: deleteAuth
  }
]