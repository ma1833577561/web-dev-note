# use

[astro](https://astro.build/  )

```bash
npm create astro@latest

# 默认

```

```astro

---
export interface Props{
        name: string;
}
// name="小红"
const { name } = Astro.props 

---
{ name}

```

```js
路由
基于目录形式
/page/list
/page/item

支持*.astro
支持*.md
```

```jsx

pnpx  astro add solid
 
```