import { EntityRepository, Repository } from 'typeorm';
import { Bathingspot } from './entity/Bathingspot';

@EntityRepository(Bathingspot)
export class BathingspotRepository extends Repository<Bathingspot> {
  findByUserAndSpotIdGood(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
    .innerJoin('bathingspot.user', 'user')
      .where('user.id = :uid', { uid: userId })
      .andWhere('bathingspot.id = :sid', { sid: spotId }).getOne();
    return spot;
  }

  findByUserAndSpotIdBad(userId: number, spotId: number) {
    const spot = this.createQueryBuilder('bathingspot')
      .where('bathingspot.userId = :id', { id: userId })
      .andWhere('bathingspot.id = :id', { id: spotId }).getOne();

    return spot;
  }
}
