function convertToStarsArray(stars) {
  // 30只要3 50只要5 把第一个数字去掉
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url,callback){
  //异步回调函数
  wx.request({
    url:url,
    method:"GET",
    header:{
      "Content-Type": "json"
    },
    success:function(res){
      callback(res.data);
    },
    fail:function(error){
       console.log(error)
    }
  })
}
// 影人姓名拼接/
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
// 最下面从接口重拿影人的图片和名字
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
