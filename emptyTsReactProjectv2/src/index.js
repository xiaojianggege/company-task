import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productInfo: [
                {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
            ],
            filterText: '',
            isStocked: false
        }
    }
    onChangeFilterText = (filterText) => {
        this.setState({filterText})
    }
    onChangeIsStocked = (isStocked) => {
        this.setState({isStocked})
    }
    render(){
        const filterText = this.state.filterText
        const isStocked = this.state.isStocked
        return (
            <div>
                <SearchBar
                    filterText={filterText}
                    isStokced={isStocked}
                    onChangeFilterText={this.onChangeFilterText}
                    onChangeIsStocked={this.onChangeIsStocked}
                />
                <ProductTable filterText={filterText} isStocked={isStocked} productInfo={this.state.productInfo}/>
            </div>
        )
    }
}
class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange = (e) => {
        this.props.onChangeFilterText(e.target.value)
    }
    handleIsStocked = (e) => {
        this.props.onChangeIsStocked(e.target.checked)
    }
    render(){
        const filterText =this.props.filterText
        const isStocked = this.props.isStokced
        return (
            <div>
                <div>
                    <input placeholder='Search...'
                           type='text'
                           value={filterText}
                           onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input type='checkbox' onClick={this.handleIsStocked}/>
                    <span>Only show products in stock</span>
                </div>
            </div>
        )
    }
}
class ProductTable extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const filterText = this.props.filterText
        const isStocked = this.props.isStocked
        const productInfo = this.props.productInfo.filter(item => item.name.indexOf(filterText) >= 0 )
        const category = []
        for(let item of productInfo) {
            if(!category.includes(item.category)) {
                category.push(item.category)
            }
        }
        const categoryDom = []
        category.forEach(item => {
            let productCategoryRow = <ProductCategoryRow key={item} productCategory={item}/>
            categoryDom.push(productCategoryRow)
            productInfo.forEach(it => {
                if(it.category === item) {
                    if(!isStocked) {
                        let productRow = <ProductRow key={it.name} stocked={it.stocked} name={it.name} price={it.price}/>
                        categoryDom.push(productRow)
                    } else {
                        if(it.stocked) {
                            let productRow = <ProductRow key={it.name} stocked={it.stocked} name={it.name} price={it.price}/>
                            categoryDom.push(productRow)
                        }
                    }

                }
            })
        })
        // console.log(category, categoryDom)
        return (
            <div>
                <div>
                    <span> Name </span>
                    <span> Price </span>
                </div>
                {categoryDom}
            </div>
        )
    }
}
class ProductCategoryRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <span>{this.props.productCategory}</span>
                {this.props.children}
            </div>
        )
    }
}
class ProductRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <span className={this.props.stocked ? '' : 'not_stocked'}> {this.props.name} </span>
                <span> {this.props.price} </span>
            </div>
        )
    }
}
class Index extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <FilterableProductTable/>
    }
}
ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);
