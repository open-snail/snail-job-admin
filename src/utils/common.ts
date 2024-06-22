import { Md5 } from 'ts-md5';
import dayjs from 'dayjs';
import { $t } from '@/locales';

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[];
}

/**
 * Transform record to option with keys of number
 *
 * @param record
 * @param reverse
 */
export function transformRecordToNumberOption<T extends Record<number, string>>(record: T, reverse: boolean = false) {
  const options = Object.entries(record).map(([value, label]) => ({
    value: Number(value),
    label
  })) as CommonType.Option<keyof T>[];

  return reverse ? options.sort((a: any, b: any) => b.value - a.value) : options;
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string | number>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions2(options: string[]) {
  return options.map(option => ({
    value: option,
    label: option
  }));
}

/**
 * tag Color
 *
 * @param index
 */
export function tagColor(index: number) {
  const tagMap: Record<number, NaiveUI.ThemeColor> = {
    0: 'error',
    1: 'info',
    2: 'success',
    3: 'warning',
    4: 'primary'
  };

  if (index === null || index < 0) {
    return tagMap[1];
  }

  return tagMap[index % 5];
}

/**
 * MD-5 哈希
 *
 * @param text 明文
 * @returns md5哈希
 */
export function md5(text: string): string {
  const md5Digest = new Md5();
  md5Digest.appendAsciiStr(text);
  return md5Digest.end() as string;
}

/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className);
  }

  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove
  };
}

/**
 * 创建 `最近n个自然月` timestamp时间区间
 *
 * @param months 月数
 * @param startOf 时间的开始类型
 * @returns timestamp时间区间
 */
export function monthRange(months: number = 1, startOf: dayjs.OpUnitType = 'day') {
  return [dayjs().subtract(months, 'month').startOf(startOf).valueOf(), dayjs().endOf('day').valueOf()] as [
    number,
    number
  ];
}

/**
 * 创建 `最近n个自然月` 字符串时间区间
 *
 * @param months 月数
 * @param startOf 时间的开始类型
 * @returns 字符串时间区间
 */
export function monthRangeISO8601(months: number = 1, startOf: dayjs.OpUnitType = 'day') {
  return [
    dayjs().subtract(months, 'month').startOf(startOf).format('YYYY-MM-DDTHH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss')
  ] as [string, string];
}
