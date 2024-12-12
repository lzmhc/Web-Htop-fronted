# Web-Htop-Fronted
Web-Htop项目的前端部分。  
> 以静态网页的形式提供。  

## 开发
以pnpm作为包管理工具。  
```sh
pnpm i
```
### 本地模拟接口
使用json-server来模拟接口，方便开发。  
> 本项目的模拟json文件为根目录的`db.json5`文件
```bash
npm i -g json-server
```

```bash
json-server db.json5
```
> 默认3000端口
### 反向代理
如果在局域网中，与另一台机器进行调试，需要使用反向代理。  
```ts
// 项目根目录的vite.config.ts
// ......
  server: {
		proxy: {
			'/info': {
				target: 'http://192.168.31.207:8080/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
```

## 部署
将api中的地址换成`/info`后再打包，请求本地同端口。  
```bash
pnpm build
```
生成dist目录后，将其内部全部文件移动到springboot项目对应的静态文件目录下。  
