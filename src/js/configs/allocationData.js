// list_periods (справочник периодов оценки) 
// ============== 
// id 
// type (0 - month, 1 - quarter, 2 - year) 
// start_date (date/time) 
// finish_date (date/time) 
// ==============


const list_periods = [{
	'id': 1,
	'type': '',
	'start_date': '',
	'finish_date': ''
}]


// list_projects (Проекты) 
// ============== 
// ID 
// name 
// ============== 


// data_tasks (справочник задач) 
// ============== 
// id 
// name 
// project_id -> list_projects (К какому проекту относится) 
// user_id -> data_users (кому назначена) 
// ============== 


// data_task_evaluations (оценка по задачам) 
// ============== 
// id 
// alloc_id -> data_tasks_allocations (оценка за такой-то период) 
// planned_coplition (in percents) 
// planned_coplition_comment 
// actual_coplition (in percents) 
// actual_coplition_comment 
// weight (in percents) (вес задачи) 
// ==============


// data_people_allocations (какие люди аллоцированы на какие периоды) (many to many) 
// ============== 
// id 
// task_id -> data_tasks (задача) 
// pseriod_id -> list_periods (на какой пероидназначена) 
// person_id -> data_users (кого аллоцировали) 
// percent (процент) 
// ============== 


// data_tasks_allocations (какие задачи аллоцированы на какие периоды) (many to many) 
// ============== 
// id 
// task_id -> data_tasks (задача) 
// pseriod_id -> list_periods (на какой пероидназначена) 
// ============== 

export { list_periods }
