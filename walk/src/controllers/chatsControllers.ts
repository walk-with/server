import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import { Users } from '../entity/Users';
import { Chats } from '../entity/Chats';
import { Walks } from '../entity/Walks';
interface ChatUser {
    id: number;
    text: string;
    user: Users;
}

env.config();

export const SaveMessge = function (socket, io) {
    let walkId: string = socket.handshake.postId;
    console.log("socket.handshake", socket.handshake);
    socket.join(walkId);
    socket.on('chat', async (client) => {
        // 방에 id도 가져오기
        console.log("client", client);

        // const userId : number = jwt.verify(,proccess.env.KEY).id;
        // console.log("userId", userId);
        // let ChatUser = await getRepository(Users).findOne<Users>(userId);
        // let ChatRoom = await getRepository(Walks).findOne<Walks>(Number(walkId));

        //시간 저장
        io.to(walkId).emit("walkChat", { chat: client.msg }); // 특정 방에 있는 모두
        let NewChat: Chats = new Chats();
        // NewChat.user = ChatUser;
        // NewChat.walk = ChatRoom;
        // NewChat.text = client.chat;
        // await getRepository(Chats).save(NewChat);
    });
};
// 예전 채팅 조회

interface Chatslist {
    id: number;
    text: string;
    owner: boolean;
}
export const takeChats = async function (req: Request, res: Response) {
    const userId: number = jwt.verify(req.headers.authorization, process.env.KEY).id;
    const walkId: number = req.query.walkId;
    console.log("walk", walkId);
    const ChatsFromRoom: ChatUser[] = await getRepository(Chats).find({
        where: {
            walk: walkId
        },
        relations: ["user"]
    });
    const chatslist = ChatsFromRoom.map(data => {
        let obj: Chatslist | object = {};
        for (let key in data) {
            if (key === "user") {
                if (data["user"]["id"] === userId) {
                    obj["owner"] = true;
                } else {
                    obj["owner"] = false;
                }
            } else {
                obj[key] = data[key];
            }
        }
        console.log("obj", obj);
        return obj;
    });
    console.log("chatslist", chatslist);
    res.status(204);
    res.json(chatslist);
    // error 메세지..
    // 날짜 순서 대로..내림차순으로 날짜 칼럼 추가해야 할 것 같음.
};
// 합쳐서 아님 각각