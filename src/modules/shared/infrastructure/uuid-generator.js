import { v4 } from "uuid"

/**
 * 
 * @param {'v4' | 'v2'} version 
 * @returns {string}
 */
export const generateUuid = (version) => {
  const supportedVersions = {
    v4,
  }

  const generator = supportedVersions[version]

  if (!generator) {
    throw new Error(`The version ${version} is not supported`)
  }

  return generator()
}