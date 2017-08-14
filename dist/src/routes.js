"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes = [];
// router.post('/', registerUser(User))
// router.get('/whoami', whoAmI(User))
// router.post('/login', loginUser(User))
// router.post('/jobslist', addNewJobs(Job, User))
// router.post('/jobdelete', deleteJob(Job, User))
// router.post('/friendslist', addNewFriends(Friend, User))
// router.post('/frienddelete', deleteFriend(Friend, User))
// router.post('/relativelist', addNewRelatives(Relative, User))
// router.post('/relativedelete', deleteRelative(Relative, User))
// router.get('/jobslist', getJobList(Job, User))
// router.get('/friendslist', getFriendsList(Friend, User))
// router.get('/relativelist', getRelativesList(Relative, User))
exports.createSingleRouter = function (pathOrRegex, method, response, condition, responseError) {
    routes.push({ pathOrRegex: pathOrRegex, method: method, condition: condition, response: response, responseError: responseError });
};
exports.ceateManyRoutes = function () {
    return {
        add: function (pathOrRegex, method, condition, response, responseError) {
            routes.push({ pathOrRegex: pathOrRegex, method: method, response: response, condition: condition, responseError: responseError });
            return this;
        }
    };
};
//# sourceMappingURL=routes.js.map