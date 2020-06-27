from flask import Flask, jsonify, render_template, request,abort,make_response
import threading
import time
# import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Magic_skills = ["Alchemy","Animation","Conjuror","Disintegration","Elemental","Healing","Illusion","Immortality",
# "Invisibility","Invulnerability","Necromancer","Omnipresent","Omniscient","Poison","Possession","Self-detonation",
# "Summoning","Water breathing"]

# Courses_list = ["Alchemy basics","Magic day-to-day life","Magic medical professionals","Dating magic"]

def time_now():
    x = time.localtime()
    current_date = f'{x.tm_hour}hr : {x.tm_min}min  on {x.tm_mday}/{x.tm_mon}/{x.tm_year}'
    return current_date


students = [


    ]



@app.route('/')
@app.route('/home')
@cross_origin()
def index():
    return render_template('Hogwarts.html')


@app.route('/Hogwarts/api/v1.0/students', methods=['GET'])
def get_students():
    if len(students) == 0:
        abort(400)
    return jsonify(students)


@app.route('/Hogwarts/api/v1.0/students/get_student', methods=['GET'])
def get_student():
    if not 'Fname' in request.args or not 'Lname' in request.args:
        abort(400)
    else:
        Fname = request.args.get('Fname')
        Lname = request.args.get('Lname')
        
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)]
    if len(student) == 0:
        abort(400)
    return jsonify(student)


@app.route('/Hogwarts/api/v1.0/students/add_student', methods=['POST'])
def add_student():
    if not checkStudentExist():
        fname = request.form.get('Fname'),
        lname = request.form.get('Lname'),
        if fname[0]=='' or lname[0] =='':
            abort(400)
        else:
            magic_skill = request.form.get('Magic_skill',''),
            magic_skills_level = request.form.get('Magic_skill_lvl',''),
            desired_magic_skill = request.form.get('Desired_Magic_skill',''),
            desired_magic_level = request.form.get('Desired_Magic_skill_lvl',''),
            course = request.form.get('Interested_in_course', ''),
            if len(students)==0:
                id = 1
            else: 
                id = students[-1]['id'] + 1
            student = {
                'magic_skills':[],
                'desired_magic_skills':[],
                'interested_in_course':[],
                'id': id,
                'fname': fname[0],
                'lname': lname[0],
                'creation_time': time_now(),
                
                 }
            
        if magic_skill[0] != '' and magic_skills_level[0] != '':
            student['magic_skills'].append({magic_skill[0]:magic_skills_level[0]})

        if desired_magic_skill[0] != '' and desired_magic_level[0] != '':
            student['desired_magic_skills'].append({desired_magic_skill[0]: desired_magic_level[0]})
        if course[0] != '':
            student['interested_in_course'].append(course[0]),
        students.append(student)
    # return jsonify({'student': student}), 201
        return jsonify(200)
    else:
         abort(400)
        
    
    
# def search(name, people):
#     return [element for element in people if element['name'] == name]  
def search_dictionaries(key, value, list_of_dictionaries):
    return [element for element in list_of_dictionaries if element[key] == value]

def get_key_value(arr, tocheck):
    for skill in arr: # this the skill -- {'Conjuror': '1'}
        for i in skill:
            if i == tocheck:
                return i, skill[i] # key , value    
    return '',''


@app.route('/Hogwarts/api/v1.0/students/update', methods=['PUT'])
def update_student():
    # if not request.json:
    #     abort(400)
    if not 'Fname' in request.form or not 'Lname' in request.form:
        abort(400)
    else:
        Fname = request.form.get('Fname')
        print(Fname)
        Lname = request.form.get('Lname')
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)][0]
    if len(student) == 0:
        abort(400)


    if 'Magic_skill' in request.form and 'Magic_skill_lvl' in request.form:
        magic_skill = request.form.get('Magic_skill','')
        magic_skill_level = request.form.get('Magic_skill_lvl','')
        if magic_skill and magic_skill_level:
            k, v = get_key_value(student['magic_skills'], magic_skill)
        
            if len(k) == 0:
                student['magic_skills'].append({magic_skill:magic_skill_level})
            else:
                if v == magic_skill_level:
                    abort(404)
                else:
                    for i in range(len(student['magic_skills'])):
                        if student['magic_skills'][i].get(k) == v:
                            del student['magic_skills'][i]
                            student['magic_skills'].append({magic_skill:magic_skill_level})
                            break


    if 'Desired_Magic_skill' in request.form and 'Desired_Magic_skill_lvl' in request.form:
        desired_magic_skill = request.form.get('Desired_Magic_skill','')
        desired_magic_skill_level = request.form.get('Desired_Magic_skill_lvl','')
        if desired_magic_skill and desired_magic_skill_level:
            dk, dv = get_key_value(student['desired_magic_skills'], desired_magic_skill)
    
            if len(dk) == 0:
                student['desired_magic_skills'].append({desired_magic_skill:desired_magic_skill_level})
            else:
                if dv == desired_magic_skill_level:
                    abort(404)
                else:
                    for j in range(len(student['desired_magic_skills'])):
                        if student['desired_magic_skills'][j].get(dk) == dv:
                            del student['desired_magic_skills'][j]
                            student['desired_magic_skills'].append({desired_magic_skill:desired_magic_skill_level})
                            break
     
                    
    if 'Interested_in_course' in request.form:
        course = request.form.get('Interested_in_course', '')
        if course:
            cours = [cours for cours in student['interested_in_course'] if cours == course]
            if len(cours)==0:
                student['interested_in_course'].append(course)
            else:
                abort(404) 
    student['last_update'] = time_now()
    return jsonify(200)


