export declare type ReplacedSettingsProps = {
    /**
     * Layout that will be found, and replaced to valueToReplace
     */
    searchLayout: string;
    /**
     * value that replace searchLayout
     */
    valueToReplace: string | number | any[];
    /**
     * should clear searchLayout from messageForReplace, if replace value isArray
     */
    shouldClearSearchLayoutIfReplaceValueIsArray?: boolean;
};
export declare type MessageLayoutsReplacer = (messageForReplace: string, arrayOfReplacedSettings: ReplacedSettingsProps[]) => string;
