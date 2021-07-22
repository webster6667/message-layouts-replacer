import { MessageLayoutsReplacer } from './types';
/**
 * @description
 * function than replace layouts to values
 *
 * @param {string} messageForReplace - string, that have layouts for replace
 * @param {ReplacedSettingsProps[]} arrayOfReplacedSettings - array with layout replace settings
 *
 * @returns {string}
 *
 * @example
 *
 * //layout replace
 * messageLayoutsReplacer('limit is exceeded {limit}', [{
 *     searchLayout: '{limit}',
 *     valueToReplace: '51'
 * }]) // => 'limit is exceeded 51'
 *
 * //layout replace with decline ru
 * messageLayoutsReplacer('Осталось minutes['минута', 'минуты', 'минут']', [{
 *     searchLayout: 'minutes',
 *     valueToReplace: '51'
 * }]) // => 'Осталось 51 минута'
 *
 * //layout replace with decline en
 * messageLayoutsReplacer('minutes['minute', 'minutes'] left', [{
 *     searchLayout: 'minutes',
 *     valueToReplace: '2'
 * }]) // => '2 minutes left'
 *
 */
declare const messageLayoutsReplacer: MessageLayoutsReplacer;
export default messageLayoutsReplacer;
