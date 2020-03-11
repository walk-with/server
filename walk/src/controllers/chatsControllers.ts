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
    time: Date;
}

env.config();

export const SaveMessge = function (socket, io) {
    let walkId: string = socket.handshake.postId;
    console.log("socket.handshake", socket.handshake);
    socket.join(walkId);
    socket.on('chat', async (client) => {
        // 방에 id도 가져오기
        console.log("client", client);
        const userId: number = jwt.verify(socket.handshake.authorization, process.env.KEY).id;
        console.log("userId", userId);
        let ChatUser: Users = await getRepository(Users).findOne(userId);
        let ChatRoom: Walks = await getRepository(Walks).findOne(Number(walkId));
        // 시간 저장
        let NewChat: Chats = new Chats();
        NewChat.user = ChatUser;
        NewChat.walk = ChatRoom;
        NewChat.text = client.chat;
        await getRepository(Chats).save(NewChat);
        io.to(walkId).emit("walkChat", { chat: client.msg }); // 특정 방에 있는 모두

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
    if (walkId && userId) {
        const ChatsFromRoom = await getRepository(Chats).find({
            where: {
                walk: walkId
            },
            relations: ["user"]
        });
        if (ChatsFromRoom) {
            const chatslist = ChatsFromRoom.map(data => {
                let obj: Chatslist | object = {};
                for (let key in data) {
                    if (key === "user") {
                        obj["user"] = data["user"]["name"];
                        if (data["user"]["id"] === userId) {
                            obj["owner"] = true;
                        } else {
                            obj["owner"] = false;
                        }
                    } else {
                        obj[key] = data[key];
                    }
                }
                return obj;
            });
            if (chatslist.length > 0) {
                res.status(200).json(chatslist);
            } else {
                res.status(200).json([]);
            }
        } else {
            res.status(404);
            res.json({
                error: {
                    status: 404,
                    type: "walkIdNotFound",
                    message: "입력하신 walkId에 맞는 walk가 존재하지 않습니다."
                }
            });
        }
    } else {
        if (walkId) {
            res.status(404);
            res.json({
                error: {
                    status: 403,
                    type: "ExpiredToken",
                    message: "만료된 토큰입니다. 비밀번호 재설정 요청을 다시 해주세요."
                }
            });
        } else {
            res.status(400);
            res.json({
                error: {
                    status: 400,
                    type: "walkIdNotEnter",
                    message: "walkId를 입력하지 않았습니다."
                }
            });
        }
    }
    // error 메세지..
};
// 합쳐서 아님 각각