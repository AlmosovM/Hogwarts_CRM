
// $(".form-control").prop('disabled', false);

$("#addStudent").click(function () {
    $("#resonse_data").empty();
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    var Magic_skill = $("#magicskill").val();
    var Magic_skill_lvl = $("#mlevels").val();
    var Desired_Magic_skill = $("#dskills").val();
    var Desired_Magic_skill_lvl = $("#dmlevels").val();
    var Interested_in_course = $("#courses").val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");


    $('input[type="text"]').val('');
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/add_student",
        data: {
            Fname: Fname,
            Lname: Lname,
            Magic_skill: Magic_skill,
            Magic_skill_lvl: Magic_skill_lvl,
            Desired_Magic_skill: Desired_Magic_skill,
            Desired_Magic_skill_lvl: Desired_Magic_skill_lvl,
            Interested_in_course: Interested_in_course

        },
        dataType: "json",

        success: function (responsemsg) {

            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_add = "Student " + Fname + " " + Lname + " added to students list successfully"
                student_unit.append(response_of_add)
                $('#resonse_data').append(student_unit);

            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_add = "Student " + Fname + " " + Lname + " fail to be added to students list - student alreadyon the list or no First and Last name provided"
            student_unit.append(response_of_add)
            $('#resonse_data').append(student_unit);
        },
    });
}
)

// GET ALL STUDENTS
$("#getAllStudents").click(function () {
    $("#resonse_data").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students",
        dataType: "json",
        success: function (responsemsg) {

            for (let student of responsemsg) {
                var student_unit = $('<div/>')

                var user_data2 = [
                    student.magic_skills, student.desired_magic_skills
                ]

                var user_data3 = [
                    student.interested_in_course,
                ]

                var list1 = $("<ul/>");

                var student_id = $('<div>', { 'class': 'skills' })
                student_id.append("Student ID: " + student.id)

                var listitem_fname = $("<li/>");
                listitem_fname.text("Student First Name: " + student.fname);
                list1.append(listitem_fname)
                var listitem_lname = $("<li/>");
                listitem_lname.text("Student Last Name: " + student.lname);
                list1.append(listitem_lname)
                var listitem_creation_time = $("<li/>");
                listitem_creation_time.text("Student Account created at: " + student.creation_time);
                list1.append(listitem_creation_time)

                if (student.last_update) {
                    var listitem_last_update = $("<li/>");
                    listitem_last_update.text("Student Account last update: " + student.last_update);
                    list1.append(listitem_last_update)
                }

                var mskills = $('<div>', { 'class': 'skills' })
                mskills.append("Magic skills: ")
                var dmskills = $('<div>', { 'class': 'skills' })
                dmskills.append("Desired Magic skills: ")
                var interested_courses = $('<div>', { 'class': 'skills' })
                interested_courses.append("Interested in next courses: ")


                var list2 = $("<ul/>");

                for (let j = 0; j < user_data2.length; j++) {
                    if (j == 0) {
                        list2.append(mskills)
                    }
                    else { list2.append(dmskills) }

                    if (user_data2[j].length > 0) {
                        for (let m = 0; m < user_data2[j].length; m++) { // user_data2[j] - array of dictionaries - [{'Alchemy':'1'}, {'Animation':'2'}, {'Conjuror':'3'}]
                            for (var key in user_data2[j][m]) {
                                var listitem = $("<li/>");
                                listitem.text(key + " : " + user_data2[j][m][key]);
                                list2.append(listitem);
                            }
                        }
                    }
                    else {
                        var listitem = $("<li/>");
                        listitem.text("No skills");
                        list2.append(listitem);
                    }
                    list1.append(list2)
                }

                var list3 = $("<ul/>");
                list1.append(interested_courses)
                for (let j = 0; j < user_data3.length; j++) {
                    if (user_data3[j] != '') {
                        var listitem = $("<li/>");
                        listitem.text(user_data3[j]);
                        list3.append(listitem);
                    }
                    else {
                        var listitem = $("<li/>");
                        listitem.text("No Courses are choosen");
                        list3.append(listitem);
                    }

                }
                list1.append(list3)

                student_unit.append(student_id)
                student_unit.append(list1)
                $('#resonse_data').append(student_unit);
            }
        },
        error: function () {

            var student_unit = $('<div/>')
            var response_of_gets = "Fail to get students list"
            student_unit.append(response_of_gets)
            $('#resonse_data').append(student_unit);

        },
    });
})



