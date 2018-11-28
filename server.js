const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/dist/boardgames-angular'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/boardgames-angular/index.html'));
});

app.listen(PORT, () => console.log('Boardgame Angular App running on port: ', PORT));
