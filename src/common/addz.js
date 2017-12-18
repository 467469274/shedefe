/**
 * Created by gxk on 2017/12/16.
 */
export function addz(seconds) {
  if(seconds<=9){
    return '0'+''+seconds+'';
  }else {
    return seconds;
  }
}
