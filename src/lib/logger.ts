import { env } from 'process'

export function debug(...args) {
  if (env.NODE_ENV === 'production') {
    return
  }

  console.log('DEBUG: ', ...args)
}

export function log(...args) {
  console.log('LOG: ', ...args)
}

export function info(...args) {
  console.log('INFO: ', ...args)
}

export function warn(...args) {
  console.warn('WARNING: ', ...args)
}

export function error(...args) {
  console.error('ERROR: ', ...args)
}