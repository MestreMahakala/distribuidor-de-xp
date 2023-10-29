// 1. Carregue a biblioteca cliente JavaScript do Google.
Hooks.on("setup", function() {
gapi.load('client', {
  callback: function () {
    // Handle gapi.client initialization.
    initGapiClient();
  },
  onerror: function () {
    // Handle loading error.
    alert('gapi.client failed to load!');
  },
  timeout: 5000, // 5 seconds.
  ontimeout: function () {
    // Handle timeout.
    alert('gapi.client could not load in a timely manner!');
  }
});

function initGapiClient() {
  // 2. Inicialize a biblioteca cliente com suas credenciais.
  gapi.client.init({
    'apiKey': 'AIzaSyC_nufcCmf0U5XdHbghgbSp5ezis-ao0Bo',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    'clientId': '992605036103-j8319mnjhq4gsp0bdvcfk53u0hlof38d.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/spreadsheets', // Escopo da planilha
  }).then(function () {
    // 3. Faça uma chamada à API do Google Sheets.
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '16chsmT-J6a0jU0P_S4X-Lgple-kwr4bRcqeUwfjWIJw',
      range: 'teste!A1',
    }).then(function (response) {
      var values = response.result.values;
      console.log(values);
    }, function (reason) {
      console.log('Erro: ' + reason.result.error.message);
    });
  });
}})
