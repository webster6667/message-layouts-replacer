import messageLayoutsReplace from '../src'
import {ReplacedSettingsProps} from '../src/types'


describe('simple layouts success replaced', () => {

    test('single layout, success replaced', () => {
        const messageForReplace = 'limit is exceeded, limit is {limit}',
              searchLayout = '{limit}',
              valueToReplace = '51',
              arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                  {
                      searchLayout,
                      valueToReplace
                  }
              ],
              replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
              expectedMessage = messageForReplace.replace(searchLayout, valueToReplace)
        
        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('group layout, success replaced', () => {
        const messageForReplace = 'limit is exceeded, limit is {limit}, {written} was written',
              arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout: '{limit}',
                    valueToReplace: '51',
                },
                {
                    searchLayout: '{written}',
                    valueToReplace: '52',
                },  
              ],
              replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
              expectedMessage = 'limit is exceeded, limit is 51, 52 was written'
        
        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single repeated layout, success replaced', () => {
        const messageForReplace = 'limit is exceeded, limit is {limit}, dont exceeded {limit}',
            searchLayout = '{limit}',
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'limit is exceeded, limit is 51, dont exceeded 51'

        
        expect(replacedMessage).toEqual(expectedMessage)
    });

})



describe('layouts with decline', () => {

    test('single decline layout, success replaced', () => {
        const messageForReplace = "Осталось minutes['минута', 'минуты', 'минут']",
            searchLayout = "minutes",
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'Осталось 51 минута'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('group decline layout, success replaced', () => {
        const messageForReplace = "Осталось minutes['минута', 'минуты', 'минут'] и hours['час', 'часа', 'часов']",
              arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                  {
                      searchLayout: 'minutes',
                      valueToReplace: '51'
                  },
                  {
                      searchLayout: 'hours',
                      valueToReplace: '2'
                  },
              ],
              replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
              expectedMessage = 'Осталось 51 минута и 2 часа'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single repeated decline layout, success replaced', () => {
        const messageForReplace = "Осталось minutes['минута', 'минуты', 'минут'], через minutes['минуту', 'минуты', 'минут'] закончится действие",
            searchLayout = "minutes",
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'Осталось 51 минута, через 51 минуту закончится действие'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('decline layout is similar simple replace, success replaced', () => {
        const messageForReplace = "Осталось minutes['минута', 'минуты', 'минут'], {minutes} это максимум",
              valueToReplace = '51',
              arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                  {
                      searchLayout: 'minutes',
                      valueToReplace
                  },
                  {
                      searchLayout: '{minutes}',
                      valueToReplace
                  }
              ],
              replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
              expectedMessage = 'Осталось 51 минута, 51 это максимум'

        expect(replacedMessage).toEqual(expectedMessage)
    });

})

describe('replacing success, when value to replace is array', () => {

    test('single decline layout, replace layout to stringlify array, if value to replace is array', () => {
        const messageForReplace = "Осталось minutes['минута', 'минуты', 'минут']",
            searchLayout = "minutes",
            valueToReplace = [1, 2, 3],
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'Осталось 1,2,3'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single layout, replace layout to stringlify array, if value to replace is array', () => {
        const messageForReplace = 'you select {selected} value',
            searchLayout = '{selected}',
            valueToReplace = [51, 52],
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace,
                    shouldClearSearchLayoutIfReplaceValueIsArray: false
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'you select 51,52 value'


        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single layout, delete layout from message for replace, if value to replace is array', () => {
        const messageForReplace = 'you select {selected} value',
            searchLayout = '{selected}',
            valueToReplace = [51, 52],
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = 'you select value'

        expect(replacedMessage).toEqual(expectedMessage)
    });

})
