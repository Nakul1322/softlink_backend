const { unique } = require('lodash');
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/softlink';

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.once('open', async () => {
  require('../server/models/leads/leads.model');
  console.log('Connection to database successful...');
  const { Lead } = db.models;
  const CHUNK_SIZE = 50;

  const allLeads = await Lead.find({}).lean();
  console.log('Found leads Amount:', allLeads.length);

  const changeAndUpdateOneLead = (lead) => {
    const { _id, username, name } = lead;
    const { metadata = {}, ...originalFields } = JSON.parse(lead.fields);

    const fieldType = typeof originalFields;
    // just dummy check
    if (fieldType !== 'object') {
      console.error(`Couldn't update ${username} for ${name}, as originalFields is not an object`);
      return { n: 1, nModified: 0, ok: 0 };
    }
    // console.log(`fields: `, fieldType);
    // console.log(`Original fields rest: `, originalFields);

    const { lists = [], tags = [], ...restMetadata } = metadata;
    const newFields = JSON.stringify({
      ...originalFields, 
      metadata: restMetadata
    });
    // console.log(`New Lead Fields: `, newFields);

    return Lead.updateOne(
      { _id },
      {
        lists: unique([...lead.lists || [], ...lists]),
        tags: unique([...lead.tags || [], ...tags]),
        // in order to remove lists and tags from "fields" entity
        fields: newFields
      }
    );
  };

  const updateAllRecursiv = async (data = []) => {
    if (!data.length) return;
    const chunk = data.splice(0, CHUNK_SIZE);
    await Promise.all(chunk.map(changeAndUpdateOneLead)).then((res) => {
      console.log(res);
      console.log(
        `FINISH for chunk: 
            updated ${res.filter(({ nModified }) => nModified).length} of ${chunk.length}
            successfull ${res.filter(({ ok }) => ok).length}
            of ${chunk.length}, \n items left ${data.length}`
      );
      return updateAllRecursiv(data);
    });
  };

  await updateAllRecursiv(allLeads);
  process.exit();
});
