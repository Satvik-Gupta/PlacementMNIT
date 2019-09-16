/*
    Controller written by - Pankaj tanwar
*/
angular.module('managementController', ['userServices'])

.controller('managementCtrl', function (user) {

    var app = this;

    app.loading = true;
    app.errorMsg = false;
    app.accessDenied = true;
    app.editAccess = false;
    app.deleteAccess = false;
    app.limit = 5;

    function getUsers()  {

        user.getUsers().then(function (data) {

            if(data.data.success) {
                if(data.data.permission === 'admin') {
                    app.users = data.data.users;
                    app.loading = false;
                    app.editAccess = true;
                    app.deleteAccess = true;
                } else {
                    app.errorMsg = 'Insufficient permission.';
                    app.loading = false;
                }


            } else {
                app.errorMsg = data.data.message;
                app.loading = false
            }
        });
    };
    // function to get all the users
    getUsers();

    app.showMore = function (number) {
        app.showMoreError = false;
        if(number > 0) {
            app.limit = number;
        } else {
            app.showMoreError = 'Please enter a valid number'
        }
    };

    app.showAll = function () {
        app.limit = undefined;
        app.showMoreError = false;
    };

    app.userDelete = function (username) {
        user.deleteUser(username).then(function (data) {
            if(data.data.success) {
                    getUsers();

            } else {
                app.showMoreError = data.data.message;
            }
        });
    }
})

.controller('editCtrl', function ($scope,user,$routeParams,$timeout) {

    var app = this;
    $scope.nameTab = 'active';
    app.namephase = true;
    app.usernamephase = false;
    app.emailphase = false;
    app.permissionphase = false;
    app.disabled = false;

    function getCurrentUser() {

        user.getUser($routeParams.id).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                $scope.newName = data.data.user.name;
                $scope.newUsername = data.data.user.username;
                $scope.newEmail = data.data.user.email;
                $scope.permission = data.data.user.permission;
            } else {
                app.errorMsg = data.data.message;
                app.disabled = true;
            }
        });

    }

    getCurrentUser();


    app.namePhase = function () {
        $scope.nameTab = 'active';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.permissionTab = 'default';
        app.namephase = true;
        app.usernamephase = false;
        app.emailphase = false;
        app.permissionphase = false;
    };

    app.usernamePhase = function () {
        $scope.usernameTab = 'active';
        $scope.emailTab = 'default';
        $scope.permissionTab = 'default';
        $scope.nameTab = 'default';
        app.namephase = false;
        app.usernamephase = true;
        app.emailphase = false;
        app.permissionphase = false;
    };

    app.emailPhase = function () {
        $scope.emailTab = 'active';
        $scope.usernameTab = 'default';
        $scope.permissionTab = 'default';
        $scope.nameTab = 'default';
        app.namephase = false;
        app.usernamephase = false;
        app.emailphase = true;
        app.permissionphase = false;
    };

    app.permissionPhase = function () {
        $scope.permissionTab = 'active';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.nameTab = 'default';
        app.namephase = false;
        app.usernamephase = false;
        app.emailphase = false;
        app.permissionphase = true;
    };

    app.updateName = function (newName) {
        //console.log(newName);
        userObj = {};
        userObj._id = $routeParams.id;
        userObj.name = newName;
        app.errorMsg = false;
        app.successMsg = false;

        //console.log(userObj);
        user.editUser(userObj).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = false;
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };

    app.updateUsername = function (newUsername) {

        userObj = {};
        userObj._id = $routeParams.id;
        userObj.username = newUsername;
        app.errorMsg = false;
        app.successMsg = false;

        //console.log(userObj);
        user.editUser(userObj).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = false;
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };

    app.updateEmail = function (newEmail) {
        //console.log(newEmail);
        userObj = {};
        userObj._id = $routeParams.id;
        userObj.email = newEmail;
        app.errorMsg = false;
        app.successMsg = false;

        //console.log(userObj);
        user.editUser(userObj).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = false;
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };

    app.updatePermission = function (permission) {

        userObj = {};
        userObj._id = $routeParams.id;
        userObj.permission = permission;
        app.errorMsg = false;
        app.successMsg = false;

        //console.log(userObj);
        user.editUser(userObj).then(function (data) {

            if(data.data.success) {
                getCurrentUser();
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = false;
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    }
})

.controller('editCompanyCtrl', function ($routeParams, user) {

    var app = this;

    user.getCompanyDetails($routeParams.company_id).then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.companyDetail = data.data.companyDetail;
            //console.log(app.companyDetail)
        }
    });
})

.controller('registeredStudentsCtrl', function ($routeParams, user,$scope) {
    var app = this;

    function totalRegisteredStudent() {

        app.registeredStudentsData = [];

        user.getRegisteredStudents($routeParams.company_id).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.studentsData = data.data.candidates;
                app.company_name = data.data.name;
                //console.log(app.studentsData);
                for(var i=0;i < app.studentsData.length;i++) {
                    user.getStudentDetailsByCollegeID(app.studentsData[i].college_id).then(function (data) {
                        console.log(data);
                        if(data.data.success) {
                            app.registeredStudentsData.push(data.data.user);
                        }
                    })
                }
            }
        });
    }

    totalRegisteredStudent();

    $scope.withdrawRegistration = function (college_id) {
        console.log(college_id);

        user.withdrawRegistration(college_id,$routeParams.company_id).then(function (data) {
            console.log(data);
            if(data.data.success) {
                totalRegisteredStudent();
            }
        })
    }
})

.controller('studentsManagementCtrl', function ($scope, user) {
    var app = this;

    $scope.searchByID = function (studentID) {
        app.errorMsg = '';
        //console.log(studentID);
        app.searchingByID = false;
        user.searchByID($scope.studentID.toUpperCase()).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.studentData = data.data.user;
                app.searchingByID = true;
            } else {
                app.errorMsg = data.data.message;
            }
        })
    }

    app.updateProfile = function (studentData) {
        console.log(app.studentData);
        app.profileUpdateSuccessMsg = false;
        app.profileUpdateErrorMsg = false;

        user.updateStudentProfile(app.studentData).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.profileUpdateSuccessMsg = data.data.message;
            } else {
                app.profileUpdateErrorMsg = data.data.message;
            }
        })
    }
});

