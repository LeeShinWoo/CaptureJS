//--------------------------------------PTMMain(callPrint)-------------------------
var PTMMain = {
	PagePrint : function(options){
		PTMMainController.init();
		PTMMainController.option.SetElementId(options.elementid);
		Client_Info.init();
		if(Client_Info.PTM_Info.getInstall())	PTMController.run(options);
		else PTMController.install();
	}
}

//--------------------------------------PTMController-------------------------
var PTMController = {
	init : function(){
		var os = Client_Info.os_Info.getOs();
		switch(os){
			case 'Win' :
				this.controller = new WinPTMController();
				break;
			case 'Mac' :
				this.controller = new MacPTMController();
				break;
			case 'Linux' :
				this.controller = new LinuxPTMController();
				break;
			default :
				alert('undefined os');
				break;
		}
	},
	run : function(options){
		this.init();
		this.controller.run(options);
	},
	install : function(){
		this.init();
		this.controller.install();
	}
}
//--------------------------------------WinPTMController-------------------------
function WinPTMController(){
	var Func = {
		run : function(options){
			var browser = Client_Info.browser_Info.getBrowser();
			switch(browser){
				case 'Safari':
					alert("Win_Safari_run");
					break;
				case 'Firefox':
					PTMBridge.init(GPrintmade_NonCrossTop);
					PTMBridge.Run(options);
					break;
				case 'MSIE':
					PTMBridge.init(GPrintmade_NonCrossTop);
					PTMBridge.Run(options);
					break;
				case 'Chrome'	:
					alert("Win_Chrome_run");
					break;
				case 'Opera'	:
					alert("Win_Opera_run");
					break;
				case 'Edge'		:
					alert("Win_Edge_run");
					break;
				default:
			}
		},
		install : function(){
			alert("Wininstall");
		}
	};
	return Func;
}
//--------------------------------------LinuxPTMController-------------------------
function LinuxPTMController(){
	var Func = {
		run : function(options){
			var browser = Client_Info.browser_Info.getBrowser();
			switch(browser){
				case 'Safari':
					alert("Linux_Safari_run");
					break;
				case 'Firefox':
					alert("Linux_Firefox_run");
					break;
				case 'MSIE':
					alert("Linux_MSIE_run");
					break;
				case 'Chrome'	:
					alert("Linux_Chrome_run");
					break;
				case 'Opera'	:
					alert("Linux_Opera_run");
					break;
				case 'Edge'		:
					alert("Linux_Edge_run");
					break;
				default:
			}
		},
		install : function(){
			alert("Linuxinstall");
		}
	};
	return Func;
}
//--------------------------------------MacPTMController-------------------------
function MacPTMController(){
	var Func = {
		run : function(options){
			var browser = Client_Info.browser_Info.getBrowser()
			switch(browser){
				case 'Safari':
					alert("Mac_Safari_run");
					break;
				case 'Firefox':
					alert("Mac_Firefox_run");
					break;
				case 'MSIE':
					alert("Mac_MSIE_run");
					break;
				case 'Chrome'	:
					alert("Mac_Chrome_run");
					break;
				case 'Opera'	:
					alert("Mac_Opera_run");
					break;
				case 'Edge'		:
					alert("Mac_Edge_run");
					break;
				default:
			}
		},
		install : function(){
			alert("Macinstall");
		}
	};
	return Func;
}
