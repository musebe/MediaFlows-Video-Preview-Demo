import { getMockMediaFlowsAsset } from "@/lib/mediaflows/mock-asset"
import { getLatestMediaFlowsAsset } from "@/lib/mediaflows/store"
import { mapMediaFlowsAssetToHeroVideoAsset } from "./hero-mapper"
import type { HeroVideoAsset } from "./types"

export type HeroPreviewPayload = {
    asset: HeroVideoAsset
    eyebrow: string
    heading: string
    subheading: string
}

export function getHeroPreviewPayload(): HeroPreviewPayload {
    const latestAsset = getLatestMediaFlowsAsset()
    const mediaFlowsAsset = latestAsset || getMockMediaFlowsAsset()

    console.log("[preview-payload] using latest asset?", Boolean(latestAsset))
    console.log("[preview-payload] mediaFlowsAsset:", mediaFlowsAsset)

    const asset = mapMediaFlowsAssetToHeroVideoAsset(mediaFlowsAsset)

    console.log("[preview-payload] mapped hero asset:", asset)

    return {
        asset,
        eyebrow: "Smart video previews",
        heading: "High-performance video hero previews",
        subheading:
            "Use a short Cloudinary clip for the first impression, then load the full video later.",
    }
}