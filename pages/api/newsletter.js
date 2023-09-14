import fs from 'fs'
import {MangodbClient} from 'mongodb'
import { buildPath, extractData} from '@/helpers/api-util'

const url = "mongodb+srv://keotshepilemaje:nVCJ7dMNuoBz7GZp@cluster0.kzc6f8t.mongodb.net/?retryWrites=true&w=majority"

const client = new MangodbClient(url)


export default function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid email address'})
            return
        }
        const newUser = {
            id:  new Date().toISOString(),
            email: userEmail
        }

        const filePath = buildPath()
        const data = extractData(filePath)
        data.push(newUser)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({ message: 'Successfully Registrated!'})
        console.log(userEmail)
    }else {
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({feedback: data})
    }
}