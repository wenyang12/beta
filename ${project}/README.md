## 编译项目
0. 预先升级`node.js`到最新版本，保证`npm`是`npm 3`（因为npm 3安装的node_modules可以直接复制到别的项目使用，不用重新再安装）
1. 安装编译依赖包：`cd` 到本项目目录，控制台运行`npm install`
2. 编译本地运行代码：`beta start`，浏览器运行编译生成的`dev`目录代码即可
3. 编译生产环境代码：`beta build www`，部署编译生成的`build`目录代码
4. 编译fte测试环境代码：`beta build fte`，部署编译生成的`build`目录代码

## 关于项目内引用公共库
1. 预先安装`Git`。
2. 了解`Git submodule`子模块的概念。
3. 签出仓库：`git clone http://git.firstshare.cn/fe-h5/${project}.git --recursive`
最后的参数表示递归签出公共库作为本项目的子模块，会看到在${project}目录下自动生成了`libs`、`mixins`、`components`三个公共库目录。
实际上，这三个公共库只是全局公共库的一个引用。
4. 开发时，只需引用本项目内的公共库子模块即可，不必单独在父级目录签出公共仓库。
5. 如果签出时忘了输入`recursive`参数，没关系，可以这样补救：先运行`git submodule init`，再运行`git submodule update`。
5. 更新submodule：`git submodule foreach git pull origin master`，或在公共库子模块目录运行`git pull origin master`。
6. 修改submodule：和修改普通仓库一样，先进入子模块目录，然后依次执行`git status`、`git commit`、`git push`，再回到本项目目录，依次执行`git status`、`git commit`、`git push`。
7. 添加submodule：`git submodule add http://git.firstshare.cn/fe-h5/xxx.git`，完毕之后执行`git status`、`git commit`，提交`.gitmodules`的修改。
