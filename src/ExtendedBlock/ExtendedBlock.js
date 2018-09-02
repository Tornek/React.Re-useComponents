import React from 'react';
import {SimpleBlock} from '../SimpleBlock/SimpleBlock';
import {TextBlock} from '../TextBlock/TextBlock';

export class ExtendedBlock extends SimpleBlock {
	state = {
		type: 'extendedBlock',
		blocks: []
	};
	colors = ['red', 'green'];
	
	//Модифицируем ответ от SimpleBlock
	fetchArticle(){
		return new Promise((resolve) =>{
			this.__proto__.__proto__.fetchArticle.apply(this)
				.then((newBlocks) =>{
					resolve({
						id: newBlocks.id,
						text: newBlocks.text,
						color: this.colors[Math.floor(Math.random() * this.colors.length)]
					});
				});
		});
	};
	
	//Спросим перед тем как удалить
	removeBlock = (key) => {
		if(window.confirm('Удалить?')){
			this.__proto__.__proto__.removeBlock.call(this, key);
		}
	};
	
	changeColor(key){
		this.state.blocks.forEach((item, i, arr) => {
			if(item.id === key){
				arr[i]['color'] = this.colors.filter((color) => color !== item['color'])[0];
				
				this.setState({
					blocks: arr
				});
				
				this.props.updateTextBlock(this.state.blocks, this.state.type);
				return false;
			}
		});
	};
	_changeColor = (key) => {
		this.changeColor(key);
	};
	
	render() {
		return (<TextBlock
			blocks={this.state.blocks}
			removeBlock={this._removeBlock}
			selectBlock={this._selectBlock}
			changeColor={this._changeColor}
		/>)
	}
}