export function formatCount(originNum: number) {
  return originNum > 10000
    ? (originNum / 10000).toFixed(1).toString() + '万'
    : originNum
}
