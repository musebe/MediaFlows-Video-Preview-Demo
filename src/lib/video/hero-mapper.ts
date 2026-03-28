import type { MediaFlowsPreviewAsset } from "@/lib/mediaflows/types"
import type { HeroVideoAsset } from "./types"

export function mapMediaFlowsAssetToHeroVideoAsset(
    asset: MediaFlowsPreviewAsset,
): HeroVideoAsset {
    return {
        publicId: asset.publicId,
        title: asset.title,
        posterPublicId: asset.posterPublicId,
        startOffset: asset.preview.startOffset,
        duration: asset.preview.duration,
        aspectRatio: asset.preview.aspectRatio || "16:9",
        previewUrl: asset.previewUrl,
        fullVideoUrl: asset.secureUrl,
        posterImageUrl: asset.previewUrl,
    }
}