$("#getStudent").click(function () {
    $("#resonse_data").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/get_student",
        data: {
            Fname: $('#Fname').val(),
            Lname: $('#Lname').val()
        },
        dataType: "json",
        success: function (responsemsg) {
            student = responsemsg[0]
            var student_unit = $('<div/>')

            var user_data2 = [
                student.magic_skills, student.desired_magic_skills
            ]

            var user_data3 = [
                student.interested_in_course,
            ]

            var list1 = $("<ul/>");

            var student_id = $('<div>', { 'class': 'skills' })
            student_id.append("Student ID: " + student.id)

            var listitem_fname = $("<li/>");
            listitem_fname.text("Student First Name: " + student.fname);
            list1.append(listitem_fname)
            var listitem_lname = $("<li/>");
            listitem_lname.text("Student Last Name: " + student.lname);
            list1.append(listitem_lname)
            var listitem_creation_time = $("<li/>");
            listitem_creation_time.text("Student Account created at: " + student.creation_time);
            list1.append(listitem_creation_time)
            if (student.last_update) {
                var listitem_last_update = $("<li/>");
                listitem_last_update.text("Student Account last update: " + student.last_update);
                list1.append(listitem_last_update)
            }

            var mskills = $('<div>', { 'class': 'skills' })
            mskills.append("Magic skills: ")
            var dmskills = $('<div>', { 'class': 'skills' })
            dmskills.append("Desired Magic skills: ")
            var interested_courses = $('<div>', { 'class': 'skills' })
            interested_courses.append("Interested in next courses: ")


            var list2 = $("<ul/>");

            for (let j = 0; j < user_data2.length; j++) {
                if (j == 0) {
                    list2.append(mskills)
                }
                else { list2.append(dmskills) }
                if (user_data2[j].length > 0) {
                    for (m = 0; m < user_data2[j].length; m++) {
                        for (var key in user_data2[j][m]) {
                            var listitem = $("<li/>");
                            listitem.text(key + " : " + user_data2[j][m][key]);
                            list2.append(listitem);
                        };
                    }
                }
                else {
                    var listitem = $("<li/>");
                    listitem.text("No skills");
                    list2.append(listitem);
                }
                list1.append(list2)
            }

            var list3 = $("<ul/>");
            list1.append(interested_courses)
            for (let j = 0; j < user_data3.length; j++) {
                if (user_data3[j] != '') {
                    var listitem = $("<li/>");
                    listitem.text(user_data3[j]);
                    list3.append(listitem);
                }
                else {
                    var listitem = $("<li/>");
                    listitem.text("No Courses are choosen");
                    list3.append(listitem);
                }
            }
            list1.append(list3)
            student_unit.append(student_id)
            student_unit.append(list1)
            $('#resonse_data').append(student_unit);

        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_get = "Fail to get student data - probably no First and Second name provided or student not on the students list"
            student_unit.append(response_of_get)
            $('#resonse_data').append(student_unit);
        }

    });
    $('input[type="text"]').val('');
})

// $('[name = mlevel]').click(function () { this.value = "" });

$("#updateStudent").click(function () {
    $("#resonse_data").empty();
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    var Magic_skill = $("#magicskill").val();
    var Magic_skill_lvl = $("#mlevels").val();
    var Desired_Magic_skill = $("#dskills").val();
    var Desired_Magic_skill_lvl = $("#dmlevels").val();
    var Interested_in_course = $("#courses").val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");
    $('input[type="text"]').val('');
    $.ajax({
        type: "PUT",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/update",
        data: {
            Fname: Fname,
            Lname: Lname,
            Magic_skill: Magic_skill,
            Magic_skill_lvl: Magic_skill_lvl,
            Desired_Magic_skill: Desired_Magic_skill,
            Desired_Magic_skill_lvl: Desired_Magic_skill_lvl,
            Interested_in_course: Interested_in_course,
        },
        dataType: "json",
        success: function (responsemsg) {
            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_update = "Student " + Fname + " " + Lname + " data updated successfully"
                student_unit.append(response_of_update)
                $('#resonse_data').append(student_unit);
            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_update = "Fail to update"
            student_unit.append(response_of_update)
            $('#resonse_data').append(student_unit);

        },
    });
})

