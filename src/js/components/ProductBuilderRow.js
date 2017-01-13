import React from 'react'
import _ from 'lodash'
import { Row, Col, Modal, Button, FormControl } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const ProductBuilderRow = (props, context) => {

	const {
		index, 
		field,
		fields, 
		validations, 
		labels, 
		rowOptions,
		colOptions,
		onChange,
		onRemove,
		modeOptions
	} = props.config

	return (
		<div className="ibox-content">
			<Row key={index}>
				<Col sm={1}>
					<Select 
						options={rowOptions}
						clearable={false} 
						value={_.get(field, 'row.value')}
						onChange={onChange.bind(this, {index, field: 'row'})} 
					/>
				</Col>
				<Col sm={1}>
					<Select 
						options={colOptions} 
						clearable={false} 
						value={_.get(field, 'col.value')}
						onChange={onChange.bind(this, {index, field: 'col'})} 
					/>
				</Col>
				<Col sm={2}>
					<Select 
						options={fields} 
						clearable={false} 
						valueKey='id'
						labelKey='name'
						value={_.get(field, 'field.id')}
						onChange={onChange.bind(this, {index, field: 'field'})} 
						
					/>
				</Col>
				<Col sm={2}>
					<Select 
						options={labels} 
						clearable={false} 
						value={_.get(field, 'label.value')}
						onChange={onChange.bind(this, {index, field: 'label'})} 
					/>
				</Col>
				<Col sm={4}>
					<Select 
						options={validations} 
						clearable={false} 
						multi={true}
						valueKey='id'
						labelKey='name'
						value={_.map(_.get(field, 'validations', []), validation => validation.id)}
						onChange={onChange.bind(this, {index, field: 'validations'})} 
					/>
				</Col>
				<Col sm={1}>
					<Select 
						options={modeOptions} 
						clearable={false} 
						value={_.get(field, 'mode.value')}
						onChange={onChange.bind(this, {index, field: 'mode'})} 
					/>
				</Col>
				<Col sm={1}>
					<button onClick={onRemove.bind(this, index)} className="btn btn-danger">
						<i className="fa fa-times"> </i>
					</button>
				</Col>
			</Row>
		</div>
	)
}

export default ProductBuilderRow