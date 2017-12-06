

import axios from 'axios';
var qs = require('qs');
export function ajpost(url,data,call,err) {
  data.token = '000';
  var postData  = qs.stringify(data);
  axios({
    method:'post',
    url:`http://shede.sinmore.vip${url}`,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    dataType:'json',
    data:postData
  }).then(function(re){
    call(re.data);
  }).catch(function (error) {
    err(error);
  });
}
export function ajget(url,data,call,err) {
  data.token = '000';
  axios.get(`http://shede.sinmore.vip${url}`, {
    params:data
  }).then(function (response) {
    call(response.data.data)
  }).catch(function (error) {
    err(error);
  });
}
