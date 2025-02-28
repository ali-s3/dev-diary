import { TreeDataProvider, TreeItemIndex, TreeItem, Disposable, TreeEnvironmentRef } from 'react-complex-tree';
import { longTree } from '@/app/utils/storage/fileTreeData';
import React from 'react';
import { Key } from 'lucide-react';

export default class CustomTreeDataProvider implements TreeDataProvider {
    private data: Record<TreeItemIndex, TreeItem> = { ...longTree.items };
    public firstItem = Object.values(this.data)[1];

    private treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] = [];

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
        console.log('i was called: ', this.firstItem);
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

    public injectItem(isFolder: boolean, index: string, focusedItem: TreeItem | null) {
        const item: TreeItem = { data: index, index: index, children: isFolder ? [] : undefined, isFolder: isFolder };
        if (focusedItem) {
            if (focusedItem.isFolder) {
                this.data[focusedItem.index].children?.push(item.index);
            }
        } else {
            this.data.root.children?.push(index);
        }
        console.log('focuuuused: ', focusedItem);
        this.data[index] = item;
        this.treeChangeListeners.forEach(listener => listener(['root']));
    }

    public deleteItem(focusedItemIndex: TreeItemIndex, expandedItemsIndexes: TreeItemIndex[] | []) {
        this.data = Object.fromEntries(Object.entries(this.data).filter(([itemIndex, _]) => itemIndex != focusedItemIndex));
        this.data['root'].children = this.data['root'].children?.filter(childrenIndex => childrenIndex != focusedItemIndex);
        expandedItemsIndexes = expandedItemsIndexes?.filter(expandedItemIndex => expandedItemIndex != focusedItemIndex);
        console.log('exp: , foc: ', expandedItemsIndexes, focusedItemIndex);
        this.treeChangeListeners.forEach(listener => listener(expandedItemsIndexes));
    }
}