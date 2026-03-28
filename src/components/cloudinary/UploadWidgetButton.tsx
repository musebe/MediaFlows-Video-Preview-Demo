import { useEffect, useRef, useState } from "react"
import { notifyLatestAssetReady } from "@/lib/events/mediaflows"

async function waitForLatestAsset(publicId: string, tries = 15, delay = 2000) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch("/api/debug/latest-asset", {
        cache: "no-store",
      })

      const data = await res.json()

      if (data?.asset?.publicId === publicId) {
        return true
      }
    } catch (error) {
      console.error("[upload-widget] polling error:", error)
    }

    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  return false
}

export function UploadWidgetButton() {
  const widgetRef = useRef<{ open: () => void } | null>(null)
  const [status, setStatus] = useState<
    "loading" | "ready" | "error" | "waiting"
  >("loading")

  useEffect(() => {
    let mounted = true

    const init = () => {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        if (mounted) setStatus("error")
        return
      }

      if (!window.cloudinary?.createUploadWidget) {
        if (mounted) setStatus("error")
        return
      }

      try {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName,
            uploadPreset,
            sources: ["local", "camera", "url"],
            multiple: false,
            maxFiles: 1,
            resourceType: "video",
            clientAllowedFormats: ["mp4", "mov", "webm", "m4v"],
            showAdvancedOptions: false,
            cropping: false,
            maxChunkSize: 6000000,
            maxFileSize: 250000000,
            maxVideoFileSize: 250000000,
          },
          async (error, result) => {
            if (error) {
              console.error("[upload-widget] callback error:", error)
              return
            }

            if (result?.event === "success") {
              const uploadedPublicId = result?.info?.public_id

              if (!uploadedPublicId) return

              if (mounted) setStatus("waiting")

              const found = await waitForLatestAsset(uploadedPublicId)

              if (found) {
                notifyLatestAssetReady(uploadedPublicId)
              }

              if (mounted) setStatus("ready")
            }
          }
        )

        if (mounted) setStatus("ready")
      } catch (error) {
        console.error("[upload-widget] failed to initialize:", error)
        if (mounted) setStatus("error")
      }
    }

    const timer = window.setTimeout(init, 300)

    return () => {
      mounted = false
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => widgetRef.current?.open()}
      disabled={status !== "ready"}
      className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {status === "loading" && "Loading uploader..."}
      {status === "ready" && "Upload video"}
      {status === "waiting" && "Processing video..."}
      {status === "error" && "Uploader failed"}
    </button>
  )
}
