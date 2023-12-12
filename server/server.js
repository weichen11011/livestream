const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt') 
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST", "GET"] ,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

/* app.get('/todos/:useremail', async (req, res) => {
    const { useremail } = req.params;
    console.log(useremail);
    try {
        const todos = await pool.query('SELECT * FROM users WHERE email = $1', [useremail]);

        const formattedTodos = JSON.stringify(todos.rows, null, 2);
        res.type('json').send(formattedTodos);
    } catch (error) {
        console.error(error);
    }
}); */
const verifyUser = async (req, res, next) => {
    console.log('verifyUser middleware is called!');
    const token = req.cookies.token;
    if (!token) {
        return res.json({ error: 'You are not authenticated' });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.json({ error: 'Token is not valid' });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
}



app.get('/', verifyUser , async(req, res) => {
    console.log('yes')

    return res.json({ Status:'Success', name:req.name });
})

app.post('/register', async (req, res) => {
    

    if (!req.body || !req.body.password) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    else{
        console.log("success")
    }
    saltRounds = 10 ;
    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }
        else{
            console.log("success")
        }

        

        const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`
        const values = [req.body.name, req.body.email,hash]

        pool.query(sql,values,(err, result) => {
            
            if (err) {

                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Error inserting data in server' });
            }
            
            console.log('yes');

            return res.json({ Status: 'Success' });
            
        })
    })
})


/* app.post('/login',  (req, res) => {

        const sql = 'SELECT * FROM users WHERE email = $1'

        pool.query(sql, [req.body.email], (err, data) => {
            if(err) return res.json({Error:"LOGIN error in server"})
            if(data.length > 0){
                bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {

                    if(err) return res.json({Error:"password compare error"})

                    if(response) {
                        return res.json({ Status: 'Success' });
                    }     
                    else{
                        return res.json({Error:"password not match"})
                    }       
                })
            }
            else{
                res.json({Error:"email no exist"})
            }
        })

        })  */

app.post('/login', async (req, res) => {

    const sql = 'SELECT * FROM users WHERE email = $1';

    pool.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error('LOGIN error in server:', err);
            return res.status(500).json({ error: 'LOGIN error in server' });
        }
        

        if (data.rows.length > 0) {
            
            const storedPassword = data.rows[0].password;

            bcrypt.compare(req.body.password.toString(), storedPassword, (err, response) => {
                if (err) {
                    console.error('Password compare error:', err);
                    return res.status(500).json({ error: 'Password compare error' });
                }

                if (response) {
                    const name = data.rows[0].name  //row 是 postgre 語法
                    //第一個參數是一個對象 將用戶的名稱（name 屬性）作為 JWT 的有效載荷（Payload）, 第二個參數是一個字串，代表用於對 JWT 進行簽名的密鑰 ,第三個參數是一個選項對象，用於指定額外的配置選項
                    //使用 expiresIn 選項設置 JWT 的過期時間為 1 天
                    const token = jwt.sign({name},"jwt-secret-key", { expiresIn: '1d' })
                    res.cookie('token', token)
                    console.log('good')
                    return  res.json({ Status: 'Success' }) 
                } else {
                    return res.json({ error: 'Password not match' });
                }
            });
        } else {
            res.json({ error: 'Email not found' });
        }
    });
});

app.get('/logout', (req, res) => {

    res.clearCookie('token')
    return res.json({ Status: 'Success' })
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
