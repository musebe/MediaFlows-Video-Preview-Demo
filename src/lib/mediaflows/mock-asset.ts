import type { MediaFlowsPreviewAsset } from './types'

export function getMockMediaFlowsAsset(): MediaFlowsPreviewAsset {
    return {
        assetId: 'demo-asset-001',
        publicId: 'al1afkxxpnpm2r9ogaj1',
        resourceType: 'video',
        title: 'Default uploaded video',
        posterPublicId: 'al1afkxxpnpm2r9ogaj1',
        secureUrl:
            'https://res.cloudinary.com/dbm8hb1ak/video/upload/v1774653565/al1afkxxpnpm2r9ogaj1.mp4',
        previewUrl:
            'https://res.cloudinary.com/dbm8hb1ak/video/upload/so_1,du_8,c_fill,ar_16:9,w_1600,q_auto,f_auto,vc_auto/al1afkxxpnpm2r9ogaj1?_a=BAMAAAfi0',
        preview: {
            startOffset: 1,
            duration: 8,
            aspectRatio: '16:9',
        },
    }
}