var request = require("request");
var cheerio = require('cheerio');
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body.hello)
    res.json({
        type: 'success'
    })
})

app.post('/validate', (req, res) => {
    let email = req.body.email
    var options = {
        method: 'POST',
        url: 'https://uasg.tech/eai-check',
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: { user_input: email, submit: '' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var $ = cheerio.load(body);
        let d = $('.fusion-text').html()
        let m = d.toString()
        console.log()
        res.json({
            type: 'success',
            data: m.includes('is supported!')
        })
    });

})

var options = {
    method: 'POST',
    url: 'https://uasg.tech/eai-check',
    headers:
    {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: { user_input: 'সমীরণগুপ্ত@ডাটামেল্.ভারত', submit: '' }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var $ = cheerio.load(body);
    let d = $('.fusion-text').html()
    let m = d.toString()
    console.log(m.includes('is supported!'))
    
    // res.json({
    //     type: 'success',
    //     data: m.includes('is supported!')
    // })
});


app.listen(3000)