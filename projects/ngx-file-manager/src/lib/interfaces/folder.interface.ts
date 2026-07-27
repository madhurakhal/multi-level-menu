import { DocumentInterface } from "./document.interface";

export interface FolderInterface {
    id: number;
    name: string;
    parentId?: number;
    childern: (DocumentInterface | FolderInterface)[]
}