/*
 * @Author: xx
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-28 12:24:33
 * @Description: 
 * @FilePath: \react-waterfall\src\views\WaterFall\index.tsx
 */
import './index.css'
import React, { useRef, useEffect, useState } from 'react';

const WaterFall = () => {
  const cellsContainerRef = useRef<HTMLDivElement>(null);
  /**
 * @description: 最少列数
 */
  let MIN_COLUMN_COUNT = 1;
  /**
   * @description: 格子宽度220
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
    style: any
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

  const getColumnCount = () => {
    // 返回参数的最大值：为了设置每行最少的列数 
    // Math.floor向下取整，返回整列
    return Math.max(MIN_COLUMN_COUNT, Math.floor((document.body.offsetWidth + GAP_WIDTH) / (COLUMN_WIDTH + GAP_WIDTH)));
  };

  // 重置列高度和数组
  const resetHeights = (count: number) => {
    columnHeights = [];
    // setColumnHeights([])
    for (let i = 0; i < count; i++) {
      columnHeights.push(0);
    }
    cellsContainerRef.current!.style.width = `${count * (COLUMN_WIDTH + GAP_WIDTH) - GAP_WIDTH}px`;
    console.log(cellsContainerRef.current!.style.width, "cellsContainerRef.width");

  };

  // 窗口布局变化
  let delayedResize = function () {
    console.log("窗口大小变化了");

    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(reflowCells, 500);
  };

  //如果在调整大小后需要计算新的列数据。  
  let reflowCells = function () {
    // 计算调整大小后的新列计数。
    columnCount = getColumnCount();
    console.log(columnCount, "columnCount");

    console.log(columnHeights.length, 3333);

    if (columnHeights.length != columnCount) {
      // 重置列高度和容器宽度的数组。
      resetHeights(columnCount);
      init([
        {
          height: 0,
          img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
          style: { left: "0", top: "0", height: "0" }
        },
        {
          height: 0,
          img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
          style: { left: "0", top: "0", height: "0" }
        },
        {
          height: 0,
          img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
          style: { left: "0", top: "0", height: "0" }
        },
        {
          height: 0,
          img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
          style: { left: "0", top: "0", height: "0" }
        },


      ])
    } else {
      judgeAppend();
    }
  };



  // 初始化设置盒子的高度
  const init = (cells: any) => {
    let columnIndex;
    let columnHeight;  // 最小的高度
    // console.log(columnHeights, "columnHeights");
    for (let j = 0, k = cells.length; j < k; j++) {
      columnIndex = getMinKey(columnHeights);
      // console.log(columnIndex, "最小高度的下标");
      columnHeight = columnHeights[columnIndex];
      // console.log(columnHeight, "最小的高度");
      let key = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      cells[j].height = key
      columnHeights[columnIndex] = columnHeight + GAP_HEIGHT * 4 + cells[j].height; //计算插入图片后的高度
      // console.log(columnHeights, "高度arr");
      cells[j].style.left = `${columnIndex * (COLUMN_WIDTH + GAP_WIDTH)}px`; //计算left偏移
      cells[j].style.top = `${columnHeight}px`;
      cells[j].style.height = `${cells[j].offsetHeight + CELL_PADDING}px`; //计算height偏移

      cells[j].style.height = `${cells[j].height + CELL_PADDING}px`; //计算外盒子高度
    }
    setCells(cells)
    console.log(cells, "set");
    judgeAppend()
  }

  /**
   * @description: 判断是否继续加载
   * @return {boolean} true是需要继续加载，false是不需要
   * @author: panrunjun
   */
  const judgeAppend = (): boolean => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const viewportTop = scrollTop - cellsContainerRef.current!.offsetTop;
    const viewportBottom = window.innerHeight + viewportTop;
    console.log(viewportBottom, "窗口高度");
    console.log(getMinVal(columnHeights), "盒子列表最小的高度");
    if (viewportBottom > getMinVal(columnHeights)) {
      console.log("窗口大");
      appendCells(columnCount);
      setTimeout(()=>{
        judgeAppend()
      },500)
      return true;
    } else {
      console.log("窗口小");
      return false;
    }

  }


  // 添加节点
  const appendCells = (num: number) => {
    console.log(cells, "cells");
    console.log(num, "append");
    let columnIndex;
    let columnHeight;  // 最小的高度
    let newCells = [
      {
        height: 0,
        img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
        style: { left: "0", top: "0", height: "0" }
      },
      {
        height: 0,
        img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
        style: { left: "0", top: "0", height: "0" }
      },
      {
        height: 0,
        img: 'https://img.keaitupian.cn/newupload/02/1675763150281920.jpg',
        style: { left: "0", top: "0", height: "0" }
      },
    ]

    for (let j = 0; j < num; j++) {
      columnIndex = getMinKey(columnHeights);
      // console.log(columnIndex, "最小高度的下标");
      columnHeight = columnHeights[columnIndex];
      // console.log(columnHeight, "最小的高度");
      let key = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      newCells[j].height = key
      columnHeights[columnIndex] = columnHeight + GAP_HEIGHT * 4 + newCells[j].height; //计算插入图片后的高度
      // console.log(columnHeights, "高度arr");
      newCells[j].style.left = `${columnIndex * (COLUMN_WIDTH + GAP_WIDTH)}px`; //计算left偏移
      newCells[j].style.top = `${columnHeight}px`; //计算top偏移
      // newCells[j].style.height = `${newCells[j].offsetHeight + CELL_PADDING}px`; //计算height高度
      newCells[j].style.height = `${newCells[j].height + CELL_PADDING}px`; //计算外盒子高度
    }

    console.log(newCells, "newCells");
    console.log(cells, "cells");

    setCells((prevCells) => [...prevCells, ...newCells]);

    // setCells(cells,newCells);
  }

  // 添加了一个 500 毫秒的节流（throttle）效果,防止滚动事件频发
  const delayedScroll = () => {
    clearTimeout(scrollDelay);
    if (!managing) {
      scrollDelay = setTimeout(judgeAppend, 500);
    }
  };

  useEffect(() => {
    delayedResize();

    window.addEventListener('resize', delayedResize);
    // 延迟0.5s,防止数据还没有加载setInterval
    // setTimeout(()=>{
    // },2000)
    window.addEventListener('scroll', delayedScroll);
  }, [])
  return (
    <>
      <div>
        {cells.length}
      </div>
      <h1>Waterfall Layout</h1>
      <div id='notice' className='off'></div>
      <div ref={cellsContainerRef} id="cells">

        {cells.map((cell, index) => {
          return (
            <div key={index} style={cell.style} className="cell ready">
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
