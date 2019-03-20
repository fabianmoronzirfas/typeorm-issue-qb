# TypeORM QueryBuilder Quotation Issue

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `docker run -p 5432:5432 postgres`
4. Run `npm start` command

## Issue

[What is wrong with the parameters in my Typeorm where clause for the QueryBuilder?](https://stackoverflow.com/questions/55240553/what-is-wrong-with-the-parameters-in-my-typeorm-where-clause-for-the-querybuilde/55254938#55254938)

Can someone explain to me what I am doing wrong when using the parameters for my where clause?

This next block gives me the error below it:


```ts
@EntityRepository(Something)
export class SomethingRepository extends Repository<Something>{
  
  findByUserAndSomethingById(userId: number, spotId: number){
    const thing = this.createQueryBuilder('something')
    .where('something.userId = :id', {id: userId})
    .andWhere('something.id = :id',{id: spotId}).getOne();
    return thing;
  }
}
```


```shell
QueryFailedError: column something.userid does not exist
```


This request gives me the right result.

```ts
@EntityRepository(Something)
export class SomethingRepository extends Repository<Something>{

  findByUserAndSomethingById(userId: number, spotId: number){
    const thing = this.createQueryBuilder('something')
    .where(`"something"."userId" = ${userId}`)
    .andWhere('something.id = :id',{id: spotId}).getOne();
    return thing;
  }
}
```

See [src/BathingspotRepository.ts](src/BathingspotRepository.ts) for the real thing.

## Solution  

The solution is to use quotation marks around the names. At least for this setup. The repo where this error originated from is still not fixed. Thanks to [mukyuu on stackoverflow](https://stackoverflow.com/users/3654837/mukyuu)

```ts
@EntityRepository(Something)
export class SomethingRepository extends Repository<Something>{
  
  findByUserAndSomethingById(userId: number, spotId: number){
    const thing = this.createQueryBuilder('something')
    .where('"something"."userId" = :id', {id: userId})
    .andWhere('something.id = :id',{id: spotId}).getOne();
    return thing;
  }
}
```
