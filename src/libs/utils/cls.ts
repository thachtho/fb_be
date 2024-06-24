import { ClsServiceManager } from "nestjs-cls";
import { IUser } from "src/shared/interface";

const getUserCls = (): IUser => {
    const user = ClsServiceManager.getClsService().get('user');
  
    return JSON.parse(user);
};

export {
    getUserCls
}