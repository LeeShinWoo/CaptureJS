/********************************************************************************************** 
 *
 *				  ____       _       _                       _      ____    
 *				 |  _ \ _ __(_)_ __ | |_ _ __ ___   __ _  __| | ___|___ \  
 *				 | |_) | '__| | '_ \| __| '_ ` _ \ / _` |/ _` |/ _ \ __) | 
 *				 |  __/| |  | | | | | |_| | | | | | (_| | (_| |  __// __/   
 *				 |_|   |_|  |_|_| |_|\__|_| |_| |_|\__,_|\__,_|\___|_____| 
 *
 *								
 *							Printmade2 JavaScript(2.0.1.0)
 *
 * 
 *
 * Support : Windows - XP, Vista, 7 
 *	 				   (IE, Chrome, Firefox, Safari, Opera), 
 *			 Mac OS X - Snow leopard, Lion 
 *					   (Safari, Chrome, Firefox),
 *			 Linux - Ubuntu 11.04 32bit, Ubuntu 11.04 64bit, Fedora 32bit, Fedora 64bit
 * 					 (Firefox, Chrome, Opera)
 *
 * Published Date : Tue 02 Jan 2012
 * Encoding : UTF-8
 *
 * URL : http://www.designmade.com
 * Tel : +82 2 3472 1515
 * Copyright 2000 ~ 2011 Designmade Co., Ltd. All Right Reserved.
 *  
 **********************************************************************************************/



 
/**********************************************************************************************
 *
 * Global Options
 *
 **********************************************************************************************/
// Viewer 버전 - 업데이트를 할 때 버전을 올려주어야 한다.
var VIEWER_VERSION = '2.0.1.16';
// 공통 경로
var SERVER_PATH = location.protocol + "//" + location.hostname +  '/printmade2';
// 라이센스 코드
var LICENSE_CODE = 'aHkPURpuoKR2Bkeb4DPGVynwE6UaSMpHYpGEGJ75DNdVJ+OJ3ihP4bwFHQBi0bqD';
// ActiveX DLL 경로 - IE용 플러그인 업데이트를 위한 경로
var OCX_CODEBASE = SERVER_PATH + '/download_files/Windows/Printmade3.ocx';
// Install 프로그램 경로들
var WIN_DOWNLOAD_URL = SERVER_PATH + '/download_files/Windows/Printmade3_setup.exe';
var MAC_DOWNLOAD_URL = SERVER_PATH + '/download_files/MacOSX/Printmade3forMac.dmg'
var UBUNTU_32BIT_URL = SERVER_PATH + '/download_files/Linux/Printmade3_Ubuntu_32bit.tar';
var UBUNTU_64BIT_URL = SERVER_PATH + '/download_files/Linux/Printmade3_Ubuntu_64bit.tar';
var FEDORA_32BIT_URL = SERVER_PATH + '/download_files/Linux/Printmade3_Fedora_32bit.tar';
var FEDORA_64BIT_URL = SERVER_PATH + '/download_files/Linux/Printmade3_Fedora_64bit.tar';
// 양식파일 경로
var FORMURL = SERVER_PATH + '/server_files/form.txt';
// 설치 화면 이미지 경로
var INSTALL_IMG_URL = SERVER_PATH + '/server_files/imgs/';
// Printmade 윈도우 화면 위치 지정. 0,0,0,0 이면 최대값으로 지정함
var DIALOG_RECT = '0,0,0,0';
// 페이지 브레이크 기능
var PAGEBREAKS = '';
// Printmade에서 기본적으로 인쇄할 렌더링 방식. image,webobject 두가지 방식이 있음
var RENDERINGTYPE = 'image';
// 인쇄할 용지의 기본 방향
var ORIENTATION = 'portrait'; // portrait, landscape
// 인쇄 페이지 정렬 - left, center, right
var PAGEALIGNMENT = 'center';
//내부 개발자용 모드
var DEVELOPMENT_MODE = 0;
//Mac, Linux용 설정값
var GPrintmade_MainFrame = null; 
var GPrintmade_NonCrossTop = null;

