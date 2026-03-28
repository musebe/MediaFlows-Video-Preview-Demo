import { createServerFn } from "@tanstack/react-start"
import {
    getHeroPreviewPayload,
    type HeroPreviewPayload,
} from "@/lib/video/preview-payload"

export const getHeroPreview = createServerFn({ method: "GET" }).handler(
    async (): Promise<HeroPreviewPayload> => {
        console.log("[server-fn] getHeroPreview called")
        const payload = getHeroPreviewPayload()
        console.log("[server-fn] payload returned:", payload)
        return payload
    },
)