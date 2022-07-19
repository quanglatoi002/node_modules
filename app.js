var courseApi = 'http://127.0.0.1:3000/posts'

function start(){
    getCourses(renderCourses);
    handleCreateForm()
}

start();


function getCourses(callback) {
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function handleGetCourse(id) {
    var option = {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
          },
    }
    fetch(courseApi + '/' + id, option)
        .then((responsive) => {{
            return responsive.json();
        }})
        .then(function(course){
            var inputName = document.querySelector('input[name="title"]')
            var inputAddress= document.querySelector('input[name="anthor"]')

            inputName.value = course.title
            inputAddress.value = course.anthor
            var createBtn = document.querySelector('#create')
            createBtn.onclick = function () {
                var data ={
                    name: inputName.value,
                    address: inputAddress.value
                }
                handleEditCourse(id, data)
            }
        })
}

function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handledeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
           var courseItem = document.querySelector('.course-item-'+ id);
           if(courseItem){
               courseItem.remove();
           }
        });
}

function handleEditCourse(id, data, rederCourse) {
    console.log(data)
    var option = {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, option)
        .then((responsive) => {{
            return responsive.json();
        }})
        .then(function(){
            getCourses(rederCourse)
        })
}


function renderCourses(courses) {
    var listCouresBlock = 
        document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}"> 
                <h4> ${course.title} </h4>
                <p> ${course.anthor} </p>
                <button onclick="handledeleteCourse(${course.id})"> Xóa </button>
                <button onclick="handleUpdateCourse(${course.id})"> Lưu </button>
            
            </li>
        `;
    });
    listCouresBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function(){
        var title = document.querySelector('input[name="title"]').value;
        var anthor = document.querySelector('input[name="anthor"]').value;
        var formData = {
            title: title,
            anthor: anthor
        };
        createCourse(formData, function(){
            getCourses(renderCourses);
        });
    }
}