// It will contain most of the logic for fetching the data from each API endpoint.

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  
  
  //My request logic
  request("https://api.ipify.org?format=json", { json: true }, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = body.ip;
    // console.log(res,body);
    callback(null, ip);
  });


};


const fetchCoordsByIP = (ip, callback)=>{
  
  let URL = 'https://api.freegeoip.app/json/' + ip + '?apikey=8c608cf0-53f6-11ec-bf57-63b44a7c7db4';
  // console.log(URL);
  request(URL, { json: true }, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // console.log("POW",body.latitude);
    // console.log("POW",body.longitude);
    // console.log("POW",res);
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = { latitude: body.latitude, longitude: body.longitude };
    // const { latitude, longitude } = JSON.parse(body);
    // callback(null, { latitude, longitude });
    callback(null, data);
    // return;
  });
};


const fetchISSFlyOverTimes = function(coordinates, callback) {
  // console.log(coordinates,callback);
  let URL = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  // console.log(URL);
  request(URL, { json: true }, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // console.log("POW",body.response);
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    let data = body.response;
    callback(null, data);
    // return;
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip)=>{
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, loc)=>{
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(loc ,(error, nextPasses)=>{
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, nextPasses);
      });
    });
  });
};


// module.exports = { fetchMyIP };

// module.exports = { fetchMyIP, fetchCoordsByIP };

// module.exports = { fetchMyIP, fetchISSFlyOverTimes };
module.exports = {nextISSTimesForMyLocation};