import React from 'react'
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone';
import { FormGroup } from 'react-bootstrap'

const input = (data) => {
	// const { input, meta } = data

	// const { input, meta, type, defaultValue, disabled } = data
	// const { value: inputValue, ...inputRest } = input
	// const value = inputValue || defaultValue
	// // const validations = _.get(data, 'validations', [])
	// // const isReqired = !!_.find(validations, (v) => {
	// //  return ['required', 'non_empty'].indexOf(v) !== -1
	// // })
	// // console.log(data.input, isReqired)
	// const placeholder = data.placeholder
	// const {error, touched} = meta
	// let validationState = null
	// // const floatlInputClass = data.classList
	// let errorText = null
	// if (error && touched) {
	// 	validationState = 'error'
	// 	errorText = error
	// }
	const handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
		let eventOrValue = e
		const {input: {onChange, onBlur}} = data
		if (e.type === 'drop') {
			if (acceptedFiles.length) {
				// FileList or [File]
				eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles
			} else {
				eventOrValue = null
			}
		}
		onBlur(eventOrValue); // update touched
		onChange(eventOrValue); // update value
	}

	const {input, size} = data
	const {accept, multiple} = data
	let selectedFile = null
	if (input && input.value && typeof input.value === 'string') {
		selectedFile = input.value
	} else if (input && input.value && input.value[0]) {
		selectedFile = input.value[0]
	}

	let bodyDropZone = null;
	if (selectedFile) {
		// console.log(input, input.value[0].preview)
		bodyDropZone = (
			<div className="avatar img-thumbnail">
				<img src={selectedFile.preview ? selectedFile.preview : 'http://localhost:3000/img/' + selectedFile} />
			</div>
		)
	} else {
		bodyDropZone = (
			<div className="avatar img-thumbnail">
				<div>
					<span>Загрузите фото</span>
					<span>1x1</span>
				</div>
			</div>
		)
	}
	const dropzoneProps = {
		accept,
		multiple,
		maxSize: size,
		onDrop: handleDropOrClick
	}
	return (
		<FormGroup>
			<input name="photo_url" type="hidden" disabled {...input} />
			<Dropzone {...dropzoneProps}>
				{bodyDropZone}
			</Dropzone>
		</FormGroup>
	)

	// return (
	// 	<FormGroup controlId={input.name} validationState={validationState}>
	// 		<Dropzone
	// 			ref="dropzone"
	// 			onDrop={(upload) => dispatch(change('FileUploadExampleForm', 'file', upload[0]))}
	// 			multiple={false}
	// 			accept='image/*'>
	// 			<div>Click here select files to upload.</div>
	// 	</Dropzone>
	// 		<FormControl {...inputRest} value={value ? value : ''} disabled={disabled} type={type ? type : 'text'} placeholder={errorText ? errorText : placeholder} />
	// 			{errorText && value &&
	// 				<div className="alert alert-danger">
	// 					<strong>Ошибка!</strong> {errorText}
	// 				</div>
	// 			}
	// 	</FormGroup>
	// )
}

export default function FormInput(data) {
	return <Field {...data} component={input} type="hidden" />
}
