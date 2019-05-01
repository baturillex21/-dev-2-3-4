const sql = require('mssql');

var webconfig = {
  user: 'batuhan',
  password: 'batuhan28',
  server: '192.168.1.115',
  database: 'MEDIPILIMDB'
};

module.exports.userLogin = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from Album; select * from Sanatci; select * from MuzikTur;', function(err, dataresult) {
      if (err) {
        console.log(err);
      }
      console.log(dataresult.recordsets);
      sql.close();
      res.render('home', { veri: dataresult.recordsets });
    });
  });
};

module.exports.albumeklemeGet = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from Sanatci; select * from MuzikTur;', function(err, dataresult) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('albumekle', { veri: dataresult.recordsets });
    });
  });
};

module.exports.albumguncelle1 = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from Sanatci; select * from MuzikTur;', function(err, dataresult) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('album_guncelle', { veri: dataresult.recordsets, guncellenecek_album_id: req.body.GuncellenecekAlbumId });
    });
  });
};

module.exports.albumguncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query(
      `
        UPDATE Album set 
        AlbumAdi = '${req.body.yeni_albumIsım}',
        CikisTarihi = '${req.body.yeni_cikisTarihi}',
        SanatciId = ${req.body.yeni_sanatciId},
        MuzikTurId = ${req.body.yeni_muzikturId}
        WHERE
        AlbumId = ${req.body.guncellenecekAlbumId}
        
        `,
      function(err, dataresult) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.send('Albüm güncellendi');
      }
    );
  });
};

module.exports.sanatciyi_guncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query(
      `
        UPDATE Sanatci set 
        SanatciAdi = '${req.body.yeni_SanatciIsım}',
        SanatciYasiyormu = '${req.body.yeni_SanatciYasiyormu}',
        SanatciDogumTarihi = '${req.body.yeni_SanatciDogumTarihi}'
        WHERE
        SanatciId = ${req.body.guncellenecekSanatciId}
        
        `,
      function(err, dataresult) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.send('Sanatçı güncellendi');
      }
    );
  });
};

module.exports.muziktur_guncelle = function(req, res) {
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query(
      `
        UPDATE MuzikTur set 
        MuzikTur = '${req.body.yeni_muzikTurİsim}'
        WHERE
        MuzikTurId = ${req.body.guncellenecek_muziktur_id}
        
        `,
      function(err, dataresult) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.send('Müzik Tür güncellendi');
      }
    );
  });
};

module.exports.userDetay4 = function(req, res) {
  // müzik türü ekleme
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query("insert into MuzikTur(MuzikTur)VALUES('" + req.body.MuzikTuruEkle + "')", function(err, sarkiverisi) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('muzikturuekle');
    });
  });
};

module.exports.userDetay2 = function(req, res) {
  // sanatçı ekle
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query(
      "insert into Sanatci VALUES('" + req.body.SanatciAdi + "'," + req.body.SanatciYasiyormu + ',' + req.body.dogumTarihi + ',GETDATE())',
      function(err, sarkiverisi) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.render('sanatciekle');
      }
    );
  });
};

module.exports.userDetay5 = function(req, res) {
  // albüm ekle
  sql.connect(webconfig, function(err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query(
      "insert into Album VALUES('" + req.body.albumAdi + "','" + req.body.cikisTarihi + "'," + req.body.sanatciId + ',' + req.body.muzikturId + ')',
      function(err, sarkiverisi) {
        if (err) {
          console.log(err);
        }
        sql.close();

        res.send('album başarıyla eklendi');
      }
    );
  });
};
