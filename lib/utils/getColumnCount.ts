
/**
 * @description: 返回参数的最大值：为了设置每行最少的列数 
 * @param {number} GAP_WIDTH 格子之间的水平间隙
 * @param {number} COLUMN_WIDTH 格子宽度220
 * @param {number} MIN_COLUMN_COUNT 最小列数(可不填,默认为1)
 * @return {number} 返回每行的列数
 * @author: pan
 */
const getColumnCount = (bodyWidth: number, GAP_WIDTH: number, COLUMN_WIDTH: number, MIN_COLUMN_COUNT?: number | undefined): number => {
    // 如果 MIN_COLUMN_COUNT 未定义，则将其设为一个默认值
    const minCount = MIN_COLUMN_COUNT !== undefined ? MIN_COLUMN_COUNT : 1;
    // Math.floor向下取整，返回整列
    return Math.max(minCount, Math.floor((bodyWidth + GAP_WIDTH) / (COLUMN_WIDTH + GAP_WIDTH)));
};
export default getColumnCount;