import React, { Component } from 'react';
import ReactDom from 'react-dom';
const DataSource = {
    getComments() {
        return [
            {id: 1, txt: '写的好啊'},
            {id: 2, txt: '6666'},
            {id: 3, txt: 'laji'}
        ]
    },
    getBlogPost(id) {
        switch (id) {
            case 1:
                return '这是跟风效应，就像某大官得势时，他的毛笔字都是墨宝，大学纷纷要他题辞; 双规下台后，学校门口的题辞都要盖起来了。' +
                    'redux的源码写得真不好。其解决方案与mobx也差十万八千里，啰嗦得不行，搞太多概念让人头晕脑涨。好的实现是隐藏细节，' +
                    '而他一定要让大家搞清这些内部细节才能玩好redux，说明这东西就不好的实现。样板代码太多了，有人总是拿Reason说事，' +
                    '认为redux如果用Reason写会简洁些，也自带immutable特性。。。拜托，这是JavaScript，请充分发挥JavaScript的特性！' +
                    '因此我个人认为，redux实在连国人的许多狀态管理器也不如，国人不用妄自菲薄。\n'
            case 2:
                return '因为上面这些“晦涩难懂”的理论对React的设计者来说是比较好懂的理解方法，而不是唯一正确的理解方法，' +
                    '其他框架的作者也有他们自己殊途同归的认知过程。如果你已经知道什么是algebraic effects，大可以用你的先验经验帮助自己理解context和hooks；' +
                    '如果你（很幸运地）对论文没兴趣，也完全可以用自己的理解去实现context和hooks。只要你的理解在实践中是正确的' +
                    '，就完全没有必要去迎合那些难懂的学术或伪学术文，因为它们也只是一种理解方法而已。这甚至是来自学术界的论点[1]。' +
                    '看，本回答也学术起来了。'
            default:
                return '无此id'
        }
    }

}
class CommentList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const data = this.props.data
        const dataList = data.map(item => <li key={item.id}> {item.txt} </li>)
        return (
            <div>
                {dataList}
            </div>

        )
    }
}

class BlogPost extends  Component {
    constructor(props){
        super(props);
    }
    render() {
        const data = this.props.data
        return (
            <div>
                {data}
            </div>
        )
    }
}

function withSubscription(WrappedComponent, getData) {
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                data: getData(DataSource, props)
            }
        }
        handleChange = () => {
            this.setState({
                data: getData(DataSource, this.props)
            })
        }
        componentDidMount(){
            // DataSource.addChangeListenner(this.handleChange)
        }
        componentWillUnmount(){
            // DataSource.removeChangeListenner(this.handleChange)
        }
        render() {
            return (
                <WrappedComponent data={this.state.data}/>
            )
        }
    }
}

const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => (DataSource.getComments())
)

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => (DataSource.getBlogPost(props.id))
)
ReactDom.render(
    <div>
      <CommentListWithSubscription />
      <BlogPostWithSubscription  id={2}/>
    </div>,
    document.getElementById('container')
);
