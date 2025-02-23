import { TreeDataProvider, TreeItemIndex, TreeItem, Disposable, TreeEnvironmentRef } from 'react-complex-tree';
import { longTree } from '@/app/utils/storage/fileTreeData';
import React from 'react';
import { Key } from 'lucide-react';

export default class CustomTreeDataProvider implements TreeDataProvider {
    private data: Record<TreeItemIndex, TreeItem> = { ...longTree.items };
    constructor() { console.log('initialized') }
    private treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] =
        [];

    public async getTreeItem(itemId: TreeItemIndex) {
        return this.data[itemId];
    }

    public async onChangeItemChildren(
        itemId: TreeItemIndex,
        newChildren: TreeItemIndex[]
    ) {
        this.data[itemId].children = newChildren;
        this.treeChangeListeners.forEach(listener => listener([itemId]));
    }

    public onDidChangeTreeData(listener: (changedItemIds: TreeItemIndex[]) => void): Disposable {
        this.treeChangeListeners.push(listener);
        return {
            dispose: () =>
                this.treeChangeListeners.splice(
                    this.treeChangeListeners.indexOf(listener),
                    1
                ),
        };
    }

    public async onRenameItem(item: TreeItem<any>, name: string): Promise<void> {
        this.data[item.index].data = name;
    }

    public injectItem(isFolder: boolean, name: string, focusedItem: TreeItem | null) {
        const item: TreeItem = { data: name, index: name, children: isFolder ? [] : undefined, isFolder: isFolder };
        if (focusedItem) {
            if (focusedItem.isFolder) {
                this.data[focusedItem.index].children?.push(item.index);
            }
        } else {
            this.data.root.children?.push(name);
        }
        this.data[name] = item;
        this.treeChangeListeners.forEach(listener => listener(['root']));
    }

    public deleteItem(index: TreeItemIndex | undefined) {
        //TODO: delete also from root and then update the listner [root, index] as required
        console.log(index);
        this.data = Object.fromEntries(Object.entries(this.data).filter(([key, value]) => key != index));
        console.log(this.data);
        this.treeChangeListeners.forEach(listener => listener(['root']));
    }
}