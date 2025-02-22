"use client";
import { UncontrolledTreeEnvironment, Tree, TreeItem, TreeItemIndex, TreeEnvironmentRef } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import CustomTreeDataProvider from './CustomTreeDataProvider';
import { useEffect, useRef, useState } from 'react';

export default function FileTree() {
  const [focusedItem, setFocusedItem] = useState<TreeItem | null>(null);
  const dataProvider = new CustomTreeDataProvider();
  const ref = useRef<TreeEnvironmentRef>(null);

  console.log('focused item: ', ref.current?.viewState['tree-1']?.focusedItem);

  return (
    <div className='rct-dark'>
      <UncontrolledTreeEnvironment
        ref={ref}
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
          onClick={() =>
            dataProvider.injectItem(window.prompt('Item name') || 'New item')
          }
        >
          Add File
        </button>
        {/* Inject folder */}
        <button
          type="button"
          onClick={() =>
            dataProvider.injectFolder(window.prompt('Folder name') || 'New folder')
          }
        >
          Add Folder
        </button>
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}