const db = require("../../db/db");
// import db from '../../db/db';

// export const pendingRequests = async () => {
// };

const sendRequest = async payload => {
  try {
    console.log("in the friend req controller");
    const query = `
      INSERT INTO friendships (userid, targetid, isAccepted)
      VALUES (${payload.body.userid}, ${payload.body.targetid}, FALSE)
      RETURNING userid, targetid
    `;
    const data = await db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during friendship POST request: ${err}`);
  }
};

const acceptRequest = async payload => {
  try {
    const query = `
      UPDATE friendships
      SET isaccepted='TRUE'
      WHERE userid=${payload.body.userid} AND targetid=${payload.body.targetid}
      RETURNING userid, targetid, isaccepted
    `;
    const data = await db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during friendship GET request: ${err}`);
  }
};

const declineRequest = async payload => {
  try {
    const query = `
      DELETE FROM friendships
      WHERE userid=${payload.body.userid} AND targetid=${
      payload.body.targetid
    } AND isaccepted='FALSE'
      RETURNING userid, targetid
    `;
    const data = await db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during frienship DELETE request: ${err}`);
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  declineRequest
};
