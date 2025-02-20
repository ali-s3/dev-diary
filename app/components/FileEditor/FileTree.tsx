"use client";
import { useMemo } from 'react';
import { UncontrolledTreeEnvironment, Tree, TreeDataProvider, TreeItemIndex, TreeItem } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { longTree } from '@/app/utils/storage/FileTree';

class CustomDataProviderImplementation implements TreeDataProvider {
  private data: Record<TreeItemIndex, TreeItem> = { longTree };

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

  // public onDidChangeTreeData(
  //   listener: (changedItemIds: TreeItemIndex[]) => void
  // ): Disposable {
  //   this.treeChangeListeners.push(listener);
  //   return {
  //     dispose: () =>
  //       this.treeChangeListeners.splice(
  //         this.treeChangeListeners.indexOf(listener),
  //         1
  //       ),
  //   };
  // }

  public async onRenameItem(item: TreeItem<any>, name: string): Promise<void> {
    this.data[item.index].data = name;
  }

  // custom handler for directly manipulating the tree data
  public injectItem(name: string) {
    const rand = `${Math.random()}`;
    this.data[rand] = { data: name, index: rand } as TreeItem;
    this.data.root.children?.push(rand);
    this.treeChangeListeners.forEach(listener => listener(['root']));
  }
}

export default function FileTree() {
  const dataProvider = new CustomDataProviderImplementation();
  return (
    <UncontrolledTreeEnvironment
      canDragAndDrop
      canDropOnFolder
      canReorderItems
      dataProvider={dataProvider}
      getItemTitle={item => item.data}
      viewState={{
        'tree-2': {
          expandedItems: [],
        },
      }}
    >
      <button
        type="button"
        onClick={() =>
          dataProvider.injectItem(window.prompt('Item name') || 'New item')
        }
      >
        Inject item
      </button>
      <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  );
}