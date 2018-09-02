import React, {Component} from 'react';
import './style.less';

export class TextBlock extends Component {
	render() {
		return this.props.blocks.map(
			(item) => {
				let className = 'blocks' + (item.selected ? ' selected' : '')  + (item.color ? ' ' + item.color  : '');
				
				return <div 
					key={item.id} 
					className={className} 
					onClick={() => this.props.selectBlock(item.id)}
					onDoubleClick={() => this.props.changeColor(item.id)}
				>
					<a className="blocks_close" onClick={() => this.props.removeBlock(item.id)}>×</a>
					<div>
						<p>{item.text}</p>
					</div>
				</div>
			});
	}
}

TextBlock.defaultProps = {
	changeColor: ()=>{},
};