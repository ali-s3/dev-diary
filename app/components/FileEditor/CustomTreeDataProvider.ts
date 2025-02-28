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
        console.log('i was called1111: ');
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
        // Notify the listeners about the change
        this.treeChangeListeners.forEach(listener => listener(expandedItemsIndexes));
        console.log('this data1: ', this.data);
        this.deleteItem2(focusedItemIndex, expandedItemsIndexes);
    }

    public deleteItem2(focusedItemIndex: TreeItemIndex, expandedItemsIndexes: TreeItemIndex[] | []) {
        // Find the parent of the item to be deleted
        const parentItem = Object.values(this.data).find(item => item.children?.includes(focusedItemIndex));
        console.log('parentItem: ', parent)
        // Remove the item from the data
        this.data = Object.fromEntries(Object.entries(this.data).filter(([itemIndex, _]) => itemIndex != focusedItemIndex));

        // Remove the item from the parent's children
        if (parentItem) {
            parentItem.children = parentItem.children?.filter(childrenIndex => childrenIndex != focusedItemIndex);
        }

        console.log('this data2: ', this.data);

        // Remove the item from the expanded items
        expandedItemsIndexes = expandedItemsIndexes?.filter(expandedItemIndex => expandedItemIndex != focusedItemIndex);

        console.log('exp: , foc: ', expandedItemsIndexes, focusedItemIndex);

        // Notify the listeners about the change
        this.treeChangeListeners.forEach(listener => listener(expandedItemsIndexes));
    }
}