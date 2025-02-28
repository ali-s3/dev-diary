"use client";
import { UncontrolledTreeEnvironment, Tree, TreeItem, TreeEnvironmentRef } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import CustomTreeDataProvider from './CustomTreeDataProvider';
import { useMemo, useRef, useState } from 'react';

export default function FileTree() {
  const dataProvider = useMemo(() => new CustomTreeDataProvider(), []);
  const treeRef = useRef<TreeEnvironmentRef>(null);
  const [focusedItem, setFocusedItem] = useState<TreeItem | null>(dataProvider.firstItem);

  const addItem = (isFolder: boolean) => {
    const name = window.prompt('Item name') || 'New item';
    dataProvider.injectItem(isFolder, name, focusedItem);
  }

  const onDeleteItem = () => {
    let expandedItemsIndexes = null;
    let focusedItemFromTree = null;
    let indexToDelete = null;

    if (treeRef.current?.viewState) {
      focusedItemFromTree = Object.values(treeRef.current.viewState)[0]?.focusedItem;
      expandedItemsIndexes = Object.values(treeRef.current.viewState)[0]?.expandedItems;
    }

    if (focusedItemFromTree)
      indexToDelete = focusedItemFromTree;

    indexToDelete ? dataProvider.deleteItem(indexToDelete, expandedItemsIndexes ?? []) :
      alert('please select an item to delete');

    // remove the focused item from the viewState expandedItems array
    expandedItemsIndexes = expandedItemsIndexes?.filter(expandedItemIndex => expandedItemIndex != focusedItemFromTree);
    if (treeRef.current?.viewState && Object.values(treeRef.current.viewState)[0]) {
      const firstViewState = Object.values(treeRef.current.viewState)[0];
      if (firstViewState) {
        firstViewState.expandedItems = expandedItemsIndexes;
      }
    }
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
        // onExpandItem={(item => setExpandedItems(prevItems => [...prevItems, item]))}
        viewState={{
          'tree-1': {
            expandedItems: [],
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