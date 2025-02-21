"use client";
import { UncontrolledTreeEnvironment, Tree } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import CustomTreeDataProvider from './CustomTreeDataProvider';

export default function FileTree() {
  const dataProvider = new CustomTreeDataProvider();
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