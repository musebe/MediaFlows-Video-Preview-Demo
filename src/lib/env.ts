type AppEnv = {
    cloudName: string
    previewFolder: string
    sourceFolder: string
}

function readRequiredPublicEnv(name: string): string {
    const value = import.meta.env[name]

    if (!value || typeof value !== 'string') {
        throw new Error(`Missing required env variable: ${name}`)
    }

    return value
}

function readOptionalEnv(name: string): string | undefined {
    const value = import.meta.env[name]
    return typeof value === 'string' && value.length > 0 ? value : undefined
}

export function getAppEnv(): AppEnv {
    return {
        cloudName: readRequiredPublicEnv('VITE_CLOUDINARY_CLOUD_NAME'),
        previewFolder: readOptionalEnv('CLOUDINARY_PREVIEW_FOLDER') || 'video-previews',
        sourceFolder: readOptionalEnv('CLOUDINARY_SOURCE_FOLDER') || 'marketing-videos',
    }
}