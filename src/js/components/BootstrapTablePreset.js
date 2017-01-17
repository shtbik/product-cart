import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class BootstrapTablePreset extends React.Component {

	static get defaultProps() {
		return {
			data: [],
			columns: [],
			bordered: false,
			selectRow: {},
			pagination: true,
			striped: true,
			hover: true,
			condensed: false,
			options: {
				// sizePerPage: 20,
				sizePerPageList: [5, 10, 20, 100],
				hideSizePerPage: true
				// sizePerPageList: [{text: 5, value: 5}, {text: 20, value: 20}]
			}
		}
	}

	renderDefaultColumn(config) {
		const defaults = {
			dataSort: true,
			dataAlign: 'left',
			isKey: false
		}

		const props = Object.assign({}, defaults, config)
		const messageId = `labels.${props.label || props.dataField}`

		if (props.width) props.width += '' // width, apparently, has to be a string ¯\_(ツ)_/¯

		return (
			<TableHeaderColumn {...props}>
				<FormattedMessage id={messageId} defaultMessage={messageId} />
			</TableHeaderColumn>
		)
	}

	renderBooleanColumn(config) {
		const defaults = {
			dataSort: true,
			dataAlign: 'center',
			width: 75,
			dataFormat: ( cell ) => {
				const icon = !cell ? 'times-circle' : 'check-circle'
				const color = !cell ? 'red' : 'green'
				return <i style={{color: color}} className={`fa fa-${icon}`}></i>
			}
		}

		const props = Object.assign({}, defaults, config)
		return this.renderDefaultColumn( props )
	}

	renderDateColumn(config) {
		const defaults = {
			dataSort: true,
			dataAlign: 'right',
			width: 100,
			dataFormat: ( cell ) => {
				return <FormattedDate value={moment(cell).toDate()} />
			}
		}

		const props = Object.assign({}, defaults, config)
		return this.renderDefaultColumn( props )
	}

	renderIndexColumn(config) {
		const defaults = {
			dataSort: true,
			dataAlign: 'right',
			isKey: true,
			width: 50
		}

		const props = Object.assign({}, defaults, config)
		return this.renderDefaultColumn( props )
	}

	renderColumns(columns) {
		return _.map(columns, (column, i) => {
			// let type = column.type || 'default'
			const columnIn = Object.assign(column, {key: i})

			switch ( column.type ) {
				case 'index':
					return this.renderIndexColumn(columnIn)
				case 'date':
					return this.renderDateColumn(columnIn)
				case 'bool':
				case 'boolean':
					return this.renderBooleanColumn(columnIn)
				default:
					return this.renderDefaultColumn(columnIn)
			}
		})
	}

	render() {
		const props = this.props
		const columns = this.renderColumns(props.columns)
		// sizePerPage={props.perPage}
		// bordered={true}
		// data={props.data}
		// selectRow={props.selectRow}
		// pagination={props.pagination}
		// striped={props.striped}
		// hover={props.hover}
		// condensed={props.condensed}
		// sizePerPageList={props.sizePerPageList}

		return (
			<BootstrapTable
				data={props.data}
				selectRow={props.selectRow}
				pagination={props.pagination}
				striped={props.striped}
				hover={props.hover}
				condensed={props.condensed}
				bordered={props.bordered}
				options={props.options}
			>
				{columns}
			</BootstrapTable>
		)
	}
}

export default BootstrapTablePreset
