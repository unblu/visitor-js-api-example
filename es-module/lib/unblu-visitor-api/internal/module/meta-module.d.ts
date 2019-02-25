import { InternalModule } from './module';
import { ApiBridge } from '../api-bridge';
export declare type MetaEventType = 'upgraded';
declare const enum MetaFunction {
    isUpgraded = "isUpgraded",
    upgrade = "upgrade"
}
export declare class MetaModule extends InternalModule<MetaFunction, MetaEventType> {
    constructor(bridge: ApiBridge);
    isUpgraded(): Promise<boolean>;
    upgrade(openUi?: boolean): Promise<boolean>;
}
export {};
