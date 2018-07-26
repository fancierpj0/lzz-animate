import animate from './animate';

// wow(window.root, {
//   left: {
//     start: ''
//     , end: ''
//   }
// }
// duration
// effect
// cb
// );


function whereToWhere(ele,obj,{duration,effect,cb,ifBack}){
  let targetCollection = {}
    , originalCollection = {};

  for(let attr in obj){
    let start = obj[attr].start;

    if(ifBack) originalCollection[attr] = window.getComputedStyle(ele, null)[attr];

    //left:{start:'',end:''}
    if(start){
      ele.style[attr] = start;
      targetCollection[attr] = obj[attr].end;

    //没有初始值，表示不重置初始位置
    //left:'100%'
    }else{
      targetCollection[attr] = obj[attr];
    }
  }

  animate(ele, targetCollection, duration, effect, ()=>{
    cb.call(ele);

    //TODO 如果cb是一个animate，并不会等到两次animate结束后 再 back
    if(ifBack){
      for(let attr in originalCollection){
        ele.style[attr] = originalCollection[attr];
      }
    }
  });
}

export default whereToWhere;
