# 案例五 蛋白-配体相互作用
本例将指导新用户完成设置模拟系统的过程，该系统包含蛋白质（T4 溶菌酶 L99A/M102Q）与配体的复合物。本教程特别关注与处理配体相关的问题，前提是用户熟悉基本的 GROMACS作和拓扑的内容。

![](root.png)

分子对接一般负责寻找小分子配体和大分子受体的某个相互结合位点，相当于单帧图片；而动力学模拟则是在此基础上计算模拟配体-受体的动态相互作用过程，因此，动力学模拟往往是在分子对接完成后，对对接复合物进行操作的。

## 大分子准备

