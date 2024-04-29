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
    4: 'default'
  };

  if (index === null || index < 0) {
    return tagMap[1];
  }

  return tagMap[index % 5];
}
