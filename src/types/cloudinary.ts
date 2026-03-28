export { }

declare global {
    interface Window {
        cloudinary?: {
            createUploadWidget?: (
                options: Record<string, unknown>,
                callback: (error: unknown, result: any) => void
            ) => { open: () => void }
            videoPlayer?: (
                id: string,
                options?: Record<string, unknown>
            ) => {
                source: (src: string | { publicId: string }) => void
            }
        }
    }
}