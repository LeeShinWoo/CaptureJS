//---------------------------------Client_Info class------------------------------
var Client_Info = {			
	init : function(){
		this.os_Info = Os_InfoFactory.create_OsInfo();
		this.browser_Info = Browser_InfoFactory.create_BrowserInfo();
		this.PTM_Info = PTM_InfoFactory.create_PTMInfo();
		console.log('os = ' + this.os_Info.getOs());
		console.log('browser = ' + this.browser_Info.getBrowser());
		console.log('b_version = ' +this.browser_Info.getVersion());
		console.log('PTMinstall = ' + this.PTM_Info.getInstall());
		console.log('PTM_version = ' +this.PTM_Info.getVersion());
	}
}

//---------------------------------PTM_Info class------------------------------
function PTM_Info(){
	var install = arguments[0].install ? arguments[0].install : false;
	var version = arguments[0].version ? arguments[0].version : '0.0.0.0';
	var Func = {
		getInstall : function(){
			var installClone = install;
			return installClone;
		},
		setInstall : function(){
			install = arguments[0];
		},
		getVersion : function(){
			var versionClone = version;
			return versionClone;
		},
		setVersion : function(){
			version = arguments[0];
		}
	};
	return Func;
}
//---------------------------------PTM_InfoFactory class------------------------------
var PTM_InfoFactory = {
	fromUserAgent : function(){							//userAgent(IE)
		
		var userAgent = navigator.userAgent;
		var isPTM = userAgent.indexOf('printmade');
		var version = '0.0.0.0';
		var install = false;
		if(isPTM != -1){
			version = userAgent.match(/printmade=\d.\d.\d.\d/)[0].split('=')[1];		//printmade version check
			install = true;
		}
		var result = {install : install, version : version};
		return result;
	},
	fromNPPlugin : function(){						//NP Plugin(fire fox, Safari)
		var mimetype = navigator.mimeTypes["application/nagosoft/printmade3"];
		var version = '0.0.0.0';
		var install = false;
		if (mimetype != undefined) {
			version = mimetype.enabledPlugin.version;
			install = true;
		}
		var result = {install : install, version : version};
		return result;
	},
	WinPTMCheck : function(){		//install check function
		var result;
		var browser = Client_Info.browser_Info.getBrowser()
		switch(browser){
			case 'Safari':
			case 'Firefox':
				result = this.fromNPPlugin();
				break;
			case 'MSIE':
				result = this.fromUserAgent();
				break;
			case 'Chrome'	:
			case 'Opera'	:
			case 'Edge'		:
				result = {install : 'Donut.install', version : 'Donut.version'};
				break;
			default:
				result = {install : false, version : '0.0.0.0'};
				break;
		}
		return result;
	},
	LinuxPTMcheck : function(){
		var result;
		var browser = Client_Info.browser_Info.getBrowser()
		switch(browser){
			case 'Safari':
			case 'Firefox':
				result = this.fromNPPlugin();
				break;
			case 'MSIE':
				result = this.fromUserAgent();
				break;
			case 'Chrome'	:
			case 'Opera'	:
			case 'Edge'		:
				result = {install : 'Donut.install', version : 'Donut.version'};
				break;
			default:
				result = {install : false, version : '0.0.0.0'};
				break;
		}
		return result;
	},
	MacPTMCheck : function(){
		var result;
		var browser = Client_Info.browser_Info.getBrowser()
		switch(browser){
			case 'Safari':
			case 'Firefox':
				result = this.fromNPPlugin();
				break;
			case 'MSIE':
				result = this.fromUserAgent();
				break;
			case 'Chrome'	:
			case 'Opera'	:
			case 'Edge'		:
				result = {install : 'Donut.install', version : 'Donut.version'};
				break;
			default:
				result = {install : false, version : '0.0.0.0'};
				break;
		}
		return result;
	},
	PTMCheck : function(){
		var result;
		var os = Client_Info.os_Info.getOs();
		switch(os){
			case 'Win' :
				result = this.WinPTMCheck();
				break;
			case 'Linux' :
				result = this.LinuxPTMcheck();
				break;
			case 'Mac' :
				result = this.MacPTMCheck();
				break;
			default :
				result = {install : false, version : '0.0.0.0'};
				break;
		}
		return result;
	},
	create_PTMInfo : function(){
		var ptm_Info = new PTM_Info(this.PTMCheck());
		return ptm_Info;
	}
}
//---------------------------------Browser_Info class------------------------------
function Browser_Info(){
	var browser = arguments[0] ? arguments[0] : '';
	var version = arguments[1] ? arguments[1] : '';
	var Func = {
		getBrowser : function(){
			var browseClone = browser;
			return browseClone;
		},
		setBrowser : function(){
			browser = arguments[0];
		},
		getVersion : function(){
			var versionClone = version;
			return versionClone;
		},
		setVersion : function(){
			version = arguments[0];
		}
	};
	return Func;
};
//---------------------------------Browser_InfoFactory class------------------------------
var Browser_InfoFactory = {		
	checkBrowser : function(){			
		var browser = navigator.appName;
		var useragent = navigator.userAgent;
		switch (browser){
			case 'Microsoft Internet Explorer':
				browser = "MSIE";
				break;
			case 'Netscape':
				if(useragent.lastIndexOf('Edge/') > 0){		
					browser = "Edge";
				}
				else if (useragent.lastIndexOf('OPR/') > 0) {
					browser = "Opera";
				}
				else if (useragent.lastIndexOf('Chrome/') > 0) {
					browser = "Chrome";
				}
				else if (useragent.lastIndexOf('Firefox/') > 0) {
					browser = "Firefox";
				}
				else if (useragent.lastIndexOf('Safari/') > 0) {
					browser = "Safari";
				}else if(navigator.userAgent.match(/Trident\/(\d.\d)/i) != null){		
					browser = "MSIE";
				}
				break;
				
			case 'Opera':
				browser = "Opera";
				break;
			default:
				return false;
				break;
		}
		return browser;
	},
	checkIE_Version : function(){			
		var version;
		try{
			version = navigator.userAgent.match(/Trident\/(\d.\d)/i)[1];
			switch (version){
				case '4.0' :
					version = 8;
					break;
				case '5.0' :
					version = 9;
					break;
				case '6.0' :
					version = 10;
					break;
				case '7.0' :
					version = 11;
					break;
				default :
					version = undefined;
			}
		}catch(e){
			version = 'Not IE';
		}finally{
			return version;
		}
	},	
	create_BrowserInfo : function(){			
		var browser_Info = new Browser_Info(this.checkBrowser(),this.checkIE_Version());
		return browser_Info;
	}
}
//---------------------------------Os_Info class------------------------------
function Os_Info(){
	var os = arguments[0] ? arguments[0] : 'unknwon';
	var Func = {
		getOs : function(){
			var osClone = os;
			return osClone;
		},
		setOs : function(){
			os = arguments[0];
		}
	};
	return Func;
};
//---------------------------------Os_InfoFactory class------------------------------
var Os_InfoFactory = {	
	checkOS : function(){		
		var os = navigator.appVersion;
		var result;
		if (os.indexOf("Win")!=-1){
			result = "Win";
		}
		else if (os.indexOf("Mac")!=-1){
			result = "Mac";
		}
		else if (os.indexOf("X11")!=-1){
			result = "Linux";
		}else{
			result = "unknwon"
		}
		return result;
	},
	create_OsInfo : function(){	
		var os_Info = new Os_Info(this.checkOS());
		return os_Info;
	}
}
Client_Info.init();