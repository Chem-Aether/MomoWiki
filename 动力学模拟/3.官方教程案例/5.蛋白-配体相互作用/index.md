# 案例五 蛋白-配体相互作用
本例将指导新用户完成设置模拟系统的过程，该系统包含蛋白质（T4 溶菌酶 L99A/M102Q）与配体的复合物。本教程特别关注与处理配体相关的问题，前提是用户熟悉基本的 GROMACS作和拓扑的内容。

![](root.png)

分子对接一般负责寻找小分子配体和大分子受体的某个相互结合位点，相当于单帧图片；而动力学模拟则是在此基础上计算模拟配体-受体的动态相互作用过程，因此，动力学模拟往往是在分子对接完成后，对对接复合物进行操作的。

## 大分子准备
这里的示例大蛋白选用3HTB蛋白，提前将蛋白质进行加氢、去水、去配体操作，在日常操作中，最好选择使用分子对接后的大蛋白和小分子，分别为PDB和MOL2文件。

使用以下命令选择力场，构建蛋白质拓扑：
```
gmx pdb2gmx -f 3HTB_clean.pdb -o 3HTB_processed.gro -ter
```
对于输出的下列待选项目，我们需要选择力场和水模型，力场选择`AMBER99SB-ILDN`,水模型选择`TIP3P`
```
From '/usr/local/gromacs/share/gromacs/top':
 2: AMBER03 protein, nucleic AMBER94 (Duan et al., J. Comp. Chem. 24, 1999-2012, 2003)
 3: AMBER94 force field (Cornell et al., JACS 117, 5179-5197, 1995)
 4: AMBER96 protein, nucleic AMBER94 (Kollman et al., Acc. Chem. Res. 29, 461-469, 1996)
 5: AMBER99 protein, nucleic AMBER94 (Wang et al., J. Comp. Chem. 21, 1049-1074, 2000)
 6: AMBER99SB protein, nucleic AMBER94 (Hornak et al., Proteins 65, 712-725, 2006)
 7: AMBER99SB-ILDN protein, nucleic AMBER94 (Lindorff-Larsen et al., Proteins 78, 1950-58, 2010)
 8: AMBERGS force field (Garcia & Sanbonmatsu, PNAS 99, 2782-2787, 2002)
 9: CHARMM27 all-atom force field (CHARM22 plus CMAP for proteins)
10: GROMOS96 43a1 force field
11: GROMOS96 43a2 force field (improved alkane dihedrals)
12: GROMOS96 45a3 force field (Schuler JCC 2001 22 1205)
13: GROMOS96 53a5 force field (JCC 2004 vol 25 pag 1656)
14: GROMOS96 53a6 force field (JCC 2004 vol 25 pag 1656)
15: GROMOS96 54a7 force field (Eur. Biophys. J. (2011), 40,, 843-856, DOI: 10.1007/s00249-011-0700-9)
16: OPLS-AA/L all-atom force field (2001 aminoacid dihedrals)
```
在此过程中可能会报错，提示H原子类型不匹配或氢原子命名错误，这时可以选择使用-ignh命令，忽视原有氢原子，此时gromacs会自动加全氢
```
gmx pdb2gmx -f 3HTB_clean.pdb -o 3HTB_processed.gro -ter -ignh
```

在这一步里可能会出现`Total charge in system x.000 e`的提示，说明体系电荷不为零，在后续的溶剂化过程中为其添加抗衡离子即可。

最终会生成拓扑文件，和大蛋白的`3HTB_processed.gro`文件，该文件可以用pymol可视化预览。

## 小分子准备
上步中拆分的小分子配体保存为`MOL2`格式，如果是`PDB`格式，则需要将其转化为`MOL2`格式，

该文件只包含一个小分子，可以利用Pymol为其加氢，同时将`@<TRIPOS>MOLECULE`下的名称改为JZ4，或其他统一名称，作为该配体的名称，同时确保`ATOM`列的JZ4与该名称一致即可。

