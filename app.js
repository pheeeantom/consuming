const express = require('express');
const app = express();
const port = 3010;

const data = [
    {
        "id": 1,
        "name": "еда",
        "items": [
            {
                "id": 1,
                "name": "чизбургер",
                "price": 70,
                "picture": "cheeseburger.jpg"
            },
            {
                "id": 2,
                "name": "кока-кола",
                "price": 100,
                "picture": "coke.webp"
            }
        ]
    },
    {
        "id": 2,
        "name": "одежда",
        "items": [
            {
                "id": 3,
                "name": "alpha industries куртка",
                "price": 30_000,
                "picture": "alpha-industries-jacket.png"
            }
        ]
    }
];

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.get('/api/cats', (req, res) => {
    res.json(data.map(item => ({ id: item.id, name: item.name })));
});

/*app.get('/api/cats/2', (req, res) => {
    res.json([{
        "id": 1,
        "name": "еда",
    },
    {
        "id": 2,
        "name": "одежда",
    },
    {
        "id": 3,
        "name": "ххх",
    }]);
});*/

app.get('/api/items', (req, res) => {
    const cat = data.find(item => item.id === +req.query.id);
    if (cat) {
        res.json(cat.items);
    }
    else {
        res.status(404).json([]);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});