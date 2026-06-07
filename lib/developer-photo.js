import fs from 'fs'
import path from 'path'

const PHOTO_PATH = path.join(process.cwd(), 'public', 'developer.png')

/** Cache-busted URL — updates automatically when you replace developer.png */
export function getDeveloperPhotoSrc() {
  try {
    const { mtimeMs } = fs.statSync(PHOTO_PATH)
    return `/developer.png?v=${Math.floor(mtimeMs)}`
  } catch {
    return '/developer.png'
  }
}
