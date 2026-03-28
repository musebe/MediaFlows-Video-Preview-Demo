import type { MediaFlowsPreviewAsset } from "./types"

let latestAsset: MediaFlowsPreviewAsset | null = null

export function setLatestMediaFlowsAsset(asset: MediaFlowsPreviewAsset) {
    latestAsset = asset
    console.log("[store] saved latest asset:", latestAsset)
}

export function getLatestMediaFlowsAsset() {
    console.log("[store] read latest asset:", latestAsset)
    return latestAsset
}