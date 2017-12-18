//import {postFetch} from 'common/js/fetch';
const state = {
  cartList: [
    {
      "id": 37,
      "name": "奥林巴斯Stylus Epic",
      "goods_label":['测试0','大瑞测试'],
      "cover": "http://shede.sinmore.vip/storage/comment/euy0BJThLSQLcMNirYVTxXaFkwlF5BRZQu2JhwbE.jpeg",
      "sale_num": 0,
      "deposit": "5000.00",
      "start_price": "900.00",
      "start_days": 20,
      'keep_price':50
    },
    {
      "id": 37,
      "name": "奥林巴斯Stylus Epic",
      "goods_label":['测试0','大瑞测试'],
      "cover": "http://shede.sinmore.vip/storage/comment/euy0BJThLSQLcMNirYVTxXaFkwlF5BRZQu2JhwbE.jpeg",
      "sale_num": 0,
      "deposit": "5000.00",
      "start_price": "900.00",
      "start_days": 20,
      'keep_price':50
    }
  ]
};
const mutations = {
  addCartList(state, data){
    for (let i = 0; i < state.cartList.length; i++) {
      if (data.id == state.cartList[i]) {
        state.cartList[i].num = state.cartList[i].num + 1
      } else {
        data.goods_label = data.goods_label.split(',');
        console.log(data.goods_labe)
        state.cartList.push(data)
      }
    }
  },
  deComm(state, id){
    for (let i = 0; i < state.cartList.length; i++) {
      if (id == state.cartList[i].id) {
        state.cartList.splice(i,1);
      }
    }
  }
};
const getters = {
  gCartList(state){
    return state.cartList;
  }
}
const actions = {
  adeComm(context,datas){
    context.commit('deComm',datas)
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
