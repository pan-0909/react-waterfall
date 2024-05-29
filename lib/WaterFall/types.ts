import { type } from "os"

/*
 * @Author: xx
 * @Date: 2024-05-28 13:27:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 17:57:11
 * @Description: 
 * @FilePath: \reactProjects\react-waterfall\lib\WaterFall\types.ts
 */
namespace WaterFallType {
  export type Cell = {
    img: string
    height: number
    style: any
  }
  export type Props = {
    // num: number   // 添加节点的数量
    getData: (num: number) => void
    onClick: () => void
    newCellArr: Array<Cell>
  }
}
export type { WaterFallType }; // 添加空的导出语句


