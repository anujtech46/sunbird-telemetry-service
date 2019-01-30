
var fs = require('fs');
request = require('request')


var telemetryRawData = JSON.parse(fs.readFileSync('./26-12-18_to_31-12-18.json', 'utf8'));

function parseData(date) {
  let telemetryData = []
  telemetryRawData.forEach(element => {
    try {
      const data = JSON.parse(element.message)
      telemetryData.push(data)
    } catch (e) {
      // console.log(e)
    }
  });

  console.log(telemetryData)
}



function submit() {
  const options = getProxyRequestObj(data);
  request.post(options, this.getRequestCallBack());
}

function getRequestCallBack() {
  return (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  }
}

function getProxyRequestObj(data) {
  const headers = { 'authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YjViZTJiN2M5ZWU0YzlhYTRlYWIwMDkzNjQ4YjFjNyIsImlhdCI6MTUzNjI1MjY5NCwiZXhwIjpudWxsLCJhdWQiOiIiLCJzdWIiOiIifQ.Hb_W8dYpTQJdvE8BL2NVHThqzskPWUhpDv99QwX9hhw' };
  headers['content-type'] = 'application/json';
  // ---------- //
  // ISSUE : Due to content-encoding header, mobile telemetry is not submitting to ekstep.
  // FIX: Commenting below line
  //---------- //
  // if (req.get('content-encoding')) headers['content-encoding'] = req.get('content-encoding');
  return {
    url: 'https://api.ekstep.in/data/v3/telemetry',
    headers: headers,
    body: data
  };
}
