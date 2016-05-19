angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  },{
    id: 5,
    name: 'dltlsdn',
    lastText: 'My name is dltlsdn.',
    face: 'img/perry.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('test', function() {
  return{
    test : function(){
      return 'dltlsdn';
    }
  }
})

.factory('table', function() {
  var index = 0;
  var data = [
        {
            name: "AiA",
            code: "AI101",
            limit: 25000,
            account: "Life Insurance"
        },
        {
            name: "Cargills",
            code: "CF001",
            limit: 30000,
            account: "Food City"
        }
    ];
  var tempdata;
  return{
    getData : function(){
      return data;
    },
    remove: function(p_data) {
      data.splice(data.indexOf(p_data), 1);
    },
    addData : function(p_data){
      var tempdata = {};
      angular.copy(p_data, tempdata); //angularjs 객체 복사 사용법
      console.log(tempdata);
      data.push(tempdata);
    }
  }
});
