/*
 * @Author: xx
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-27 18:03:17
 * @Description: 
 * @FilePath: \react-waterfall\src\views\WaterFall\index.tsx
 */
import './index.css'
import React, { useRef, useEffect, useState } from 'react';

const WaterFall = () => {
  /**
 * @description: 最少列数
 */
  let MIN_COLUMN_COUNT = 1;
  /**
   * @description: 格子宽度
   */
  let COLUMN_WIDTH = 220;
  /**
   * @description: 格子的填充
   */
  let CELL_PADDING = 26;
  /**
 * @description: 格子之间的垂直间隙
 */
  let GAP_HEIGHT = 15;
  /**
   * @description: 格子之间的水平间隙
   */
  let GAP_WIDTH = 15;
  /**
   * @description: 确定单元格是否离视口太远
   */
  let THRESHOLD = 2000;
  /**
   * @description: 每列高度的array,用于判断在在哪列插入盒子
   */
  let columnHeights: any = [];
  // const [columnHeights, setColumnHeights] = useState<number[]>([]);
  /**
   * @description: 每列个数
   */
  let columnCount = 1;
  /**
   * @description: 弹出通知计时器
   */
  let noticeDelay;
  /**
   * @description: 计时器大小
   */
  let resizeDelay: number | undefined;
  /**
   * @description: 滚动计时器
   */
  let scrollDelay: number | undefined;
  /**
   * @description: 管理单元格状态
   */
  let managing = false;

  /**
   * @description: 加载单元格状态
   */
  let loading = false;

  interface Cell {
    img: string
    height: number
  }
  const [cells, setCells] = useState<Array<Cell>>([]);
  
  // 获取数组中的最小值
  const getMinVal = (arr: number[]) => {
    console.log(arr);
    return Math.min.apply(Math, arr);
  };

  // 获取数组中的最大值
  const getMaxVal = (arr: number[]) => {
    return Math.max.apply(Math, arr);
  };

  /**
   * @description: 获取数组中的最小索引值
   * @param {string} arr
   * @return {number} 数组最小索引
   * @author: panrunjun
   */
  const getMinKey = (arr: string | any[]) => {
    let key = 0;
    let min = arr[0];
    for (let i = 1, len = arr.length; i < len; i++) {
      if (arr[i] < min) {
        key = i;
        min = arr[i];
      }
    }
    return key;
  };

  // 获取最大索引
  const getMaxKey = (arr: string | any[]) => {
    let key = 0;
    let max = arr[0];
    for (let i = 1, len = arr.length; i < len; i++) {
      if (arr[i] > max) {
        key = i;
        max = arr[i];
      }
    }
    return key;
  };


  const init = (cells:any) => {
    
    let columnIndex;
    let columnHeight;
    for (let j = 0, k = cells.length; j < k; j++) {
      let key = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      cells[j].height = key
      console.log(cells[j].height);
      columnHeights.push(cells[j].height)
      console.log(cells[j].height);
      console.log(CELL_PADDING);
      console.log(cells[j].height+CELL_PADDING);
      cells[j].style.height = `${cells[j].height + CELL_PADDING}px`;
      // console.log( cells[j].style.height);
      
      // 将单元格插入到最小的地方
      // columnIndex = getMinKey(columnHeights); 
      // columnHeight = columnHeights[columnIndex];
      
      // cells[j].style.height = `${cells[j].offsetHeight + CELL_PADDING}px`;
      // console.log(cells[j].offsetHeight,"height");
      // cells[j].style.left = `${columnIndex * (COLUMN_WIDTH + GAP_WIDTH)}px`;
      // cells[j].style.top = `${columnHeight}px`;
      // columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
    } 
    setCells(cells)
  }
  useEffect(()=>{
    init([
      { 
        height:10,
        img: 'https://th.bing.com/th/id/OIP.7KW5GT7NQ8yUGlBbCHEm0gHaNK?rs=1&pid=ImgDetMain'
      },
      { 
        height:10,
        img: 'https://th.bing.com/th/id/OIP.7KW5GT7NQ8yUGlBbCHEm0gHaNK?rs=1&pid=ImgDetMain'
      },
    ])
  },[])
  return (
    <>
      <h1>Waterfall Layout</h1>
      <div id='notice' className='off'></div>
      <div id="cells">
        <div>
          {cells.length}
        </div>
        {cells.map((cell, index) => {
          return (
            <div key={index} className="cell ready">
              <p>
                <a href="#">
                  <img src={cell.img} height={cell.height} width="190" />
                </a>
              </p>
              <h2><a href="#">demo img{cell.height}--{index} </a></h2>
            </div>
          )
        })}
      </div>
      <div id="loader" ><span>loading</span></div>
    </>
  )
}

export default WaterFall
