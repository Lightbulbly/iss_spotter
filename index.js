// It will require and run our main fetch function.
// const { fetchMyIP } = require('./iss');

// const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// const { fetchMyIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);


// fetchCoordsByIP(ip, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
  
//   console.log('It worked! Returned coordinates:', coordinates);
// });


// const coords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(coords, (error, times) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
    
//   console.log('It worked! Returned Flyover Times:', times);
// });

// });

nextISSTimesForMyLocation((error, nextISSTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned nextISSTimes:', nextISSTimes);
});