```
@<TRIPOS>MOLECULE
JZ4
 22 22 0 0 0
SMALL
GASTEIGER

@<TRIPOS>ATOM
      1 C4         24.2940  -24.1240   -0.0710 C.3     1  JZ4        -0.0650
      2 C7         21.5530  -27.2140   -4.1120 C.ar    1  JZ4        -0.0613
      3 C8         22.0680  -26.7470   -5.3310 C.ar    1  JZ4        -0.0583
      4 C9         22.6710  -25.5120   -5.4480 C.ar    1  JZ4        -0.0199
      5 C10        22.7690  -24.7300   -4.2950 C.ar    1  JZ4         0.1200
      6 C11        21.6930  -26.4590   -2.9540 C.ar    1  JZ4        -0.0551
      7 C12        22.2940  -25.1870   -3.0750 C.ar    1  JZ4        -0.0060
      8 C13        22.4630  -24.4140   -1.8080 C.3     1  JZ4        -0.0245
      9 C14        23.9250  -24.7040   -1.3940 C.3     1  JZ4        -0.0518
     10 OAB        23.4120  -23.5360   -4.3420 O.3     1  JZ4        -0.5065
     11 H          25.3133  -24.3619    0.1509 H       1  JZ4         0.0230
     12 H          23.6591  -24.5327    0.6872 H       1  JZ4         0.0230
     13 H          24.1744  -23.0611   -0.1016 H       1  JZ4         0.0230
     14 H          21.0673  -28.1238   -4.0754 H       1  JZ4         0.0618
     15 H          21.9931  -27.3472   -6.1672 H       1  JZ4         0.0619
     16 H          23.0361  -25.1783   -6.3537 H       1  JZ4         0.0654
     17 H          21.3701  -26.8143   -2.0405 H       1  JZ4         0.0621
     18 H          21.7794  -24.7551   -1.0588 H       1  JZ4         0.0314
     19 H          22.2659  -23.3694   -1.9301 H       1  JZ4         0.0314
     20 H          24.5755  -24.2929   -2.1375 H       1  JZ4         0.0266
     21 H          24.0241  -25.7662   -1.3110 H       1  JZ4         0.0266
     22 H          23.7394  -23.2120   -5.1580 H       1  JZ4         0.2921
@<TRIPOS>BOND
     1     4     3   ar
     2     4     5   ar
     3     3     2   ar
     4    10     5    1
     5     5     7   ar
     6     2     6   ar
     7     7     6   ar
     8     7     8    1
     9     8     9    1
    10     9     1    1
    11     1    11    1
    12     1    12    1
    13     1    13    1
    14     2    14    1
    15     3    15    1
    16     4    16    1
    17     6    17    1
    18     8    18    1
    19     8    19    1
    20     9    20    1
    21     9    21    1
    22    10    22    1
```
小分子力场的选择是一个非常复杂的过程，还涉及多个软件配合，这里我们可以使用计算化学公社卢天老师开发的sobtop软件，快速构建小分子拓扑具体步骤如下：

- 打开sobtop，把小分子jz4.mol2拖入sobtpo
- //选择1，生成top文件
- //选择3，尽可能使用GAFF力场
- //选择0，进入下一步
- //选择4，如果可能，预先构建成键参数，任意猜测缺少的选项
- //回车，生成的top文件生成在sobtop软件根目录下
- //回车，生成的itp位置限制文件在sobtop软件根目录下
- //选择2，生成gro文件
- //回车，生成的gro文件在sobtop软件根目录下
- //回车，退出sobtop软件

这时sobtop工作路径会出现jz4.gro、jz4.itp、jz4.top三个文件，这就是小分子的拓扑文件，把他们复制到模拟的路径即可。

