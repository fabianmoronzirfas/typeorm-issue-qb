import { EntityRepository, Repository } from 'typeorm';
import { Bathingspot } from './entity/Bathingspot';

@EntityRepository(Bathingspot)
export class BathingspotRepository extends Repository<Bathingspot>{
  findByUserAndSpotIdGood(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
      .where(`"bathingspot"."userId" = ${userId}`)
      // .where('bathingspot.userId = :id', {id: userId})
      .andWhere('bathingspot.id = :id', { id: spotId }).getOne();
    return spot;
  }
  findByUserAndSpotIdBad(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
      // .where(`"bathingspot"."userId" = ${userId}`)
      .where('bathingspot.userId = :id', { id: userId })
      .andWhere('bathingspot.id = :id', { id: spotId }).getOne();
    return spot;
  }
}
