import { TreeDataProvider, TreeItemIndex, TreeItem, Disposable } from 'react-complex-tree';
import { longTree } from '@/app/utils/storage/fileTreeData';

export default class CustomTreeDataProvider implements TreeDataProvider {
    private data: Record<TreeItemIndex, TreeItem> = { ...longTree.items };

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

    // // Function to get the focused item for a specific tree
    // getFocusedItem(treeId: string): TreeItemIndex | undefined {
    //     const treeViewState = viewState[treeId];
    //     return treeViewState?.focusedItem;
    // }
    // custom handler for directly manipulating the tree data
    public injectItem(name: string) {
        console.log('data: ', this.data);
        const rand = `${Math.random()}`;
        this.data[rand] = { data: name, index: rand } as TreeItem;
        this.data.root.children?.push(rand); // this means that if the root has children, push the new item to the children array
        this.treeChangeListeners.forEach(listener => listener(['root']));
    }

    // custom handler for directly manipulating the tree data
    public injectFolder(name: string) {
        const rand = `${Math.random()}`;
        this.data[rand] = { data: name, index: rand, children: [], isFolder: true } as TreeItem;
        this.data.root.children?.push(rand); // this means that if the root has children, push the new item to the children array
        this.treeChangeListeners.forEach(listener => listener(['root']));
    }
}