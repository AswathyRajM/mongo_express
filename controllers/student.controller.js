const Student = require('../models/student.model');
const Marks = require('../models/marks.model')

// test 
exports.test = function (req, res) {
    res.send('This the Test controller! \n Use\n /create\n /list\n /average\n to use API');
};

// creates student and mark collections
exports.student_create = function (req, res) {
    let student = new Student(
        {
            studentId: req.body.studentId,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age
        }
    );
    const studentObjId = student._id.toString();
    let marks = new Marks(
        {
            studentId: req.body.studentId,
            subject: req.body.subject,
            marks: req.body.marks,
            studentObjId
        }
    )
    student.save(function (err) {
        if (err) return handleError(err);

        marks.save(function (err) {
            if (err) return handleError(err);
        })
        res.send('Student and Marks Created and Saved')
    })
};

// returns the list of details of students who are passed the exam usiing find()
exports.marks_list = async function (req, res) {
    const markList = await Marks.find({ marks: { $gte: 40 } }).sort({ marks: 'desc' }).populate("studentObjId").select('-_id -studentObjId._id');
    res.send(markList);
};

// return the average age of students using agregation pipeline
exports._average = async function (req, res) {
    var sub = req.body.subject
    var max = req.body.max_mark
    var min = req.body.min_mark
    try{
        const students = await Marks.aggregate([{
            $lookup: {
                from: "students",
                let: { sub: "$sub", min: "$min", max: "$max", id: "$studentId" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$subject", "$$sub"] },
                                        { $eq: ["$studentId", "$$id"] },
                                        { $gte: ["$marks", "$$min"] },
                                        { $lte: ["$marks", "$$max"] }
                                    ]
                            }
                        }
                    },
                    { $project: { name: 0, _id: 0, phoneNumber: 0, "ages.age": 0, studentId: 0 } }
                ],
                as: "data"
            },
        },
        { $unwind: "$data" },
        { $replaceRoot: { newRoot: "$data" } }
            , {
            $group: {
                _id: null,
                averageAge: {
                    $avg: "$age"
                }
            }
        }
        ])
        res.send(students);
    }catch(err){
        return handleError(err);
    }
};