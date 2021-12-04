// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');

const { nextISSTimesForMyLocation } = require('./iss_promised');

const printNextISSTimes = (nextISSTimes)=>{
  for (const pass of nextISSTimes) {
    const datetime = new Date(0);
    // console.log(datetime);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }

};

nextISSTimesForMyLocation()
  .then((nextISSTimes) => {
    // console.log(nextISSTimes);
    printNextISSTimes(nextISSTimes);
  })
  .catch((error)=>{
    console.log("It didn't work",error.message);
  });