# 项目脚手架
> 代号：beta(β)  
> 作者：罗瑛  
> 联系：企信

beta是基于命令行的脚手架，支持从项目开始的创建到开发阶段，再到打包部署阶段的整个生命周期。  
致力于开发自动化、规范化和标准化。  

## 项目开始前
从咱们私有npm仓库安装beta。
```bash
npm install -g beta
```
安装完毕后，打开命令终端，输入：
```bash
beta -h
```
即可看到所有beta命令。命令的具体用法请看下面的命令列表和项目进程。  
若提示无此命令，则需要用root权限或管理员身份运行命令行终端，执行以下命令：
```bash
# mac或linux，sudo npm link
# windows用管理员身份启动cmd
npm link
```

## 命令列表：
* [beta create &lt;project&gt; [type]](#beta-create-project-type)
* [beta init](#beta-init)
* [beta start](#beta-start)
* [beta buld [env]](#beta-build-env)
* [beta generate page [pages...]](#beta-generate-page-pages)
* [beta generate component [components...]](#beta-generate-component-components)
* [beta generate module [modules...]](#beta-generate-module-modules)
* [beta generate view [views...]](#beta-generate-view-views)
* [beta generate ssi [ssis...]](#beta-generate-ssi-ssis)

### beta create &lt;project&gt; [type]
新建项目，project：项目名称，type：`h5`和`app`，若不指定，根据目录名推导项目类型。  
根据预定义好的项目结构模板，自动生成项目结构和相关基础文件和代码。

### beta init
初始化项目，这个命令会自动执行：git init、连接远程git仓库、添加子模块。  
* git init：初始化git本地版本
* 连接远程git仓库：实际执行的是`git add remote origin http://git.firstshare.cn/fe-xx/xxx.git`
* 添加子模块：根据`.gitmodules`文件自动匹配子模块，若无`.gitmodules`文件，则表示无子模块

支持的选项列表：
* -n, --npm： 自动执行`npm install`安装依赖

 ```bash
 # npm install
 beta init -n
 ```
 `npm install`可能会很慢，这个选项请谨慎。但是如果设置了咱们的私有npm仓库镜像，应该不会慢。  
* -r, --registry <url>：指定git仓库地址，例如：`fe-h5/demo.git`，若不指定，根据项目目录名和上级目录名推导。

 ```bash
 # http://git.firstshare.cn/fe-h5/form.git
 beta init -r fe-h5/form.git
 ```

### beta start
启动项目，会自动执行`npm run dev`脚本，开始编译代码，进入正式开发阶段。

### beta build [env]
构建项目，会自动执行`npm run product`脚本，打包测试或生产环境的代码。  
`env`参数指定部署的环境，目前支持的环境有：`sde` `fte` `fte2` `pte` `fsceshi` `www`。  
默认是`www`，即线上环境。

### beta generate page [pages...]
生成页面，仅H5项目。页面生成在`src/pages`下。  
支持同时生成多个页面，多个页面名称以空格分开。  
支持携带目录，如`beta generate page directory/Page1`。  
支持的选项列表：
* -f, --force：若页面已存在，默认不允许再生成，若要强制重新生成，就带上`-f`或`--force`选项，会覆盖旧的页面。  

 ```bash
 # force generate
 beta generate page Demo -f
 ```

### beta generate component [components...]
生成React组件，仅H5项目。组件生成在`src/components`下。  
支持同时生成多个组件，多个组件名称以空格分开。  
支持携带目录，如`beta generate component directory/Component1`。  
支持的选项列表：
* -f, --force：若组件已存在，默认不允许再生成，若要强制重新生成，就带上`-f`或`--force`选项，会覆盖旧的组件。

 ```bash
 # force generate
 beta generate component Demo -f
 ```
* -g, --global：创建全局的公共组件，组件默认生成在业务项目的`src/components`目录下，若想在`components`子模块（全局公共组件仓库）创建一个组件，就要带上`-g`或`--global`选项。

 ```bash
 # at demo/components/Demo
 beta generate component Demo -g
 ```

### beta generate module [modules...]
生成非UI组件的模块。`h5`类型项目生成在`src/modules`下，`app`类型项目生成在`项目/modules`下。  
支持同时生成多个模块，多个模块名称以空格分开。  
支持携带目录，如`beta generate modules directory/module1`。  
支持的选项列表：
* -f, --force：若模块已存在，默认不允许再生成，若要强制重新生成，就带上`-f`或`--force`选项，会覆盖旧的模块。

 ```bash
 # force module
 beta generate module demo -f
 ```
* -t, --type <type>：指定生成哪种应用类型的模块，支持`h5`、`app`，默认根据项目目录名推导。

 ```bash
 # a app module
 beta generate module demo -t app
 ```

### beta generate view [views...]
生成Backbone视图，仅App项目。组件生成在`项目/modules`下。  
支持同时生成多个视图，多个视图名称以空格分开。  
支持携带目录，如`beta generate view directory/view1`。  
支持的选项列表：
* -f, --force：若视图已存在，默认不允许再生成，若要强制重新生成，就带上`-f`或`--force`选项，会覆盖旧的视图。

 ```bash
 # force view
 beta generate view demo -f
 ```

### beta generate ssi [ssis...]
生成ssi碎片，仅官网。  
支持同时生成多个碎片，多个碎片名称以空格分开。  
支持携带目录，如`beta generate ssi directory/ssi1`。  
支持的选项列表：
* -f, --force：若碎片已存在，默认不允许再生成，若要强制重新生成，就带上`-f`或`--force`选项，会覆盖旧的碎片。

 ```bash
 # force ssi
 beta generate ssi demo -f
 ```
* -j, --js：是否需要同时生成js脚本文件。

 ```bash
 # generate as ssi/demo/demo.js
 beta generate ssi demo --js
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
(H5项目都有`libs` `components` `mixins` `webpack`这4个子模块)

3. 初始化完毕后，就能正常进入开发环节了，需要启动`webpack`本地开发编译(H5项目以webpack作为构建和模块管理工具)。
```bash
beta start
```
webpack即启动了。  
*在运行这个命令之前，需要先跑完了npm install，安装好了依赖包，如果你有其他H5项目，可以直接从那里把node_modules复制过来使用。*

4. 代码需要一个首页才能跑起来，于是需要用生成器生成一个首页。
```bash
beta generate page Home
```
*React组件遵守JSX命名规范，首字母大写驼峰式命名*  
这个命令会在`demo/src/pages`下生成一个`Home`目录，此目录下有`index.js`、`Home.jsx`和`home.less`三个文件。  
 * `index.js` 是入口文件，导出了真正的页面组件`Home.jsx`，已自动写上导出代码。  
 * `Home.jsx` 是真正的页面（React组件），开发时只需在此文件内添加代码。
 * `home.less` 是首页的样式文件，已在`Home.jsx`自动加上`require('./home.less')`的代码。

5. 着手开发首页，发现需要一个头部组件。
```bash
beta generate component Header
```
*React组件遵守JSX命名规范，首字母大写驼峰式命名*  
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

到此为止，我们的整个H5项目进程已经走了一遍。

___App项目类型类似，不提。___

## 脚手架作用
免去繁琐的手工操作，提高开发效率，也为了保持规范一致。
