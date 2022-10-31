
const dataProxy = new Proxy({count:1},{
    "get": function(obj,key) {
      return obj[key]
    },
    "set":function(obj,key,value) {
      obj[key]=value
    }
  })

  console.log(dataProxy.count) // 1
  dataProxy.count = 2;
  console.log(dataProxy.count) // 2