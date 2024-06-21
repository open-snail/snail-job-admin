import { Md5 } from 'ts-md5';
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

export function isNotNull(value: any) {
  return value !== undefined && value !== null && value !== '' && value !== 'undefined';
}

export function parseArgsJson(value: string) {
  let argsJson;

  try {
    argsJson = JSON.parse(value);

    // A helper function to safely parse JSON strings that might contain escaped quotes
    const safelyParseJson = (jsonString: string) => {
      try {
        return JSON.parse(jsonString.replaceAll('\\"', '"'));
      } catch (error) {
        return jsonString; // Return original string if it's not valid JSON
      }
    };

    // Process jobParams if it exists
    if (typeof argsJson.jobParams === 'string') {
      argsJson.jobParams = safelyParseJson(argsJson.jobParams);
    }

    // Process mapResult if it exists
    if (typeof argsJson.mapResult === 'string') {
      argsJson.mapResult = safelyParseJson(argsJson.mapResult);
    }

    // Process maps if it exists
    if (typeof argsJson.maps === 'string') {
      argsJson.maps = safelyParseJson(argsJson.maps);

      // If maps is a string that represents an array, parse it as JSON
      if (argsJson.maps.startsWith('"[') && argsJson.maps.endsWith('"]')) {
        argsJson.maps = safelyParseJson(argsJson.maps.slice(1, -1));
      }
    }
  } catch {}

  // Convert the object back to a pretty-printed JSON string
  argsJson = JSON.stringify(argsJson, null, 4);

  return argsJson;
}
