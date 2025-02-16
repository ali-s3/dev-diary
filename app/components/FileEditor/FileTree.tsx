"use client";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';

const items = {
  root: {
    index: 'root',
    canMove: true,
    isFolder: true,
    children: ['child1', 'child2', 'child3'],
    data: 'Root item',
    canRename: true,
  },
  child1: {
    index: 'child1',
    canMove: true,
    isFolder: false,
    children: [],
    data: 'Child item 1',
    canRename: true,
  },
  child2: {
    index: 'child2',
    canMove: true,
    isFolder: false,
    children: [],
    data: 'Child item 2',
    canRename: true,
  },
  child3: {
    index: 'child3',
    canMove: true,
    isFolder: true,
    children: ['file1', 'file2', 'file3'],
    data: 'Child item 3',
    canRename: true,
  },
  file1: {
    index: 'file1',
    canMove: true,
    isFolder: false,
    children: [],
    data: 'file1',
    canRename: true,
  },
  file2: {
    index: 'file2',
    canMove: true,
    isFolder: false,
    children: [],
    data: 'file2',
    canRename: true,
  },
  file3: {
    index: 'file3',
    canMove: true,
    isFolder: false,
    children: [],
    data: 'file3',
    canRename: true,
  },
};

export default function FileTree() {
  return (
    <UncontrolledTreeEnvironment
      dataProvider={new StaticTreeDataProvider(items, (item, data) => ({ ...item, data }))}
      getItemTitle={item => item.data}
      viewState={{}}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  )
}