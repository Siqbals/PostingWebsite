const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); 
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); 
    } else {
        next();
    }
});

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saadman5',
});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log('connected to database');
    }
});


app.post('/init', function (req, res) {
    const createTableUsers = `
    CREATE TABLE IF NOT EXISTS logins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(512) NOT NULL
    );
    `;
    const createTablePosts = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        channelname VARCHAR(255) NOT NULL,
        topic VARCHAR(255) NOT NULL,
        content VARCHAR(512) NOT NULL,
        likes INT NOT NULL,
        dislikes INT NOT NULL,
        author VARCHAR(255) NOT NULL
    )
    `;
    const createTableChannels = `
    CREATE TABLE IF NOT EXISTS channels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        channel_id VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL
    )
    `;

    const createTableReplies = `
    CREATE TABLE IF NOT EXISTS replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        channelname VARCHAR(255) NOT NULL,
        replyingto VARCHAR(255) NOT NULL,
        content VARCHAR(512) NOT NULL,
        likes INT NOT NULL,
        dislikes INT NOT NULL,
        author VARCHAR(255) NOT NULL,
        postidreply INT NOT NULL
    )
    `;



    con.query('CREATE DATABASE IF NOT EXISTS backendtables', function (err) {
        if (err) {
            console.log('error in creating database');
        } else {
            con.query('USE backendtables', function (err) {
                if (err) {
                    console.log('error in using database');
                } else {
                    con.query(createTableUsers, function (err) {
                        if (err) {
                            throw err;
                        } else {
                            console.log('table created for users');
                        }
                    });
                    con.query(createTableChannels, function (err) {
                        if (err) throw err;
                        else {
                            console.log('table created for channels');
                        }   
                    });
                    con.query(createTablePosts, function (err) {
                        if (err) throw err;
                        else {
                            console.log('table created for posts');
                        }
                    });
                    con.query(createTableReplies, function (err) {
                        if (err) throw err;
                        else {
                            console.log('table created for replies');
                        }
                    });
                    res.send('all tables have been created');
                }
            });
        }
    });
});

app.use(bodyParser.json());

app.post('/submit_login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            con.query('INSERT INTO logins (username, password) VALUES (?, ?)', [username, password], function (err) {
                if (err) throw err;
                else {
                    console.log('insertion success');
                    res.send('successfully inserted data into the table');
                }
            });
        }
    });
});

app.post('/login', function (req, res) {
    const { username, password } = req.body;

    con.query('USE backendtables', function (err) {
        if (err) {
            console.error('Error using database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        con.query('SELECT * FROM logins WHERE username = ? AND password = ?', [username, password], function (err, results) {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.length > 0) {
                // Valid credentials
                res.json({ message: 'Login successful' });
            } else {
                // Invalid credentials
                res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    });
});

app.post('/submit_post', function(req,res) {
    const channelname = req.body.channelname; 
    const question = req.body.question;
    const details = req.body.details;
    const author = req.body.author;

    con.query('SELECT * FROM channels WHERE channel_id = ?', [channelname], function(err, results) {
        if (err) throw err;
        else if (results.length === 0) {
            res.status(400).send('Channel does not exist');
        }
        else {
            con.query('USE backendtables', function(err) {
                if (err) throw err;
                else {
                    con.query('INSERT INTO posts (channelname, topic, content, likes, dislikes, author) VALUES (?,?,?,0,0,?)', [channelname, question, details, author], function (err) {
                        if (err) throw err;
                        else {
                            console.log('added new post');
                            res.send('Post added successfully');
                        }
                    })
                }
            })
        }
    });
})

app.post('/submit_channel', function(req,res) {
    const channelname = req.body.channelname; 
    const author = req.body.author;

    con.query('USE backendtables', function(err) {
        if (err) throw err;
        else {
            con.query('INSERT INTO channels (channel_id, author) VALUES (?,?)', [channelname, author], function (err) {
                if (err) throw err;
                else {
                    console.log('added new channel');
                    res.send(' added successfully');
                }
            })
        }
    })
})

app.post('/submit_reply', function(req,res) {
    const channelname = req.body.channelname; 
    const replyingto = req.body.replyingto;
    const replyingtopostid = req.body.replytopostid;
    const content = req.body.content;
    const author = req.body.author;

    con.query('USE backendtables', function(err) {
        if (err) throw err;
        else {
            con.query('INSERT INTO replies (channelname, replyingto, content, likes, dislikes, author, postidreply) VALUES (?,?,?,0,0,?,?)', [channelname, replyingto, content, author, replyingtopostid], function (err) {
                if (err) throw err;
                else {
                    console.log('added new reply');
                    res.send('reply added successfully');
                }
            })
        }
    })

});


app.get('/get_posts', function(req, res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            con.query('SELECT * FROM posts', function (err, rows) {
                if (err) throw err;
                res.json(rows);
            });
        }
    });
});

app.get('/get_replies', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('SELECT * FROM replies', function (err, result) {
                if (err) throw err;
                res.json(result);
            });
            
        }
    })
});

app.get('/get_channels', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('SELECT * FROM channels', function (err, result) {
                if (err) throw err;
                res.json(result);
            });
            
        }
    })
});


app.post('/add_like', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            const likedpostid = req.body.postid
            con.query('UPDATE posts SET likes = likes + 1 WHERE id = ? ' , [likedpostid]);
            console.log('like updated successfully');
            res.send('like increases successfully');
        }

    })
})


app.post('/add_dislike', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            const likedpostid = req.body.postid
            con.query('UPDATE posts SET dislikes = dislikes + 1 WHERE id = ? ' , [likedpostid]);
            console.log('like updated successfully');
            res.send('like increases successfully');
        }

    })
})

app.post('/add_like_reply', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            const likedreplyid = req.body.replyid;
            console.log('liked reply id is: ', likedreplyid);
            con.query('UPDATE replies SET likes = likes + 1 WHERE id = ? ' , [likedreplyid]);
            console.log('like updated successfully');
            res.send('like increases successfully');
        }
    })
})

app.post('/add_dislike_reply', function(req,res) {
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else {
            const dislikedreplyid = req.body.replyid;
            con.query('UPDATE replies SET dislikes = dislikes + 1 WHERE id = ? ' , [dislikedreplyid]);
            console.log('dislike updated successfully');
            res.send('dislike increases successfully');
        }
    })
})


app.post("/delete_user", function (req, res) {
    const user = req.body.username;
    console.log(user);
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('DELETE FROM replies WHERE author = ?' , [user], function (err) {
                if (err) throw err;
            })
            con.query('DELETE FROM posts WHERE author = ?', [user], function (err){
                if (err) throw err;
            })
            con.query('DELETE FROM channels WHERE author = ?', [user], function(err) {
                if (err) throw err;
            })
            con.query('DELETE FROM logins WHERE username = ?', [user], function(err){
                if (err) throw err;
            })
            console.log('successfully deleted user and all their activity');
        }
    })
})

app.post("/delete_channel", function (req, res) {
    const channelid = req.body.channelid;
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('DELETE FROM posts WHERE channelname = ?', [channelid], function (err){
                if (err) throw err;
            })

            con.query('DELETE FROM channels WHERE channel_id = ?', [channelid], function(err) {
                if (err) throw err;
            })
            console.log('successfully deleted channel');
        }
    })
})

app.post("/delete_post", function (req, res) {
    const postid = req.body.postid;
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('DELETE FROM posts WHERE topic = ?', [postid], function(err) {
                if (err) throw err;
            })
            console.log('successfully deleted post');
        }
    })
})

app.post("/delete_reply", function (req, res) {
    const replyid = req.body.replyid;
    console.log(replyid);
    con.query('USE backendtables', function (err) {
        if (err) throw err;
        else{
            con.query('DELETE FROM replies WHERE id = ?', [replyid], function(err) {
                if (err) throw err;
            })
            console.log('successfully deleted reply');
        }
    })
})







app.listen(8080, function () {
    console.log('Server is running on port 8080');
});
