import _ from 'lodash'

function required(values, data) {
	const errors = {}
	// в этой схеме есть баг, когда пользователь удаляет значение из поля, оно уже не попадает в проверяемый мною массив
	const errorArray = data.registeredFields
	// console.log(data.registeredFields, data.values)
	_.forIn(data.values, function(value, key) {
		_.remove(errorArray, {'name': key})
	})
	_.map(errorArray, function(item) {
		errors[item.name] = 'Это обязательное поле'
	})
	return errors
}

const validateTest = (values, data) => {
	const errors = required(values, data)
	if (values.comment && values.comment.length < 15) {
		errors.comment = 'Комментарий должен быть не меньше 15 символов'
	}
	// console.log(errors)
	return errors
}

const validateReg = (values, data) => {
	const errors = required(values, data)
	required(values, data)
	if (values.password && values.password.length < 8) {
		errors.password = 'Пароль должны быть не меньше 8 символов'
	}
	if (values.password && values.password_repeat && (values.password !== values.password_repeat)) {
		errors.password_repeat = 'Пароли должны совпадать'
	}
	// console.log(errors)
	return errors
}

export default { validateTest, validateReg }
