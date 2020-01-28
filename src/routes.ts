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
import getDocuments from './controller/document/getDocuments'
import getDocument from './controller/document/getDocument'
import { createTransfer } from './controller/transfer/createTransfer'
import authSMS from './controller/auth/authSMS'
import verifySms from './controller/auth/verifySms'
import verifyDocument from './controller/document/verifyDocument'

// import uploadDocument from './controller/document/uploadDocument'

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
  },
  {
    path: '/user/document',
    method: 'get',
    action: getDocuments
  },
  {
    path: '/user/document/:documentId',
    method: 'get',
    action: getDocument
  },
  {
    path: '/transfer',
    method: 'post',
    action: createTransfer
  },
  {
    path: '/kyc/sms',
    method: 'post',
    action: authSMS 
  },
  {
    path: '/kyc/verify_sms',
    method: 'post',
    action: verifySms 
  },
  {
    path: '/document/verify',
    method: 'post',
    action: verifyDocument
  }

  // upload document route is in server.ts
  // ,
  // {
  //   path: '/document',
  //   method: 'post',
  //   action: uploadDocument
  // }
]