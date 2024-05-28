<!--
 * @Author: panrunjun
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-28 14:22:56
 * @Description: 
 * @FilePath: \react-waterfall\README.md
-->
# react版本瀑布流布局
## 引入后使用WaterFall
- 先调用getColumnCount方法获取每列的盒子数目perPage
- 把每列的盒子数目调用后端接口获取对应的数据，eg:getData(perPage)

## git提交规范
- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
