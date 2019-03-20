import 'reflect-metadata';
import { createConnection, getCustomRepository } from 'typeorm';
import { BathingspotRepository } from './BathingspotRepository';
import { Bathingspot } from './entity/Bathingspot';
import { User } from './entity/User';

createConnection().then(async (connection) => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    const spot = new Bathingspot();
    spot.isPublic = true;
    spot.name = 'Billabong';
    user.bathingspots = [spot];
    await connection.manager.save(spot);
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);
    console.log('Saved a new spot with id: ' + spot.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User, { relations: ['bathingspots'] });
    // console.log('Loaded users: ', users);
    const spotRepo = getCustomRepository(BathingspotRepository);
    const spotAgain = await spotRepo.findByUserAndSpotIdGood(user.id, spot.id);
    console.log('Working query:', spotAgain);
    try {
        const spotAgainAgain = await spotRepo.findByUserAndSpotIdBad(user.id, spot.id);
        console.log('Not working query:', spotAgainAgain);

    } catch (e) {
        console.log(e);
    }

}).catch(error => console.log(error));
