import React, { Component } from 'react';
import './App.css';
import Item from "./Item";
import Form from './components/Form';

let userStockList = [];
const defaultList = [
  {
    title: "YG",
    index: "122870"
  },
  {
    title: "JYP",
    index: "035900"
  },
  {
    title: "S&C엔진",
    index: "900080"
  },
  {
    title: "LGE",
    index: "066570"
  },
  {
    title: "깨끗한 나라",
    index: "004540"
  },
  {
    title: "지트리비앤티",
    index: "115450"
  },
  {
    title: "코오롱티슈진",
    index: "950160"
  },
  {
    title: "파루",
    index: "043200"
  },
  {
    title: "중앙백신",
    index: "072020"
  }
]

class App extends Component {
  state = {
    infos: [
    ],
    title:'',
    index:'',
  }

  _setDefaultList(){
    // Set Default Setting
    userStockList = defaultList;
    this.saveListToLocalstorage();
  }

  componentDidMount(){
    this.loadListFromLocalstorage();
    /*
    stockList.forEach(sl => {
      //console.log(sl.index)
      this._getInfos(sl);
    })*/
  }

  saveListToLocalstorage = () => {
    localStorage.setItem('tocklist', JSON.stringify(userStockList));
  }

  loadListFromLocalstorage = () => {
    if (localStorage.getItem('tocklist')) {
      userStockList = JSON.parse(localStorage.getItem('tocklist'))
    } else {
      userStockList = []
    }
    userStockList.forEach(sl => {
      this._getInfos(sl);
    })
  }

  _callApi = (index) => {
    return fetch("https://finance.naver.com/item/main.nhn?code="+index)
    .then(response => response.text())
    .catch(err => console.log(err));
  }

  _getInfos = async (sl) => {
    var tmpInfo = [];  
    var fulltext = await this._callApi(sl.index);
    if(fulltext){
      if(fulltext.indexOf('<dl class="blind">') !== -1) {
        var sub = fulltext.substring(fulltext.indexOf('<dl class="blind">'), fulltext.indexOf('</dl>'));
        var part = sub.split('<dd>');
        var today = part[4].split(' ');
        var yesterday = part[5].split(' ')[1].replace("</dd>", "");
        var numberDiff = Number(today[1].replace(",", "")-Number(yesterday.replace(",", "")));
      
        const {infos} = this.state;
        tmpInfo = tmpInfo.concat({
          title: sl.title,
          price: today[1],
          diff: numberDiff,
          yesterday: yesterday,
          id: sl.index
        },...infos)
        this.setState({
          infos: tmpInfo
        })
      }else{
        this.handleRemove(sl.index);
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleSubmit 호출
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태 초기화
    this.setState({
      title: '',
      index: ''
    })
    if(this.state.title !== "" && this.state.index !== ""){
      const stockItem = {
        title: this.state.title,
        index: this.state.index
      }
      // List에 추가
      this._getInfos(stockItem);
      // Local Storage에 저장
      userStockList = userStockList.concat(stockItem);
      this.saveListToLocalstorage();
    }
  }

  handleRemove = (id) => {
    // 화면 List에서 지우기
    const tmpList = this.state.infos.filter(fullItemList => fullItemList.id !== id);
    this.setState({
      infos: tmpList
    });

    // Loca Storage에 저장.
    userStockList = userStockList.filter(itemList => itemList.index !== id);
    this.saveListToLocalstorage();
  }

  _renderInfos = () => {
    const infos = this.state.infos.map(info => {
      const {
        handleRemove
      } = this;

      return <Item 
        title={info.title} 
        price={info.price}
        yesterday={info.yesterday}
        diff={info.diff}
        id={info.id}
        key={info.id}
        onRemove={handleRemove}
      />
    })
    return infos;
  }

  _renderForm = () => {
    const {
      handleChange,
      handleSubmit,
      handleKeyPress
    } = this;

    return <Form
      value1={this.state.title}
      value2={this.state.index}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  }

  render() {
    return (
      <div className={this.state.infos ? "App" : "App-loading"}>
        {this.state.infos ? this._renderInfos() : "Loading"}
        {this._renderForm()}
      </div>
    );
  }
}

export default App;
