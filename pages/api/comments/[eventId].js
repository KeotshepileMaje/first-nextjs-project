import { connectToDb, insertDocument, getAllDocuments } from "@/helpers/db-util"

export default async function handler (req, res) {
    const eventId = req.query.eventId
    console.log(eventId)

    let client;
    try{
        client = await connectToDb();
    } catch (error) {
        res.status(500).json({message: 'Connecting to the database failed!'})
        client.close()
        return
    }

    if (req.method === 'POST') {
        const {email, name, text} = req.body
        if (
            !email.includes('@') ||
            !name ||
            !name.trim() ||
            text.trim() === '' ||
            !text ||
            !text.trim() === ''
        )  { 
            res.status(422).json({message: 'Invalid inputs'})
            return 
        }
        const newComment = {
            email,
            name,
            text
        }

        let result;
        try {
            result = await insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId
            res.status(201).json({ message: 'Added Comment', comment: newComment})
        } catch (error) {
            res.status(500).json({message: 'Connecting to the database failed!'})
        }
    }

    if (req.method === 'GET'){
        try {
            const documents = await getAllDocuments(client, 'comments', {_id: -1})
            res.status(200).json({comments: documents})
        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'})
        }
        client.close()
    }
}




























// import { MongoClient } from "mongodb"
// import { url } from "@/helpers/mongodb-client"


// export default async function handler (req, res) {
//     if (req.method === 'POST') {
//         const {email, name, text} = req.body
//         if (
//             !email.includes('@') ||
//             !name ||
//             !name.trim() ||
//             text.trim() === '' ||
//             !text ||
//             !text.trim() === ''
//         )  { 
//             res.status(422).json({message: 'Invalid inputs'})
//             return 
//         }
//         const newComment = {
//             email,
//             name,
//             text
//         }
//         const client = await MongoClient.connect(url)
//         const db = client.db('events')
//         const result = await db.collection('comments').insertOne(newComment)

//         res.status(201).json({ message: 'Added Comment', comment: newComment})
//     }

//     if (req.method === 'GET'){
//         const client = await MongoClient.connect(url)
//         const db = client.db('events')
//         const documents = await db
//             .collection('comments')
//             .find()
//             .sort({_id: -1})
//             .toArray()
//         console.log(documents)

//         res.status(200).json({comments: documents})
        
//     }
// }







// import { connectToDb, insertDocument, getAllDocuments } from "@/helpers/db-util"

// export default async function handler (req, res) {

//     let client;
//     try{
//         client = await connectToDb();
//     } catch (error) {
//         res.status(500).json({message: 'Connecting to the database failed!'})
//         client.close()
//         return
//     }

//     if (req.method === 'POST') {
//         const {email, name, text} = req.body
//         if (
//             !email.includes('@') ||
//             !name ||
//             !name.trim() ||
//             text.trim() === '' ||
//             !text ||
//             !text.trim() === ''
//         )  { 
//             res.status(422).json({message: 'Invalid inputs'})
//             return 
//         }
//         const newComment = {
//             email,
//             name,
//             text
//         }

//         let result;
//         try {
//             result = await insertDocument(client, 'comments', newComment)
//             newComment._id = result.insertedId
//             res.status(201).json({ message: 'Added Comment', comment: newComment})
//         } catch (error) {
//             res.status(500).json({message: 'Connecting to the database failed!'})
//         }
        
//     }

//     if (req.method === 'GET'){
//         try {
//             const documents = await getAllDocuments(client, 'comments', {_id: -1})
//             res.status(200).json({comments: documents})
//         } catch (error) {
//             res.status(500).json({message: 'Getting comments failed'})
//         }
//         res.status(200).json({comments: documents})
        
//         client.close()
//     }
// }






// export default function handler (req, res) {
//     if (req.method === 'POST') {
//         const {email, name, text} = req.body
//         if (
//             !email.includes('@') ||
//             !name ||
//             !name.trim() ||
//             text.trim() === '' ||
//             !text ||
//             !text.trim() === ''
//         )  { 
//             res.status(422).json({message: 'Invalid inputs'})
//             return 
//         }
//         const newComment = {
//             id: new Date().toISOString(),
//             email,
//             name,
//             text
//         }
      

//         res.status(201).json({ message: 'Added Comment', comment: newComment})
//     }

//     if (req.method === 'GET'){
//         const dummyList = [
//             {id: 1, name: 'Keo', text: 'aaaaaaa'},
//             {id: 2, name: 'Money', text: 'bbbbbb'}
//         ]
//         res.status(200).json({comments: dummyList})
//     }
// }