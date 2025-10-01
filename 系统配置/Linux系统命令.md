# Linux系统命令

cat /etc/hosts
# 查询系统相关信息

查询操作系统内核信息
```bash
# 操作系统内核详细信息
uname -a
# 内核版本
uname -r
# 系统架构
uname -m

# 系统发行版信息
cat /etc/os-release

# 主机信息
hostname
# 详细主机信息
hostnamectl

# 负载信息
uptime
```


查询CPU信息
```bash
# 查看cpu详细信息
lscpu
# 查看物理核心数
grep "cpu cores" /proc/cpuinfo | uniq
# 查看逻辑线程数
grep "siblings" /proc/cpuinfo | uniq
```

查询内存信息
```bash
free -h
```

查询磁盘信息
```bash
df -hT

lsblk
```

查询网络信息
```bash
ip addr
```

查询PCIe信息
```bash
lspci
```

查询显卡信息
```bash
nvidia-smi
```

查询usb接口信息
```bash
lsusb
```

# 文件处理命令