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

    test('single layout, valueToReplace: null success replaced', () => {
        const messageForReplace = 'limit is exceeded, limit is {limit}',
            searchLayout = '{limit}',
            valueToReplace = null,
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = messageForReplace

        
        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single layout, messageForReplace: null success replaced', () => {
        const messageForReplace = null,
            searchLayout = '{limit}',
            valueToReplace = null,
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = ''


        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single layout, return messageForReplace, if layout not found', () => {
        const messageForReplace = 'limit is exceeded',
            searchLayout = '{limit}',
            valueToReplace = null,
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = messageForReplace


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

    test('single decline layout, return messageForReplace, if layout not found', () => {
        const messageForReplace = "???????????????? ???????????? ??????????????",
            searchLayout = "minutes",
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = '???????????????? ???????????? ??????????????'

        
        expect(replacedMessage).toEqual(expectedMessage)
    });
    
    test('single decline layout ru, success replaced', () => {
        const messageForReplace = "???????????????? minutes['????????????', '????????????', '??????????']",
            searchLayout = "minutes",
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = '???????????????? 51 ????????????'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single decline layout en, success replaced', () => {
        const messageForReplace = "minutes['minute', 'minutes'] left",
            searchLayout = "minutes",
            valueToReplace = '2',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = '2 minutes left'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('group decline layout, success replaced', () => {
        const messageForReplace = "???????????????? minutes['????????????', '????????????', '??????????'] ?? hours['??????', '????????', '??????????']",
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
              expectedMessage = '???????????????? 51 ???????????? ?? 2 ????????'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('single repeated decline layout, success replaced', () => {
        const messageForReplace = "???????????????? minutes['????????????', '????????????', '??????????'], ?????????? minutes['????????????', '????????????', '??????????'] ???????????????????? ????????????????",
            searchLayout = "minutes",
            valueToReplace = '51',
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = '???????????????? 51 ????????????, ?????????? 51 ???????????? ???????????????????? ????????????????'

        expect(replacedMessage).toEqual(expectedMessage)
    });

    test('decline layout is similar simple replace, success replaced', () => {
        const messageForReplace = "???????????????? minutes['????????????', '????????????', '??????????'], {minutes} ?????? ????????????????",
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
              expectedMessage = '???????????????? 51 ????????????, 51 ?????? ????????????????'

        expect(replacedMessage).toEqual(expectedMessage)
    });

})

describe('replacing success, when value to replace is array', () => {

    test('single decline layout, replace layout to stringlify array, if value to replace is array', () => {
        const messageForReplace = "???????????????? minutes['????????????', '????????????', '??????????']",
            searchLayout = "minutes",
            valueToReplace = [1, 2, 3],
            arrayOfReplacedSettings: ReplacedSettingsProps[] = [
                {
                    searchLayout,
                    valueToReplace
                }
            ],
            replacedMessage = messageLayoutsReplace(messageForReplace, arrayOfReplacedSettings),
            expectedMessage = '???????????????? 1,2,3'

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
