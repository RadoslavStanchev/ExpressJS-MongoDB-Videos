const Course = require('../models/Course');

const getAll = (search) => {
    if(search) {
        return Course
            .find({title: {$regex: search, $options: 'i'}})
            .sort({createdAt: 'desc'})
            .lean();

    } else {
        return Course
        .find({})
        .sort({createdAt: 'desc'})
        .lean();
    }
}

const getOne = (id, userId) => Course.findById(id)
    .then(course => {
        course.isEnrolled = course.usersEnrolled.includes(userId);
        course.isOwn = course.creator == userId;
        return course;
    })

const getTopThree = (size) => Course
    .find()
    .sort({usersEnrolled: -1})
    .limit(size)
    .lean()

const create = (courseData, userId) => {
    let course = new Course({ ...courseData, createdAt: new Date(), creator: userId });

    return course.save();
}

const enrollUser = (courseId, userId) => {
    return Course.findById(courseId)
        .then(course => {
            course.usersEnrolled.push(userId);

            return course.save();
        })
}

const deleteCourse = (courseId) => {
    return Course.deleteOne({_id: courseId});
}

const updateOne = (courseId, courseData) => {
    return Course.updateOne({_id: courseId}, courseData)
}


module.exports = {
    create,
    getOne,
    getAll,
    enrollUser,
    deleteCourse,
    getTopThree,
    updateOne,
}