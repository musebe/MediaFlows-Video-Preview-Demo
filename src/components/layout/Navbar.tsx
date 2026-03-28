import { UploadWidgetButton } from "@/components/cloudinary/UploadWidgetButton"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight">
            MediaFlows Demo
          </div>
          <div className="hidden text-sm text-neutral-500 sm:block">
            Upload your own video and watch the hero update
          </div>
        </div>

        <div className="shrink-0">
          <UploadWidgetButton />
        </div>
      </div>
    </header>
  )
}
