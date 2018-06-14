var config = {
  "Correios": {
    "Url": "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl",
    "CepOrigem": "09999-999",
    "nCdEmpresa": "",
    "sDsSenha": "",
    "sCdMaoPropria": "N",
    "nVlValorDeclarado": 0,
    "sCdAvisoRecebimento": "N",
    "CodServicos": {
      "SedexVarejo": "40010",
      "SedexCobrarVarejo": "40045",
      "Sedex10Varejo": "40215",
      /*"SedexHojeVarejo": "40290",*/
      "PacVarejo": "41106"
    },
    "TempoExtraEntrega": {
      "40010": "2",
      "40045": "0",
      "40215": "1",
      /*"40290": "0",*/
      "41106": "0"
    }
  },
  "Access": {
    "accessKeyId" : "1234567890",
    "secretAccessKey" : "1234567890"
  },
  "pathUploadArteFinal": "./public/uploads/",
  expiraSessao: 2800
};

module.exports = config;