//2.0.0.7
// 인쇄 방법 - 0:바로 인쇄, 1:뷰어로 확인, 2:PDF 파일출력
var DIALOGMODE = 1;
// 기존 유저 환경설정값 사용 - 0 : 사용 안함, 1 : 사용
var USERPREFERENCE = 0;
// 페이지 여백(Margin) - '상,우,하,좌'
var PAGEMARGIN = '0,0,0,0';

//2.0.1.0
var PMCUSTOMER = ''; //Customer name
var PMLOGOIMG = ''; //Url
var PMICON = ''; //Url
var PMPAGESIZE = ''; //width,height
var PMVIEWERMODAL = 0; //0 - modeless, 1 - modal


//2.0.1.3
var PMMEMO = 1; // 0 - 사용 안함, 1 - 사용

//2.0.1.4
var PMZOOM = 1; // 0 - 사용 안함, 1 - 사용

var PMPAGEWIDTH = '';

/**********************************************************************************************
 *
 * Messages
 * 
 **********************************************************************************************/
var VALIDATECLASS_MSG = 'JavaScript가 제대로 로드되지 않았습니다.\n';
var UNDEFINED_WEBBROWSER_MSG = '현재 사용하고 있는 웹브라우저는 지원하지 않습니다.';
var UNDEFINED_OS_MSG = '현재 사용하고 있는 OS는 지원하지 않습니다.';
var INSTALL_DIV_MSG = '이 프로그램은 웹 페이지 인쇄를 위한 솔루션입니다.';
var INSTALL_DIV_UNDER_MSG = '<br>프린트메이드의 인쇄기능은 모바일에서 이용이 불가합니다.';
var INSTALL_LINUX_MSG = '압축 파일을 해제 후, install.sh를 터미널에서 실행하십시오'; //빈칸으로 설정시 메시지가 안뜬다.

//도넛 버전
var PTMDonutVersion = "3.0.0.4";
// 브릿지관련 
var PTMBridge;
// DONUT 전역변수
var DONUTPARAMETERTARGETFRAME = "";
var SCRIPTURL = SERVER_PATH + '/server_files/ptmscript.js';

//OS변수

//브라우저 변수


