
export interface Image{
    id: number;
    file: string;
}

export interface ProjectType {
    id: string;
    name: string;
    desc: string;
    images: Image[];
    source: string;
    demo: string;
    created_at: string;
    updated_at: string;
}