
export default function handler (req, res) {
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
            id: new Date().toISOString(),
            email,
            name,
            text
        }
        

        res.status(201).json({ message: 'Added Comment', comment: newComment})
    }

    if (req.method === 'GET'){
        const dummyList = [
            {id: 1, name: 'Keo', text: 'aaaaaaa'},
            {id: 2, name: 'Money', text: 'bbbbbb'}
        ]
        res.status(200).json({comments: dummyList})
    }
}