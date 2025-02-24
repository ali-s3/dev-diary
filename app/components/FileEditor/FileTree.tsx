"use client";
import { UncontrolledTreeEnvironment, Tree, TreeItem, TreeItemIndex, TreeEnvironmentRef, TreeViewState } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import CustomTreeDataProvider from './CustomTreeDataProvider';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function FileTree() {
  const dataProvider = useMemo(() => new CustomTreeDataProvider(), []);

  const treeRef = useRef<TreeEnvironmentRef>(null);
  const [focusedItem, setFocusedItem] = useState<TreeItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<TreeItem[] | []>([]);

  const addItem = (isFolder: boolean) => {
    const name = window.prompt('Item name') || 'New item';
    dataProvider.injectItem(isFolder, name, focusedItem)
  }

  const onDeleteItem = () => {
    const expandedItemsIndexes = expandedItems.flatMap(expandedItem => expandedItem.index);
    let focusedItemFromTree = treeRef.current?.viewState ? Object.values(treeRef.current.viewState)[0]?.focusedItem : null;
    let indexToDelete = null;

    if (focusedItem?.index)
      indexToDelete = focusedItem.index;
    else if (focusedItemFromTree)
      indexToDelete = focusedItemFromTree;

    indexToDelete ? dataProvider.deleteItem(indexToDelete, expandedItemsIndexes) :
      alert('please select an item to delete');
    // remove the focused item from the viewState expandedItems array
    setExpandedItems(expandedItems.filter(expandedItem => expandedItem.index != focusedItem?.index));
  }

  return (
    <div className='rct-dark'>
      <UncontrolledTreeEnvironment
        ref={treeRef}
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        canRename={true}
        dataProvider={dataProvider}
        getItemTitle={item => item.data}
        onFocusItem={item => {
          console.log('focus was called: ', item.index);
          setFocusedItem(item);
        }}
        onExpandItem={(item => setExpandedItems(prevItems => [...prevItems, item]))}
        viewState={{
          'tree-1': {
            expandedItems: expandedItems.flatMap(expandedItem => expandedItem.index),
            focusedItem: focusedItem?.index
          }
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
          onClick={() => onDeleteItem()}
        >
          Delete
        </button>
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}