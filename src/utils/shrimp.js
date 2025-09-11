import { copyText } from "vue3-clipboard";
import {ElMessage} from "element-plus";

export function copy(text, msg) {
    if (!text) {
        ElMessage.warning("没有要复制的内容");
        return;
    }
    copyText(text, undefined, (error) => {
        if (error) {
            ElMessage.error("复制失败: " + error)
        } else {
            ElMessage.success(msg || "复制成功")
        }
    });
}

export function formatStorageSize(bytes) {
    if (bytes === null || bytes === undefined) {
        return null;
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}

export function timeDiffFormat(time1, time2) {
  const diff = timeDiff(time1, time2);
  return timeMillisFormat(diff);
}

export function timeDiff(start1, end1) {
  if (!start1 || !end1) {
    return 0;
  }
  if (!(start1 instanceof Date) && start1.length === 19) {
    start1 = new Date(start1);
  }
  if (!(end1 instanceof Date) && end1.length === 19) {
    end1 = new Date(end1);
  }
  if (!(start1 instanceof Date) || !(end1 instanceof Date)) {
    return 0;
  }
  const start2 = start1.getTime();
  const end2 = end1.getTime();
  const start3 = Math.min(start2, end2);
  const end3 = Math.max(start2, end2);
  return end3 - start3;
}

export function timeMillisFormat(timestamp) {
  if (timestamp === undefined || timestamp === null) {
    return '';
  }
  let minsec = timestamp < 0 ? 0 - timestamp : timestamp;

  const yy = 265 * 24 * 60 * 60 * 1000;
  const dd =       24 * 60 * 60 * 1000;
  const hh =            60 * 60 * 1000;
  const mm =                 60 * 1000;
  const ss =                      1000;

  const year = Math.floor((minsec / yy));
  minsec = minsec % yy;
  const day = Math.floor((minsec / dd));
  minsec = minsec % dd;
  const hour = Math.floor((minsec / hh));
  minsec = minsec % hh;
  const minute = Math.floor((minsec / mm));
  minsec = minsec % mm;
  const second = Math.floor((minsec / ss));

  let rt = '';
  rt = year > 0 ? rt + year + '年':rt;
  rt = day > 0 ? rt + day + '天':rt;
  rt = hour > 0 ? rt + hour + '小时':rt;
  rt = minute > 0 ? rt + minute + '分':rt;
  rt = second > 0 ? rt + second + '秒':rt;
  return rt;
}


export const timeRangeShortcuts = [
  {
    text: '15分钟内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMinutes(start.getMinutes() - 15)
      return [start, end]
    },
  },
  {
    text: '30分钟内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMinutes(start.getMinutes() - 30)
      return [start, end]
    },
  },
  {
    text: '1 小时内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 1)
      return [start, end]
    },
  },
  {
    text: '3 小时内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 3)
      return [start, end]
    },
  },
  {
    text: '6 小时内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 6)
      return [start, end]
    },
  },
  {
    text: '12小时内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 12)
      return [start, end]
    },
  },
  {
    text: '24小时内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 1)
      return [start, end]
    },
  },
  {
    text: '2 天内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 2)
      return [start, end]
    },
  },
  {
    text: '1 个月内',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
]
