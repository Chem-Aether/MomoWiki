import fs from 'fs';
import path from 'path'


// 指定目录路径
// const dirPath = './考研政治/';
export function buildDirectoryTree(dirPath) {
  const tree = {
    text: path.basename(dirPath).split('.').length > 1 ? path.basename(dirPath).split('.')[1] : path.basename(dirPath),
    collapsed: true,
    items: []
  };

  const paths = fs.readdirSync(dirPath);
  for (const item of paths) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    //如果是文件夹
    if (stat.isDirectory()) {
      tree.items.push(buildDirectoryTree(itemPath));
    } 
    //如果是文件
    else if(item != 'index.md' && (item.split('.').slice(-1)[0] == 'md') ) {
      tree.items.push({
        //去除扩展名
        text: item.split('.').length > 1 ? 
              item.split('.').slice(1, -1).join('.') : 
              item.split('.'),
        link:itemPath,
      });
    }
  }
  // console.log(typeof(tree));
  return tree;
}

export function directoryTreeToJson(dirPath) {
  const directoryTree = buildDirectoryTree(dirPath);
  return JSON.stringify(directoryTree, null, 2);
}


// directoryTreeToJson('./考研政治');
// console.log(typeof(buildDirectoryTree('./考研政治')))
// 调用函数并打印结果
// console.log(directoryTreeToJson(dirPath));