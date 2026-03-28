export type HeroVideoAsset = {
    publicId: string
    title: string
    posterPublicId?: string
    startOffset?: number
    duration?: number
    aspectRatio?: string
    previewUrl?: string
    fullVideoUrl?: string
    posterImageUrl?: string
}

export type ResponsiveVideoSource = {
    src: string
    media?: string
    width: number
}

export type HeroVideoUrls = {
    posterImageUrl: string
    fullVideoUrl: string
    previewSources: ResponsiveVideoSource[]
}