import crypto from 'crypto';

import { Pets } from './entity/Pets';
import { Walks } from './entity/Walks';
import { Tags } from './entity/Tags';
import { Day } from './utils/Date';
import { Users } from './entity/Users';


export const lazy = async function (connection: any) {
    let user1 = new Users();
    user1.name = "음..";
    user1.email = "1@naver.com";
    user1.password = crypto.createHmac('sha256', process.env.SALT).update("111").digest('hex');
    const User1 = await connection.manager.save(user1);
    console.log("user", User1);

    let user2 = new Users();
    user2.name = "..";
    user2.email = "222@naver.com";
    user2.password = crypto.createHmac('sha256', process.env.SALT).update("111").digest('hex');
    const User2 = await connection.manager.save(user2);
    console.log("user", User2);


    const tag1 = new Tags();
    tag1.tag = "배고프다";
    const Tag1 = await connection.manager.save(tag1);
    const tag2 = new Tags();
    tag2.tag = "점심 먹고싶다";
    const Tag2 = await connection.manager.save(tag2);
    const tag3 = new Tags();
    tag3.tag = "뭐먹지";
    const Tag3 = await connection.manager.save(tag3);
    const tag4 = new Tags();
    tag4.tag = "음..고민";
    const Tag4 = await connection.manager.save(tag4);
    const tag5 = new Tags();
    tag5.tag = "으아아아";
    const Tag5 = await connection.manager.save(tag5);

    let user3 = new Users();
    user3.name = "wll";
    user3.email = "000@naver.com";
    user3.password = crypto.createHmac('sha256', process.env.SALT).update("111").digest('hex');
    const User3 = await connection.manager.save(user3);
    console.log("user", User3);

    const petone = new Pets();
    petone.name = "꿍이";
    petone.age = "1살";
    petone.gender = "여아";
    petone.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38j_mZrT0091PeFKqogPhXe-DKWKDufItuNKz00OjeCekUB-j&s";
    petone.keyword = "개냥이";
    petone.user = user1;
    const pet = await connection.manager.save(petone);
    console.log("pet", pet);

    const pettwo = new Pets();
    pettwo.name = "뚱dsxnx투투투투이";
    pettwo.age = "30dsad살";
    pettwo.gender = "양성";
    pettwo.image = "https://file.namu.moe/file/8bc9e381797334eb33da66e3ba501be143bc6534fa1d005fa3147b5796aa55aaaec1cd9cb5de920432aa220bd369ab48e36dd735edb1e98efb6f9ce5848b72b6";
    pettwo.keyword = "사랑해요";
    pettwo.user = user1;
    const pets = await connection.manager.save(pettwo);
    console.log("pets", pets);

    const pet0 = new Pets();
    pet0.name = "꿍dfsffsfs이";
    pet0.age = "1살";
    pet0.gender = "여아";
    pet0.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38j_mZrT0091PeFKqogPhXe-DKWKDufItuNKz00OjeCekUB-j&s";
    pet0.keyword = "개냥이";
    pet0.user = user2;
    const Pet = await connection.manager.save(pet0);
    console.log("pet", Pet);

    const pet1 = new Pets();
    pet1.name = "뚱dfs";
    pet1.age = "30살";
    pet1.gender = "양성";
    pet1.image = "https://file.namu.moe/file/8bc9e381797334eb33da66e3ba501be143bc6534fa1d005fa3147b5796aa55aaaec1cd9cb5de920432aa220bd369ab48e36dd735edb1e98efb6f9ce5848b72b6";
    pet1.keyword = "사랑해요";
    pet1.user = user2;
    const Pet1 = await connection.manager.save(pet1);
    console.log("pets", Pet1);

    const pet2 = new Pets();
    pet2.name = "꿍r이";
    pet2.age = "1살weqw";
    pet2.gender = "여qewq아";
    pet2.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38j_mZrT0091PeFKqogPhXe-DKWKDufItuNKz00OjeCekUB-j&s";
    pet2.keyword = "개ww냥이";
    pet2.user = user2;
    const Pet2 = await connection.manager.save(pet2);
    console.log("pet", Pet2);

    const pet11 = new Pets();
    pet11.name = "똑똑한 뚱이";
    pet11.age = "30살";
    pet11.gender = "양성";
    pet11.image = "https://file.namu.moe/file/8bc9e381797334eb33da66e3ba501be143bc6534fa1d005fa3147b5796aa55aaaec1cd9cb5de920432aa220bd369ab48e36dd735edb1e98efb6f9ce5848b72b6";
    pet11.keyword = "사랑해요";
    pet11.user = user3;
    const Pet11 = await connection.manager.save(pet11);
    console.log("pets", Pet11);
    //
    const walks = new Walks();
    walks.title = "호수 근처 탐방";
    walks.date = Day;
    walks.Latitude = `127°06'50.0"E`;
    walks.Longitude = `36°48'54.5"N`;
    // walks.spot = "천안..?";
    walks.StartTime = "14";
    walks.EndTime = "16";
    walks.user = user1;
    walks.contents = "밥 먹기";
    walks.pet = [pet1, pettwo, pet11, pet2];
    walks.tags = [tag1, tag5];
    const Walk = await connection.manager.save(walks);
    console.log("walk", Walk);

    const walk2 = new Walks();
    walk2.title = "빵먹으러 갈사람";
    walk2.date = Day;
    walk2.Latitude = `127°06'50.0"E`;
    walk2.Longitude = `36°48'54.5"N`;
    // walk2.spot = "천안..?";
    walk2.StartTime = "19";
    walk2.EndTime = "21";
    walk2.user = user2;
    walk2.contents = "이거 에러나넹";
    walk2.pet = [pet1, pettwo, pet11, pet2];
    walk2.tags = [tag1, tag2, tag3];
    const Walk2 = await connection.manager.save(walk2);
    console.log("Walk2", Walk2);

    return;
};