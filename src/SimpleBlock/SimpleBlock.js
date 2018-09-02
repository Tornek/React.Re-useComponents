import React, {Component} from 'react';
import {TextBlock} from '../TextBlock/TextBlock';

export class SimpleBlock extends Component {
	state = {
		type: 'simpleBlock',
		blocks: []
	};
	
	componentWillReceiveProps(nextProps){
		if(nextProps.addNewBlock){
			this.fetchArticle()
				.then((newBlocks) => {
					let blocks = this.state.blocks;
						
					blocks.unshift(newBlocks);
					this.setState({blocks: blocks});
					this.props.updateTextBlock(this.state.blocks, this.state.type);
				});
		}
		return true;
	}
	
	componentWillMount(){
		let count = Math.ceil(Math.random() * 3);
		//Отобразим рандомное количество статей сразу
		this.startArticles(count);
	}
	
	//Генерируем текстовый блок
	fetchArticle(){
		return new Promise(function(resolve, reject){
			fetch('https://fish-text.ru/get')
				.then(function(response){
					if(response.status !== 200){
						reject('Looks like there was a problem. Status Code: ' + response.status);
						return;
					}
					
					response
						.json()
						.then(function(data){
							resolve({
								id: new Date().getTime() * Math.ceil(Math.random() * 1000),
								text: data.text
							});
					});
				})
				.catch(function(err){
					reject(err);
				});
		});
	}
	startArticles(blocksLength){
		let promises = [];
		
		for(let i = 0; i < blocksLength; i++){
			promises.push(
				this.fetchArticle()
			);
		}
		
		//Вызовем всё промисы разом, что бы не ренедрить страницу несколько раз.
		Promise
			.all(promises)
			.then((newBlocks) => {
				let blocks = this.state.blocks;
				
				//newBlocks в даном случае массив обектов, полученный из всех промисов.
				blocks.unshift(...newBlocks);
				
				this.setState({blocks: blocks});
				this.props.updateTextBlock(blocks, this.state.type);
			});
		
	}
	
	removeBlock(key){
		this.state.blocks.forEach((item, i, arr) => {
			if(item.id === key){
				arr.splice(i, 1);
				
				this.setState({
					blocks: arr
				});
				this.props.updateTextBlock(this.state.blocks, this.state.type);
				return false;
			}
		});
	}
	selectBlock(key){
		this.state.blocks.forEach((item, i, arr) => {
			if(item.id === key){
				arr[i]['selected'] = arr[i]['selected'] === undefined || !arr[i]['selected'];
				
				this.setState({
					blocks: arr
				});
				this.props.updateTextBlock(this.state.blocks, this.state.type);
				return false;
			}
		});
	}
	_selectBlock = (key) => {
		this.selectBlock(key);
	};
	_removeBlock = (key) => {
		this.removeBlock(key);
	};
	
	render() {
		return (<TextBlock 
			blocks={this.state.blocks}
			removeBlock={this._removeBlock}
			selectBlock={this._selectBlock}
		/>)
	}
}

