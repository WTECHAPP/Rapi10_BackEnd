var basicAuth     = require('basic-auth');
var db            = require('underscore');
var crypto        = require('crypto');
var _             = require('underscore');


module.exports = function(app){

  var redis = app.db.redis;
  const config = app.config;

  const util = {
    generateName: () => {
      var date = new Date;
      var milliSeconds = date.getMilliseconds();
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      return '' + year + '' + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day) + '' + hour + '' + minutes + '' + seconds + '' + milliSeconds;
    },

    crypt: (value) => {
      return new Promise((accept, reject) => {
        var cipher = crypto.createCipher('aes192', 'PrInTy-P@sS');
        var encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        accept(encrypted);
      });

    },

    decrypt: (value) => {
      return new Promise((accept, reject) => {
        var decipher = crypto.createDecipher('aes192', 'PrInTy-P@sS');
        var decrypted = decipher.update(value, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        accept(decrypted);
      });
    }
    ,
    get: function(obj, field) {
      return obj[field];
    },

    validaObjeto: function(prop, objeto, campo, propriedades, nomeLista) {
      if(!prop[nomeLista]) prop[nomeLista] = [];
      var r = _.pick(objeto, propriedades);
      var reg = prop[nomeLista].filter(x => x[campo] == objeto[campo]);
      if(reg.length == 0) {
        prop[nomeLista].push(r);
      }
    },

    preencheObjeto: function(lista, anterior, objPreencher, objeto, campo, propriedades) {
      if(anterior[campo]) {
        if(anterior[campo] != objeto[campo]) {
          lista.push(objPreencher);
        }
      }

      if(anterior[campo] != objeto[campo]) {
        objPreencher = _.pick(objeto, propriedades);
      }
      return objPreencher;
    },

    validaArray: function(objeto, id, nomeLista) {
      if(!objeto[nomeLista]) objeto[nomeLista] = [];
      var reg = objeto[nomeLista].filter(x => x == id);
      if(reg.length == 0) {
        if(id) objeto[nomeLista].push(id);
      }
    },
    isEmail: function (email){
      var exclude=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
      var check=/@[w-]+./;
      var checkend=/.[a-zA-Z]{2,3}$/;
      if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
      else {return true;}
    }
  }
  return util;
}
