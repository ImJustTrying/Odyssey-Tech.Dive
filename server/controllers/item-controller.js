/* eslint-disable no-undef, arrow-body-style */
const Item = require('../models/item-model');
const default_get_callback = (function_name, only_first, res) => (err, items) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 in '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!items.length) {
    console.error(`[Hack.Diversity React Template] - 404 in '${function_name}': Item not found`);
    return res.status(404).json({
      success: false,
      error: 'Item not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 in '${function_name}': Item fetched!`);
  let json_obj = { success: true };
  if (only_first) {
    json_obj.item = items[0];
  } else {
    json_obj.items = items;
  }
  return res.status(200).json(json_obj);
};

getItems = async (req, res) => {
  await Item.find({}, default_get_callback("getItems", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${function_name}': ${err}`);
    console.error(err);
    return err;
  });
};

getItemById = async (req, res) => {
  await Item.find({ _id: req.params.id }, default_get_callback("getItemById", true, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${function_name}': ${err}`);
    console.error(err);
    return err;
  });
};

getFilteredItems = async (req, res) => {
  let query_obj = {};
  if (req.query.name) {
    // This will filter the document for any objects where the name field contains data that
    // contains req.query.name, ignoring case.
    query_obj.name = new RegExp(req.query.name, 'i');
  } if (req.query.content) {
    query_obj.content = new RegExp(req.query.content, 'i');
  } if (req.query.tfnote) {
    query_obj.timeframeNote = new RegExp(req.query.tfnote, 'i');
  }

  await Item.find(query_obj, default_get_callback("getFilteredItems", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${function_name}': ${err}`);
    console.error(err);
    return err;
  });
};

createItem = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createItem: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createItem: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item.',
    });
  }

  const item = new Item(body);

  if (!item) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'item' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'item' is malformed",
    });
  }

  // console.log('----------------------- createItem: item -----------------------')
  // console.log(item);

  return item
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createItem': Item created!`);
      return res.status(201).json({
        success: true,
        id: item._id,
        message: 'Item created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createItem'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

updateItem = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`[Hack.Diversity React Template] - 400 in 'updateItem': You must provide an item to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an item to update.',
    });
  }

  const itemForUpdate = {
    _id: req.params.id,
    name: body.name,
    daysOfWeek: body.daysOfWeek,
    timeframeNote: body.timeframeNote,
    priority: body.priority,
    content: body.content,
  };

  // console.log('----------------------- updateItem: res -----------------------');
  // console.log(res);

  try {
    await Item.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updateItem': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updateItem': Item updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Item updated!',
  });
};

deleteItem = async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!item) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': Item not found!`);
      return res.status(400).json({
        success: false,
        error: 'Item not found!',
      });
    }

    return res.status(200).json({
      success: true,
      item: item,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'deleteItem': ${err}`);
    console.error(err);
    return err;
  });
};

module.exports = {
  getItems,
  getItemById,
  getFilteredItems,
  createItem,
  updateItem,
  deleteItem,
};
