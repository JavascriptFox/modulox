import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { injectStyles } from './styles'
import { commonTypes } from '../../types'
import theme from '../../theme/'

const List = ({ children, element, items, events, ...props }) => {
	const Element = styled[element]`
		${injectStyles(props)}
		::after {${props.after}}
		::before {${props.before}}
		:hover {${props.hover}}
		& > * {
			margin: ${props.spacing};
			${props.childs}
		}
		${props.style}
	`
	const renderChildren = (item, index) => React.isValidElement(children)
		? React.cloneElement(children, {
				listLength: items.length,
				isLastItem: index === items.length - 1,
				index,
				item,
			})
		: item

  return (
    <Element className={props.className} {...events}>
			{items.length > 0 && items.map(
        (item, index) => renderChildren(item, index)
      )}
    </Element>
  )
}

List.propTypes = {
	items: propTypes.array,
	...commonTypes,
}

List.defaultProps = {
	items: [],
	element: 'ul',
	display: 'flex',
	events: {},
	wrap: 'nowrap',
	margin: 'initial',
	position: 'initial',
	padding: 'initial',
	width: 'auto',
	height: 'auto',
	maxWidth: 'initial',
	maxHeight: 'initial',
	justify: 'initial',
	align: 'initial',
	direction: 'column',
	background: 'transparent',
	transition: ``,
	className: ``,
	spacing: ``,
	style: ``,
	hover: ``,
	before: ``,
	after: ``,
	childs: ``,
	xx: 100,
	theme,
}

export default List
