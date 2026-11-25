# 光极律动官网｜开发交接包

技术栈：React 19 + Vite 6，JavaScript + CSS。
这是可编辑的完整项目源码，不是网页截图或只有构建产物的部署包。
先阅读本文件，再阅读 DEVELOPMENT-HANDOFF.md。

## 启动

推荐 Node.js 22 LTS 或更新 LTS 版本，使用 npm。
在本目录（package.json 所在目录）打开终端：

```sh
npm ci
npm run dev
```

访问终端显示的地址，通常为 http://127.0.0.1:5173/ 。

## 构建与预览

```sh
npm run build
npm run preview
```

产物位于 dist/。将 dist 内所有文件上传到网站根目录即可部署。
本版本使用 /assets/、/images/ 等根路径地址，部署到子路径前需要调整 Vite base 与资源引用。
不要直接双击 index.html 打开，需使用 HTTP/HTTPS 服务。

## 当前入口（重要）

index.html → src/site.jsx。
当前并不使用 src/main.jsx；该文件属于保留的早期版本。

- src/site.jsx / src/site.css：首页、导航、全局布局、页脚及合作弹窗。
- src/BusinessSections.jsx / src/business.css：企业内容板块。
- src/GradientASCII.jsx / src/GradientASCII.css：当前全局动态背景。
- public/images/narra-logo.png：用户提供的 NARRA 标识。
- public/images/footer-landscape.svg：页脚点阵装饰。

交接包保留历史组件和素材，详见交接说明。未包含 node_modules、构建缓存、本机凭据或 Git 历史。
