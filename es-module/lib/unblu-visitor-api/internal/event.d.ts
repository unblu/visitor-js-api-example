export interface Event<T> {
    module: string;
    name: string;
    data: T;
}
export declare type EventCallback = (event: Event<any>) => void;
