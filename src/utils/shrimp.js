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
