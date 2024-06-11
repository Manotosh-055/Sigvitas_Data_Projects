const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

const addData = asyncHandler(async (req, res) => {
    const {
        documentNo,
        appSerialNumber,
        priorityDate,
        fileDate,
        agent,
        cpcClassFirst,
        title,
        assigneeUltimate,
    } = req.body;

    try {
        const newData = new Data({
            documentNo,
            appSerialNumber,
            priorityDate,
            fileDate,
            agent,
            cpcClassFirst,
            title,
            assigneeUltimate,
        });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const getData = asyncHandler(async (req, res) => {
    try {
        const data = await Data.find();
        // console.log("Data");
        // console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

const searchData = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
        $or: [
            { documentNo: { $regex: req.query.search, $options: 'i' } },
            { object: { $regex: req.query.search, $options: 'i' } },
            { appSerialNumber: { $regex: req.query.search, $options: 'i' } },
            { agent: { $regex: req.query.search, $options: 'i' } },
            { cpcClassFirst: { $regex: req.query.search, $options: 'i' } },
            { title: { $regex: req.query.search, $options: 'i' } },
            { assigneeUltimate: { $regex: req.query.search, $options: 'i' } },
            {
                priorityDate: {
                    $gte: new Date(req.query.search), 
                },
            },
            {
                fileDate: {
                    $gte: new Date(req.query.search), 
                },
            },
        ],
        }
      : {};
  
    const searchResult = await Data.find(keyword);
    res.send(searchResult);
  });





module.exports = { addData, getData, searchData }