/*
 * @Author: xx
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-28 14:18:04
 * @Description: 
 * @FilePath: \react-waterfall\src\App.tsx
 */
import './App.css'
import React, { useRef, useEffect, useState } from 'react';
import WaterFall from './views/WaterFall';

const App = () => {
  return (
    <>
      <WaterFall num={3}></WaterFall>
    </>
  )
}

export default App
