/**
 * Internal type definition of the unblu object.
 * @hidden
 */
export interface UnbluObject {
    api?: any;
    /**
     * internal unblu field
     * @hidden
     */
    APIKEY?: string;
    /**
     * internal unblu field
     * @hidden
     */
    SERVER?: string;
    /**
     * internal unblu field
     * @hidden
     */
    l?: string;
}
/**
 * @hidden
 */
export declare class UnbluUtil {
    static loadScript(uri: string, timeout: number): Promise<void>;
    static setNamedArea(namedArea: string): void;
    static setLocale(locale: string): void;
    static isUnbluLoaded(): boolean;
    static getUnbluObject(): UnbluObject;
    static createUnbluObject(): UnbluObject;
}
