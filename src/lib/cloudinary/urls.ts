import { getCloudinaryBaseUrl } from './config'
import type {
    HeroVideoAsset,
    HeroVideoUrls,
    ResponsiveVideoSource,
} from '../video/types'

function joinTransforms(parts: Array<string | undefined | false>): string {
    return parts.filter(Boolean).join(',')
}

function buildVideoUrl(publicId: string, transformation: string): string {
    const baseUrl = getCloudinaryBaseUrl()
    return `${baseUrl}/video/upload/${transformation}/${publicId}`
}

function buildVideoPosterUrl(publicId: string, transformation: string): string {
    const baseUrl = getCloudinaryBaseUrl()
    return `${baseUrl}/video/upload/${transformation},f_jpg/${publicId}.jpg`
}

function buildPreviewSource(
    publicId: string,
    width: number,
    startOffset: number,
    duration: number,
    aspectRatio: string,
    media?: string,
): ResponsiveVideoSource {
    const transform = joinTransforms([
        `so_${startOffset}`,
        `du_${duration}`,
        `c_fill`,
        `ar_${aspectRatio}`,
        `w_${width}`,
        `q_auto`,
        `f_auto`,
        `vc_auto`,
    ])

    return {
        src: buildVideoUrl(publicId, transform),
        media,
        width,
    }
}

export function buildHeroVideoUrls(asset: HeroVideoAsset): HeroVideoUrls {
    if (asset.previewUrl && asset.fullVideoUrl) {
        return {
            previewSources: [
                { src: asset.previewUrl, width: 1600 },
            ],
            fullVideoUrl: asset.fullVideoUrl,
            posterImageUrl: asset.posterImageUrl || asset.previewUrl,
        }
    }

    const startOffset = asset.startOffset ?? 0
    const duration = asset.duration ?? 5
    const aspectRatio = asset.aspectRatio ?? '16:9'

    const previewSources: ResponsiveVideoSource[] = [
        buildPreviewSource(
            asset.publicId,
            640,
            startOffset,
            duration,
            aspectRatio,
            '(max-width: 640px)',
        ),
        buildPreviewSource(
            asset.publicId,
            960,
            startOffset,
            duration,
            aspectRatio,
            '(max-width: 1024px)',
        ),
        buildPreviewSource(asset.publicId, 1600, startOffset, duration, aspectRatio),
    ]

    const fullTransform = joinTransforms([
        `c_fill`,
        `ar_${aspectRatio}`,
        `w_1600`,
        `q_auto`,
        `f_auto`,
        `vc_auto`,
    ])

    const posterTransform = joinTransforms([
        `so_${startOffset}`,
        `c_fill`,
        `ar_${aspectRatio}`,
        `w_1600`,
        `q_auto`,
    ])

    const posterPublicId = asset.posterPublicId || asset.publicId

    return {
        previewSources,
        fullVideoUrl: buildVideoUrl(asset.publicId, fullTransform),
        posterImageUrl: buildVideoPosterUrl(posterPublicId, posterTransform),
    }
}