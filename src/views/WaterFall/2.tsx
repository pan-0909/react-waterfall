/*
 * @Author: xx
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-27 17:28:25
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

  const noticeContainerRef = useRef<HTMLDivElement>(null);
  const cellsContainerRef = useRef<HTMLDivElement>(null);


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

  /**
  * @description: 根据页面的宽度计算列数，
  * @return {number} 列数 
  * @author: pan
  */
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
  };

  // 定位新的单元格和更新高度
  const adjustCells = function (cells: any, reflow: any) {
    let columnIndex;
    let columnHeight;
    for (let j = 0, k = cells.length; j < k; j++) {
      // 将单元格插入到最小的地方
      columnIndex = getMinKey(columnHeights); 
      columnHeight = columnHeights[columnIndex];
      
      // cells[j].style.height = `${cells[j].offsetHeight + CELL_PADDING}px`;
      // console.log(cells[j].offsetHeight,"height");
      cells[j].style.left = `${columnIndex * (COLUMN_WIDTH + GAP_WIDTH)}px`;
      cells[j].style.top = `${columnHeight}px`;
      columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
      
      if (!reflow) {
        cells[j].className = 'cell ready';
      }
    }
    cellsContainerRef.current!.style.height = `${getMaxVal(columnHeights)}px`;
    manageCells();
  };

  //如果在调整大小后需要计算新的列数据。  
  let reflowCells = function () {
    // 计算调整大小后的新列计数。
    columnCount = getColumnCount();
    console.log(columnCount, 3333);
    if (columnHeights.length != columnCount) {
      // 重置列高度和容器宽度的数组。
      resetHeights(columnCount);
      adjustCells(cellsContainerRef.current!.children, true);
    } else {
      manageCells();
    }
  };
  interface Cell {
    img: string
    height:number
  }
  const cellsFragmentRef = useRef([]);
  const [cells, setCells] = useState<Array<Cell>>([]);
  const [viewportTop, setViewportTop] = useState(0);
  const [viewportBottom, setViewportBottom] = useState(0);


  // 从dom中切换单元格的内容，取决于他们的视窗的偏移量，能节省内存
  const manageCells = () => {
    // 变更状态，防止重复请求
    managing = true;
    const cells = cellsContainerRef.current!.children;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const viewportTop = scrollTop - cellsContainerRef.current!.offsetTop;
    const viewportBottom = window.innerHeight + viewportTop;
    console.log(columnHeights);
    console.log(viewportBottom, getMinVal(columnHeights), 2222);
    // 如果单元格的高度小于窗口高度就加载图片
    if (viewportBottom > getMinVal(columnHeights)) {
      appendCellsDemo(columnCount);
      console.log(222);
    }
    managing = false;
    console.log(managing);

    // 移除单元格
    for (let i = 0, l = cells.length; i < l; i++) {
      if ((cells[i].offsetTop - viewportBottom > THRESHOLD) || (viewportTop - cells[i].offsetTop - cells[i].offsetHeight > THRESHOLD)) {
        if (cells[i].className === 'cell ready') {
          cellsFragmentRef.current[i] = cells[i].innerHTML;
          cells[i].innerHTML = '';
          cells[i].className = 'cell shadow';
        }
      } else {
        if (cells[i].className === 'cell shadow') {
          cells[i].innerHTML = cellsFragmentRef.current[i];
          cells[i].className = 'cell ready';
        }
      }
    }

  };


  const appendCellsDemo = (num: number) => {
    console.log(num,"append");
    let newCells = []
    for (let j = 0; j < num; j++) {
      let key = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      newCells.push(
        { 
          height:key,
          img: 'https://th.bing.com/th/id/OIP.7KW5GT7NQ8yUGlBbCHEm0gHaNK?rs=1&pid=ImgDetMain'
        },
      )
    }
    console.log(newCells);
    console.log(cells);
    let c = cells.concat(newCells)
    console.log(c,"cccc");
    
    // setCells(cells,newCells);
    setCells(c)
    console.log(cells);
  }

  // Add 500ms throttle to window scroll.
  let delayedScroll = function () {
    clearTimeout(scrollDelay);
    if (!managing) {
      // Avoid managing cells for unnecessity.
      scrollDelay = setTimeout(manageCells, 500);
    }
  };

  // 窗口布局变化
  let delayedResize = function () {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(reflowCells, 500);
  };


  useEffect(() => {
    const noticeContainer = noticeContainerRef.current;
    const cellsContainer = cellsContainerRef.current;
    delayedResize()
    window.addEventListener('resize', delayedResize);
    window.addEventListener('scroll', delayedScroll);
    reflowCells();
    setTimeout(() => {
      manageCells();
    }, 1000);

    // 初始化列高度和容器宽度
    columnCount = getColumnCount();
    console.log(columnCount);
    resetHeights(columnCount);
    window.addEventListener('scroll', manageCells);
    return () => window.removeEventListener('scroll', manageCells);
  }, []);
  return (
    <>
      <h1>Waterfall Layout</h1>
      <div id='notice' className='off'></div>
      <div ref={cellsContainerRef} id="cells">
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
