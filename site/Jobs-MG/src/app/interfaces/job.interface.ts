export interface IJob {
    _id?: string;
    name: string;
    description: string;
    salary: number;
    owner: string;  
    likes?: string[];
    dislikes?: string[];
}