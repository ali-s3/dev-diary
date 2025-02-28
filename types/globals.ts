import { TreeItem, TreeItemIndex } from "react-complex-tree";

export interface Note {
    id: string;
    title: string;
    content: string;
    fileTree: Record<TreeItemIndex, TreeItem>;
    user: User;
}

export interface User {
    id: string;
    email: string;
    name: string;
}