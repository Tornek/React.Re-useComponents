import React, {Component} from 'react';
import './App.less';
import {SimpleBlock} from './SimpleBlock/SimpleBlock';
import {ExtendedBlock} from './ExtendedBlock/ExtendedBlock';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			extendedBlock: [],
			simpleBlock: [],
			addBlock: {
				extendedBlock: false,
				simpleBlock: false
			}
		};
		
		this.updateTextBlock = this.updateTextBlock.bind(this);
	}
	addTextBlock(type){
		let newState = this.state;
		
		newState['addBlock'][type] = true;
		
		this.setState(newState);
	};
	
	updateTextBlock(blocks, type){
		let newState = this.state;
		
		newState['addBlock'][type] = false;
		newState[type] = blocks;
		
		this.setState(newState);
	};
	
	render(){
		let blocks = [...this.state.simpleBlock, ...this.state.extendedBlock],
			blockCount = blocks.length,
			blocks_selected = blocks.filter((item)=>{
				return item.selected;
			}),
			blocks_selected_red = blocks_selected.filter((item)=>{
				return item.color === 'red';
			}),
			blocks_selected_green = blocks_selected.filter((item)=>{
				return item.color === 'green';
			});
		
		return (
			<div>
				<div className="panel">
					<p>Всего блоков: {blockCount}</p>
					<p>Выделеных блоков: {blocks_selected.length}</p>
					<p>Выделеных красных блоков: {blocks_selected_red.length}</p>
					<p>Выделеных зелённых блоков: {blocks_selected_green.length}</p>
				</div>
				<div className="column">
					<h2>Простые блоки</h2>
					<button onClick={()=>this.addTextBlock('simpleBlock')}>Добавить блок</button>
					<SimpleBlock
						addNewBlock={this.state.addBlock.simpleBlock}
						updateTextBlock={this.updateTextBlock}
					/>
				</div>
				<div className="column">
					<h2>Расширенные блоки</h2>
					<button onClick={()=>this.addTextBlock('extendedBlock')}>Добавить блок</button>
					<ExtendedBlock
						addNewBlock={this.state.addBlock.extendedBlock}
						updateTextBlock={this.updateTextBlock}
					/>
				</div>
			</div>
		);
	}
}

export default App;
