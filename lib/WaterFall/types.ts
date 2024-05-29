import { type } from "os"

/*
 * @Author: xx
 * @Date: 2024-05-28 13:27:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 23:14:15
 * @Description: 
 * @FilePath: \reactProjects\react-waterfall\lib\WaterFall\types.ts
 */
namespace WaterFallType {
  export type Cell = {
    img?: string
    height: number
    style: any
    title?: string
    content?: string
  }

  // 传入的数组的元素
  export type ListCell = {
    img?: string
    title?: string
    content?: string
  }
  export type Props = {
    getNum: (num: number) => void
    list: Array<ListCell>
    gap_height?: number //设置盒子间隔
    range_height?:number // 设置img的高度范围
  }
}
export type { WaterFallType }; // 添加空的导出语句


