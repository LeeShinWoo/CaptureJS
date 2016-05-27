var PTMBridge = { // 프린트메이드를 실행시키는 객체
	init : function(targetframe){
		// 변수
		this.targetframe = targetframe;
		PTMAnt.init(this.targetframe);

	}, // 브라우저를 판단하고, 웹 오브젝트들의 상대경로를 절대경로로 변경
	WindowRun : function(){
		var browser = Client_Info.browser_Info.getBrowser();
		switch(browser){
			case 'Safari':
				this.doNPAPI();
				break;
			case 'Firefox':
				this.doNPAPI();
				break;
			case 'MSIE':
				if(Client_Info.browser_Info.getVersion() != 11)	this.doLocalStorege();
				else this.doLocalStorege();
				break;
			case 'Chrome' :
				this.doWebSocket();
				break;
			case 'Opera' :
				this.doWebSocket();
				break;
			case 'Edge'	:
				this.doWebSocket();
				break;
			default:
		}
	},
	LinuxRun : function(){
		var browser = Client_Info.browser_Info.getBrowser();
		switch(browser){
			case 'Safari':
				this.doNPAPI();
				break;
			case 'Firefox':
				this.doNPAPI();
				break;
			case 'MSIE':

				break;
			case 'Chrome' :
				this.doWebSocket();
				break;
			case 'Opera' :
				this.doWebSocket();
				break;
			case 'Edge'	:
				this.doWebSocket();
				break;
			default:
		}
	},
	MacRun : function(){
		var browser = Client_Info.browser_Info.getBrowser();
		switch(browser){
			case 'Safari':
				this.doNPAPI();
				break;
			case 'Firefox':
				this.doNPAPI();
				break;
			case 'MSIE':

				break;
			case 'Chrome' :
				this.doWebSocket();
				break;
			case 'Opera' :
				this.doWebSocket();
				break;
			case 'Edge'	:
				doWebSocket();
				break;
			default:
		}
	},
	Run : function(){
		PTM_LoadDialog();
		var os = Client_Info.os_Info.getOs();
		switch(os){
			case 'Win' :
				this.WindowRun();
				break;
			case 'Mac' :
				this.MacRun();
				break;
			case 'Linux' :
				this.LinuxRun();
				break;
			default :
				alert('undefined os');
				break;
		}
	},
	doWebSocket : function(){
		if(!PTMAnt.isClick){
			PTMAnt.Ant = setInterval(function(){PTMAnt.run()},2000);
		}
	},
	doLocalStorege : function(){
		PTMMainController.LocalStroeageRun(this.targetframe);
		return;
	},
	doNPAPI : function(){
		PTMMainController.NPAPIRun(this.targetframe);
		return;
	}
};

//PTMAnt 클래스 정의(PTMAnt 프린트메이드 웹소켓 객체)
var PTMAnt = {
	init:{},
	Bridge:{},
	connectBridge : {},
	sendBridge : {},
	disconnectBridge : {},
	Ant:{},
	Extend:{}
}


PTMAnt.Extend = function(destination,source){
	for(property in source){
		destination[property] = source[property];
	}
	return destination;
};


PTMAnt.Extend(PTMAnt.Bridge,{
		onOpen : function(evt){

		},
		onClose : function(evt){

		},
		onMessage : function(evt){
			if((evt.data).search("Aphid Fine") > -1 || (evt.data).search("Bridge Fine") > -1){
				PTMAnt.Version = evt.data.match(/\d*\.\d*\.\d*\.\d*/gi);

				if(PTMAnt.isDataReceivedFromBridge == false){
					setTimeout(function(){
						//printmade를 바꿔야함 변수를
						PTMMainController.WebSocketRun(PTMAnt.targetframe);
						clearInterval(PTMAnt.Ant);
						PTMAnt.isPrintmadeRun = true;},1000);
					PTMAnt.isDataReceivedFromBridge = true;
				}
			}
		},
		onError : function(evt){

		},
		getMessage : function(){
			return this.receivedMessage;
		}
	}
)



// 아피드 관련
PTMAnt.Extend(PTMAnt,{
	init:function(targetframe){
		this.ptmcnt = 0;
		this.ptmstarted = false;
		this.targetframe = targetframe;
		this.isDataReceivedFromBridge = false; // 중복 실행 방지
		this.isClick = false; // 클릭방지
		this.isPrintmadeRun = false; // 서버에 정상적으로 접속되었는지 확인

	},
	runBridge : function(){
		location.href =  "printmade25://";
	},
	tryToConnect:function(){
		if(this.isClick == false){ // 클릭방지
			this.isClick = true;
		}
		this.connectBridge("30401");
	},
	run:function(){
		if(!this.isDataReceivedFromBridge){
			this.ptmcnt++;
			try{
				if(this.ptmcnt > 2 && this.ptmstarted == false){
					this.ptmstarted = true;
					this.runBridge();
				}
				this.tryToConnect();
				if(this.isPrintmadeRun == false){
					this.sendBridge("HowAreYou");
				}

				if(this.ptmcnt > 10){
					alert("프린트메이드가 정상적으로 설치되지 않았습니다.");
					PTMLoadingClose();
				}

			}catch(e){

			}
		}
	},
	connectBridge:function(socket){
		try{
			var wsUri = "wss://127.0.0.1:"+socket;
			this.BridgeConnector = new WebSocket(wsUri);
			this.BridgeConnector.onopen = function(evt){ PTMAnt.Bridge.onOpen(evt) }
			this.BridgeConnector.onclose = function(evt){ PTMAnt.Bridge.onClose(evt) }
			this.BridgeConnector.onmessage = function(evt){ PTMAnt.Bridge.onMessage(evt) }
			this.BridgeConnector.onerror = function(evt){ PTMAnt.Bridge.onError(evt) }

		}catch(e){

		}
	},
	disconnectBridge:function(){
		this.BridgeConnector.close();
	},

	sendBridge:function(message){
		setTimeout(function(){
			try{
				PTMAnt.BridgeConnector.send(message);
			}catch(e){

			}
		},1000);

	},
	getReceivedMessage:function(){
		return PTMAnt.Bridge.getMessage();
	}
})
