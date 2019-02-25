import { InternalModule } from './module';
import { ApiBridge } from '../api-bridge';
import { PersonInfo } from '../../model/person-info';
export declare type GeneralLazyEventType = '';
declare const enum GeneralLazyFunction {
    getNotificationCount = "getNotificationCount",
    getPersonInfo = "getPersonInfo"
}
export declare class GeneralLazyModule extends InternalModule<GeneralLazyFunction, GeneralLazyEventType> {
    constructor(bridge: ApiBridge);
    getNotificationCount(): Promise<number>;
    getPersonInfo(): Promise<PersonInfo>;
}
export {};
