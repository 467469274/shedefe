//import {postFetch} from 'common/js/fetch';
const state = {
  ars:''
};
const mutations = {
  mars(state,data){
    state.ars = data
  }
};
const getters = {
  gars(state){
    return state.ars;
  }
}
const actions = {
  aars(context,datas){
    context.commit('mars',datas)
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
