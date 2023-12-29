import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CarGetWayService } from '../carGetway/carGetWay.service';

@Injectable()
export class CarGuard {
  constructor(private readonly carSer: CarGetWayService) {}

  async canActivate(context: ExecutionContext) {
    try {
      Logger.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd');
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;
      Logger.log('id in guard', { id });

      const userId = request.user.id;

      Logger.log('useriId in guard===========================', { userId });

      const getProduct = await this.carSer.getOneCar(id);
      Logger.log('get', { getProduct });

      if (getProduct.userId !== userId) {
        Logger.log('is not equal');
        return false;
      }

      return true;
    } catch (err) {
      Logger.error('Unknwon error in product guard', { err });
      return false;
    }
  }
}
