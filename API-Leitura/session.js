module.exports = (app) => {

  const redis   = app.db.redis;
  const config  = app.config;

  return {
    consult: (req, res, next) => {
      return new Promise((resolve, reject) => {
        var chave = req.headers['token'];
        redis.get(chave, (err, result) => {
          if(err) console.log(err);
          if(result){
            redis.expire(chave, config.expiraSessao);
            resolve(JSON.parse(result));
          }  else {
            return res.status(401).json({ mensagem: 'Usuário não encontrado na sessão!' });
          }
        });
      });
    },

    insert: (chave, valor) => {
      return new Promise((resolve, reject) => {
        redis.set(chave, JSON.stringify(valor));
        redis.expire(chave, config.expiraSessao);
        resolve({ token: chave });
      });
    },

    valid: (req, res, next) => {
      return new Promise((resolve, reject) => {
        var chave = req.headers['token'];
        redis.get(chave, function(err, result){
          if(result){
            redis.expire(chave, config.expiraSessao);
            resolve(true);
          }
          else {
            return res.status(401).json({ mensagem: 'Usuário não encontrado na sessão!' });
          }
        });
      });
    }
  };
};
