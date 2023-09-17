import fs from 'fs'
import { MongoClient } from 'mongodb'
import { buildPath, extractData} from '@/helpers/api-util'
import { url } from '@/helpers/mongodb-client'
import { connectToDb, insertDocument } from '@/helpers/db-util'

// async function connectToDb() {
//     const client = await MongoClient.connect(url)
//     return client
// }
// async function insertDocument(client, document) {
//     const db = client.db('events')
//     const result = await db.collection('emails').insertOne(document)
//     return result
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid email address'})
            return
        }

        let client;
        try {
            client = await connectToDb()
        } catch (error) {
            res.status(500).json({message: 'Connecting to the database failed!'})
            return 
        }
        try {
            await insertDocument(client, 'emails',{email: userEmail})
            client.close()
        } catch {
            res.status(500).json({message: 'Inserting data failed!'})
        }

        res.status(201).json({message: 'Signed up!'})
    }
}











// import fs from 'fs'
// import { buildPath, extractData} from '@/helpers/api-util'

// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         const userEmail = req.body.email

//         if (!userEmail || !userEmail.includes('@')){
//             res.status(422).json({message: 'Invalid email address'})
//             return
//         }
//         const newUser = {
//             id:  new Date().toISOString(),
//             email: userEmail
//         }

//         const filePath = buildPath()
//         const data = extractData(filePath)
//         data.push(newUser)
//         fs.writeFileSync(filePath, JSON.stringify(data))
//         res.status(201).json({ message: 'Successfully Registrated!'})
//         console.log(userEmail)
//     }else {
//         const filePath = buildFeedbackPath()
//         const data = extractFeedback(filePath)
//         res.status(200).json({feedback: data})
//     }
// }