import { Request, Response } from 'express';
import { getRepository, In } from "typeorm";
import env from 'dotenv';
import jwt from "jsonwebtoken";
import { Day } from '../utils/Date';
import { Walks } from '../entity/Walks';
import { Users } from '../entity/Users';
import { Tags } from '../entity/Tags';
import { Pets } from '../entity/Pets';

env.config();
interface WalkImageAndIds {
    walkId: number;
    userId: number;
    image: string;
}
export const list = async function (req: Request, res: Response) {
    const walksList: any = await getRepository(Walks)
        .createQueryBuilder('walk')
        .leftJoinAndSelect("walk.user", 'user')
        .where("walk.date = :date", { date: Day })
        .getMany();
    let WalkImageAndIds: Array<WalkImageAndIds> = [];
    let PetImage: string = "";
    let walksPartyPets: any;
    let userId: number | null = null;
    let walkId: number | null = null;
    let petIds: number[] = [];
    let walksUserPets: any = null;
    for (let i = 0; i < walksList.length; i++) {
        walkId = walksList[i]["id"];// walk의 고유 아이디 값
        userId = walksList[i]["user"]["id"]; // walk를 작성 한 사람의 아이디 값
        walksUserPets = await getRepository(Users)
            .createQueryBuilder('user')
            .leftJoinAndSelect("user.pet", 'pet')
            .where("user.id = :id", { id: userId })
            .getOne();
        // walk를 작성한 사람의 id를 가지고 그의 pet 데이터를 가지고 옴
        for (let n = 0; n < walksUserPets["pet"].length; n++) {
            petIds.push(walksUserPets["pet"][n]["id"]);
            // walk를 작성한 사람의 펫 id들이 들어있다.
        }
        walksPartyPets = await getRepository(Walks).find({
            relations: ['pet'],
            where: { id: walkId, date: Day }
        });

        // 오늘 날짜에 맞는 walks중에서 참여 되어있는 펫들의 정보를 가져온다.
        for (let f = 0; f < walksPartyPets.length; f++) {
            for (let y = 0; y < walksPartyPets[f]["pet"].length; y++) {
                let petIm = walksPartyPets[f]["pet"][y];
                // walk에 참여한 펫의 id
                if (petIds.includes(petIm["id"])) {
                    PetImage = petIm["image"];
                    WalkImageAndIds.push({ walkId, userId, image: PetImage });
                }
                // 참여 된 펫중에 글 쓴 사람의 펫이 누구인지 찾아 그 이미지를 저장한다.
                // 이미지의 주인이 누구 인지 알 수 없으니 walk의 고유의 id와 같이 저장한다.
            }
        }
        petIds = [];
        // 반복문 끝날때 마다 배열 초기화
    }
    console.log("WalkImageAndId", WalkImageAndIds);
    let count = 0;
    const walksListTags = await getRepository(Walks).find({
        relations: ['tags', 'user'],
        where: { date: Day }
    });

    let tags: any[] = [];
    for (let n = 0; n < walksListTags.length; n++) {
        for (let i = 0; i < walksListTags[n]["tags"].length; i++) {
            tags.push(walksListTags[n]["tags"][i]["tag"]);
        }
        walksListTags[n]["tags"] = tags;
        let userId = walksListTags[n]["user"]["id"];
        let walkId = walksListTags[n]["id"];
        // tags에 문자열로 되어있는 태그만 넣기 위하여
        tags = [];
        if (count === 0) {
            for (let f = 0; f < WalkImageAndIds.length; f++) {
                if (WalkImageAndIds[f]["userId"] === userId && WalkImageAndIds[f]["walkId"] === walkId) {
                    walksListTags[n]["image"] = WalkImageAndIds[f]["image"];
                    count++;
                    // WalkImageAndIds에 담긴 이미지와 id들을 walksListTags에 넣기 전에 둘이 일치하는 애인지 확인
                }
            }
        }
        count = 0;
    }
    let RealData: any = [];
    let Time: string[] = [];
    for (let g = 0; g < walksListTags.length; g++) {
        let RealObject = {};
        for (let key in walksListTags[g]) {
            if (key !== "user") {
                RealObject[key] = walksListTags[g][key];
            }
            if (key === "StartTime" || key === "EndTime") {
                Time.push(walksListTags[g][key]);
            }
        }
        RealObject["time"] = Time;
        RealData.push(RealObject);
        Time = [];
        // user의 데이터 빼는 반복문
    }
    res.status(200);
    res.json(RealData);
};
export const detail = async function (req: Request, res: Response) {
    const walkId: string = req.query.walkId;
    const detailWalk = await getRepository(Walks).findOne({
        where: {
            id: walkId
        },
        relations: ["tags", "pet"]
    });
    if (detailWalk) {
        let Tags = [];
        for (let n = 0; n < detailWalk["tags"].length; n++) {
            Tags.push(detailWalk["tags"][n]["tag"]);
        }
        detailWalk["tags"] = Tags;
        res.status(200);
        res.json(detailWalk);
    } else {
        res.status(404);
        res.json({
            error: {
                status: 404,
                type: "IdNotFound",
                message: "입력하신 id에 맞는 데이터가 존재하지 않습니다."
            }
        });
    }
};

