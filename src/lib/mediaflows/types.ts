export type MediaFlowsPreviewAsset = {
    assetId?: string
    publicId: string
    resourceType?: "video"
    title: string
    description?: string
    posterPublicId?: string
    secureUrl?: string
    previewUrl?: string
    tags?: string[]
    preview: {
        startOffset: number
        duration: number
        aspectRatio?: string
    }
}