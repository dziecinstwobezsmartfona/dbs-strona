// Select the database to use.
use('dbs-prd');

const pipeline = [];

pipeline.push({
    $group: {
        _id: "$email",
        numberOfChildren: {
            $sum: "$numberOfChildren"
        }
    }
});

pipeline.push({
    $group: {
        _id: null,
        numberOfParents: {
            $sum: 1
        },
        numberOfChildren: {
            $sum: "$numberOfChildren"
        }
    }
});

pipeline.push({
    $unset: ["_id"]
});

db.pacts.aggregate(pipeline);