export const create = async function (req: Request, res: Response) {
    const userId = await jwt.verify(req.headers.authorization, process.env.KEY);
    if (userId) {
        const { title, Longitude, date, Latitude, time, contents, pets, tag } = req.body;
        const Walk = new Walks();
        Walk.title = title;
        Walk.date = date;
        Walk.Latitude = Latitude;
        Walk.Longitude = Longitude;
        Walk.StartTime = time[0];
        Walk.EndTime = time[1];
        Walk.contents = contents;
        const organizer = await getRepository(Users).findOne({
            id: userId.id
        });
        const organizerPet = await getRepository(Pets).find({ where: { id: In(pets) } });
        const TagsInfo = await getRepository(Tags).find({ where: { id: In(tag) } });
        Walk.user = organizer;
        Walk.tags = TagsInfo;
        Walk.pet = organizerPet;
        const SaveWalk = await getRepository(Walks).save(Walk);
        if (SaveWalk) {
            let WalkData = { walkId: SaveWalk.id };
            res.status(201);
            res.json(WalkData);
        }
    } else {
        res.status(403);
        res.json({
            error: {
                status: 403,
                type: "ExpiredToken",
                message: "만료된 토큰입니다. 다시 로그인 부탁드립니다."
            }
        });
    }
};

export const edit = async function (req: Request, res: Response) {
    const userId: number = jwt.verify(req.headers.authorization, process.env.KEY).id;
    const walkId: number = req.query.walkId;
    if (userId) {
        const walkCreateUserID = await getRepository(Walks).findOne({
            relations: ["user"],
            where: {
                id: walkId,
            }
        });
        if (walkCreateUserID) {
            if (walkCreateUserID["user"]["id"] === userId) {
                const { title, Longitude, Latitude, date, time, contents, tag, pets } = req.body;
                let writerTags = await getRepository(Tags).find({ where: { id: In(tag) } });
                const writerPets = await getRepository(Pets).find({ where: { id: In(pets) } });
                let updateWalk = await getRepository(Walks).findOne(walkId);
                updateWalk.title = title;
                updateWalk.Longitude = Longitude;
                updateWalk.Latitude = Latitude;
                updateWalk.date = date;
                updateWalk.StartTime = time[0];
                updateWalk.EndTime = time[1];
                updateWalk.contents = contents;
                updateWalk.tags = writerTags;
                updateWalk.pet = writerPets;
                await getRepository(Walks).save(updateWalk);
                res.sendStatus(200);
            } else {
                res.status(401).json({
                    error: {
                        status: 401,
                        type: "NotWriter",
                        message: "작성자만 수정 할 수 있습니다."
                    }
                });
            }
            res.status(204);
        } else {
            res.status(404).json({
                error: {
                    status: 404,
                    type: "walkNotFound",
                    message: "입력하신 walkId에 맞는 데이터가 존재하지 않습니다."
                }
            });
        }
    } else {
        res.status(403).json({
            error: {
                status: 403,
                type: "ExpiredToken",
                message: "만료된 토큰입니다. 비밀번호 재설정 요청을 다시 해주세요."
            }
        });
    }
};