@app.route('/Hogwarts/api/v1.0/students/delete', methods=['DELETE'])
def remove_student():
    if not 'Fname' in request.form or not 'Lname' in request.form:
        abort(400)
    else:
        Fname = request.form.get('Fname')
        Lname = request.form.get('Lname')
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)][0]
    if len(student) == 0:
        abort(404)

    for j in range(len(students)):
        if students[j] == student:
            del students[j]
            break 
    return jsonify(200)


@app.route('/Hogwarts/api/v1.0/students/deleteMskill', methods=['DELETE'])
def remove_magic_skill():
    if not 'Fname' in request.form or not 'Lname' in request.form:
        abort(400)
    else:
        Fname = request.form.get('Fname')
        Lname = request.form.get('Lname')
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)][0]
    if len(student) == 0:
        abort(404)
    if 'Magic_skill' in request.form:
        magic_skill = request.form.get('Magic_skill','')
    else:
        abort(404)
        
    dk, dv = get_key_value(student['magic_skills'], magic_skill)
    
    if len(dk) == 0:
            abort(404)
    else:
        for p in range(len(student['magic_skills'])):
            if student['magic_skills'][p].get(dk) == dv:# student['magic_skills'][i] is {'Alchemy': '1'}
                del student['magic_skills'][p]
                break
    return jsonify(200)

@app.route('/Hogwarts/api/v1.0/students/deleteDMskill', methods=['DELETE'])
def remove_desired_magic_skill():
    if not 'Fname' in request.form or not 'Lname' in request.form:
        abort(400)
    else:
        Fname = request.form.get('Fname')
        Lname = request.form.get('Lname')
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)][0]
    if len(student) == 0:
        abort(404)
    if 'Desired_Magic_skill' in request.form:
        desired_magic_skill = request.form.get('Desired_Magic_skill','')
    else:
        abort(404)
        
    dks, dvs = get_key_value(student['desired_magic_skills'], desired_magic_skill)
    
    if len(dks) == 0:
            abort(404)
    else:
        for p in range(len(student['desired_magic_skills'])):
            if student['desired_magic_skills'][p].get(dks) == dvs:# student['desired_magic_skill'][i] is {'Alchemy': '1'}
                del student['desired_magic_skills'][p]
                break
    return jsonify(200) 



@app.route('/Hogwarts/api/v1.0/students/deleteCourse', methods=['DELETE'])
def remove_course():
    if not 'Fname' in request.form or not 'Lname' in request.form:
        abort(400)
    else:
        Fname = request.form.get('Fname')
        Lname = request.form.get('Lname')
    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)][0]
    if len(student) == 0:
        abort(404)
    if 'Interested_in_course' in request.form:
        course = request.form.get('Interested_in_course', '')
        print(course)
        if course:
            cours = [cours for cours in student['interested_in_course'] if cours == course]
            for v in range(len(student['interested_in_course'])):
                if student['interested_in_course'][v] == cours[0]:
                    del student['interested_in_course'][v]
                    return jsonify(200)
    else:
        abort(404)
     


def checkStudentExist():
    if not request.form or not 'Fname' in request.form or not 'Lname' in request.form:
            abort(400)
    else:
        Fname = request.form.get('Fname')
        Lname = request.form.get('Lname')

    student = [student for student in students if (student['fname'] == Fname and student['lname'] == Lname)]
   
    if len(student) == 0:
        return False
    else:
        return True
        


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(403)
def not_found(error):
    return make_response(jsonify({'error': 'User exist'}), 403)


if __name__ == '__main__':
    app.run(debug=True)


