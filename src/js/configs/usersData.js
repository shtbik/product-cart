// СОТРУДНИКИ

// ID
// first_name
// last_name
// middle_name
// email
// position -> list_positions (должность)
// department_id -> list_departments (отдел)
// password
const data_users = [{
	'first_name': 'Виктория',
	'last_name': 'Арабина',
	'middle_name': 'Васильевна',
	'email': 'vvarabina@dasreda.ru',
	'position': 1,
	'department_id': 1,
	'grades_id': null,
	'password': 'bp7L3za1',
	'photo_url': null
}, {
	'first_name': 'Екатерина',
	'last_name': 'Барышева',
	'middle_name': 'Сергеевна',
	'email': 'esbarysheva@dasreda.ru',
	'position': 2,
	'department_id': 1,
	'grades_id': null,
	'password': 'RgBgvEBF',
	'photo_url': null
}, {
	'first_name': 'Елена',
	'last_name': 'Бачинина',
	'middle_name': 'Валерьевна',
	'email': 'evbachinina@dasreda.ru',
	'position': 3,
	'department_id': 2,
	'grades_id': null,
	'password': 'rd4Y0Cx3',
	'photo_url': null
}, {
	'first_name': 'Ольга',
	'last_name': 'Беленко',
	'middle_name': 'Петровна',
	'email': 'opbelenko@dasreda.ru',
	'position': 4,
	'department_id': 3,
	'grades_id': null,
	'password': '53tP9Wsq',
	'photo_url': null
}, {
	'first_name': 'Иван',
	'last_name': 'Буртник',
	'middle_name': 'Степанович',
	'email': 'isburtnik@dasreda.ru',
	'position': 5,
	'department_id': null,
	'grades_id': null,
	'password': '3fvrNVle',
	'photo_url': null
}, {
	'first_name': 'Александр',
	'last_name': 'Волченков',
	'middle_name': 'Сергеевич',
	'email': 'asvolchenkov@dasreda.ru',
	'position': 6,
	'department_id': 4,
	'grades_id': null,
	'password': 'XPAd5M1N',
	'photo_url': null
}]


// ДОЛЖНОСТИ

// ID
// name
const list_positions = [{
	'id': 1,
	'name': 'Директор проектов'
}, {
	'id': 2,
	'name': 'Менеджер проекта'
}, {
	'id': 3,
	'name': 'Главный специалист'
}, {
	'id': 4,
	'name': 'Главный бухгалтер'
}, {
	'id': 5,
	'name': 'Первый заместитель генерального директора'
}, {
	'id': 6,
	'name': 'Старший разработчик программного обеспечения'
}, {
	'id': 7,
	'name': 'Разработчик программного обеспечения'
}, {
	'id': 8,
	'name': 'Директор проекта'
}, {
	'id': 9,
	'name': 'Секретарь'
}, {
	'id': 10,
	'name': 'Директор по маркетингу и коммуникациям'
}, {
	'id': 11,
	'name': 'Ведущий системный администратор'
}, {
	'id': 12,
	'name': 'Специалист по закупкам'
}, {
	'id': 13,
	'name': 'Руководитель направления'
}, {
	'id': 14,
	'name': 'Главный юрист'
}, {
	'id': 15,
	'name': 'Ведущий системный архитектор'
}, {
	'id': 16,
	'name': 'Графический дизайнер'
}, {
	'id': 17,
	'name': 'Аналитик'
}, {
	'id': 18,
	'name': 'Руководитель проекта'
}, {
	'id': 19,
	'name': 'Директор по безопасности'
}, {
	'id': 20,
	'name': 'Ведущий менеджер по персоналу'
}, {
	'id': 21,
	'name': 'Финансовый контролер'
}, {
	'id': 22,
	'name': 'Сервис-менеджер'
}, {
	'id': 23,
	'name': 'Менеджер по работе с партнерами'
}, {
	'id': 24,
	'name': 'Ведущий менеджер по работе с партнерами'
}, {
	'id': 25,
	'name': 'Менеджер'
}, {
	'id': 26,
	'name': 'Менеджер по маркетингу'
}, {
	'id': 27,
	'name': 'Финансовый директор'
}, {
	'id': 28,
	'name': 'Директор ИТ'
}, {
	'id': 29,
	'name': 'Редактор'
}, {
	'id': 30,
	'name': 'Генеральный директор'
}, {
	'id': 31,
	'name': 'Менеджер по коммуникациям'
}, {
	'id': 32,
	'name': 'Верстальщик'
}, {
	'id': 32,
	'name': 'Ведущий менеджер'
}]


// ОТДЕЛЫ

// ID
// name (varchar) (Название отдела)
// manager_id -> data_users (Начальник отдела)
// parent_department_id -> list_departments (Ссылка на отдел, который стоит над данным отделом)
const list_departments = [{
	'id': 1,
	'name': 'Дирекция партнерских программ',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 2,
	'name': 'Административная группа',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 3,
	'name': 'Финансовая служба',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 4,
	'name': 'Дирекция ИТ-разработок и эксплуатации',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 5,
	'name': 'Дирекция перспективных проектов',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 6,
	'name': 'Дирекция продуктов и сервисов',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 7,
	'name': 'Юридическая служба',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 8,
	'name': 'Дирекция образовательных программ',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 9,
	'name': 'Дирекция по маркетингу и коммуникациям',
	'manager_id': null,
	'parent_department_id': null
}, {
	'id': 10,
	'name': 'Группа по работе с персоналом',
	'manager_id': null,
	'parent_department_id': null
}]


export { data_users, list_positions, list_departments }