var Client_Information = {						//브라우저및 os , frame 도메인 체크 변수
	init : function(){
		this.os = Checker.checkOS();
		this.browser = new Browser();
		this.PTM_Version = '0.0.0.0';
		this.isPTM = false;
	}
}
var Browser = function(){
	this.browser = Checker.checkBrowser();
	this.b_Version = Checker.checkIE_Version(this.browser);
}
var Checker = {						//브라우저및 os , frame 도메인 체크 변수
	checkBrowser : function(){
		var browser = navigator.appName;
			var useragent = navigator.userAgent;
			switch (browser){
				case 'Microsoft Internet Explorer':
					browser = "MSIE";
					break;
				case 'Netscape':
					if(useragent.lastIndexOf('Edge/') > 0){		//Edge check!!
						browser = "Edge";
					}
					else if (useragent.lastIndexOf('Chrome/') > 0) {
						browser = "Chrome";
					}
					else if (useragent.lastIndexOf('Firefox/') > 0) {
						browser = "Firefox";
					}
					else if (useragent.lastIndexOf('Safari/') > 0) {
						browser = "Safari";
					}else if(navigator.userAgent.match(/Trident\/(\d.\d)/i) != null){		//IE version check
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
	checkOS : function(){
		if (navigator.appVersion.indexOf("Win")!=-1){
			return "Win";
		}
		if (navigator.appVersion.indexOf("Mac")!=-1){
			return "Mac";
		}
		if (navigator.appVersion.indexOf("X11")!=-1){
			return "Linux";
		}
		return "unknwon";
	},
	checkIE_Version : function(browser){
		if(browser == "MSIE"){
			var version = navigator.userAgent.match(/Trident\/(\d.\d)/i)[1];
			if(version == "4.0"){
				version = 8;
			}else if(version == "5.0"){
				version = 9;
			}else if(version == "6.0"){
				version = 10;
			}else if(version == "7.0"){
				version = 11;
			}
		}else{
			version = "Not IE";
		}
		return version;
	},
	checkCrossDomain : function(framewin) {
		try{
			var frmdocument = framewin.document;

			if (frmdocument == undefined || frmdocument.getElementById == undefined){
				return true;
			}else
				return false;
		}catch (e){
			return true;
		}
	}
}
var PTMPlugin = {				//플러그인 설치 및 설정 변수
	getPlugin : function(){
		try{
			if(client_Information.browser == 'MSIE'){
				this.plugin = new ActiveXObject('Printmade3.Printmade3ActiveX');
			}else{
				var embed = document.createElement("embed");
				embed.setAttribute("id","ptm_plugin");
				embed.setAttribute("type","application/nagosoft/printmade3");
				embed.setAttribute("width","1");
				embed.setAttribute("height","1");
				embed.setAttribute("style","opacity:0.1;position:absolute;");
				top.window.document.documentElement.appendChild(embed);
				this.plugin = top.window.document.getElementById('ptm_plugin');
			}
		}catch(e){
			return false;
		}
			return true;
	},
	CheckVersion : function() {
		if(this.getPlugin()){
			try{
				var appdatapath = this.plugin.getAppDataPath();
			}catch(e){
				return false;
			}
			if(client_Information.os == "Win"){
				appdatapath = this.plugin.getRunPath();
			}
			var current_viewer_version = "2.0.0.0";
			try{
				if(client_Information.os == "Win") {
					current_viewer_version = this.plugin.getFileVersion(appdatapath + '/Printmade3/Viewer.exe\0');
				} else if(client_Information.os == "Linux"){
					current_viewer_version = this.plugin.getFileVersion('Viewer');
					return true;
				} else if(client_Information.os == "Mac") {
					current_viewer_version = this.plugin.getFileVersion(appdatapath + '/Printmade3/Viewer.app/Contents/Info.plist\0');
				}
			}catch(e){
				return false;
			}

			try {
				if (this._CompareVersion(current_viewer_version.toString(), VIEWER_VERSION) == false) {
					return false;
				} else {
					return true;
				}
			} catch (e) {
				return true;
			}
		}else{
			return false;
		}
	},
	_CompareVersion: function(current_version, new_version) {
		var current_arr = current_version.split('.');
		var new_arr = new_version.split('.');
		for (var i = 0; i < 4 ; i++){
			current_arr[i] = parseInt(current_arr[i]);
			new_arr[i] = parseInt(new_arr[i]);
		}
		
		for(var i=0; i<4; i++){
			if(current_arr[i] < new_arr[0])
				return false;
			else
				return true;
		}
		return true;
	}
}

var PTMPathConverter = {			//경로 변경 변수
	init : function(){
		this.current_protocol = document.location.protocol;
		this.targetframe = window.top;
	},
	run : function(){
		this.init();
		//console.log("complete init");
		
		var keyword = [
			["img","src"], ["input","src"], ["link","href"],
			["*[background]","background"]
		];
		
		var frames = [];
		// = this.targetframe.frames

		/* 프레임 처리 */
		
		frames.push(window.top);
		
		dmj("iframe").each(function(idx){
			dmj(this).attr("src_ptm",(idx+2)+".html");
			frames.push(this.contentWindow);
		});
		
		dmj("frame").each(function(){
			frames.push(this.contentWindow);
		});
		
		/* ===================== */
		
		if(frames.length > 0){
			//console.log("n");
			this.convertAbsolutePathAtAllFrames(frames,keyword);
		}else{
			//console.log("s");
			for(i=0;i<keyword.length;i++){
				this.convertAbsolutePath(this.targetframe.document,keyword[i][0],keyword[i][1],keyword[i][1]+"_ptm",document.location.protocol);
			}
		}
	},
	convertAbsolutePathAtAllFrames : function(childFrame,keyword){		// looking for Absolute Path Frames
		dmj(childFrame).each(function(){
			if(checker.checkCrossDomain(this) == false){
				for(i=0;i<keyword.length;i++){
					PTMPathConverter.convertAbsolutePath(this.document,keyword[i][0],keyword[i][1],keyword[i][1]+"_ptm",document.location.protocol);
				}
			}else{
			}
		})
		
	}
	,
	convertAbsolutePath : function(obj,selector,attr,newattr,current_protocol){ // Relative Path -> Absolte Path
		dmj(obj).find(selector).each(function(){
			if ( dmj(this).attr(attr) == undefined) return;
			
			var src_string = new String(this.src);
			if ((new String(dmj(this).attr(attr))).indexOf(current_protocol) == -1 && 
				(new String(dmj(this).attr(attr))).indexOf('http://') == -1 && 
				(new String(dmj(this).attr(attr))).indexOf('https://') == -1) {
					if(src_string.indexOf(current_protocol) == -1){
						//Root relative path
						dmj(this).attr(newattr, current_protocol + '//' + document.location.host+'/' + (new String(dmj(this).attr(attr))));	
					} else {
						//absolute path가 있으면 바로 적용.
						dmj(this).attr(newattr,src_string);
					}
				}else{
					dmj(this).attr(newattr,dmj(this).attr(attr));
				}
		});	
	}
}

function Printmade3Init(){
	
	PTMBridge = { // 프린트메이드를 실행시키는 객체
			//init = (option = {elementid : ??}, GPrintmade = PTMMainController(Global variable) , targetframe = frame Object)
		init : function(option,GPrintmade,targetframe){
			// 변수
			dmj("#PTMButton").css("display","none");
			this.printmade = GPrintmade;
			this.targetframe = targetframe;
			this.PrintmadeOption = option;
			// 실행
			PTMAnt.init(option,GPrintmade,targetframe);
		}, // 브라우저를 판단하고, 웹 오브젝트들의 상대경로를 절대경로로 변경
		Run : function(option){
			
			var replaceAfter = ["!ptmprotocolhelper!","!ptms1!","print!ptmsn!made"];
			var replaceBefore = ["://","/","printmade"];
			
			var resultformurl = FORMURL;
			var resultscripturl = SCRIPTURL;
			
			dmj(replaceAfter).each(function(idx){
				resultformurl = resultformurl.split(replaceBefore[idx]).join(replaceAfter[idx]);
			})
			
			dmj(replaceAfter).each(function(idx){
				resultscripturl = resultscripturl.split(replaceBefore[idx]).join(replaceAfter[idx]);
			})
			
		
			PTMInstallChecker.check();
			if(client_Information.os == "Win"){
				PTM_LoadDialog();
				
				if(PTMInstallChecker.isPTM){
					this.doWindow();
					return 0;
				}else{
					//alert("uninstalled");
					PTMLoadingClose();
					return 0;
				}
			}else {
				if(PTMInstallChecker.isPTM){
					this.doFS();
				}else{
					PTMLoadingClose();
					return 0;
				}
			}
		}, 
		doFS : function(){
			if(Donut.browser == "Firefox" || Donut.browser == "Safari"){
				this.doNPAPI();		
			}else{
				PTM_LoadDialog();
				this.doBridgeA();
			}	
		},
		doWindow : function(){
			if(this.Browser == "MSIE"){
				DONUTPARAMETERTARGETFRAME = this.targetframe;
				this.doBridgeB();
				return;
			}else if(this.Browser == "Firefox" || this.Browser == "Safari" ){
				this.doNPAPI();
				return;
			}else{
				this.doBridgeA();
				return;
			}
		},
		doBridgeA : function(){
			if(!PTMAnt.isClick){
				PTMAnt.Ant = setInterval(function(){PTMAnt.run()},2000);
			}
		},
		doBridgeB : function(){		
			Donut.checkPrintmade("");
		}, // 프린트메이드를 실행
		doNPAPI : function(){
			
				this.printmade.Run(PTMAnt.targetframe);
				return;
		},
		// 프린트메이드를 실행
		checkInstall : function(){
		
			try{
				if(client_Information.browser == "MSIE")
					return true;
				else if(PTMChecker.checkWebBrowser() == "Firefox" || PTMChecker.checkWebBrowser() == "Safari"){
					
					return;
				}else{
					
				}
			}catch(e){
			}
			//PTM_DownloadDialog();
			return true;
			
		}
	};
	if(browser == "MSIE" || browser == "Firefox"){
		dmj("*[id*='printmadebutton']").attr("href","#");
	}
}

function Printmade3Init(){
var browser = PTMChecker.checkWebBrowser();
	PTMBridge = { // 프린트메이드를 실행시키는 객체
		init : function(option,GPrintmade,targetframe){
			// 변수
			dmj("#PTMButton").css("display","none");
			this.printmade = GPrintmade;
			this.targetframe = targetframe;
			this.Browser = PTMChecker.checkWebBrowser();
			this.Converter = PTMPathConverter;
			this.Checker = PTMChecker;
			this.PrintmadeOption = option;
			// 실행
			PTMAnt.init(option,GPrintmade,targetframe);
		}, // 브라우저를 판단하고, 웹 오브젝트들의 상대경로를 절대경로로 변경
		Run : function(option){

			var myoption = "printmade25://I";
			var elementid = this.printmade.option.GetElementId(); // 1
			var ssloption = "U"; // 2
			var pagewidth = dmj('body',this.targetframe.document)[0].scrollWidth; // 3
			
			var replaceAfter = ["!ptmprotocolhelper!","!ptms1!","print!ptmsn!made"];
			var replaceBefore = ["://","/","printmade"];
			
			var resultformurl = FORMURL;
			var resultscripturl = SCRIPTURL
			
			dmj(replaceAfter).each(function(idx){
				resultformurl = resultformurl.split(replaceBefore[idx]).join(replaceAfter[idx]);
			})
			
			dmj(replaceAfter).each(function(idx){
				resultscripturl = resultscripturl.split(replaceBefore[idx]).join(replaceAfter[idx]);
			})
			
			
			
			var formurl = resultformurl;
			var scripturl = resultscripturl; // 5
			var margin = this.printmade.option.GetPageMargin(); // 6
			var align = this.printmade.option.GetAlignment(); // 7
			//var framename = this.printmade.option.GetFrameId(); // 8
			var framename = ""; // 8
			var targetpath = ""; // 9
			var pageheight = dmj('body',this.targetframe.document)[0].scrollHeight; // 10
			var iframeid = "";
			
			PTMInstallChecker.check();
			//alert(Donut.browser);
			if(Donut.OS == "Win"){
				PTM_LoadDialog();
				
				if(PTMInstallChecker.isPTM){
					this.doWindow();
					return 0;
				}else{
					//alert("uninstalled");
					PTMLoadingClose();
					return 0;
				}
			}else {
				
						//alert("TTTEST21");
				if(PTMInstallChecker.isPTM){
						//alertalert("Installed");
					if(this.doFS() == false){
						//alert("doBridge!");
						PTM_LoadDialog();
						this.doBridgeA();
						return 0;
					}
				}else{
					//alert("uninstalled");
					PTMLoadingClose();
					return 0;
				}
			}
			
		},
		doFS : function(){
			if(Donut.browser == "Firefox" || Donut.browser == "Safari"){
				this.doNPAPI();
				return true;				
			}
			return false;
					
		},
		doWindow : function(){
			//alert("installed");
			if(this.Browser == "MSIE"){
				DONUTPARAMETERTARGETFRAME = this.targetframe;
				this.doBridgeB();
				return;
			}else if(this.Browser == "Firefox" || this.Browser == "Safari" ){
				this.doNPAPI();
				return;
			}else{
				this.doBridgeA();
				return;
			}
		},
		doBridgeA : function(){
			if(!PTMAnt.isClick){
				PTMAnt.Ant = setInterval(function(){PTMAnt.run()},2000);
			}
		},
		doBridgeB : function(){		
			Donut.checkPrintmade("");
		}, // 프린트메이드를 실행
		doNPAPI : function(){
			
				this.printmade.Run(PTMAnt.targetframe);
				return;
		},
		checkInstall : function(){
		
			try{
				if(PTMChecker.checkWebBrowser() == "MSIE")
					return true;
				else if(PTMChecker.checkWebBrowser() == "Firefox" || PTMChecker.checkWebBrowser() == "Safari"){
					
					return;
				}else{
					
				}
			}catch(e){
			}
			//PTM_DownloadDialog();
			return true;
			
		}
	};
	if(browser == "MSIE" || browser == "Firefox"){
		dmj("*[id*='printmadebutton']").attr("href","#");
	}
}