## 构建复合体
### 合并文件
新建一个`complex.gro`文件，先将`3HTB_processed.gro`的内容复制进去，再把sobtop生成的小分子`jz4.gro`的以下内容复制进去：
```
  163ASN      C 1691   0.621  -0.740  -0.126
  163ASN     O1 1692   0.624  -0.616  -0.140
  163ASN     O2 1693   0.683  -0.703  -0.011

    1JZ4     C4    1   2.429  -2.412  -0.007
    1JZ4     C7    2   2.155  -2.721  -0.411
    1JZ4     C8    3   2.207  -2.675  -0.533
    1JZ4     C9    4   2.267  -2.551  -0.545
    1JZ4    C10    5   2.277  -2.473  -0.430
    1JZ4    C11    6   2.169  -2.646  -0.295
    1JZ4    C12    7   2.229  -2.519  -0.308
    1JZ4    C13    8   2.246  -2.441  -0.181
    1JZ4    C14    9   2.392  -2.470  -0.139
    1JZ4    OAB   10   2.341  -2.354  -0.434
    1JZ4     H1   11   2.531  -2.436   0.015
    1JZ4     H2   12   2.366  -2.453   0.069
    1JZ4     H3   13   2.417  -2.306  -0.010
    1JZ4     H4   14   2.107  -2.812  -0.407
    1JZ4     H5   15   2.199  -2.735  -0.617
    1JZ4     H6   16   2.304  -2.518  -0.635
    1JZ4     H7   17   2.137  -2.681  -0.204
    1JZ4     H8   18   2.178  -2.476  -0.106
    1JZ4     H9   19   2.227  -2.337  -0.193
    1JZ4    H10   20   2.458  -2.429  -0.214
    1JZ4    H11   21   2.402  -2.577  -0.131
    1JZ4    H12   22   2.374  -2.321  -0.516

   5.99500   5.19182   9.66100   0.00000   0.00000  -2.99750   0.00000   0.00000   0.00000
```
更新总的原子数目，增加 `complex.gro` 的第二行，即原有大蛋白的原子数加上添加进来的小分子原子数，注意该文件不能有空行的出现:
```
Gyas ROwers Mature At Cryogenic Speed
2614+22=2636
```
添加完成后，可以使用pymol可视化观察`complex.gro`，应该可以看到大蛋白和小分子配体共存。

### 构建拓扑

蛋白质的限制势itp文件在pdb2gmx的时候已经产生，但小分子的没有，genrestr是对输入的结构产生坐标或距离限制势itp文件的工具，接下来运行命令，进行限制势的产生：
```
gmx genrestr -f mol.gro -o posre_mol.itp
```

//选择组的时候选择0，system默认的位置限制势常数是1000kJ/mol/nm2，已经足够大
//将下列语句插入到mol.itp文件的末尾，注意，复制时连“#”井号一同复制，最好在末尾添加之前空一行，方便检查文件错误

```
#ifdef POSRES
#include "posre_mol.itp"
#endif
```

//这样当mdp中使用define = -DPOSRES的时候配体的位置也会被限制了

//把配体的itp文件引入整体的拓扑文件topol.top，把分子数也设置好
//注意，在引入的时候需要将小分子的mol.itp文件引入到蛋白质链之前，因为mol.itp最开头定义了[atomtypes]因此，这个itp要最优先被引入
//将下列语句插入到引入蛋白质的itp文件引入之前；

```
#include "mol.itp"
```

在末尾的`[molecules]`中引入**JZ4 1**，将`topol.top`的格式与`complex.gro`中分子出现的顺序对应：
```
[ molecules ]
; Compound        #mols
Protein_chain_A     1
JZ4                 1
```

## 溶剂化

使用以下命令设置模拟盒子，这里选用立方体盒子，可能会增加计算量，但是不容易产生边界相互作用的问题：
```
gmx editconf -f complex.gro -o complex_box.gro -d 0.8 -bt cubic
```

得到`complex_box.gro`文件后为容器内加水：

```
gmx solvate -cp complex_box.gro -cs spc216.gro -o complex_SOL.gro -p topol.top
```
这里的`-cs spc216.gro`可以不写，意思是默认选择GROMACS内置的预平衡的SPC水模型（216个水分子构成的立方盒子），默认是简单点电荷（SPC）水模型。其他可选溶剂如`tip3p.gro`、`tip4p.gro`等。

注意这一步加水后有可能topol.top文件最后一行的SOL可能会串行，需要手动添加回车，避免其与`mol 1`连在同一行，容易在后续处理中报错。

构建一个`ions.mdp`配置文件：

