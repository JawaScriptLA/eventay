const db = require('../../db/db');

module.exports = {
  createEvent: async ({
    title,
    description,
    thumbnail,
    location,
    start_time,
    end_time,
    publicity,
    host_id
  }) => {
    try {
      const data = await db.queryAsync(`
        INSERT INTO events (
          title,
          description,
          thumbnail,
          location,
          start_time,
          end_time,
          publicity,
          host_id
        ) VALUES (
          '${title}',
          ${description ? `'${description}'` : null},
          ${thumbnail ? `'${thumbnail}'` : null},
          ${location ? `'${location}'` : null},
          ${start_time ? `'${start_time}'` : null},
          ${end_time ? `'${end_time}'` : null},
          ${publicity ? `'${publicity}'` : false},
          '${host_id}'
        ) RETURNING id
      `);
      await db.queryAsync(`
        INSERT INTO attendants (access, status, user_id, event_id, invitor_id)
        VALUES ('host', 'going', ${host_id}, ${data.rows[0].id}, null)
      `);
      return data.rows;
    } catch (err) {
      console.log('ERROR IS: ', err);
      throw err;
    }
  },
  getHostingEvents: async ({ user_id }) => {
    try {
      const data = await db.queryAsync(`SELECT * FROM events WHERE host_id='${user_id}'`);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },
  updateEvent: async (data) => {
    try {
      let fields = Object.entries(data)
        .map(([ key, value ]) =>
          typeof value === 'string' ?
            `${key} = '${value}'`
          :
            `${key} = ${value}`
        )
        .join(', ');
      await db.queryAsync(`UPDATE events SET ${fields} WHERE user_id=${data.user_id}`);
    } catch (err) {
      throw err;
    }
  },
  removeEvent: async ({ event_id }) => {
    try {
      await db.queryAsync(`
        DELETE FROM events
        WHERE id=${event_id}
      `);
    } catch (err) {
      throw err;
    }
  }
};
