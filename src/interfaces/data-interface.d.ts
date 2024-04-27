export interface IContentDetail {
    id: number;
    title: string;
    image_url: string;
    content: string;
}

export interface IPlace {
    id: number;
    title: string;
    image_url: string;
    content_type: string;
    province_name: string;
}

export interface IProvince {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    contents: IPlace[];
    image_url: string;
}

export interface IIsland {
    provinces: IProvince[];
    latitude: number;
    longitude: number;
    name: string;
    id: number;
    image_url: string;
}
