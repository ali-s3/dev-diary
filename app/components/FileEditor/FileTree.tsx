"use client";
import { UncontrolledTreeEnvironment, Tree, TreeItem, TreeItemIndex, TreeEnvironmentRef } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import CustomTreeDataProvider from './CustomTreeDataProvider';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function FileTree() {
  const [focusedItem, setFocusedItem] = useState<TreeItem | null>(null);
  const dataProvider = useMemo(() => new CustomTreeDataProvider(), []);

  const addItem = (isFolder: boolean) => {
    const name = window.prompt('Item name') || 'New item';
    dataProvider.injectItem(isFolder, name, focusedItem)
  }
  return (
    <div className='rct-dark'>
      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        dataProvider={dataProvider}
        getItemTitle={item => item.data}
        onFocusItem={item => setFocusedItem(item)}
        viewState={{
          'tree-1': {
            expandedItems: [],
          },
        }}
      >
        <button
          type="button"
          onClick={() => addItem(false)
          }
        >
          Add File
        </button>
        <button
          type="button"
          onClick={() => addItem(true)}
        >
          Add Folder
        </button>
        <button
          type="button"
          onClick={() => dataProvider.deleteItem(focusedItem?.index)}
        >
          Delete
        </button>
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}