import React from 'react'
import _ from 'lodash'
import { browserHistory, Link } from 'react-router'
import { createSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-bootstrap'

class Table extends FlexTable {
	shouldComponentUpdate( nextProps, nextState ){
		return !_.isEqual(nextProps, this.props)
	}
}

class GridBuilder extends React.Component {

	shouldComponentUpdate( nextProps, nextState ){
		return !_.isEqual(nextProps.data, this.props.data)
	}

	renderColumn( col, index ) {

		const name = col.name
		const label = col.label || name
		const type = col.type || 'string'
		const width = col.width || 100
		const flex = col.flex || 0
		const shrink  = col.shrink || 0
		const path = col.path || name
		//const handler = col.handler || _.noop
		const icon = col.icon || 'circle'

		const cellDataGetter = ({rowData, colData, dataKey}) => _.get(rowData, path)
		const cellRenderer = ({cellData, cellDataKey, columnData, rowData, rowIndex}) => {

			//boolean, number, string, money
			if( type == 'boolean' ) {
				let iconIndex = cellData ? 1 : 0
				return <i className={`fa fa-${icon[iconIndex]}`}></i>
			} else if ( type == 'button' ) {

				var buttonHandler = ( id ) => {

					console.log(id)
					//browserHistory.push(`/form/${id}`)
				}

				return (
					<span onClick={buttonHandler.bind(this, cellData)} className="label label-info label-outline pull-right">
						<i className={`fa fa-${icon}`}></i>
					</span>
				)
			} else {
				return cellData
			}
		}

		const headerRenderer = ( {label} ) => {
			const labelId = `labels.${label}`
			return <FormattedMessage id={labelId} defaultMessage={labelId} />
		}

		return (
			<FlexColumn 
				key={index} 
				label={name}	
				dataKey={name} 
				width={width} 
				cellDataGetter={cellDataGetter} 
				cellRenderer={cellRenderer}
				headerRenderer={headerRenderer}
			/>
		)
	}

	render(){

		const columns = _.get(this.props, 'columns', [])
		const data = _.get(this.props, 'data', [])
		const onDelete = _.get(this.props, 'onDelete', _.noop)
		const onEdit = _.get(this.props, 'onEdit', _.noop)

		//if( _.size(columns) == 0 ) return <div />

		return (
			
			<Table
				width={this.props.width}
				height={this.props.height}
				headerHeight={20}
				rowHeight={30}
				rowCount={_.size(data)}
				rowGetter={params => data[params.index] }
			>
				{_.map(columns, ::this.renderColumn)}

				<FlexColumn
					dataKey="id"
					width={50}
					cellRenderer={( {cellData} ) => {
						return (
							<span onClick={onDelete.bind(this, cellData)} className="label label-danger label-outline pull-right">
								<i className={`fa fa-minus`}></i>
							</span>
						)
					}}
				/>	
				<FlexColumn
					dataKey="id"
					width={50}
					cellRenderer={( {cellData} ) => {
						return (
							<span onClick={onEdit.bind(this, cellData)} className="label label-primary label-outline pull-right">
								<i className={`fa fa-pencil`}></i>
							</span>
						)
					}}
				/>	
			</Table>
			
		)
	}
}


export default GridBuilder