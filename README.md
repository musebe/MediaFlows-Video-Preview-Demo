
# MediaFlows Video Preview Demo

A TanStack Start demo that shows how **Cloudinary MediaFlows PowerFlows** can create a short video preview, send it to a TanStack app by webhook, and update a responsive hero section.

Users can also upload their own video from the UI with the **Cloudinary Upload Widget**.

## What this demo does

1. A user uploads a video to Cloudinary.
2. A **MediaFlows PowerFlow** triggers on upload.
3. The flow builds a short preview URL from the uploaded video.
4. The flow sends the preview data to this app through a webhook.
5. The app stores the latest uploaded asset in memory.
6. The homepage hero updates to show the new preview video.

## Stack

- **TanStack Start**
- **Cloudinary Upload Widget**
- **Cloudinary MediaFlows PowerFlows**
- **Cloudinary video delivery URLs**
- **Tailwind CSS**

## Features

- Responsive hero video section
- Responsive navbar
- Upload video button in the navbar
- Direct browser uploads with Cloudinary Upload Widget
- MediaFlows webhook integration
- Auto-refresh after upload by polling for the latest saved asset
- Preview clip generation with Cloudinary transformations
- Fallback default video when no uploaded asset exists yet

## Project flow

### Upload flow

- User uploads a video from the app
- Cloudinary stores the original video
- MediaFlows runs on asset upload
- MediaFlows creates a preview URL
- MediaFlows sends webhook data to the app
- The app saves the asset
- The page reloads when the new asset is ready

### Hero flow

- On page load, the app reads the latest saved asset
- If no uploaded asset exists yet, it uses a mock fallback video
- The hero renders:
  - preview video URL
  - full video URL
  - poster or fallback preview image

## MediaFlows setup

### Trigger

Use:

- **On Asset Upload**

Filter:

- **Asset type**
- **Video**

### Blocks

Use this order:

1. **Cloudinary Upload**
2. **Create Asset URL**
3. **Send HTTP Request**

### Create Asset URL transformation

Use:

```txt
so_1,du_8,c_fill,ar_16:9,w_1600,q_auto,f_auto,vc_auto
````

This creates:

* start offset at 1 second
* 8 second preview
* 16:9 responsive hero shape
* optimized quality and format

### Send HTTP Request body

```json
{
  "source": "mediaflows",
  "event": "video_preview_created",
  "asset": {
    "publicId": "{{$.Cloudinary_Upload.result.public_id}}",
    "title": "{{$.Cloudinary_Upload.result.public_id}}",
    "posterPublicId": "{{$.Cloudinary_Upload.result.public_id}}",
    "preview": {
      "startOffset": 1,
      "duration": 8,
      "aspectRatio": "16:9"
    }
  },
  "previewUrl": "{{$.Create_Asset_URL.result.url}}",
  "fullVideoUrl": "{{$.Cloudinary_Upload.result.secure_url}}"
}
```

## Cloudinary upload preset

Create an **unsigned** upload preset.

Suggested values:

* Preset name: `mediaflows_demo_video_unsigned`
* Signing mode: `Unsigned`
* Asset folder: `mediaflows-demo`
* Allowed formats: `mp4,mov,webm,m4v`

## Environment variables

Create a `.env` file:

```env
VITE_CLOUDINARY_CLOUD_NAME=dbm8hb1ak
VITE_CLOUDINARY_UPLOAD_PRESET=mediaflows_demo_video_unsigned
```

## Run locally

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

App runs at:

```txt
http://localhost:3000
```

## Webhook route

The app expects MediaFlows to send data to:

```txt
/api/mediaflows/webhook
```

For local testing with MediaFlows, expose your app with ngrok and use:

```txt
https://YOUR-NGROK-URL/api/mediaflows/webhook
```

## Important local dev note

If you use ngrok with Vite, allow the ngrok host in `vite.config.ts`:

```ts
server: {
  allowedHosts: ["your-ngrok-host.ngrok-free.app"],
}
```

## Upload Widget note

The Upload Widget supports direct uploads from the UI.

Current behavior:

* upload a video
* app waits for PowerFlows webhook processing
* page reloads when the latest uploaded asset is detected

## Current limitation

The latest uploaded asset is stored **in memory**.

That means:

* it works in local demo mode
* it resets when the dev server restarts

For production, replace the in-memory store with:

* a database
* Redis
* KV store
* CMS
* Cloudinary-backed metadata service

## Main files

### App and routes

* `src/routes/__root.tsx`
* `src/routes/index.tsx`
* `src/routes/api/mediaflows/webhook.ts`
* `src/routes/api/debug/latest-asset.ts`

### Hero

* `src/components/hero/HeroVideoBackground.tsx`
* `src/components/hero/HeroFallback.tsx`

### Navbar and uploader

* `src/components/layout/Navbar.tsx`
* `src/components/cloudinary/UploadWidgetButton.tsx`

### MediaFlows data mapping

* `src/lib/mediaflows/types.ts`
* `src/lib/mediaflows/store.ts`
* `src/lib/mediaflows/mock-asset.ts`
* `src/lib/video/hero-mapper.ts`
* `src/lib/video/preview-payload.ts`

### Cloudinary helpers

* `src/lib/cloudinary/config.ts`
* `src/lib/cloudinary/urls.ts`

## What to improve next

* Replace in-memory store with persistent storage
* Update hero without full page reload
* Use Cloudinary Video Player for richer responsive playback
* Save real titles instead of using `public_id`
* Add upload progress UI
* Add better success and error states
* Add real persistence for latest uploaded asset per user

## Demo summary

This demo shows the power of MediaFlows:

* upload triggers automation
* preview URL is generated automatically
* webhook sends structured data to the app
* the app updates the hero with the latest uploaded video
* users can test the full flow from the frontend
