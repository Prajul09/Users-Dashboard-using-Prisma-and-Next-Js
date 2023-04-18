import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    console.log("request==", req.query);
    try {
        //get All signedup Users
        let users = []
        if (req.method === "GET") {
            let conditionObject = [];
            if(req.query && req.query.first_name !== '') {
                conditionObject.push({
                    first_name: {
                        contains: req.query.first_name,
                        //startsWith: req.query.first_name
                    }
                }) 
            }
            if(req.query && req.query.last_name !== '') {
                conditionObject.push({
                    last_name: {
                        contains: req.query.last_name,
                        //endsWith: req.query.last_name
                    }
                }) 
            }
            if(req.query && req.query.email !== '') {
                conditionObject.push({
                    email: {
                        contains: req.query.email
                    }
                }) 
            }
            if(req.query && req.query.gender !== '') {
                conditionObject.push({
                    gender: {
                        equals: req.query.gender
                    }
                })
            }
            users = await prisma.user.findMany({
                where: {
                    AND: conditionObject
                }
            })

            // console.log(JSON.stringify({
            //     where: {
            //         AND: conditionObject
            //     }
            // }), "jiojojojoj")

            // let loggedinUser = await prisma.user.findMany();
            res.status(201).json({message:"User logged", data: users});
        }
    } catch (error) {              
        console.log(error)
        res.status(400).json({message: "User not logged", data: []})
    }
}
