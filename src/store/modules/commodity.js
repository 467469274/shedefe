//import {postFetch} from 'common/js/fetch';
const state = {
  ars:'',
  par:'',
  orderId:''
};
const mutations = {
  mars(state,data){
    state.ars = data
  },
  orderPagePay(state,data){
    state.par = data
  },
  morderId(state,data){
    state.orderId = data
  }
};
const getters = {
  gars(state){
    return state.ars;
  },
  gpar(state){
    return state.par;
  },
  gorderId(state){
    return state.orderId;
  }
}
const actions = {
  aars(context,datas){
    context.commit('mars',datas)
  },
  apar(context,datas){
    context.commit('orderPagePay',datas)
  },
  aorderId(context,datas){
    context.commit('morderId',datas)
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