```
; LINES STARTING WITH ';' ARE COMMENTS
title		    = Minimization	; Title of run

; Parameters describing what to do, when to stop and what to save
integrator	    = steep		; Algorithm (steep = steepest descent minimization)
emtol		    = 1000.0  	; Stop minimization when the maximum force < 10.0 kJ/mol
emstep          = 0.01      ; Energy step size
nsteps		    = 50000	  	; Maximum number of (minimization) steps to perform

; Parameters describing how to find the neighbors of each atom and how to calculate the interactions
nstlist		    = 1		    ; Frequency to update the neighbor list and long range forces
cutoff-scheme   = Verlet
ns_type		    = grid		; Method to determine neighbor list (simple, grid)
rlist		    = 1.0		; Cut-off for making neighbor list (short range forces)
coulombtype	    = cutoff	; Treatment of long range electrostatic interactions
rcoulomb	    = 1.0		; long range electrostatic cut-off
rvdw		    = 1.0		; long range Van der Waals cut-off
pbc             = xyz 		; Periodic Boundary Conditions
```
生成临时tpr文件：
```
gmx grompp -f ions.mdp -c complex_SOL.gro -p topol.top -o ions.tpr -maxwarn 1
```
这里如果警告较多可以将maxwarn的数值改大一些。

最后为体系加离子，使得整个体系变为电中性：
```
gmx genion -s ions.tpr -p topol.top -o system.gro -neutral
```
这里选择分组时选择SOL对应的分组，产生的带有离子且电中性的体系为`system.gro`。同时可以额外使用`-pname NA -nname CL`来选择添加的阴阳离子类型，具体名称根据力场来选择。

最终的结果为总拓扑文件`[ molecules ]`后出现对应数目的离子，同时使用pymol也观察到`system.gro`文件中加载了氯离子：
```
[ molecules ]
; Compound        #mols
Protein_chain_A     1
JZ4                 1
SOL             10228
CL                  6
```

## 能量最小化

创建如下`em.mdp`文件：
```
; LINES STARTING WITH ';' ARE COMMENTS
title		    = Minimization	; Title of run

; Parameters describing what to do, when to stop and what to save
integrator	    = steep		; Algorithm (steep = steepest descent minimization)
emtol		    = 1000.0  	; Stop minimization when the maximum force < 10.0 kJ/mol
emstep          = 0.01      ; Energy step size
nsteps		    = 50000	  	; Maximum number of (minimization) steps to perform

; Parameters describing how to find the neighbors of each atom and how to calculate the interactions
nstlist		    = 1		        ; Frequency to update the neighbor list and long range forces
cutoff-scheme   = Verlet
ns_type		    = grid		    ; Method to determine neighbor list (simple, grid)
rlist		    = 1.2		    ; Cut-off for making neighbor list (short range forces)
coulombtype	    = PME		    ; Treatment of long range electrostatic interactions
rcoulomb	    = 1.2		    ; long range electrostatic cut-off
vdwtype         = cutoff
vdw-modifier    = force-switch
rvdw-switch     = 1.0
rvdw		    = 1.2		    ; long range Van der Waals cut-off
pbc             = xyz 		    ; Periodic Boundary Conditions
DispCorr        = no
```

使用以下命令载入`em.mdp`文件，开始能量最小化：
```
gmx grompp -f em.mdp -c system.gro -p topol.top -o em.tpr
```

使用启动能量最小化：
```
gmx mdrun -v -deffnm em
```
最终的系统收敛会输出以下内容：
```
Steepest Descents converged to Fmax < 1000 in 143 steps
Potential Energy  = -4.9014547e+05
Maximum force     =  8.7411469e+02 on atom 27
Norm of force     =  5.6676244e+01
```
然后允许该命令，选择"10 0"，可以得到能量最小化曲线，使用看图软件即可查看能量变化图：
```
gmx energy -f em.edr -o potential.xvg
```


## 平衡
### 约束配体
为了约束配体，我们需要为其生成位置约束拓扑。首先，为 JZ4 创建一个仅包含其非氢原子的索引组：
```
gmx make_ndx -f jz4.gro -o index_jz4.ndx
...
 > 0 & ! a H*
 > q
```
然后，执行 genrestr 模块并选择这个新创建的索引组（将是 index_jz4.ndx 文件中的第 3 组）：
```
gmx genrestr -f jz4.gro -n index_jz4.ndx -o posre_jz4.itp -fc 1000 1000 1000
```

