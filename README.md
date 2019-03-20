# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `docker run -p 5432:5432 postgres`
4. Run `npm start` command

## Issue

What is wrong with the parameters in my Typeorm where clause for the QueryBuilder?

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

See the src for the real thing.
