# AmberTools

AmberTools 是一套由 Amber（Assisted Model Building with Energy Refinement） 开发的 开源分子模拟工具集，主要用于 生物分子（蛋白质、核酸、小分子）的建模、模拟和分析。它是 Amber 软件包 的免费版本，包含了许多与 Amber 兼容的工具，但 不包含 Amber 的分子动力学（MD）主程序（如 pmemd）。

AmberTools 主要用于动力学模拟前处理、模拟后数据分析等，是免费开源工具，而Amber则是动力学模拟程序的本体，需要付费购买许可证。我们这里主要使用AmberTools来构建力场和做数据分析，配合gromacs做动力学模拟，因此使用开源版本即可。