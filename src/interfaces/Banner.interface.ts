export interface BannerModel {
    image?: string,
    title: string,
    banner:string,
    text: string,
    type: 'link' | 'text' | 'banner',
    link? : string
}