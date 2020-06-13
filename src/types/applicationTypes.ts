import {IdentityResultInterface} from '@/types/apiTypes';

export interface ApplicationStateInterface {
    healthStatus: string;
    connectionStatus: string;
    identity: object;
    user: IdentityResultInterface;
}