$("#deleteStudent").click(function () {
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    $("#resonse_data").empty();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");

    $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/delete",
        data: {
            Fname: Fname,
            Lname: Lname,
        },
        dataType: "json",
        success: function (responsemsg) {
            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_del = "Student " + Fname + " " + Lname + " removed from students list successfully"
                student_unit.append(response_of_del)

                $('#resonse_data').append(student_unit);

            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_del = "Student fail to be removed from students list"
            student_unit.append(response_of_del)
            $('#resonse_data').append(student_unit);

        },
    });
    $('input[type="text"]').val('');
})

$("#RemoveMskill").click(function () {
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    $("#resonse_data").empty();
    var Magic_skill = $("#magicskill").val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");

    $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/deleteMskill",
        data: {
            Fname: Fname,
            Lname: Lname,
            Magic_skill: Magic_skill,
        },
        dataType: "json",
        success: function (responsemsg) {
            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_rem = "Student " + Fname + " " + Lname + " Magic skill: " + Magic_skill + " removed successfully"
                student_unit.append(response_of_rem)

                $('#resonse_data').append(student_unit);

            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_rem = "Magic skill fail to be removed"
            student_unit.append(response_of_rem)
            $('#resonse_data').append(student_unit);

        },
    });
    $('input[type="text"]').val('');
})

$("#RemoveDMskill").click(function () {
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    $("#resonse_data").empty();
    var Desired_Magic_skill = $("#dskills").val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");

    $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/deleteDMskill",
        data: {
            Fname: Fname,
            Lname: Lname,
            Desired_Magic_skill: Desired_Magic_skill,
        },
        dataType: "json",
        success: function (responsemsg) {
            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_remd = "Student " + Fname + " " + Lname + " Desired Magic skill: " + Desired_Magic_skill + " removed successfully"
                student_unit.append(response_of_remd)
                $('#resonse_data').append(student_unit);

            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_remd = "Desired Magic skill fail to be removed"
            student_unit.append(response_of_remd)
            $('#resonse_data').append(student_unit);
        },
    });
    $('input[type="text"]').val('');
})


$("#RemoveCourse").click(function () {
    var Fname = $('#Fname').val();
    var Lname = $('#Lname').val();
    $("#resonse_data").empty();
    var Interested_in_course = $("#courses").val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");


    $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/deleteCourse",
        data: {
            Fname: Fname,
            Lname: Lname,
            Interested_in_course: Interested_in_course,
        },
        dataType: "json",
        success: function (responsemsg) {
            if (responsemsg == 200) {
                var student_unit = $('<div/>')
                var response_of_crs = "Student " + Fname + " " + Lname + " Course: " + Interested_in_course + " removed successfully"
                student_unit.append(response_of_crs)
                $('#resonse_data').append(student_unit);

            }
        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_crs = "Course fail to be removed"
            student_unit.append(response_of_crs)
            $('#resonse_data').append(student_unit);

        },
    });
    $('input[type="text"]').val('');
})


// def get_key_value(arr, tocheck):
//     for skill in arr: # this the skill -- {'Conjuror': '1'}
//         for i in skill:
//             if i == tocheck:
//                 return i, skill[i] # key , value    

google.charts.load('current', { 'packages': ['corechart'] })


//google.charts.load("current", { packages: ['corechart'] });


