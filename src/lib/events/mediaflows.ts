export function notifyLatestAssetReady(publicId: string) {
    window.dispatchEvent(
        new CustomEvent("mediaflows:asset-ready", {
            detail: { publicId },
        }),
    )
}