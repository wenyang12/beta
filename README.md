# H5项目脚手架
> 代号：beta  
> 作者：罗瑛  
> 联系：企信

beta是基于命令行的脚手架，支持从项目开始的创建到开发阶段，再到打包部署阶段的整个生命周期。  

## 项目开始前
从咱们私有npm仓库安装beta。
```bash
npm install -g beta
```
打开命令终端，输入：
```bash
beta -h
```
即可看到所有beta命令。

## 命令列表：
* [create &lt;project&gt;](#create-project)
* [init](#init)
* [start](#start)
* [buld [env]](#build-env)
* [generate &lt;type&gt; [widgets...]](#generate-type-widgets)

### create &lt;project&gt;
新建一个H5项目，project参数为项目名称，根据预定义好的H5项目结构模板，自动生成项目结构和相关基础文件和代码。

### init
初始化项目，这个命令会自动执行：git init、连接远程git仓库、添加子模块。  
* git init：初始化git本地版本
* 连接远程git仓库：实际执行的是`git add remote origin xxx.git`
* 添加子模块：添加的子模块有`libs` `components` `mixins` `webpack`

支持的选项列表：
* -n, --npm： 自动执行`npm install`安装依赖

 ```bash
 beta init -n
 ```
 `npm install`可能会很慢，这个选项请谨慎。

### start
启动项目，会自动执行`webpack`本地开发构建程序，开始编译代码，进入正式开发阶段。

### build [env]
构建项目，打包测试或生产环境代码。  
`env`参数指定部署的环境，目前支持的环境有：`sde` `fte` `fte2` `pte` `fsceshi` `www`。  
默认是`www`，即线上环境。

### generate &lt;type&gt; [widgets...]
生成器，按约定的构件模板，自动生成指定类型的构件，统一规范。  
支持同时生成多个构件，多个构件名称以空格分开。  
* generate page：生成路由页面，页面生成在`src/pages`下
* generate component：生成React UI组件，组件生成在`src/components`下
* generate module：生成非UI组件的业务模块，模块生成在`src/modules`下

支持的选项列表：
* -g, --global：创建全局的公共组件，组件默认生成在业务项目的`src/components`目录下，若想在`components`子模块（全局公共组件仓库）创建一个组件，就要带上`-g`或`--global`选项。  
这个选项仅生成UI组件有效。  
```bash
beta generate component demo -g
```
* -p, --package：将业务模块创建在指定的包内，默认`module`命令创建的模块是直接创建在`src/modules`目录下，若想创建在一个目录内，可以带上`-p`或`--package`选项。  
这个选项仅生成业务模块有效。  
```bash
# 模块：src/modules/demo/demo.js
beta generate module demo -p demo
```
* -f, --force：若构件已存在，默认不允许再生成，若想强制重新生成，就带上`-f`或`--force`选项，会覆盖旧构件。  
这个选项对生成页面、组件和模块都有效。  
```bash
beta generate component demo -f
```

## 项目进程
以`demo`作为H5项目来解说。
1. 项目伊始，先找一个放置工程代码的目录，例如`D:/code/dev/h5`，在此处打开终端，创建一个`demo`工程。
```bash
beta create demo
```
这条命令将会在`D:/code/dev/h5`下创建`demo`目录，已根据架构模板创建出来了基本的文件和文件夹。

2. 工程创建完了，接着就要初始化项目，包括`git`的初始化、子模块的添加等。
```bash
beta init
```
这条命令会陆续执行下面的git操作：
 * `git init`
 * `git add remote origin http://git.firstshare.cn/fe-h5/demo.git`
 * `git submodule add http://git.firstshare.cn/fe-h5/libs.git`
 * `git submodule add http://git.firstshare.cn/fe-h5/components.git`
 * `git submodule add http://git.firstshare.cn/fe-h5/mixins.git`
 * `git submodule add http://git.firstshare.cn/fe-h5/webpack.git`

3. 初始化完毕后，就能正常进入开发环节了，需要启动`webpack`本地开发编译。
```bash
beta start
```
webpack即启动了。  
*在运行这个命令之前，需要先跑完了npm install，安装好了依赖包，如果你有其他H5项目，可以直接从那里把node_modules复制过来使用。*

4. 代码需要一个首页才能跑起来，于是需要用生成器生成一个首页。
```bash
beta generate page home
```
这个命令会在`demo/src/pages`下生成一个`Home`目录，此目录下有`index.js`、`Home.jsx`和`home.less`三个文件。  
 * `index.js` 是入口文件，导出了真正的页面组件`Home.jsx`，已自动写上导出代码。  
 * `Home.jsx` 是真正的页面（React组件），开发时只需在此文件内添加代码。
 * `home.less` 是首页的样式文件，已在`Home.jsx`自动加上`require('./home.less')`的代码。

5. 着手开发首页，发现需要一个头部组件。
```bash
beta generate component header
```
这个命令会在`demo/src/components`下生成一个`Header`目录，此目录下有`index.js`、`Header.jsx`和`header.less`三个文件。  
这三个文件含义同上节的首页。

6. 开发过程中，我们发现需要一个请求服务接口的模块。
```bash
beta generate module api
```
这个命令会在`demo/src/modules`下生成一个`api.js`的模块，我们再在这个模块中写上请求服务接口的代码。

7. 过了一段时间，我们的功能开发完毕了，于是要提交给QAD测试。
```bash
# 部署fsceshi环境
beta build fsceshi
```
稍等一会，就会在`demo`目录下新创建出来一个`build`目录，这个目录下的代码就是构建打包后的代码，可以直接部署测试或生产环境。  
实际上，我们并不太需要在本地构建代码，而是在`Jenkins`自动部署平台操作。

到此为止，我们的整个项目进程已经走了一遍。

## 脚手架作用
免去繁琐的手工操作，提高开发效率，也为了保持规范一致。
