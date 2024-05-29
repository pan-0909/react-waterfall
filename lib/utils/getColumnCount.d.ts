/**
 * @description: 返回参数的最大值：为了设置每行最少的列数
 * @param {number} GAP_WIDTH 格子之间的水平间隙
 * @param {number} COLUMN_WIDTH 格子宽度220
 * @param {number} MIN_COLUMN_COUNT 最小列数(可不填,默认为1)
 * @return {number} 返回每行的列数
 * @author: pan
 */
declare const getColumnCount: (bodyWidth: number, GAP_WIDTH: number, COLUMN_WIDTH: number, MIN_COLUMN_COUNT?: number | undefined) => number;
export default getColumnCount;
