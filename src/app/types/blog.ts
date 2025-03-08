export interface TagType {
    id: number;
    name: string;
}

export interface CategoryType {
    id: string;
    name: string;
}

export interface PostType {
    id: number;
    title: string;
    views: number;
    image: string;
    content: string;
    desc: string;
    tags: TagType[];
    categories: CategoryType[];
    created_at: string;
    updated_at: string;
}