/**
 *  根据时间戳或时间日期字符串，格式化为对应的格式
 * @param date 时间字符串或时间戳
 * @param format 需要格式化成什么格式；如'yyyy-MM-DD HH:mm:ss'
 */
export const formatDate = (
  dateStr: number | string | Date,
  format?: string
) => {
  const strFormat = format || 'yyyy-MM-DD HH:mm:ss';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  const dict: any = {
    yyyy: year,
    MM: month,
    DD: day,
    HH: hour,
    mm: minute,
    ss: second,
  };

  return strFormat.replace(/(yyyy|MM?|DD?|HH?|mm?|ss?)/g, function (e: string) {
    return dict[e];
  });
};


// 今天显示时分、昨天显示昨天、今年其他时间显示日期、否则显示年月日
export function formatRelativeDate(dateInput?: any) {
  // 如果没有传入日期，默认为当前时间
  if (!dateInput) {
    dateInput = new Date();
  } else {
    dateInput = new Date(dateInput);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 清除时间部分，只保留日期

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDate = new Date(dateInput);
  inputDate.setHours(0, 0, 0, 0); // 对比的日期也需要清除时间部分

  let relativeDate;

  if (inputDate.getTime() === today.getTime()) {
    relativeDate = `${formatDate(dateInput, "HH:mm")}`;
  } else if (inputDate.getTime() === yesterday.getTime()) {
    relativeDate = "昨天";
  } else if (inputDate.getFullYear() === today.getFullYear()) {
    // 同一年内且不是今天或昨天
    relativeDate = inputDate.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
    });
  } else {
    // 不是同一年
    relativeDate = inputDate.toLocaleDateString().split("/").join("-");
  }

  return relativeDate;
}

// 今天显示今天+时分、昨天显示昨天+时分、今年其他时间显示日期+时分、否则显示年月日
export function formatRelativeDateForMessage(dateInput?: string | Date) {
  // 如果没有传入日期，默认为当前时间
  if (!dateInput) {
    dateInput = new Date();
  } else {
    dateInput = new Date(dateInput);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 清除时间部分，只保留日期

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDate = new Date(dateInput);
  inputDate.setHours(0, 0, 0, 0); // 对比的日期也需要清除时间部分

  let relativeDate;

  if (inputDate.getTime() === today.getTime()) {
    relativeDate = `今天 ${formatDate(dateInput, "HH:mm")}`;
  } else if (inputDate.getTime() === yesterday.getTime()) {
    relativeDate = `昨天 ${formatDate(dateInput, "HH:mm")}`;
  } else if (inputDate.getFullYear() === today.getFullYear()) {
    // 同一年内且不是今天或昨天
    relativeDate = `${inputDate.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
    })} ${formatDate(dateInput, "HH:mm")}`;
  } else {
    // 不是同一年
    relativeDate = inputDate.toLocaleDateString().split("/").join("-");
  }

  return relativeDate;
}