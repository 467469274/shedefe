import {getCookie,setCookie} from './cookies.js';
import axios from 'axios';
var qs = require('qs');
export function ajpost(url,data,call,err) {
  var token = getCookie('token');
  if(token ==''){
    if(parseQueryString().token == undefined){
      // setCookie('token','eyJpdiI6Imx3OFpmam5HZFwvakROWGYraDFMMDBBPT0iLCJ2YWx1ZSI6Inc4b01j',1);
       window.location = ' http://shede.sinmore.vip/api/weixinLogin';
      return;
    }else {
      setCookie('token',parseQueryString().token,1);
    }
  }
  data.token = token;
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
  var token = getCookie('token');
  if(token == ''){
    if(parseQueryString().token == undefined){
      // setCookie('token','eyJpdiI6Imx3OFpmam5HZFwvakROWGYraDFMMDBBPT0iLCJ2YWx1ZSI6Inc4b01j',1);
      window.location = ' http://shede.sinmore.vip/api/weixinLogin';
      return;
    }else {
      setCookie('token',parseQueryString().token,1);
    }
  }
  data.token = token;
  axios.get(`http://shede.sinmore.vip${url}`, {
    params:data
  }).then(function (response) {
    call(response.data.data);
  }).catch(function (error) {
    err(error);
  });
}


function parseQueryString() {
  var url = window.location.hash
  var json = {};
  var arr = url.substr(url.indexOf('?') + 1).split('&');
  arr.forEach(function(item) {
    var tmp = item.split('=');
    json[tmp[0]] = tmp[1];
  })
  return json;
}
