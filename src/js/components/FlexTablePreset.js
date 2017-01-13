import React from 'react'
import { FormattedMessage, FormattedNumber, FormattedDate } from 'react-intl'
import { browserHistory, Link } from 'react-router'
import moment from 'moment'
import cn from 'classnames'

import { 
	get as _get,
	map as _map,
	omit as _omit,
	size as _size,
	isEqual as _isEqual,
	noop as _noop
} from 'lodash'

import { SortIndicator } from './Table/SortIndicator'

class CustomFlexTable extends FlexTable {
	shouldComponentUpdate( nextProps, nextState ){
		return !_isEqual(nextProps, this.props)
	}
}


class FlexTablePreset extends React.Component {

	static get defaultProps(){
		return {
			sortBy: 'index',
			sortDirection: 'DESC'
		}
	}

	renderDefaltColumn( config, index ){
		
		const name = config.name
		const path = config.path || name
		const label = config.label || name
		const { sort } = this.props


		const defaults = { 
			label,
			dataKey: name,
			width: 100,
			headerClassName: 'text-left',
			className: 'text-left',
			headerRenderer: ({label, sortBy, dataKey, sortDirection}) => (
				<div>
					{sortBy === dataKey && <SortIndicator order={sortDirection} />}
					<FormattedMessage id={`labels.${label}`} />
				</div>
			),

			cellDataGetter: ({rowData, colData, dataKey}) => _get(rowData, path)
		}

		const props = _omit( Object.assign({}, defaults, config), ['path', 'name', 'urlBase'] )
		return <FlexColumn key={index} {...props} />
	}

	renderIndexColumn( config, index ){
		const defaults = {
			cellRenderer: ({rowIndex}) => rowIndex + 1
		}

		const props = Object.assign({}, defaults, config)
		return this.renderDefaltColumn( props, index )
	}	

	renderLinkColumn( config, index ){
		const defaults = {
			headerClassName: 'text-left',
			className: 'text-left',
			cellRenderer: ({cellData, rowData}) => {
				const urlSegment = config.urlSegmentKey ? rowData[config.urlSegmentKey] : cellData
				return <Link to={`${config.urlBase}/${urlSegment}`}>{cellData}</Link>
			}
		}

		const props = Object.assign({}, defaults, config)

		return this.renderDefaltColumn( props, index )
	}

	renderButtonColumn( config, index ){
		const defaults = {
			path: 'id',
			headerClassName: 'text-center',
			className: 'text-center',
			cellRenderer: ({cellData, rowData}) => {
				return (
					<button className={cn(`btn btn-xs btn-${config.buttonType || 'primary'}`)} onClick={config.callback.bind(null, cellData) || _.noop}>
						<i className={cn(`fa fa-${config.icon || 'circle'}`)} aria-hidden="true"></i>
					</button>
				)
			}
		}

		const normalizedConfig = _.omit(config, ['callback', 'icon', 'buttonType'])
		const props = Object.assign({}, defaults, normalizedConfig)

		return this.renderDefaltColumn( props, index )
	}


	renderBooleanColumn( config, index){
		const defaults = {
			className: 'text-center',
			cellRenderer: ({rowIndex, cellData}) => {
				const color = cellData ? 'green' : 'red'
				const icon = cellData ? 'check-circle' : 'times-circle'
				return <i style={{color: color}} className={`fa fa-${icon}`}></i>
			}
		}

		const props = Object.assign({}, defaults, config)

		return this.renderDefaltColumn( props, index )
	}

	renderCheckColumn( config, index){
		
		const defaults = {
			cellRenderer: ({rowIndex, cellData}) => {
				var icon = cellData ? 'check-square' : 'square'
				return <i className={`fa fa-${icon}`}></i>
			}
		}

		const props = Object.assign({}, defaults, config)

		return this.renderDefaltColumn( props, index )
	}


	renderNumericColumn( config, index ){
		const defaults = {
			headerClassName: 'text-right',
			className: 'text-right',
			cellRenderer: ({cellData, rowData}) => {
				return <FormattedNumber value={cellData} />
			}
		}

		const props = Object.assign({}, defaults, config)

		return this.renderDefaltColumn( props, index )
	}

	renderDateColumn( config, index ){
		const defaults = {
			width: 100,
			cellRenderer: ({cellData, rowData}) => {
				return <FormattedDate value={moment(cellData).toDate()} />
			}
		}

		const props = Object.assign({}, defaults, config)

		return this.renderDefaltColumn( props, index )
	}

	
	renderColumns( columns ){
		return _map(columns, (column, index) => {
			let type = column.type || 'default'

			switch ( column.type ) {
				case 'index': 
					return this.renderIndexColumn( column, index )
				case 'number': 
				case 'numeric': 
					return this.renderNumericColumn( column, index )	
				case 'link': 
					return this.renderLinkColumn( column, index )		
				case 'bool':
				case 'boolean': 
					return this.renderBooleanColumn( column, index )	
				case 'check': 
					return this.renderCheckColumn( column, index )		
				case 'date': 
					return this.renderDateColumn( column, index )	
				case 'button': 
					return this.renderButtonColumn( column, index )			
				default: 
					return this.renderDefaltColumn( column, index ) 	
			}
		})
	}

	render(){

		const props = this.props
		const columns = this.renderColumns( _get(props, 'columns', []) )
		const data = _get(props, 'data', [])
		const config = _get(props, 'config', {})

		return (
			
			<CustomFlexTable
				width={props.width}
				height={props.height}
				headerHeight={config.rowHeight || 30}
				rowHeight={config.rowHeight || 30}
				rowCount={_size(data)}
				rowGetter={({ index }) => data[index]}
				rowClassName={({ index }) => index % 2 ? 'even' : 'odd'}
				onRowClick={props.onRowClick}
				onRowDoubleClick={props.onRowDoubleClick}
				rowClassName={props.rowClassName}
				sort={props.onSort || _noop}
				sortBy={props.sortBy}
				sortDirection={props.sortDirection}
				rowClassName={props.rowClassName}
			>
				{columns}
			</CustomFlexTable>
			
		)
	}
}


export default FlexTablePreset