我们需要将此信息包含在拓扑中。我们可以通过多种方式做到这一点，具体取决于我们希望使用的条件。如果我们只想在蛋白质也被约束时抑制配体，请在指示的位置将以下行添加到拓扑结构中：

```
; Include Position restraint file
#ifdef POSRES
#include "posre.itp"
#endif

; Include ligand topology
#include "jz4.itp"

; Ligand position restraints
#ifdef POSRES
#include "posre_jz4.itp"
#endif

; Include water topology
#include "./charmm36-jul2022.ff/tip3p.itp"
```

位置很重要！您必须按照指示在拓扑中调用 posre_jz4.itp。jz4.itp 中的参数为我们的配体定义了一个指令。分子型以包含水拓扑结构 （tip3p.itp） 结束。在其他任何位置调用 posre_jz4.itp 将尝试将位置约束参数应用于错误的分子类型。[ moleculetype ]


我们需要一个合并蛋白质和 JZ4 的特殊索引组。我们通过 make_ndx 模块来实现这一点，提供整个系统的任何坐标文件。在这里，我使用的是 em.gro，这是我们系统的输出（最小化）结构：
```
gmx make_ndx -f em.gro -o index.ndx
```

将显示以下提示词：

```
  0 System              : 33506 atoms
  1 Protein             :  2614 atoms
  2 Protein-H           :  1301 atoms
  3 C-alpha             :   163 atoms
  4 Backbone            :   489 atoms
  5 MainChain           :   651 atoms
  6 MainChain+Cb        :   803 atoms
  7 MainChain+H         :   813 atoms
  8 SideChain           :  1801 atoms
  9 SideChain-H         :   650 atoms
 10 Prot-Masses         :  2614 atoms
 11 non-Protein         : 30892 atoms
 12 Other               :    22 atoms
 13 JZ4                 :    22 atoms
 14 CL                  :     6 atoms
 15 Water               : 30864 atoms
 16 SOL                 : 30864 atoms
 17 non-Water           :  2642 atoms
 18 Ion                 :     6 atoms
 19 JZ4                 :    22 atoms
 20 CL                  :     6 atoms
 21 Water_and_ions      : 30870 atoms
```
将 “Protein” 和 “JZ4” 组与以下内容合并，输入"1 | 13"，再输入q退出：
```
> 1 | 13
> q
```

### NVT平衡

构建如下`nvt.mdp`文件：
```
title                   = Protein-ligand complex NVT equilibration 
define                  = -DPOSRES  ; position restrain the protein and ligand
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 50000     ; 2 * 50000 = 100 ps
dt                      = 0.002     ; 2 fs
; Output control
nstenergy               = 500   ; save energies every 1.0 ps
nstlog                  = 500   ; update log file every 1.0 ps
nstxout-compressed      = 500   ; save coordinates every 1.0 ps
; Bond parameters
continuation            = no        ; first dynamics run
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds to H are constrained 
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Neighbor searching and vdW
cutoff-scheme           = Verlet
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 20        ; largely irrelevant with Verlet
rlist                   = 1.2
vdwtype                 = cutoff
vdw-modifier            = force-switch
rvdw-switch             = 1.0
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
; Electrostatics
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
rcoulomb                = 1.2       ; short-range electrostatic cutoff (in nm)
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling
tcoupl                  = V-rescale                     ; modified Berendsen thermostat
tc-grps                 = Protein_JZ4 Water_and_ions    ; two coupling groups - more accurate
tau_t                   = 0.1   0.1                     ; time constant, in ps
ref_t                   = 300   300                     ; reference temperature, one for each group, in K
; Pressure coupling
pcoupl                  = no        ; no pressure coupling in NVT
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Dispersion correction is not used for proteins with the C36 additive FF
DispCorr                = no 
; Velocity generation
gen_vel                 = yes       ; assign velocities from Maxwell distribution
gen_temp                = 300       ; temperature for Maxwell distribution
gen_seed                = -1        ; generate a random seed
```
执行平衡：
```
gmx grompp -f nvt.mdp -c em.gro -r em.gro -p topol.top -n index.ndx -o nvt.tpr

gmx mdrun -deffnm nvt
```

### NPT平衡

