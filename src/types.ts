export type ReplacedSettingsProps = {
    /**
     * Layout that will be found, and replaced to valueToReplace
     */
    searchLayout: string,

    /**
     * value that replace searchLayout
     */
    valueToReplace: string | number | null | any[],

    /**
     * should clear searchLayout from messageForReplace, if replace value isArray
     */
    shouldClearSearchLayoutIfReplaceValueIsArray?: boolean
}

export type MessageLayoutsReplacer = (messageForReplace: string | null, arrayOfReplacedSettings: ReplacedSettingsProps[]) => string


