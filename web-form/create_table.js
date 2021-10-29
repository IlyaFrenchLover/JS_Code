document.addEventListener('DOMContentLoaded', function() {

    const count = 4;

    let objectsStudetns = [{
        firstName: 'Артем',
        surname: 'Гринблат',
        fatherName: 'Андреевич',
        birthDate: new Date(1998, 2, 28),
        firstYear: 2020,
        department: 'Факультет информатики'
    },
    {
        firstName: 'Георгий',
        surname: 'Долбин',
        fatherName: 'Львович',
        birthDate: new Date(1996, 6, 26),
        firstYear: 2019,
        department: 'Факультет иностранных языков'
    },
    {
        firstName: 'Леонид',
        surname: 'Смолов',
        fatherName: 'Егорович',
        birthDate: new Date(1996, 6, 11),
        firstYear: 2019,
        department: 'Факультет математики'
    },
    {
        firstName: 'Дмитрий',
        surname: 'Петряхин',
        fatherName: 'Алексеевич',
        birthDate: new Date(1975, 7, 1),
        firstYear: 2019,
        department: 'Факультет биологии'
    },
    {
        firstName: 'Дмитрий',
        surname: 'Осипов',
        fatherName: 'Георгиевич',
        birthDate: new Date(1975, 7, 1),
        firstYear: 2017,
        department: 'Факультет биологии'
    },
    {
        firstName: 'Дмитрий',
        surname: 'Осипов',
        fatherName: 'Георгиевич',
        birthDate: new Date(1975, 7, 1),
        firstYear: 2016,
        department: 'Факультет биологии'
    }

];

    function createInputForm() {//тут мы создаем форму для ввода данных
        let form = document.createElement('form');
        let inpuFirstName = document.createElement('input');
        let inputSurname = document.createElement('input');
        let inpuFatherName = document.createElement('input');
        let inputDepartment = document.createElement('input');
        let inputBirthDate = document.createElement('input');
        let inputFirstYear = document.createElement('input');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        button.textContent = 'Добавить студента';

        inpuFirstName.classList.add('form-control');
        inpuFirstName.placeholder =  'Введите имя';

        inputSurname.classList.add('form-control');
        inputSurname.placeholder =  'Введите фамилию';

        inpuFatherName.classList.add('form-control');
        inpuFatherName.placeholder =  'Введите отчество';

        inputDepartment.classList.add('form-control');
        inputDepartment.placeholder = 'Введите факульет';

        inputBirthDate.classList.add('form-control');
        //inputBirthDate.placeholder = 'Введите дату рождения';
        inputBirthDate.type = 'date';

        inputFirstYear.classList.add('form-control');
        inputFirstYear.placeholder = 'Введите год начала обучения';

        document.body.append(form);

        form.append(inputSurname);
        form.append(inpuFirstName);
        form.append(inpuFatherName);
        form.append(inputBirthDate);
        form.append(inputFirstYear);
        form.append(inputDepartment);

        form.append(button);

        return {
            form,
            inputSurname,
            inpuFirstName,
            inpuFatherName,
            inputBirthDate,
            inputFirstYear,
            inputDepartment,
            button
        }
    }

    let inputForm = createInputForm();//а здесь мы ее запускаем

    let arr = [];

    //создание таблицы и ее подразделов

    let table = document.createElement('table');
    document.body.append(table);

    let thead = document.createElement('thead');
    table.append(thead);

    let tr = document.createElement('tr');
    thead.append(tr);

    let tbody = document.createElement('tbody');
    table.append(tbody);

    //let headers = ['ФИО', 'Факульет', 'Дата рождения', 'Год обучения'];

    let th = [];

    let td = [];
    
    //тут мы делаем заголовки со встроенными кнопками
    for(let i = 0; i < count; i++) {
        th[i] = document.createElement('th');
        tr.append(th[i]);
        let button = document.createElement('button');
        th[i].append(button);
        let headers = ['ФИО', 'Факульет', 'Дата рождения', 'Год обучения'];
        button.textContent = headers[i];

        /*th[i].addEventListener('click', function() {
            let sortedRows = Array.from(table.rows)
            .slice(i)
            .sort((rowA, rowB) => rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1);
            table.tBodies[i].append(...sortedRows);
        });*/
    }

    const headers = table.querySelectorAll('th');//а тут мы их получаем в массив для дальнейшей работы с ними

    headers.forEach(function(header, index) {
        header.addEventListener('click', function() {
            sortTable(table, index);//функция сортировки
        });
    });//этот цикл встраивает сортировку в нажатие кнопки

    function sortTable(table, index) {
        const tableBody = table.querySelector('tbody');
        const rows = tableBody.querySelectorAll('tr');

        const newRows = Array.from(rows);//клонирование записей таблицы

        let min = newRows[0].querySelectorAll('td')[index].innerHTML;
        
        newRows.forEach(function(newRow, i){

            let element = newRow.querySelectorAll('td')[index].innerHTML;
            
            if(element < min) {
                newRows.splice(i, 1, newRows.splice(0, 1, newRows[i])[0]);
            }
        });//в этом цикле мы непосредственно сортируем записи; критерий сортировки зависит от индекса; индекс зависит от нажатой кнопки

        //newsRows.sort();

        /*switch (index) {
            case 0: newRows.sort();
            case 1: newRows.sort();
        }*/

        rows.forEach(function(row) {
            tableBody.removeChild(row);
        });//в этом цикле мы удаляем из таблицы старые неотсортированные записи

        newRows.forEach(function(newRow) {
            tableBody.appendChild(newRow);
        });//а здесь мы вставляем в таблицу новые отсортированные записи
    }

    //эта функция добавляет запись в таблицу по нажатию кнопки
    function addElement() {
        let dateArr = String(inputForm.inputBirthDate.value).split('-');

        let student = {
            firstName: inputForm.inpuFirstName.value.trim(),
            surname: inputForm.inputSurname.value.trim(),
            fatherName: inputForm.inpuFatherName.value.trim(),
            birthDate: new Date(dateArr[0], dateArr[1], dateArr[2]),
            firstYear: inputForm.inputFirstYear.value.trim(),
            department: inputForm.inputDepartment.value.trim()
        };

        objectsStudetns.push(student);

        let tr2 = document.createElement('tr');

        for(let i = 0; i < count; i++) {
            tbody.append(tr2)

            td[i] = document.createElement('td');
            tr2.append(td[i]);
            /*td[i].append(student[i].value);
            for(let j = 0; j < count; j++) {
                td[i] = document.createElement('td');
                tr.append(td[i]);
                td[i].append(arr[i][j].value);
            }*/
        }

        let dateCurrent = new Date();

        //console.log(student.birthDate);
        //console.log(dateCurrent);

        let studentLastYear = Number(student.firstYear) + 4;

        /*for(let i = 0; i < count; i++) {
            console.log(td[i]);
        }*/

        if(student.birthDate < new Date(1900, 1, 1) || student.birthDate > dateCurrent) {
            console.log('Некорректная дата рождения');
        } else if(student.firstYear < 2000 || student.firstYear > dateCurrent.getFullYear()) {
            console.log('Некорректный год начала обучения');
        } else {
            td[0].append(student.surname + " " + student.firstName + " " + student.fatherName);
            td[1].append(student.department);
            td[2].append(student.birthDate.getDay() + '.' + student.birthDate.getMonth() + '.' + student.birthDate.getFullYear() + 
            ' (' + Number(dateCurrent.getFullYear() - student.birthDate.getFullYear()) + ' лет)');
            if(Number(dateCurrent.getFullYear() - student.firstYear) <= 4) {
                td[3].append(student.firstYear + '-' + studentLastYear + ' (' + Number(dateCurrent.getFullYear() - 
                student.firstYear) + ' курс)');
            } else {
                td[3].append(student.firstYear + '-' + studentLastYear + '(закончил)');
            }

            inputForm.form.reset();
        }

    }

    inputForm.form.addEventListener('submit', function(e) {
        e.preventDefault();

        addElement();
    }); 
});