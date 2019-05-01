const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 3000;
const login = require('./loginOps');

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login', login.userLogin);
app.get('/muzikturuekle', function(req, res) {
  res.render('muzikturuekle');
});

app.get('/sanatciekle', function(req, res) {
  console.log('sanatci eklendi');
  res.render('sanatciekle');
});

app.get('/albumekle', login.albumeklemeGet);
app.get('/album_guncelle', function(req, res) {
  res.render('guncelle');
});
app.get('/muzikturguncelle', login.muziktur_guncelle);
app.get('/muziktur_guncelle', function(req, res) {
  res.render('muzikturguncelle');
});

// POST BAŞLANGIÇ
app.post('/sanatci_guncellemeye_gonder', function(req, res) {
  res.render('sanatci_guncelle', {
    guncellenecek_sanatci_id: req.body.guncellenecek_sanatci_id
  });
});
app.post('/muziktur_guncellemeye_gonder', function(req, res) {
  res.render('muziktur_guncelle', {
    guncellenecek_muziktur_id: req.body.guncellenecek_muziktur_id
  });
});
app.post('/sanatci_guncelle_post', login.sanatciyi_guncelle);
app.post('/muziktur_guncelle_post', login.muziktur_guncelle);
app.post('/albumu_guncelle_post', login.albumguncelle);
app.post('/sanatciekle', login.userDetay2);
app.post('/muzikturuekle', login.userDetay4);
app.post('/albumekle', login.userDetay5);
app.post('/guncelle', login.albumguncelle1);
app.listen(port, () => console.log(`Port Çalışıyor :  ${port}!`));
