import _ from 'lodash'

const validateTest = (values, data) => {
	const errors = {}
	const errorArray = data.registeredFields
	_.forIn(data.values, function(value, key) {
		_.remove(errorArray, {'name': key})
	})
	// console.log(errorArray)
	_.map(errorArray, function(item) {
		errors[item.name] = 'Это обязательное поле'
	})
	if (values.comment && values.comment.length < 15) {
		errors.comment = 'Комментарий должен быть не меньше 15 символов'
	}
	// console.log(errors)
	return errors
}

export default { validateTest }
