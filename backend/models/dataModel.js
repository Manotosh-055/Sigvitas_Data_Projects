const mongoose = require('mongoose');

const dataSchema = mongoose.Schema(
    {
        documentNo: { type: String, required: true },
        appSerialNumber: { type: String, required: true },
        priorityDate: { type: String, required: true },
        fileDate: { type: String, required: true },
        agent: { type: String, required: true },
        cpcClassFirst: { type: String, required: true },
        title: { type: String, required: true },
        assigneeUltimate: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', dataSchema);
