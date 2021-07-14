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
 * //layout replace with decline
 * messageLayoutsReplacer('Осталось minutes['минута', 'минуты', 'минут']', [{
 *     searchLayout: 'minutes',
 *     valueToReplace: '51'
 * }]) // => 'Осталось 51 минута'
 *
 */
declare const messageLayoutsReplacer: MessageLayoutsReplacer;
export default messageLayoutsReplacer;
