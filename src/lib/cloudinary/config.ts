import { getAppEnv } from '../env'

export function getCloudinaryCloudName(): string {
    return getAppEnv().cloudName
}

export function getCloudinaryBaseUrl(): string {
    const cloudName = getCloudinaryCloudName()
    return `https://res.cloudinary.com/${cloudName}`
}