$("#student_pie").click(function () {
    $("#resonse_data").empty();
    Fname = $('#Fname').val();
    Lname = $('#Lname').val();
    $("#magicskill").val("");
    $("#mlevels").val("");
    $("#dskills").val("");
    $("#dmlevels").val("");
    $("#courses").val("");

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students/get_student",
        data: {
            Fname: Fname,
            Lname: Lname
        },
        dataType: "json",
        success: function (responsemsg) {
            student = responsemsg[0]
            var user_data1 = [['skills', 'level']]
            for (let skill of student.magic_skills) {
                let item = []
                let key = Object.keys(skill)[0]
                let val = parseInt(skill[key])
                item.push('Magic skill: ' + key)
                item.push(val)
                user_data1.push(item)
            }

            for (let skill of student.desired_magic_skills) {
                let item = []
                let key = Object.keys(skill)[0]
                let val = parseInt(skill[key])
                item.push('Desired skill: ' + key)
                item.push(val)
                user_data1.push(item)
            }
            for (let g of user_data1) {
                console.log(g)
            }

            var data = google.visualization.arrayToDataTable(user_data1)

            var options = {
                title: "Student " + Fname + " " + Lname + " skills and their level",
                titleFontSize: 15,
                titlePosition: 'center',
                width: 550,
                height: 500,
                pieSliceText: 'value',
                legend: { position: 'right', alignment: 'center' },
            };

            var chart = new google.visualization.PieChart(document.getElementById('resonse_data'));

            chart.draw(data, options);

        },
        error: function () {
            var student_unit = $('<div/>')
            var response_of_get = "Fail to get student data - probably no First and Second name or student not on the students list"
            student_unit.append(response_of_get)
            $('#resonse_data').append(student_unit);
        }

    });
    $('input[type="text"]').val('');
})


$("#students_dash").click(function () {
    $("#resonse_data").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/Hogwarts/api/v1.0/students",
        dataType: "json",
        success: function (responsemsg) {
            var colors = ["silver", "gold", "green", "red", "grey", "yellow", "blue", "white", "pink", "#b87333", "#e5e4e2", "orange"];
            var month_arr = [{ 'January': 0 }, { 'February': 0 }, { 'Marth': 0 }, { 'April': 0 }, { 'May': 0 }, { 'June': 0 }, { 'July': 0 }, { 'August': 0 },
            { 'September': 0 }, { 'October': 0 }, { 'Novemebr': 0 }, { 'December': 0 },
            ]

            for (let student of responsemsg) {
                var ctime = student.creation_time;
                var res = ctime.split("on ");
                res_data = res[1].split('/');

                creation_month = parseInt(res_data[1]);


                switch (creation_month) {
                    case 1:
                        month_arr[0]['January'] += 1;
                        break;
                    case 2:
                        month_arr[1]['February'] += 1
                        break;
                    case 3:
                        month_arr[2]['Marth'] += 1
                        break;
                    case 4:
                        month_arr[3]['April'] += 1;
                        break;
                    case 5:
                        month_arr[4]['May'] += 1
                        break;
                    case 6:
                        month_arr[5]['June'] += 1
                        break;
                    case 7:
                        month_arr[6]['July'] += 1;
                        break;
                    case 8:
                        month_arr[7]['August'] += 1
                        break;
                    case 9:
                        month_arr[8]['September'] += 1
                        break;
                    case 10:
                        month_arr[9]['October'] += 1;
                        break;
                    case 11:
                        month_arr[10]['Novemebr'] += 1
                        break;
                    case 12:
                        month_arr[11]['December'] += 1
                        break;

                }
            }
            var data_arr = [["Element", "Density", { role: "style" }]]
            for (var el = 0; el < month_arr.length; el++) {

                console.log('jjjjjjjjjjjj')
                for (var i in month_arr[el]) {
                    let arr_el = []
                    let key = i; //  key
                    let val = month_arr[el][i]; //key's value
                    arr_el.push(key)
                    arr_el.push(val)
                    arr_el.push(colors[el])
                    data_arr.push(arr_el)


                }
            }

            var data = google.visualization.arrayToDataTable(data_arr)
            // var data = google.visualization.arrayToDataTable([
            //     ["Element", "Density", { role: "style" }],
            //     ["Copper", 8.94, "#b87333"],
            //     ["Silver", 10.49, "silver"],
            //     ["Gold", 19.30, "gold"],
            //     ["Platinum", 21.45, "color: #e5e4e2"]
            // ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "Students added per month",
                titleFontSize: 20,
                titlePosition: 'center',
                width: 550,
                height: 400,
                bar: { groupWidth: "75%" },
                legend: { position: "none" },
                vAxis: { title: 'Number of students added', format: '0' },

                hAxis: { title: 'Month', ticks: [0, 4, 8] },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById("resonse_data"));
            chart.draw(view, options);
        },
        error: function () {

            var student_unit = $('<div/>')
            var response_of_gets = "Fail to get students list"
            student_unit.append(response_of_gets)
            $('#resonse_data').append(student_unit);

        },
    });
})