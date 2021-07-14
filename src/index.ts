import declineOfNumeral from 'decline-of-numeral'

import {MessageLayoutsReplacer, ReplacedSettingsProps} from './types'

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
const messageLayoutsReplacer:MessageLayoutsReplacer  = (messageForReplace, arrayOfReplacedSettings) => {
    const isMessageForReplaceHasValidType = typeof messageForReplace === 'string' || typeof messageForReplace === 'number',
          isInvalidMessageForReplaceType = !isMessageForReplaceHasValidType

    /**
     * throw error if message for replace has invalid type
     */
    if (isInvalidMessageForReplaceType) throw new Error('message for replace has invalid type')

    let replacedLayoutsMessage = String(messageForReplace)

    if (replacedLayoutsMessage) {

        /**
         * cycle for replace every described layout
         */
        arrayOfReplacedSettings.forEach((replacedSettingParams) => {
            
            /**
             * layout settings
             */
            const {
                searchLayout, 
                valueToReplace, 
                shouldClearSearchLayoutIfReplaceValueIsArray = true
            } = replacedSettingParams
            
            /**
             * regExp for found layouts than need decline
             */
            const regExpForDeclineLayout = new RegExp(`${searchLayout}\['[a-zA-Zа-яА-я]+', '[a-zA-Zа-яА-я]+'(, '[a-zA-Zа-яА-я]+')?\]`, 'g'),
                  isMessageForReplaceHasLayoutForDecline = regExpForDeclineLayout.test(replacedLayoutsMessage)

            /**
             * if parsed message need decline
             */
            if (isMessageForReplaceHasLayoutForDecline) {

                replacedLayoutsMessage = replacedLayoutsMessage.replace(regExpForDeclineLayout, layoutForDecline => {

                    /**
                     * 1.Found string with decline words(['минута', 'минут', 'минуты'])
                     * 2.Convert string declined words array
                     * 3.Decline word if params valid
                     * 4.If value valid for decline, return declined string, if value to replace is array, return stringlify array
                     */
                    const stringOnlyWithDeclinedWords = layoutForDecline.replace(new RegExp(searchLayout), ''),
                          arrayOfDeclinedWords = stringOnlyWithDeclinedWords.replace(/[\[\]'"]/g, '').split(', '),
                          declinedWord = !isNaN(+valueToReplace) ? declineOfNumeral(+valueToReplace, arrayOfDeclinedWords) : null,
                          valueToReplaceLayout = isNaN(+valueToReplace) ? valueToReplace.toString() : `${valueToReplace} ${declinedWord}`

                    return valueToReplaceLayout
                })

            } else {

                /**
                 * 1.Value to replace for array(clear layout or replace to stringlify array)
                 * 2.Check value to replace(for array or string)
                 * 3.Delete space between words around deleted layout if it need
                 */
                const valueToReplaceForArray = shouldClearSearchLayoutIfReplaceValueIsArray ? '' : valueToReplace.toString(),
                      valueToReplaceLayout = Array.isArray(valueToReplace) ? valueToReplaceForArray : String(valueToReplace),
                      textForSearchLayoutRegExp = valueToReplaceLayout === '' && new RegExp(searchLayout + ' ', 'g').test(messageForReplace) ? searchLayout + ' ' : searchLayout

                replacedLayoutsMessage = replacedLayoutsMessage.replace(new RegExp(textForSearchLayoutRegExp, 'g'), valueToReplaceLayout)
            }



        })

    }

    return replacedLayoutsMessage
}


export default messageLayoutsReplacer
