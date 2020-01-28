// fast username validation
export function isValidUsername(str: string): Boolean {
    let code = null
    for (let i = 0, length = str.length; i < length; i++) {
      code = str.charCodeAt(i)
      if (!(code > 47 && code < 58) && // numeric 0-9
          // !(code > 64 && code < 91) && // upper alpha A-Z
          !(code > 96 && code < 123) && // lower alpha a-z
          !(code === 95)) { // underscore _
        return false
      }
    }
    return true
  }
  
  export const bannedUsernames = [
    'admin',
    'user',
    'confirm',
    'auth',
    'resume',
    'connection',
    'request',
    'change_password',
    'reset_password_request',
    'reset_password',
    'user'
  ]