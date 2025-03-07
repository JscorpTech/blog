import {Image} from "@/app/types/product";

export interface ExperienceType {
    id: number;
    name: string;
    role: string;
    comments: string[];
    "images": Image[];
    "start_date": string;
    "end_date": string;
    "created_at": string;
    "updated_at": string;
}

export interface StackType {
    id: number;
    name: string;
    image: string;
}

export interface StacksType {
    id: number;
    name: string;
    stacks: StackType[];
}