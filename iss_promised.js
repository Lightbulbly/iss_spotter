const request = require('request-promise-native');
const fetchMyIP = ()=>{

  // return new Promise((resolve, reject)=>{
  //fetch IP
  return request('https://api.ipify.org?format=json');

  //   request("https://api.ipify.org?format=json", { json: true }, (err, res, body) => {
  //     if (err) {
  //       reject(err);
  //       return;
  //     }
  //     // if non-200 status, assume server error
  //     if (res.statusCode !== 200) {
  //       const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
  //       reject(Error(msg));
  //       return;
  //     }
  //     const ip = body.ip;
  //     // console.log(res,body);
  //     resolve(ip);
  //   });

 
  // });
};


const fetchCoordsByIP = function(body) {
  // console.log(body);
  let ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=8c608cf0-53f6-11ec-bf57-63b44a7c7db4`);

};

const fetchISSFlyOverTimes = function(body) {
  let coordinates = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const nextISSTimesForMyLocation = ()=>{
  return fetchMyIP() //this needs to be returned!
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body=>{
      // console.log(body);
      // console.log(JSON.parse(body).response);
      return JSON.parse(body).response;
    });
};

// module.exports = { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes };

module.exports = { nextISSTimesForMyLocation };


 