构建下列`npt.mdp`文件：
```
title                   = Protein-ligand complex NPT equilibration 
define                  = -DPOSRES  ; position restrain the protein and ligand
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 50000     ; 2 * 50000 = 100 ps
dt                      = 0.002     ; 2 fs
; Output control
nstenergy               = 500       ; save energies every 1.0 ps
nstlog                  = 500       ; update log file every 1.0 ps
nstxout-compressed      = 500       ; save coordinates every 1.0 ps
; Bond parameters
continuation            = yes       ; continuing from NVT 
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds to H are constrained 
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Neighbor searching and vdW
cutoff-scheme           = Verlet
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 20        ; largely irrelevant with Verlet
rlist                   = 1.2
vdwtype                 = cutoff
vdw-modifier            = force-switch
rvdw-switch             = 1.0
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
; Electrostatics
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
rcoulomb                = 1.2
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling
tcoupl                  = V-rescale                     ; modified Berendsen thermostat
tc-grps                 = Protein_JZ4 Water_and_ions    ; two coupling groups - more accurate
tau_t                   = 0.1   0.1                     ; time constant, in ps
ref_t                   = 300   300                     ; reference temperature, one for each group, in K
; Pressure coupling
pcoupl                  = Berendsen                     ; pressure coupling is on for NPT
pcoupltype              = isotropic                     ; uniform scaling of box vectors
tau_p                   = 2.0                           ; time constant, in ps
ref_p                   = 1.0                           ; reference pressure, in bar
compressibility         = 4.5e-5                        ; isothermal compressibility of water, bar^-1
refcoord_scaling        = com
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Dispersion correction is not used for proteins with the C36 additive FF
DispCorr                = no 
; Velocity generation
gen_vel                 = no        ; velocity generation off after NVT 
```
执行平衡：
```
gmx grompp -f npt.mdp -c nvt.gro -t nvt.cpt -r nvt.gro -p topol.top -n index.ndx -o npt.tpr

gmx mdrun -deffnm npt
```
分别显示压力和密度平衡过程图，选择项目为pressure、density，x轴为"0 time"
```
gmx energy -f npt.edr -o pressure.xvg

gmx energy -f npt.edr -o density.xvg
```

## 开始模拟
构建以下`md.mdp`文件，设置合理时间，一般是大于100ns：
```
title                   = Protein-ligand complex MD simulation 
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 5000000   ; 2 * 5000000 = 10000 ps (10 ns)
dt                      = 0.002     ; 2 fs
; Output control
nstenergy               = 5000      ; save energies every 10.0 ps
nstlog                  = 5000      ; update log file every 10.0 ps
nstxout-compressed      = 5000      ; save coordinates every 10.0 ps
; Bond parameters
continuation            = yes       ; continuing from NPT 
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds to H are constrained
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Neighbor searching and vdW
cutoff-scheme           = Verlet
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 20        ; largely irrelevant with Verlet
rlist                   = 1.2
vdwtype                 = cutoff
vdw-modifier            = force-switch
rvdw-switch             = 1.0
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
; Electrostatics
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
rcoulomb                = 1.2
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling
tcoupl                  = V-rescale                     ; modified Berendsen thermostat
tc-grps                 = Protein_JZ4 Water_and_ions    ; two coupling groups - more accurate
tau_t                   = 0.1   0.1                     ; time constant, in ps
ref_t                   = 300   300                     ; reference temperature, one for each group, in K
; Pressure coupling 
pcoupl                  = Parrinello-Rahman             ; pressure coupling is on for NPT
pcoupltype              = isotropic                     ; uniform scaling of box vectors
tau_p                   = 2.0                           ; time constant, in ps
ref_p                   = 1.0                           ; reference pressure, in bar
compressibility         = 4.5e-5                        ; isothermal compressibility of water, bar^-1
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Dispersion correction is not used for proteins with the C36 additive FF
DispCorr                = no 
; Velocity generation
gen_vel                 = no        ; continuing from NPT equilibration 
```
执行命令，启动模拟，利用GPU加速，并输出详细步骤：
```
gmx grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -n index.ndx -o md_0_10.tpr

gmx mdrun -deffnm md_0_10 -nb gpu -v
```
## 结果分析

