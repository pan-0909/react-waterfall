<!--
 * @Author: panrunjun
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 23:58:57
 * @Description: 
 * @FilePath: \reactProjects\react-waterfall\README.md
-->
# react版本自适应瀑布流布局
## 引入后使用WaterFall
- npm下载

```javascript
npm i react-waterfall-plugin
```

- 先调用getNum方法获取每列的盒子数目perPage
- 把每列的盒子数目调用后端接口获取对应的数据，eg:getData(perPage)
- 把后端传过来的数据放到list

- 下面是我写的一个小demo

```javascript
import WaterFall from 'react-waterfall-plugin'

function App() {
  let arr: any = []
  // 子组件获取数据返回num
  const handleChildGetData = (num: number) => {
    getData(num)
  }
  // 获取数据的方法(后端分页获取。num是每次获取的数量)
  const getData = (num:number) => {
    for (let i = 0; i < num; i++) {

        // 模拟后端传过来的数据，在项目中直接调用后端就行
      arr.push(
        {
          img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
          title:`test${num}`
        }
      )
    }
  }
 
  return (
    <>
      <WaterFall getNum={handleChildGetData} list={arr} />
    </>
  )
}

export default App

```

## 效果演示
![image](https://github.com/pan-0909/react-waterfall/blob/main/public/git.gif)

## 参数说明
|  属性   | 说明  |  类型  | 默认值 |
|  ----  | ----  | ----  | ----  | 
| list  | 需要使用的数据 | Array<{img?: stringtitle?: string content?: string }> | null  | 
| gap_height  | 单元格上下间隔 | number | 90 | 
| range_height  | 图片的高度随机取值范围,默认150的范围是200-350,100是150-300,以此类推 | number | 150 | 
| getNum  | 获取num | (num: number) => void  | null | 


## git提交规范 欢迎pr
- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

## 待优化问题
- 更换窗口大小的时候重新更新数据（待优化）setCells([])
- 新增点赞收藏
- 新增loding加载

## 联系我
- 1957457389@qq.com