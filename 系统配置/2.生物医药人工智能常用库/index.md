# 常用库


## PyTorch及其扩展

### Torch官方库
|包名|用途|
|---|---|
|torch|核心库。提供张量计算、自动求导、神经网络层、优化器等所有基础功能|
|torchvision|计算机视觉工具包。提供图像数据集、模型、变换等|
|torchaudio|音频处理工具包。提供音频 I/O、特征提取、数据集等|

### PyG库
PyG库是一个专门用于处理图神经网络的pytorch库，它提供了众多处理图结构数据的接口。

|包名|用途|
|---|---|
|torch_geometric|GNN (PyG)图神经网络库，提供了图数据结构、图卷积层和各种图数据集|
|torch-scatter|加速 “散射” 和 “聚集” 操作|
|torch-sparse|提供高效的稀疏矩阵运算，用于存储和操作图的邻接矩阵|
|torch-cluster|提供图聚类算法，如 k-means|
|torch-spline-conv||

### Hugging Face系列库
|包名|用途|
|---|---|
|transformers|提供自然语言处理训练的API|
|datasets|提供了一个统一的接口来加载和处理各种 NLP、CV、音频等数据集|
|evaluate|用于加载各种评估指标来评估模型性能|
|diffusers|提供了构建和使用扩散模型进行图像生成的工具|

## 化学分子相关库

|包名|用途|
|---|---|
|RDKit|化学分子信息学操作库|
|BioPython|生物领域序列处理、文件处理和数据库交互的库|
|Open Babel|分子格式文件转换库|
|Meeko|为分子对接准备配体 (PDBQT 格式)|
|AutoDock Vina|开源分子对接软件|
|GNINA|利用CNN的分子对接软件|
|ProDy|蛋白质结构分析、分子动力学轨迹分析|
|MDTraj|分子动力学轨迹分析|
|GROMACS|分子动力学模拟软件|
|Amber|分子动力学模拟软件（Linux平台）|
|OpenMM|提供Python接口的分子动力学库|
|PDB2PQR|将PDB文件预处理为PQR|
|APBS|计算蛋白质表面静电势分布数据等|
|PyMesh2|可视化 APBS 结果，结构拓扑分析|

一般工作流程：`RDKit` (加载分子 SMILES) → `RDKit` (生成 3D 构象) → `Open Babel` (力场优化) → `Meeko` (转换为 PDBQT) → `AutoDock Vina` (执行对接)