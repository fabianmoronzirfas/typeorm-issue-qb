import { EntityRepository, Repository } from 'typeorm';
import { Bathingspot } from './entity/Bathingspot';

@EntityRepository(Bathingspot)
export class BathingspotRepository extends Repository<Bathingspot> {
  findByUserAndSpotIdGood(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
      .where(`"bathingspot"."userId" = ${userId}`)
      .andWhere('bathingspot.id = :id', { id: spotId }).getOne();
    return spot;
  }
  findByUserAndSpotIdBad(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
      /*
      This is the solution for this problem.

      .where('"bathingspot"."userId" = :id', { id: userId })

      I'll keep this error in here
      for documentation purpose
        */
      .where('bathingspot.userId = :id', { id: userId })
      .andWhere('bathingspot.id = :id', { id: spotId }).getOne();
    return spot;
  }
}
