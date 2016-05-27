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

var SERVER_PATH = location.protocol + "//" + location.hostname +  '/printmade2';

// 라이센스 코드
var LICENSE_CODE = 'hKWl1Ms41Eygk91ToLN4VFzTFH7Q60rPfvRS20R28po=';

// 공통 경로
//var SERVER_PATH = 'https://www.shinhancard.com/solution/printmade2';
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
var FORMURL = '';
//var FORMURL = SERVER_PATH + '/server_files/form.txt';
//var FORMURL = SERVER_PATH + '/server_files/form.txt';
//var FORMURL = '';
//var FORMURL = '';
//var FORMURL = '';
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
// 인쇄 방법 - 0:바로 인쇄, 1:뷰어로 확인, 2:PDF 인쇄
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

// 브릿지관련
var PTMDonutVersion = "3.0.0.4";
var PTMBridge;

// DONUT 전역변수
var DONUTPARAMETERTARGETFRAME = "";

var SCRIPTURL = SERVER_PATH + '/server_files/ptmscript.js';
/**********************************************************************************************
 *
 * Global Options
 *
 **********************************************************************************************/
// 유용한 객체들

var PTMVersionChecker = {
	getPlugin : function(){
            //OS 파악
	if (navigator.appVersion.indexOf("Win")!=-1){
		this.isWindows = true;
	}
      if (navigator.appVersion.indexOf("Mac")!=-1){
       this.isMac = true;
      }
      if (navigator.appVersion.indexOf("X11")!=-1){
       this.isLinux = true;
      }
      try{
       if(navigator.userAgent.lastIndexOf('Trident/') > 0){
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
          if(this.isWindows){
           appdatapath = this.plugin.getRunPath();
          }
          var current_viewer_version = "2.0.0.0";
          try{
           if(this.isWindows) {
            current_viewer_version = this.plugin.getFileVersion(appdatapath + '/Printmade3/Viewer.exe\0');
           } else if(this.isLinux){
            return true;
            current_viewer_version = this.plugin.getFileVersion('Viewer');
           } else if(this.isMac) {
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
      for (var i = 0; i < 4 ; i++)
      {
       current_arr[i] = parseInt(current_arr[i]);
       new_arr[i] = parseInt(new_arr[i]);
      }

      if (current_arr[0] < new_arr[0])
       return false;
      else if(current_arr[0] > new_arr[0])
       return true;
      else if (current_arr[1] < new_arr[1])
       return false;
      else if (current_arr[1] > new_arr[1])
       return true;
      else if (current_arr[2] < new_arr[2])
       return false;
      else if (current_arr[2] > new_arr[2])
       return true;
      else if (current_arr[3] < new_arr[3])
       return false;
      else if (current_arr[3] > new_arr[3])
       return true;

      return true;
     }
    }



var PTMPathConverter = {
	init : function(){
		this.current_protocol = document.location.protocol;
		this.targetframe = top.window;
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

		frames.push(top.window);

		dmj("iframe").each(function(idx){
			//dmj(this).attr("src_ptm",(idx+2)+".html");
			frames.push(this.contentWindow);
		});

		dmj("frame",top.window.document).each(function(idx){
			dmj(this).attr("src_ptm",(idx+2)+".html");
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
	convertAbsolutePathAtAllFrames : function(childFrame,keyword){

		dmj(childFrame).each(function(){
			if(PTMChecker.checkCrossDomain(this) == false){
				for(i=0;i<keyword.length;i++){
					PTMPathConverter.convertAbsolutePath(this.document,keyword[i][0],keyword[i][1],keyword[i][1]+"_ptm",document.location.protocol);
				}
			}else{
			}
		})

	}
	,
	convertAbsolutePath : function(obj,selector,attr,newattr,current_protocol){ // IMG INPUT LINK BACKGROUND
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
		})

	}
}


var PTMChecker = {
	checkWebBrowser : function(){ // 현재 브라우저를 찾습니다.
			var browser = navigator.appName;
			var useragent = navigator.userAgent;

			switch (browser){
				case 'Microsoft Internet Explorer':
					browser = "MSIE";
					break;
				case 'Netscape':
					if (useragent.lastIndexOf('Chrome/') > 0) {
						browser = "Chrome";
						break;
					}
					else if (useragent.lastIndexOf('Firefox/') > 0) {
						browser = "Firefox";
					}
					else if (useragent.lastIndexOf('Safari/') > 0) {
						browser = "Safari";
						break;
					}else if(navigator.userAgent.match(/Trident\/(\d.\d)/i) != null){
						browser = "MSIE";
						break;
					}else{
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
	checkCrossDomain : function(framewin) {
		try
		{
			var frmdocument = framewin.document;

			if (frmdocument == undefined || frmdocument.getElementById == undefined)
			{
				return true;
			}
			else
				return false;

		}
		catch (e)
		{
			return true;
		}
	},
	checkOS:function(){
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
	/*
		date : 2016-03-26
		modifier : 이신우
		contents : IE Version check Function!!!!!!
	*/
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
			/*
				LSW
				2016.05.19
				promise 실행과 3초뒤 다운로드로 넘어가게 해놈(느린 pc를 위한 선택)
			*/
			PTM_LoadDialog();
			if(PTMInstallChecker.isPTM) PTMBridge.timeingRun();
			else PTMBridge.setinternal = setTimeout(PTMLoadingClose,3000);
			promise.done(PTMBridge.timeingRun);		//도넛통신 성공시!!
		},
			/*
				LSW
				2016.05.19
				실행 모듈로 뻄
			*/
			timeingRun : function(){
				console.log('after resolve!!');
				if(PTMBridge.setinternal)	clearTimeout(PTMBridge.setinternal);
				if(Donut.OS == "Win"){
					PTMBridge.doWindow();
					return 0;
				}else {
					if(PTMBridge.doFS() == false){
						PTMBridge.doBridgeA();
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
		/*
			date : 2016-03-26
			modifier : 이신우
			contents : IE Version check and switch!!!!
		*/
		doWindow : function(){
			if(this.Browser == "MSIE"){
				var version = PTMChecker.checkIE_Version();
				switch(version){
					case 8 :
					case 9 :
					case 10 :
          case 11 :
						DONUTPARAMETERTARGETFRAME = this.targetframe;
						this.doBridgeB();
						return;
						break;
					default :
						PTM_DownloadDialog();
						break;
				}
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

			// var isIE9 = navigator.userAgent.indexOf("MSIE 9.0");
			// var ptmversion = navigator.userAgent.match(/printmade=\d\d*.\d\d*.\d\d*.\d\d*/gi);
			this.printmade.Run(PTMAnt.targetframe);
			return;
			// Donut.checkPrintmade("");

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


function PTM_DownloadDialog() {
	var frame = window; // 필요할 경우 수정이 필요함(페이지에 따라 다름)
	var dialog_width = 455;
	var dialog_height = 295;
	var downloaddiv = frame.document.createElement('div');
	var scrollLeft = frame.document.body.scrollLeft;
	var scrollTop = frame.document.body.scrollTop;
	var clientWidth = frame.document.body.clientWidth;
	var clientHeight =frame.document.body.clientHeight;

	// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
	var maxScrollHeight = 0;

	dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
		if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
			// 그 안 모든 자식들에 무시 속성을 추가.
			var child_node = dmj(this).children();
			while(child_node.length >0){
				child_node.attr("ptm-child-ignore","true");
				child_node = child_node.children();
			}
		}
	});

	// 다시 최대값을 구한다.
	var max=0;
	// 선택자부분에서 무시속성이 된 부분은 제외한다.
	dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
		if (max<(dmj(this).offset().top + dmj(this).height())){
			max = (dmj(this).offset().top + dmj(this).height());
		}
	});

	if (max > frame.document.body.scrollHeight)
		maxScrollHeight = max;
	else
		maxScrollHeight = frame.document.body.scrollHeight;

	if ( frame.document.documentElement.clientHeight > 0 ) {
		//IE의 Quirks Mode가 아닌 7,8 모드
		try{
			if ( GPrintmade.isIE ) {
				scrollLeft = frame.document.documentElement.scrollLeft;
				scrollTop = frame.document.documentElement.scrollTop;
			}
		}catch(e){

			if ( PTMChecker.checkOS()	== "Win" ) {
				scrollLeft = frame.document.documentElement.scrollLeft;
				scrollTop = frame.document.documentElement.scrollTop;
			}
		}
		clientWidth = frame.document.documentElement.clientWidth;
		clientHeight = frame.document.documentElement.clientHeight;
	}

	if (scrollTop == 0) scrollTop = frame.document.documentElement.scrollTop;
	if (scrollLeft == 0) scrollLeft = frame.document.documentElement.scrollLeft;

	var download_div_left, download_div_top;

	if (clientWidth < dialog_width)
		download_div_left = scrollLeft;
	else
		download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;

	if (clientHeight < dialog_height)
		download_div_top = scrollTop;
	else
	download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;


	if (download_div_left < 0)
		download_div_left = 0;
	if (download_div_top < 0)
		download_div_top = 0;

	dmj("body",frame.document).append( '<div id = "ptm_down" align = center style="position:absolute;top:' + download_div_top + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.png\');z-index:5001;display:block"></div>' );
	dmj("body",frame.document).append( '<div id = "ptm_bg" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:5000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>' );

	var down_div = frame.document.getElementById('ptm_down');
	var $down_div = dmj(down_div);

	$down_div.append('<div style="height:160px"></div>');
	$down_div.append('<p>'+INSTALL_DIV_MSG+'</p>');

	var download_url = '';

	if (PTMChecker.checkOS() == "Win") {
		download_url = WIN_DOWNLOAD_URL;
		$down_div.append('<a href = "' + download_url + '" id = "ptm_download" ><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download.png" style = "border:0"></a>');
	} else if (PTMChecker.checkOS()	== "Mac") {
		download_url = MAC_DOWNLOAD_URL;
		$down_div.append('<a href = "' + download_url + '" id = "ptm_download" ><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download.png" style = "border:0"></a>');
	} else if (PTMChecker.checkOS()	== "Linux") {
		var os_bit, os_type;
		var ubuntu_url = '';
		var fedora_url = '';

		if ( navigator.platform.indexOf('64') > -1 || navigator.appVersion.indexOf('x86_64') > -1 ) {
			fedora_url = FEDORA_64BIT_URL;
			ubuntu_url = UBUNTU_64BIT_URL;
		} else {
			fedora_url = FEDORA_32BIT_URL;
			ubuntu_url = UBUNTU_32BIT_URL;
		}

		var installmessage = '';
		if (INSTALL_LINUX_MSG != '')
			installmessage = 'onClick="alert(\''+INSTALL_LINUX_MSG+'\');"';

		$down_div.append('<a href = "' + fedora_url + '" id = "ptm_fedora_download" '+installmessage+'><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download_fedora.png" style = "border:0"></a>&nbsp;');
		$down_div.append('<a href = "' + ubuntu_url + '" id = "ptm_ubuntu_download" '+installmessage+'><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download_ubuntu.png" style = "border:0"></a>&nbsp;');
	}

	$down_div.append( '<a href = "#" id = "ptm_cancel"><img alt = "취소" src = "' + INSTALL_IMG_URL + 'cancel.png" style = "border:0"></a>' );



	if ( frame.document.getElementById('ptm_download') != null ) {
		dmj( frame.document.getElementById('ptm_download') ).click( function(e) {
			dmj( frame.document.getElementById('ptm_bg') ).remove();
			dmj( frame.document.getElementById('ptm_down') ).remove();
		});
	} else {
		dmj(frame.document.getElementById('ptm_fedora_download')).click(function(e) {
			dmj(frame.document.getElementById('ptm_bg')).remove();
			dmj(frame.document.getElementById('ptm_down')).remove();
		});

		dmj(frame.document.getElementById('ptm_ubuntu_download')).click(function(e) {
			dmj(frame.document.getElementById('ptm_bg')).remove();
			dmj(frame.document.getElementById('ptm_down')).remove();
		});
	}


	dmj(frame.document.getElementById('ptm_cancel')).click(function(e) {
		dmj(frame.document.getElementById('ptm_bg')).remove();
		dmj(frame.document.getElementById('ptm_down')).remove();

	});


	dmj(window).resize(function(e){

		dmj("#ptm_down").animate({top:(dmj(window).scrollTop() + (dmj(window).height()-295)/2)},1);
		dmj("#ptm_down").animate({left:(dmj(window).scrollLeft() + (dmj(window).width()-455)/2)},1);
		dmj("#ptm_bg").animate({width:dmj(window).scrollLeft() + dmj(window).width()},1);
		dmj("#ptm_bg").animate({height:dmj(window).scrollTop() + dmj(window).height()},1);

	}).resize();

	dmj(window).scroll(function(e){
		dmj("#ptm_down").animate({top:(dmj(window).scrollTop() + (dmj(window).height()-295)/2)},1);
		dmj("#ptm_down").animate({left:(dmj(window).scrollLeft() + (dmj(window).width()-455)/2)},1);
		dmj("#ptm_bg").animate({width:dmj(window).scrollLeft() + dmj(window).width()},1);
		dmj("#ptm_bg").animate({height:dmj(window).scrollTop() + dmj(window).height()},1);
	}).scroll();

}

var PTMCheckVersion = {

	convertDigitVersion: function(versionData){
		var version = versionData[0].split(".");
		for(i=0;i<4;i++){
			if(version[i].length == 1){
				version[i] = "0"+version[i];
			}
		}

		return ( version[0] + version[1] + version[2] + version[3] ) * 1
	},
	checkVersion: function(currentDigitVersion,scriptDigitVersion){
		if(currentDigitVersion >= scriptDigitVersion){
			return true;
		}else{
			return false;
		}
	},
	check : function(currentVersion,scriptVersion){
		cVersion = this.convertDigitVersion(currentVersion);
		sVersion = this.convertDigitVersion(scriptVersion);
		return this.checkVersion(cVersion,sVersion);
	}

}

/* INCLUDE 영역 끝 */


var PTMAnt = {
	init:{},
	Bridge:{},
	connectBridge : {},
	sendBridge : {},
	disconnectBridge : {},
	Ant:{},
	Extend:{}
}
/* 추상객체 */

/* 기타 사용자 함수 */
function PTMLoadingClose(){
	//console.log("끝!!");
	PTM_RemoveDialog();
	clearInterval(PTMAnt.Ant);
	PTM_DownloadDialog();
}

function PTM_RemoveDialog(){
	dmj("#ptm-loading").remove();
	dmj("#ptm-loading-bg").remove();
	dmj(top.window.document.getElementById('ptm_bg')).remove();
	dmj(top.window.document.getElementById('ptm_down')).remove();
}
function PTM_LoadDialog(){
	try{
		var frame = window; // 필요할 경우 수정이 필요함(페이지에 따라 다름)
		var dialog_width = 500;
		var dialog_height = 310;
		var downloaddiv = frame.document.createElement('div');
		var scrollLeft = frame.document.body.scrollLeft;
		var scrollTop = frame.document.body.scrollTop;
		var clientWidth = frame.document.body.clientWidth;
		var clientHeight =frame.document.body.clientHeight;

		// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
		var maxScrollHeight = 0;

		dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
			if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
				// 그 안 모든 자식들에 무시 속성을 추가.
				var child_node = dmj(this).children();
				while(child_node.length >0){
					child_node.attr("ptm-child-ignore","true");
					child_node = child_node.children();
				}
			}
		});

		// 다시 최대값을 구한다.
		var max=0;
		// 선택자부분에서 무시속성이 된 부분은 제외한다.
		dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
			if (max<(dmj(this).offset().top + dmj(this).height())){
				max = (dmj(this).offset().top + dmj(this).height());
			}
		});

		if (max > frame.document.body.scrollHeight)
			maxScrollHeight = max;
		else
			maxScrollHeight = frame.document.body.scrollHeight;

		if ( frame.document.documentElement.clientHeight > 0 ) {
			//IE의 Quirks Mode가 아닌 7,8 모드
			try{
				if ( GPrintmade.isIE ) {
					scrollLeft = frame.document.documentElement.scrollLeft;
					scrollTop = frame.document.documentElement.scrollTop;
				}
			}catch(e){

				if ( PTMChecker.checkOS()	== "Win" ) {
					scrollLeft = frame.document.documentElement.scrollLeft;
					scrollTop = frame.document.documentElement.scrollTop;
				}
			}
			clientWidth = frame.document.documentElement.clientWidth;
			clientHeight = frame.document.documentElement.clientHeight;
		}

		if (scrollTop == 0) scrollTop = frame.document.documentElement.scrollTop;
		if (scrollLeft == 0) scrollLeft = frame.document.documentElement.scrollLeft;

		var download_div_left, download_div_top;

		if (clientWidth < dialog_width)
			download_div_left = scrollLeft;
		else
			download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;

		if (clientHeight < dialog_height)
			download_div_top = scrollTop;
		else
		download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;


		if (download_div_left < 0)
			download_div_left = 0;
		if (download_div_top < 0)
			download_div_top = 0;

		//var IMGURL = "http://192.168.1.39/4aphid/";
		var divPopup = 	"<div id='ptm-loading' ptm-loading-remove='true' style='position:absolute;z-index:2000002;top:"+download_div_top+"px;left:"+download_div_left+"px'>" +
							"<div id='PTMLoadImage' style='width:500px;height:310px;background-image:url(\""+INSTALL_IMG_URL+"printmade_loading.gif\");margin:0px auto;'>" +
								"<div style='text-align:center;position:absolute;width:100%;top:70%;'><span></span></div>" +
//								"<div style='text-align:center;position:absolute;width:100%;top:90%;'><span style='color: black; font-size: 12pt; font-weight: bold;'>프린트메이드가 설치되지 않았을 경우, <a href='#' style='color: red; font-size: 14pt; font-weight: bold;' onclick='PTMLoadingClose()'>이곳</a>를 눌러주십시오.</span></div>" +
							"</div>"+
						"</div>";

		dmj(document.body).append(divPopup);
		dmj(document.body).append('<div id="ptm-loading-bg" ptm-loading-remove="true" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:2000001;display:block;width:' + document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');


		}catch(e){
			dmj("#ptm-loading").remove();
			dmj("#ptm-loading-bg").remove();
		}



	dmj(window).resize(function(e){

		dmj("#ptm_down").animate({top:(dmj(window).scrollTop() + (dmj(window).height()-295)/2)},1);
		dmj("#ptm_down").animate({left:(dmj(window).scrollLeft() + (dmj(window).width()-455)/2)},1);
		dmj("#ptm_bg").animate({width:dmj(window).scrollLeft() + dmj(window).width()},1);
		dmj("#ptm_bg").animate({height:dmj(window).scrollTop() + dmj(window).height()},1);

	}).resize();

	dmj(window).scroll(function(e){
		dmj("#ptm_down").animate({top:(dmj(window).scrollTop() + (dmj(window).height()-295)/2)},1);
		dmj("#ptm_down").animate({left:(dmj(window).scrollLeft() + (dmj(window).width()-455)/2)},1);
		dmj("#ptm_bg").animate({width:dmj(window).scrollLeft() + dmj(window).width()},1);
		dmj("#ptm_bg").animate({height:dmj(window).scrollTop() + dmj(window).height()},1);
	}).scroll();
}

PTMAnt.Extend = function(destination,source){
	for(property in source){
		destination[property] = source[property];
	}
	return destination;
};
/* 사용자함수 */





PTMAnt.Extend(PTMAnt.Bridge,{
		onOpen : function(evt){

		},
		onClose : function(evt){

		},
		onMessage : function(evt){
			if((evt.data).search("Aphid Fine") > -1 || (evt.data).search("Bridge Fine") > -1){
				PTMAnt.Version = evt.data.match(/\d*\.\d*\.\d*\.\d*/gi);

					if(PTMAnt.isDataReceivedFromBridge == false){
						if(PTMCheckVersion.check(PTMAnt.Version,[VIEWER_VERSION])){

							setTimeout(function(){
								PTMAnt.printmade.Run(PTMAnt.targetframe);
								clearInterval(PTMAnt.Ant);
								PTMAnt.isPrintmadeRun = true;},1000);
							PTMAnt.isDataReceivedFromBridge = true;

						}else{
							PTMLoadingClose();
						}

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




var ptmcnt = 0;
var ptmstarted = false;

// 아피드 관련
PTMAnt.Extend(PTMAnt,{
	init:function(options,GPrintmade,targetframe){
		this.printmade = GPrintmade;
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
			//console.log("프린트메이드 실행")
			this.isClick = true;
		}
		this.connectBridge("30401");
	},
	run:function(){
		if(!this.isDataReceivedFromBridge){
			ptmcnt++;
			try{
				if(ptmcnt > 2 && ptmstarted == false){
					ptmstarted = true;
					this.runBridge();
				}
				this.tryToConnect();
				if(this.isPrintmadeRun == false){
					this.sendBridge("HowAreYou");
				}

				if(ptmcnt > 10){
					alert("프린트메이드가 정상적으로 설치되지 않았습니다.");
					PTMLoadingClose();
				}

			}catch(e){
				//console.log("프린트메이드 접속 시도 중...");
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

function appendParameter(option, data){
	return option + "|" + data;
}

function makeParameter(elementid,ssloption,pagewidth,formurl,originurl,margin,align,framename,targetpath,pageheight){


	var myoption="";

	myoption = appendParameter(myoption,elementid)
	myoption = appendParameter(myoption,ssloption)
	myoption = appendParameter(myoption,pagewidth)
	myoption = appendParameter(myoption,formurl)
	myoption = appendParameter(myoption,originurl)
	myoption = appendParameter(myoption,margin)
	myoption = appendParameter(myoption,align)
	myoption = appendParameter(myoption,framename)
	myoption = appendParameter(myoption,targetpath)
	myoption = appendParameter(myoption,pageheight)


	return myoption;

}

/*
	LSW
	2016.05.19
	promise 객체 defer 객체는 defer로 설치 체크를 완벽히 하기 위한 객체
	headDonutAdd는 head에 스크립트 태그추가
*/
var promise; //promise 전역객체
var defer;	//defer 객체
function headDonutAdd(){
	alert('headDonutAdd');
	Donut.checkmode = 1;
	var url = "https://127.0.0.1:30403"; // URL of the external script
	// this shows dynamic script insertion
	var script = document.createElement('script');
	script.setAttribute('src', url);
	document.getElementsByTagName('body')[0].appendChild(script);
	setTimeout(function(){
		document.getElementsByTagName('body')[0].removeChild(script);
	},10000);
}
/**********************************************************************************************
 * PTMPrintWebPage 캡쳐 함수
 *
 *  - Parameters -
 * frame_name : 원하는 프레임의 name 또는 id를 입력한다. 전체 페이지 캡쳐이면 빈 스트링 '' 을 넣는다.
 * elementid : 캡쳐하려는 Element의 id를 넣는다. CSS Selector 처럼 #[id] 형태로 넣는다.
 * objectcapture : 스크롤 캡쳐의 작동여부를 설정한다. 플래시가 존재할 때 주로 설정한다. 0은 작동안함, 1은 작동함.(true,false)
 * cutrect : 캡쳐된 이미지를 인쇄할 때 '상,우,하,좌' 를 얼만큼 잘라낼 것인가를 설정한다.
 * formvar : 양식파일에 지정된 사용자 변수에 대한 값을 넣는다.
 * formurl : 양식파일의 경로를 지정한다. 지정되지 않으면 FORMURL 전역변수를 사용한다.
 * PTMPrintWebPage({frame_name:'',cutrect:'0,0,0,0'});
 *
 **********************************************************************************************/

function PTMPrintWebPage(options)
{
						//alert("TTTEST1");
	//인쇄되기 직전에 필요한 작업들을 PTM_BeforePrinting 함수에서 작업한다.
	//JavaScript가 제대로 로드 되었는지 확인한다.
	//PTM_LoadDialog();
	PTMPathConverter.run();
	//Donut.init();
	//options.elementid = "#printArea";
	defer = $.Deferred();
	promise = defer.promise();
	PTMInstallChecker.check();
	if(!PTMInstallChecker.isPTM){
		headDonutAdd();
	}

	ptmcnt = 0;
	ptmstarted = false;

	if (validateJavaScript() == false)
		return;

	//GPrintmade는 전역으로 설정되어 있다.
	GPrintmade = new PTMMainController();
	if(GPrintmade == null)
		return;

	var targetframe = null;
	//Target Frame ID

	if(options.frame_name != undefined && options.frame_name != ''){

		var frameobject = Soo.Util.FindFrame(GPrintmade_NonCrossTop, options.frame_name);

		if(frameobject != null && frameobject != undefined){
			targetframe = frameobject;
			GPrintmade.option.SetFrameId(options.frame_name);
		}
		else
			targetframe = GPrintmade_NonCrossTop;
	}else{
		targetframe = GPrintmade_NonCrossTop;
	}
	//Validate Target Frame
	if(dmj('frameset',targetframe.document)[0] != undefined){
		alert('PTMPrintWebPage 함수의 [frame_name]의 frame은 frameset이 아닌 body를 가지고 있어야 합니다.');
/* 		return; */
		targetframe = GetMainFrame();
	}

	PTM_BeforePrinting(options,targetframe);

	//Target Element ID
	if(options.elementid != undefined){
		if(dmj(options.elementid,targetframe.document).length == 0){
			alert('PTMPrintWebPage 함수의 elementid의 Element를 찾을 수 없습니다.');
			return;
		}

		GPrintmade.option.SetElementId(options.elementid);
		if(options.executeJavaScript != undefined)
			GPrintmade.option.SetExecuteString(executeJavaScript);
			//Validate Target Element
	}


	//Object Capture
	if(options.objectcapture == 0){
		GPrintmade.option.SetCaptureEnabled(false);
	}else{
		GPrintmade.option.SetCaptureEnabled(true);
	}

	//Cut
	if(options.cutrect != undefined){
		GPrintmade.option.SetCutRect(options.cutrect);
	}

	//Other options
	GPrintmade.option.SetLicense(LICENSE_CODE);
	GPrintmade.option.SetRenderingType(RENDERINGTYPE);
	GPrintmade.option.SetDialogRect(DIALOG_RECT);
	GPrintmade.option.SetOrientation(ORIENTATION);
	GPrintmade.option.SetAlignment(PAGEALIGNMENT);
	GPrintmade.option.SetPageMargin(PAGEMARGIN);
	GPrintmade.option.SetUserPreference(USERPREFERENCE);
	GPrintmade.option.SetDialogMode(DIALOGMODE);

	//2.0.1.0
	GPrintmade.option._customer = PMCUSTOMER;
	GPrintmade.option._logoimg = PMLOGOIMG;
	GPrintmade.option._icon = PMICON;
	GPrintmade.option._pagesize = PMPAGESIZE;


  GPrintmade.option.SetPageWidth(PMPAGEWIDTH);



    // 2.0.1.3
	GPrintmade.option.SetMemo(PMMEMO);

	GPrintmade.option.SetZoom(PMZOOM);


	  if(location.hostname.indexOf("dev") != -1){
    //FORMURL = SERVER_PATH + '/server_files/formdev.txt';
  }else{
	  //FORMURL = "https://www.shinhancard.com/solution/printmade3/server_files/form.txt";
  }

	if(options.formurl != undefined){
		  GPrintmade.option.SetFormURL(options.formurl);
	}else{
		GPrintmade.option.SetFormURL(FORMURL);
	}


	if(options.formvar != undefined && typeof(options.formvar) == 'object')
	{
		var formvar = '';
		formvar = JSON.stringify(options.formvar);
		formvar = formvar.replace(/\"/gi,"\'");
		GPrintmade.option.SetFormVariables(formvar);
	}


	if(PTMBridge != undefined){
		PTMBridge.init(options,GPrintmade,targetframe);
		PTMBridge.Run(options);
	}
	//GPrintmade.Run(targetframe);

	//인쇄 작업이 끝난 후 작업들을 PTM_AfterPrinting 함수에서 작업한다.
	PTM_AFTERPRINTING.push([PTM_AfterPrinting,options]);
}


/*
	function PTM_LoadDialog(pframe){

		this._frame = pframe;
		var frame = pframe;//GPrintmade_NonCrossTop;
		var dialog_width = 235;
		var dialog_height = 65;
		var downloaddiv = frame.document.createElement('div');
		var scrollLeft = frame.document.body.scrollLeft;
		var scrollTop = frame.document.body.scrollTop;
		var clientWidth = frame.document.body.clientWidth;
		var clientHeight =frame.document.body.clientHeight;

		// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
		if(navigator.appName != "Microsoft Internet Explorer"){
			var maxScrollHeight = 0;

			dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
				if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
					// 그 안 모든 자식들에 무시 속성을 추가.
					var child_node = dmj(this).children();
					while(child_node.length >0){
					 child_node.attr("ptm-child-ignore","true");
					 child_node = child_node.children();
					}
				}
			});

			// 다시 최대값을 구한다.
			var max=0;
			// 선택자부분에서 무시속성이 된 부분은 제외한다.
			dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
				if (max<(dmj(this).offset().top + dmj(this).height())){
					max = (dmj(this).offset().top + dmj(this).height());
				}
			});
		}

		if (max > frame.document.body.scrollHeight)
			maxScrollHeight = max;
		else
			maxScrollHeight = frame.document.body.scrollHeight;

		if(navigator.appName == "Microsoft Internet Explorer" && frame.document.documentElement.clientHeight > 0){
			//IE의 Quirks Mode가 아닌 7,8 모드
			scrollLeft = frame.document.documentElement.scrollLeft;
			scrollTop = frame.document.documentElement.scrollTop;
			clientWidth = frame.document.documentElement.clientWidth;
			clientHeight = frame.document.documentElement.clientHeight;
		}

		if (scrollTop == 0) scrollTop = frame.document.documentElement.scrollTop;
		if (scrollLeft == 0) scrollLeft = frame.document.documentElement.scrollLeft;

		var download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;
		var download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;


		if (download_div_left < 0)
			download_div_left = 0;
		if (download_div_top < 0)
			download_div_top = 0;

	//		alert(frame.document.body);
	//	dmj(frame.document.body).append("<div id='ptm-loading' style='position:fixed;top:"+download_div_top+";left:"+download_div_left+";z-index:10001;'><img src='/solution/printmade2/server_files/imgs/load.png'></div>");
  //	dmj("body").append("<div id='ptm-loading' style='position:fixed;top:"+download_div_top+";left:"+download_div_left+";z-index:10001;'><img src='/solution/printmade2/server_files/imgs/load.png'></div>");
//  dmj("body").append("<span style='position:absolute;height:65px;width:250px;top:"+ download_div_top +"px;left:"+download_div_left+";background-image:url("+INSTALL_IMG_URL+"load.png);z-index:10001'><\/span>");

    dmj(frame.document.body).append("<div id='ptm-loading' ptm-loading-remove='true' style='position:fixed;z-index:10001;top:"+(document.body.clientHeight-65)/2+"px;left:"+(document.body.clientWidth-240)/2+"px'><img src='"+SERVER_PATH+"/server_files/imgs/load.png'></div>");
  //		dmj(frame.document.body).append('<div id="ptm-loading-bg" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');
		dmj(frame.document.body).append('<div id="ptm-loading-bg" ptm-loading-remove="true" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');
	return false;
	}
*/


// 로드시 이미지가 출력되는 함수임.
//
//
/*
function PTM_LoadDialog(){
  //alert("1");
  var dialog_width = 500;
  var dialog_height = 310;
  var downloaddiv = document.createElement('div');
  var scrollLeft = document.body.scrollLeft;
  var scrollTop = document.body.scrollTop;
  var clientWidth = document.body.clientWidth;
  var clientHeight =document.body.clientHeight;
  var max = 0;
  var maxScrollHeight = 0;

  // 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
  if(navigator.appName != "Microsoft Internet Explorer"){
   dmj("div").each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
    if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
     // 그 안 모든 자식들에 무시 속성을 추가.
     var child_node = dmj(this).children();
     while(child_node.length >0){
      child_node.attr("ptm-child-ignore","true");
      child_node = child_node.children();
     }
    }
   });
   // 다시 최대값을 구한다.
   // 선택자부분에서 무시속성이 된 부분은 제외한다.
	   try{
		   dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]").each(function(){
			if (max<(dmj(this).offset().top + dmj(this).height())){
			 max = (dmj(this).offset().top + dmj(this).height());
			}
			});
	   }catch(e){

	   }
  }
   if (max > document.body.scrollHeight)
    maxScrollHeight = max;
   else
    maxScrollHeight = document.body.scrollHeight;
  if(navigator.appName == "Microsoft Internet Explorer" && document.documentElement.clientHeight > 0){
   //IE의 Quirks Mode가 아닌 7,8 모드
   scrollLeft = document.documentElement.scrollLeft;
   scrollTop = document.documentElement.scrollTop;
   clientWidth = document.documentElement.clientWidth;
   clientHeight = document.documentElement.clientHeight;
  }
  if (scrollTop == 0) scrollTop = document.documentElement.scrollTop;
  if (scrollLeft == 0) scrollLeft = document.documentElement.scrollLeft;
  var download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;
  var download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;

  if (download_div_left < 0)
   download_div_left = 0;
  if (download_div_top < 0)
   download_div_top = 0;
 //  alert(document.body);
 // dmj(document.body).append("<div id='ptm-loading' style='position:fixed;top:"+download_div_top+";left:"+download_div_left+";z-index:10001;'><img src='/solution/printmade2/server_files/imgs/load.png'></div>");
  // dmj("body").append("<div id='ptm-loading' style='position:fixed;top:"+download_div_top+";left:"+download_div_left+";z-index:10001;'><img src='/solution/printmade2/server_files/imgs/load.png'></div>");
//  dmj("body").append("<span style='position:absolute;height:65px;width:250px;top:"+ download_div_top +"px;left:"+download_div_left+";background-image:url("+INSTALL_IMG_URL+"load.png);z-index:10001'><\/span>");
    dmj(document.body).append("<div id='ptm-loading' ptm-loading-remove='true' style='position:fixed;z-index:10001;top:"+(document.body.clientHeight-300)/2+"px;left:"+(document.body.clientWidth-510)/2+"px'><img src='"+INSTALL_IMG_URL+"printmade_loading.gif' ptm-loading-remove='true'></div>");
  //  dmj(document.body).append('<div id="ptm-loading-bg" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');
  dmj(document.body).append('<div id="ptm-loading-bg" ptm-loading-remove="true" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');
  //alert("2");
 }*/

// 참고 : http://msdn.microsoft.com/ko-kr/ie/cc405106
function getInternetExplorerVersion() {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
		}
		return rv;
	}


/**********************************************************************************************
 *
 * PTM_BeforePrinting
 * PTM_AfterPrinting
 *
 **********************************************************************************************/

function PTM_BeforePrinting(options,targetframe){

		options.objectcapture=false;

		/*
		dmj('*', '.dataTable').contents().filter(function(){return this.nodeType == 3;}).each(function(){
			  var _size = dmj(this.parentNode).css('fontSize');
			  var _align = dmj(this.parentNode).css('text-align');
			  dmj(this.parentNode).css('fontSize', _size);
			  dmj(this.parentNode).css('text-align', _align);
			 });

		dmj('.pageInfo .innerWrap', targetframe.window.document).css('visibility', 'hidden');
		*/

		/*if(dmj("input[type*='radio']").length > 0){
			dmj("input[type*='radio']").attr("ptmchecked","false");
			dmj("input[type*='radio']:checked").attr("ptmchecked","true");
		}*/

		//PMPAGEWIDTH = dmj(targetframe.document.body).width();


		if(options.elementid == undefined)
		{
			PMPAGEWIDTH = dmj(targetframe.document.body)[0].scrollWidth;
		}
		else
		{
			PAGEMARGIN = '0,20,4,20';
		}

}
function PTM_AfterPrinting(options)
{

  if(dmj('#ptm-loading').length > 0) dmj('#ptm-loading').remove();
	if(dmj('#ptm-loading-bg').length > 0) dmj('#ptm-loading-bg').remove();

	if(options.elementid!=undefined){
		var $div_element = dmj("div");

		if($div_element != undefined){
			for(i=0;i<$div_element.length;i++){
				var $element = dmj($div_element[i]);
				$element.height($element.attr('ptm_original_height'));
			}
		}
	}
	//dmj('.pageInfo .innerWrap', targetframe.window.document).css('visibility', 'visible');
	if(options.elementid == undefined)
	{
		PMPAGEWIDTH = '';
	}


}
/**********************************************************************************************
 *
 * Works at each frames
 *
 **********************************************************************************************/
var PTM_WorkAt = function(context){
	//1. background-image
	//상대 경로로 되어 있는 background-image들을 절대 경로로 바꿔준다.
	dmj('body *:not(embed):not(object)',context).filter(function(){
		return this && dmj(this) && dmj(this).css('background-image') && (dmj(this).css('background-image').indexOf('http') != -1) }).each(function(){
		dmj(this).attr('ptm-background-image',this.style.backgroundImage);
		dmj(this).css('background-image',dmj(this).css('background-image'));
	});

	//2. Input
	dmj('body input[type!="hidden"]',context).each(function(){
		dmj(this).attr('value',dmj(this).val());
	});
	//3. Select
	dmj('body select',context).each(function(){
		var selectedIndex = this.selectedIndex;
		dmj('option[selected]',this).removeAttr('selected');
		dmj('option:eq('+selectedIndex+')',this).attr('selected','selected');
/* 		dmj(this).attr('selectedIndex',this.selectedIndex); */
	});
};
var PTM_AfterWorkingAt = function(context){
	//1. Restore background-image
	dmj('body *[ptm-background-image]',context).each(function(){
		dmj(this).css('background-image',dmj(this).attr('ptm-background-image'));
	});
};

/**********************************************************************************************
 *
 * Custom works
 *
 **********************************************************************************************/

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
var dmj = jQuery.noConflict();

dmj(document).ready(function(){
	Printmade3Init();
});

/*  dmj(document).ready(function(){
    dmj("#ptm_download").focus();
  });*/
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

///////////////////////////////
//Soo Framework (Singleton)////
///////////////////////////////
var Soo = {
	Extend:{},
	Helper:{},
	URL:{},
	Class:{},
	Cookie:{},
	Util:{}
};

/*//////////////////////////////
//Soo Extend
//다른 오브젝트들을 확장할 수 있게 해준다.
//////////////////////////////*/
Soo.Extend = function(destination,source){
	for(property in source){
		destination[property] = source[property];
	}
	return destination;
};


//

Soo.Extend(Soo.Util, {
	CheckCrossDomain : function(framewin) {
		try
		{
			var document_test = framewin.document;

			if (document_test == undefined || document_test.getElementById == undefined) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (e) {
			return true;
		}
	},
	FindFrame : function (frame, id) {
		if (this.CheckCrossDomain(frame) == true)
		{
			return null;
		}
		//여기선 id로 체크 - IE의 경우 frame.name과 id과 호환이 안된다.
		if (frame.document.getElementById(id) != null) {
			return frame.document.getElementById(id).contentWindow;
		}
		if (frame.frames == null)
			return null;

		for (var i = 0; i < frame.frames.length; i++) {

	//여기선 name으로 체크
			if(frame.frames[i].name == id){
				return frame.frames[i];
			}

			result = this.FindFrame(frame.frames[i], id);
			if (result != null) {
				return result;
			}
		}

		return null;
	}
});

/*//////////////////////////////
//Soo Helper
//유용한 함수들
//////////////////////////////*/
Soo.Extend(Soo.Helper,{
	//arguments 를 Array 객체로 변경해줌
	toArray:function(p_arguments){
		var result = [];
		for(var i = 0; i < p_arguments.length; i++){
			result.push(p_arguments[i]);
		}
		return result;
	}
});
/*//////////////////////////////
//Soo URL
//URL 관련 함수들
//////////////////////////////*/
Soo.Extend(Soo.URL,{		// Do : http://www.bugs.co.kr/player/download/index.html -> http://www.bugs.co.kr/player/download
	getStaticPath:function(url){
		var regex = /[\w:\/\/]+.*\//;
		//		var regex = /[\w:\/\/\.%]+\//;
		var result = (""+url).match(regex);
		return result;
	}
});


/*////////////
// Do Cookie
//////////////
//*/
Soo.Extend(Soo.Cookie, {
	setCookie: function(cName, cValue, cDay){  // Do : create, update or remove cookie. Remove when cDay == -1
		var expire = new Date();
		expire.setDate(expire.getDate() + cDay);
		cookies = cName + '=' + escape(cValue) + '; path=/ ';
		if (typeof cDay != 'undefined')
			cookies += ';expires=' + expire.toGMTString() + ';';

		document.cookie = cookies;
	},
	getCookie: function(cName){
		// How to use : var result = SooFramework.getCookie('cookiename');
		// Do : get information about cookies. (name, value, path, domain)
		var name, value, path, domain;
		if (document.cookie && document.cookie != "") {
			var cookies = document.cookie.split(';');
			var cookiearr = new Array(cookies.length);
			var url = "" + document.location;
			url = "" + Soo.URL.getStaticPath(url);
			var start = url.indexOf("//");
			var sub = url.substring(start + 2);

			var sub_start = sub.indexOf(".");
			var sub_finish = sub.indexOf("/");
			domain = sub.substring(sub_start, sub_finish);
			for (var i = 0; i < cookies.length; i++) {
				cookiearr[i] = cookies[i].split('=');
			}
			for (var i = 0; i < cookies.length; i++) {
				name = unescape(cookiearr[i][0]);
				value = unescape(cookiearr[i][1]);
				path = '/'
			//	PrintmadePlugin.setCookie(name, value, path, domain);
			//	alert(name + ", " + value + ", " + path + ", " + domain);
				if(name.indexOf(cName) != -1)
				  return value;
			}
			return null;
		}
		else
			alert("Empty Cookie");
	}
});



/*//////////////////////////////
//[Object] 확장
//////////////////////////////*/
Soo.Extend(Object,{
	isFunction: function(object) {
 		return typeof object == "function";
  	},
	  isUndefined: function(object) {
    return typeof object == "undefined";
  },
	keys: function(object) {
    	var keys = [];
    	for (var property in object) {
			keys.push(property);
		}
    	return keys;
  }
});
/*//////////////////////////////
//[Function] 확장
//////////////////////////////*/
Soo.Extend(Function.prototype, {
	//function
	argumentNames: function() {
    	var names = this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
 	},
	bind: function() {
    	if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    	var __method = this, args = Soo.Helper.toArray(arguments), object = args.shift();
    		return function() {
      			return __method.apply(object, args.concat(Soo.Helper.toArray(arguments)));
    		}
  	},
	wrap: function(wrapper) {
    	var __method = this;
    	return function() {
      		return wrapper.apply(this, [__method.bind(this)].concat(Soo.Helper.toArray(arguments)));
    	}
  	}
});

/*//////////////////////////////
//Soo Class
//
//////////////////////////////*/

Soo.Class = {
	create: function(){
		//Class.create
		var parent = null, properties = Soo.Helper.toArray(arguments);

		if (Object.isFunction(properties[0]))
			parent = properties.shift();
		//
		function klass(){
			this.__init__.apply(this,arguments);
		}
		Soo.Extend(klass, Soo.Class.Methods);
		//
		klass.superclass = parent;
		klass.subclasses = [];
		//
		if(parent){
			//
			var subclass = function(){};
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}
		for(var i =0 ; i < properties.length; i++){
			klass.addMethods(properties[i]);
		}
		if (!klass.prototype.__init__)
    		klass.prototype.__init__ = function(){ alert('__init__');};

		klass.prototype.constructor = klass;

		return klass;
	},
	createSingleton:function(methods){
		var result = {};
		Soo.Extend(result,methods);
		return result;
	}
};
Soo.Class.Methods = {
	//
	addMethods: function(source){
		//superclass
		var ancestor = this.superclass && this.superclass.prototype;
		//
		var properties = Object.keys(source);

		//????
		if(!Object.keys({toString:true}).length)
			properties.push("toString","valueOf");
		for(var i = 0, length = properties.length; i < length; i++){
			//
			var property = properties[i], value = source[property];
			//
			if(ancestor && Object.isFunction(value) && value.argumentNames()[0] == "$super"){
				//
				var method = value;
				//
				value = (function(m) {
					return function(){return ancestor[m].apply(this,arguments)};
				})(property).wrap(method);

				value.valueOf = method.valueOf.bind(method);
        		value.toString = method.toString.bind(method);
			}
			this.prototype[property] = value;

		}
		return this;
	}
};



var PTMOptionObject = Soo.Class.create({
	__init__:function(){
		this._frameid =  'NOID';
		this._elementid = '';
		this._dialogmode = 1;

		this._alignment = 'left';

		this._dialog = '0,0,0,0';
		this._cut = '0,0,0,0';

		this._tag_pagebreak = [];
		this._manual_pagebreak = '';
		this._pagebreaks = ''

		this._originalurl = '';
		this._license = '';
		this._formurl = '';

		this._renderingtype = 'image'; // image | webobject;

		this._parameters = '';
		this._frameindex = 1;

		this._executestring = '';
		this._captureenabled = false;

		this._orientation = 'portrait';

		this._formvar = '';

		this._pagemargin = '';
		this._userpreference = 0;

		this._customer = '';
		this._logoimg = '';
		this._icon = '';
		this._pagesize = '';

		this._memo = 0;
		this._zoom = 0;

		this._pagewidth = '';

	},
	_FindFrame : function (frame, id) {
		if (frame.document.getElementById(id) != null) {
			return frame;
		}
		else {
			if (frame.frames == null)
				return null;
			for (var i = 0; i < frame.frames.length; i++) {
				result = this._FindFrame(frame.frames[i], id);
				if (result != null) {
					return result;
				}
			}
		}
		return null;
	},
	_GetElementForFrame : function (frame) {
		if (frame == GPrintmade.top)
		{
			return GPrintmade.top;
		}

		var parent = frame.parent;
		var frm = parent.document.getElementsByTagName('frame');
		var ifrm = parent.document.getElementsByTagName('iframe');

		for (i = 0; i < frm.length; i++)
		{
			if (frm[i].contentDocument == frame.document)
			{
				return frm[i];
			}
		}

		for (i = 0; i < ifrm.length; i++)
		{
			if (ifrm[i].contentDocument == frame.document)
			{
				return ifrm[i];
			}
		}
	},
	GetPageMargin:function(){
		return this._pagemargin;
	},
	SetPageMargin:function(val){
		this._pagemargin = val;
	},
	GetUserPreference:function(){
		return this._userpreference;
	},
	SetUserPreference:function(val){
		this._userpreference = val;
	},
	GetFormVariables : function() {
		return this._formvar;
	},
	SetFormVariables : function(formvar) {
		this._formvar = formvar;
	},
	GetCaptureEnabled : function() {
		return this._captureenabled;
	},
	SetCaptureEnabled : function(enabled) {
		this._captureenabled = enabled;
	},
	GetExecuteString : function() {
		return this._executestring;
	},
	SetExecuteString : function(string) {
		this._executestring = string;
	},
	SetFrameId : function(id) {
		this._frameid = id;
	},
	GetFrameId : function() {
		var fid = (this._frameid);
		return fid;
	},
	GetElementId : function() {
		return this._elementid.substring(1);
	},
	SetElementId : function(id) {
		this._elementid = id;
	//	this._elementid = '#printArea';
	},
	SetFrameIdWithElementId : function(id) {
		if (id == '')
			return;

		var frame = this._FindFrame(GPrintmade.top, id);

		if (frame == top) {
			this.SetFrameId('NOID');
			return;
		}
		else {
			var frame_element = frame.frameElement;
			/*
if(frame_element == undefined)
			{
				;
			}
*/

			if (frame_element.id == '' || frame_element.id == null)
			{
				frame_element.id = 'ptm_frm' + this._frameindex;
				this.frameindex = this._frameindex + 1;
			}
			this.SetFrameId(frame_element.id);
			return;
		}
	},
	SetOrientation : function(mode) {
    this._orientation = mode;
  },
	SetDialogMode : function(mode) {
		this._dialogmode = mode;
	},
	SetDialogRect : function(dialog) {
		this._dialog = dialog;
	},
	SetAlignment : function(alignment) {
		this._alignment= alignment.toLowerCase();
	},
	GetAlignment : function(alignment) {
		return this._alignment;
	},
	SetCutRect : function(cut) {
		this._cut = cut;
	},
	AddPagebreak : function(height) {
		this._tag_pagebreak.push(parseInt(height));
	},
	SetPagebreak : function(pagebreak) {
		this._manual_pagebreak = pagebreak;
	},
	_GetPagebreak : function() {
		var all_pagebreak = this._tag_pagebreak;

		if (this._manual_pagebreak != '')
		{
			var tmp = this._manual_pagebreak.split(',');
			for (var i = 0; i < tmp.length; i++)
			{
				all_pagebreak.push(parseInt(tmp[i]));
			}
		}

		for (var i = 0; i < all_pagebreak.length - 1; i++)
		{
			for (var j = i + 1; j < all_pagebreak.length; j++)
			{
				if (parseInt(all_pagebreak[i]) > parseInt(all_pagebreak[j]))
				{
					var tmp = all_pagebreak[i];
					all_pagebreak[i] = all_pagebreak[j];
					all_pagebreak[j] = tmp;
				}
			}
		}

		return all_pagebreak.toString();
	},
	SetLicense : function(lic_code) {
		this._license = lic_code;
	},
	SetRenderingType : function(type) {
		this._renderingtype = type;
	},
	SetFormURL : function(url) {
		this._formurl = url;
	},
	SetOriginalURL : function(baseURI) {
		this._originalurl = baseURI;
	},
	SetMemo : function( memo ) {
		this._memo = memo;
	},
	SetZoom : function( zoom ) {
		this._zoom = zoom;
	},
	SetPageWidth : function( pagewidth ) {
		this._pagewidth = pagewidth;
	},
	_AddParameter : function(name, value) {
		if (this._parameters == '')
			this._parameters = name + ':' + value;
		else
			this._parameters = this._parameters + '|' + name + ':' + value;
	},
	GetParameterString : function() {
		// Parameter Sample
		// FRAMEID:main|ELEMENTID:divid|DIALOGMODE:1|DIALOGRECT:0,0,NULL,NULL|ALIGNMENT:left|CUTRECT:NULL,NULL,10,10|PAGEBREAKS:100,200,300|LICENSE:base64encoding|RENDERINGTYPE:'image|webobject|FORMURL:http://www.printmade.co.kr/yangsic/form.txt'

		if (this._frameid != '')
			this._AddParameter('FRAMEID', this._frameid);

		if (this._elementid != '')
			this._AddParameter('ELEMENTID', this._elementid);
		else{

			if(dmj('#printArea').length > 0){

				this._AddParameter('ELEMENTID', '#printArea');

			}else if(dmj('#printarea').length > 0){

				this._AddParameter('ELEMENTID', '#printarea');

			}else{

			}

		}
			//

		this._AddParameter('DIALOGMODE', this._dialogmode);

		if (this._dialogmode == 1 && this._dialog != '0,0,0,0')
			this._AddParameter('DIALOGRECT', this._dialog);

		this._AddParameter('ALIGNMENT', this._alignment);

		this._AddParameter('CUTRECT', this._cut);

		this._pagebreaks = this._GetPagebreak();

		if (this._pagebreaks != '')
			this._AddParameter('PAGEBREAKS', this._pagebreaks);

		this._AddParameter('LICENSE', this._license);

		this._AddParameter('RENDERINGTYPE', this._renderingtype);

		this._AddParameter('FORMURL', this._formurl);

		this._AddParameter('ORIGINALURL', this._originalurl);

		this._AddParameter('ORIENTATION', this._orientation);

		this._AddParameter('FORMVAR', this._formvar);

		this._AddParameter('PAGEMARGIN', this._pagemargin);

		this._AddParameter('USERPREFERENCE', this._userpreference);

		this._AddParameter('CUSTOMER', this._customer);
		this._AddParameter('LOGOIMG', this._logoimg);
		this._AddParameter('ICON', this._icon);
		this._AddParameter('PAGESIZE', this._pagesize);

		this._AddParameter('MEMO', this._memo);
		this._AddParameter('ZOOM', this._zoom);

		this._AddParameter('PAGEWIDTH', this._pagewidth);

		return this._parameters;
	}

})
var PTMInstaller = Soo.Class.create({
	__init__:function(isIE,frame){
		this._frame = frame;
		this._isIE = isIE;
		this._exepath = '';
		this._viewerpath = '';
		this._PRINT_URL = '';
		this._LIC_CODE = '';
		this._axversion = '0,0,0,0';
	},
	CheckInstall : function () {
		if (this._isIE == true) {
			try {
				plugin = new ActiveXObject('Printmade3.Printmade3ActiveX');
				plugin = null;
				return true;
			} catch (e) {
				if (e.message != "Object doesn't support this property or method") {
					// Couldn't create the plugin; return false
					plugin = null;
					PTM_DownloadDialog();
					return false;
				}
			}
		} else {
			var mimetype = navigator.mimeTypes["application/nagosoft/printmade3"];

			if (mimetype == undefined) {
				PTM_DownloadDialog();
				return false;
			}

			if (!mimetype.enabledPlugin) {
				PTM_DownloadDialog();
				return false;
			}
			return true;
		}
	},
	CheckVersion : function(plugin) {
		try{
			var appdatapath = plugin.getAppDataPath();
		}catch(e){
//			alert('Printmade 3 : ' + e.description);
		}
		if(GPrintmade.isWindows){
			appdatapath = plugin.getRunPath();
		}
		var current_viewer_version = "3.0.0.0";
		try{
			if(GPrintmade.isWindows) {
				current_viewer_version = plugin.getFileVersion(appdatapath + '/Printmade3/Viewer.exe\0');
			} else if(GPrintmade.isLinux){
				//return true;
				//current_viewer_version = plugin.getFileVersion('Viewer');
				return true;
			} else if(GPrintmade.isMac) {
				//current_viewer_version = plugin.getFileVersion(appdatapath + '/Printmade2/Viewer.app/Contents/Info.plist\0');
				return true;
			}
		}catch(e){
			alert(UPDATE_ERROR_MSG);
			PTM_DownloadDialog();
			return false;
		}
		//this._CompareVersion(current_viewer_version.toString(), VIEWER_VERSION)
		try {
			if (PTMCheckVersion.check([current_viewer_version],[VIEWER_VERSION]) == false) {
				PTM_DownloadDialog();
				return false;
			} else {
				return true;
			}
		} catch (e) {
			return true;
		}
	},
	_CompareVersion: function(current_version, new_version) {
		var current_arr = current_version.split('.');
		var new_arr = new_version.split('.');
		for (var i = 0; i < 4 ; i++)
		{
			current_arr[i] = parseInt(current_arr[i]);
			new_arr[i] = parseInt(new_arr[i]);
		}

		if (current_arr[0] < new_arr[0])
			return false;
		else if(current_arr[0] > new_arr[0])
			return true;
		else if (current_arr[1] < new_arr[1])
			return false;
		else if (current_arr[1] > new_arr[1])
			return true;
		else if (current_arr[2] < new_arr[2])
			return false;
		else if (current_arr[2] > new_arr[2])
			return true;
		else if (current_arr[3] < new_arr[3])
			return false;
		else if (current_arr[3] > new_arr[3])
			return true;

		return true;
		}, /*
	_Download : function (pframe) {
		this._frame = pframe;
		var frame = pframe;//GPrintmade_NonCrossTop;
		var dialog_width = 455;
		var dialog_height = 295;
		var downloaddiv = frame.document.createElement('div');
		var scrollLeft = frame.document.body.scrollLeft;
		var scrollTop = frame.document.body.scrollTop;
		var clientWidth = frame.document.body.clientWidth;
		var clientHeight =frame.document.body.clientHeight;

		// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
		var maxScrollHeight = 0;

		dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
			if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
			    // 그 안 모든 자식들에 무시 속성을 추가.
			    var child_node = dmj(this).children();
			    while(child_node.length >0){
			     child_node.attr("ptm-child-ignore","true");
			     child_node = child_node.children();
			    }
			}
		});

		// 다시 최대값을 구한다.
		var max=0;
		// 선택자부분에서 무시속성이 된 부분은 제외한다.
		dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
			if (max<(dmj(this).offset().top + dmj(this).height())){
				max = (dmj(this).offset().top + dmj(this).height());
			}
		});

		if (max > frame.document.body.scrollHeight)
			maxScrollHeight = max;
		else
			maxScrollHeight = frame.document.body.scrollHeight;

		if(GPrintmade.isIE && frame.document.documentElement.clientHeight > 0){
			//IE의 Quirks Mode가 아닌 7,8 모드
			scrollLeft = frame.document.documentElement.scrollLeft;
			scrollTop = frame.document.documentElement.scrollTop;
			clientWidth = frame.document.documentElement.clientWidth;
			clientHeight = frame.document.documentElement.clientHeight;
		}

		if (scrollTop == 0) scrollTop = frame.document.documentElement.scrollTop;
		if (scrollLeft == 0) scrollLeft = frame.document.documentElement.scrollLeft;

		var download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;
		var download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;


		if (download_div_left < 0)
			download_div_left = 0;
		if (download_div_top < 0)
			download_div_top = 0;

    if(GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true){
        var now_focus = frame.document.body;
      }else{
        var now_focus = frame.event.srcElement;
        now_focus = now_focus.parentElement;
      }

    dmj(now_focus).after('<div id = "bg" style = "filter:alpha(opacity=50);opacity:0.5;position:fixed;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');

  	//dmj(frame.document.body).append('<div id = "down" onblur="dmj(\'#ptm-cancel\').focus();" align = center style="position:absolute;top:' + download_div_top + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:5001;display:block"></div>');
		 dmj(now_focus).after('<div id = "down" align = center style="position:fixed;top:' + ((clientHeight - dialog_height) / 2)  + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:10001;display:block"></div>');
	  // dmj(now_focus).append('<div id = "down" align = center style="position:fixed;top:0px;left:0px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:10001;display:block"></div>');


	//	dmj(frame.document.body).append('<div id = "down" align = center style="position:absolute;top:' + download_div_top + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:5001;display:block"></div>');
		var down_div = frame.document.getElementById('ptm-down');
		var $down_div = dmj(down_div);
		$down_div.append('<div style="height:160px"></div>');
		$down_div.append('<p>'+INSTALL_DIV_MSG+'</p>');

		var download_url = '';

		if (GPrintmade.isWindows == true) {
			download_url = WIN_DOWNLOAD_URL;
			$down_div.append('<a tabindex=0 href = "' + download_url + '" id = "ptm_download"  title="프린트 솔루션을 설치합니다."   alt="프린트 솔루션을 설치합니다."><img onload = "this.focus();" alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download.jpg" style = "border:0"></a>');
		}
		else if (GPrintmade.isMac == true) {
			download_url = MAC_DOWNLOAD_URL;
			$down_div.append('<a tabindex=0 href = "' + download_url + '" id = "ptm_download" title="프린트 메이드를 설치합니다."   alt="프린트 메이드 설치합니다."><img alt="프린트 메이드를 설치합니다."  src = "' + INSTALL_IMG_URL + 'download.jpg" style = "border:0"></a>');
		}
		else if (GPrintmade.isLinux == true) {
            var os_bit, os_type;
            var ubuntu_url = '';
            var fedora_url = '';

            if (navigator.platform.indexOf('64') > -1 || navigator.appVersion.indexOf('x86_64') > -1) {
                fedora_url = FEDORA_64BIT_URL;
                ubuntu_url = UBUNTU_64BIT_URL;
            }
            else {
                fedora_url = FEDORA_32BIT_URL;
                ubuntu_url = UBUNTU_32BIT_URL;
            }
            var installmessage = '';
            if(INSTALL_LINUX_MSG != '')
            	installmessage = 'onClick="alert(\''+INSTALL_LINUX_MSG+'\');"';

    		$down_div.append('<a href = "' + fedora_url + '" id = "ptm_fedora_download" '+installmessage+'><img title="프린트 솔루션을 설치합니다."  alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download_fedora.jpg" style = "border:0"></a>&nbsp;');
    		$down_div.append('<a href = "' + ubuntu_url + '" id = "ptm_ubuntu_download" '+installmessage+'><img title="프린트 솔루션을 설치합니다."  alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download_ubuntu.jpg" style = "border:0"></a>&nbsp;');
		}

		$down_div.append('<a href="#" tabindex=1 onclick = "return false;" id = "ptm_cancel"><img alt="프린트 메이드 설치를 취소합니다." title="프린트 메이드 설치를 취소합니다." src = "' + INSTALL_IMG_URL + 'cancel.jpg" style = "border:0"></a>');
		$down_div.append('<p>'+INSTALL_DIV_UNDER_MSG+'</p>');
	//	dmj(frame.document.body).append('<div id = "bg" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:5000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');




        if (frame.document.getElementById('ptm_download') != null) {
    		dmj("#ptm_download").focus();
    		dmj(frame.document.getElementById('ptm_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

//    			var download_div = element.parentNode.parentNode;
//    			download_div.parentNode.removeChild(download_div);

        dmj("#ptm-down").remove();
    		});
		}
		else {
    		dmj(frame.document.getElementById('ptm_fedora_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

//    			var download_div = element.parentNode.parentNode;
//    			download_div.parentNode.removeChild(download_div);

        dmj("#ptm-down").remove();
    		});

    		dmj(frame.document.getElementById('ptm_ubuntu_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

//    			var download_div = element.parentNode.parentNode;
//    			download_div.parentNode.removeChild(download_div);

        dmj("#ptm-down").remove();
    		});
		}


		dmj(frame.document.getElementById('ptm_cancel')).click(function(e) {
			var targ;

			if (e.target)
				targ = e.target;
			else if (e.srcElement)
				targ = e.srcElement;
			if (targ.nodeType == 3) // defeat Safari bug
				targ = targ.parentNode;

			var element = targ;
			var background = element.ownerDocument.getElementById('bg');
			background.parentNode.removeChild(background);

//			var download_div = element.parentNode.parentNode;
//			download_div.parentNode.removeChild(download_div);
        dmj("#ptm-down").remove();
		});

		dmj(frame.document.getElementById('ptm_cancel')).keyup(function(e) {

			if(e.keyCode == '13'){
			  dmj(frame.document.getElementById('ptm_cancel')).click();

			  }

		});


		dmj(frame.document.getElementById('ptm_download')).keyup(function(e) {
			if(e.keyCode == '13'){
			  window.location.href = download_url;
			  dmj(frame.document.getElementById('ptm_download')).click();

			  }
		});
	},
	_RemoveDownload : function (frame) {
		var deletediv = frame.document.getElementById('bg');
		deletediv.parentNode.removeChild(deletediv);

		deletediv = frame.document.getElementById('down');
		deletediv.parentNode.removeChild(deletediv);
	} */

	_Download : function (pframe) {
		this._frame = pframe;
		var frame = pframe;//GPrintmade_NonCrossTop;
		var dialog_width = 455;
		var dialog_height = 295;
		var downloaddiv = frame.document.createElement('div');
		var scrollLeft = frame.document.body.scrollLeft;
		var scrollTop = frame.document.body.scrollTop;
		var clientWidth = frame.document.body.clientWidth;
		var clientHeight =frame.document.body.clientHeight;

		// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
//		var maxScrollHeight = 0;
/*
		dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
			if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
			    // 그 안 모든 자식들에 무시 속성을 추가.
			    var child_node = dmj(this).children();
			    while(child_node.length >0){
			     child_node.attr("ptm-child-ignore","true");
			     child_node = child_node.children();
			    }
			}
		});*/



    if(dmj('#ptm-loading').length > 0) dmj('#ptm-loading').remove();
  	if(dmj('#ptm-loading-bg').length > 0) dmj('#ptm-loading-bg').remove();

/*
		// 다시 최대값을 구한다.
		var max=0;
		// 선택자부분에서 무시속성이 된 부분은 제외한다.
		dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
			if (max<(dmj(this).offset().top + dmj(this).height())){
				max = (dmj(this).offset().top + dmj(this).height());
			}
		});

		if (max > frame.document.body.scrollHeight)
			maxScrollHeight = max;
		else
			maxScrollHeight = frame.document.body.scrollHeight;
*/



		var max = 0;
		var maxScrollHeight = 0;

		// 2013.05.09 Opera 등에서 설치창이 제대로 뜨지 않는 증상이 있어 추가
		if(navigator.appName != "Microsoft Internet Explorer"){

			dmj("div",frame.document).each(function(){  // div에서 OVERFLOW css 속성에서 "scroll"이나 "scroll-y"가 발생될 경우
				if(dmj(this).css("overflow")=="scroll" || dmj(this).css("overflow")=="scroll-y"){
					// 그 안 모든 자식들에 무시 속성을 추가.
					var child_node = dmj(this).children();
					while(child_node.length >0){
					 child_node.attr("ptm-child-ignore","true");
					 child_node = child_node.children();
					}
				}
			});

			// 다시 최대값을 구한다.
			// 선택자부분에서 무시속성이 된 부분은 제외한다.
			/*
			dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
				if (max<(dmj(this).offset().top + dmj(this).height())){
					max = (dmj(this).offset().top + dmj(this).height());
				}
				});
			*/
			var max=0;
			// 선택자부분에서 무시속성이 된 부분은 제외한다.
			try{
				dmj("body > *:not(script):not(a):not(embed)[ptm-child-ignore!=true]",frame.document).each(function(){
						try{
						if (max<(dmj(this).offset().top + dmj(this).height())){
						max = (dmj(this).offset().top + dmj(this).height());
						}
						}catch(e){

						}
						});
			}catch(e){

			}


		}
			if (max > document.body.scrollHeight)
				maxScrollHeight = max;
			else
				maxScrollHeight = document.body.scrollHeight;


		if(GPrintmade.isIE && frame.document.documentElement.clientHeight > 0){
			//IE의 Quirks Mode가 아닌 7,8 모드
			scrollLeft = frame.document.documentElement.scrollLeft;
			scrollTop = frame.document.documentElement.scrollTop;
			clientWidth = frame.document.documentElement.clientWidth;
			clientHeight = frame.document.documentElement.clientHeight;
		}

		if (scrollTop == 0) scrollTop = frame.document.documentElement.scrollTop;
		if (scrollLeft == 0) scrollLeft = frame.document.documentElement.scrollLeft;

		var download_div_left = scrollLeft + (clientWidth - dialog_width) / 2 ;
		var download_div_top = scrollTop + (clientHeight - dialog_height) / 2 ;


		if (download_div_left < 0)
			download_div_left = 0;
		if (download_div_top < 0)
			download_div_top = 0;



    if(GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true){
        var now_focus = frame.document.body;
      }else{
        var now_focus = frame.event.srcElement;
        now_focus = now_focus.parentElement;
      }



  	//dmj(frame.document.body).append('<div id = "down" onblur="dmj(\'#ptm-cancel\').focus();" align = center style="position:absolute;top:' + download_div_top + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:5001;display:block"></div>');
		 dmj(now_focus).after('<div id = "bg" style = "filter:alpha(opacity=50);opacity:0.5;position:fixed;top:0;left:0;background-color:#000000;z-index:10000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');
		 dmj(now_focus).after('<div id = "down" tabindex="0" align = center style="position:fixed;top:' + ((clientHeight - dialog_height) / 2)  + 'px;left:' + download_div_left + 'px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:10001;display:block"></div>');

	  // dmj(now_focus).append('<div id = "down" align = center style="position:fixed;top:0px;left:0px;width:'+dialog_width+'px;height:'+dialog_height+'px;background-image:url(\'' + INSTALL_IMG_URL + 'setup.jpg\');z-index:10001;display:block"></div>');
		var down_div = frame.document.getElementById('down');
		var $down_div = dmj(down_div);
		$down_div.append('<div style="height:160px"></div>');
		$down_div.append('<p style="float:none;text-align:center">'+INSTALL_DIV_MSG+'</p>');

		var download_url = '';
		if (GPrintmade.isWindows == true) {
			download_url = WIN_DOWNLOAD_URL;
			$down_div.append('<a style="float:none;text-align:center" href = "' + download_url + '" id = "ptm_download"  title="프린트 솔루션을 설치합니다."   alt="프린트 솔루션을 설치합니다."><img onload = "this.focus();" alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download.jpg" style = "border:0"></a>');
//		 frame.document.getElementById('ptm_download').focus();
		  window.location.href = "#down";
		}
		else if (GPrintmade.isMac == true) {
			download_url = MAC_DOWNLOAD_URL;
			$down_div.append('<a style="float:none;text-align:center" href = "' + download_url + '" id = "ptm_download" title="프린트 메이드를 설치합니다."   alt="프린트 메이드 설치합니다."><img alt="프린트 메이드를 설치합니다."  src = "' + INSTALL_IMG_URL + 'download.jpg" style = "border:0"></a>');
//		 frame.document.getElementById('ptm_download').focus();
      window.location.href = "#down";
		}
		else if (GPrintmade.isLinux == true) {
            var os_bit, os_type;
            var ubuntu_url = '';
            var fedora_url = '';

            if (navigator.platform.indexOf('64') > -1 || navigator.appVersion.indexOf('x86_64') > -1) {
                fedora_url = FEDORA_64BIT_URL;
                ubuntu_url = UBUNTU_64BIT_URL;
            }
            else {
                fedora_url = FEDORA_32BIT_URL;
                ubuntu_url = UBUNTU_32BIT_URL;
            }
            var installmessage = '';
            if(INSTALL_LINUX_MSG != '')
            	installmessage = 'onClick="alert(\''+INSTALL_LINUX_MSG+'\');"';

    		$down_div.append('<a style="float:none;text-align:center" href = "' + fedora_url + '" id = "ptm_fedora_download" '+installmessage+'><img title="프린트 솔루션을 설치합니다."  alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download_fedora.jpg" style = "border:0"></a>&nbsp;');
    		$down_div.append('<a style="float:none;text-align:center" href = "' + ubuntu_url + '" id = "ptm_ubuntu_download" '+installmessage+'><img title="프린트 솔루션을 설치합니다."  alt="프린트 솔루션을 설치합니다." src = "' + INSTALL_IMG_URL + 'download_ubuntu.jpg" style = "border:0"></a>&nbsp;');
		}

		$down_div.append('<a style="float:none;text-align:center" href="#" onclick = "return false;" id = "ptm_cancel"><img alt="프린트 메이드 설치를 취소합니다." title="프린트 메이드 설치를 취소합니다." src = "' + INSTALL_IMG_URL + 'cancel.jpg" style = "border:0"></a>');
		$down_div.append('<p style="float:none;text-align:center">'+INSTALL_DIV_UNDER_MSG+'</p>');
//		dmj(frame.document.body).append('<div id = "bg" style = "filter:alpha(opacity=50);opacity:0.5;position:absolute;top:0;left:0;background-color:#000000;z-index:5000;display:block;width:' + frame.document.body.scrollWidth + 'px;height:' + maxScrollHeight + 'px"></div>');

        if (frame.document.getElementById('ptm_download') != null) {
//        dmj(frame.document.getElementById('ptm_download')).focus();
    		dmj(frame.document.getElementById('ptm_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

//    			var download_div = element.parentNode.parentNode;
//          var download_div = element.ownerDocument.getElementById('down');
            dmj("#down").remove()
//    			download_div.parentNode.removeChild(download_div);
    		});


        dmj(frame.document.getElementById('ptm_download')).keypress(function(e){

          var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == '13'){

/*            var targ;

      			if (e.target)
      				targ = e.target;
      			else if (e.srcElement)
      				targ = e.srcElement;
      			if (targ.nodeType == 3) // defeat Safari bug
      				targ = targ.parentNode;

      			var element = targ;
      			var background = element.ownerDocument.getElementById('bg');
      			background.parentNode.removeChild(background);

      			var download_div = element.parentNode.parentNode;
      			download_div.parentNode.removeChild(download_div);*/
      			dmj("#ptm_download").click();
      		}});

		}
		else {
    		dmj(frame.document.getElementById('ptm_fedora_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

    			var download_div = element.parentNode.parentNode;
    			download_div.parentNode.removeChild(download_div);
    		});

    		dmj(frame.document.getElementById('ptm_ubuntu_download')).click(function(e) {
    			var targ;

    			if (e.target)
    				targ = e.target;
    			else if (e.srcElement)
    				targ = e.srcElement;
    			if (targ.nodeType == 3) // defeat Safari bug
    				targ = targ.parentNode;

    			var element = targ;
    			var background = element.ownerDocument.getElementById('bg');
    			background.parentNode.removeChild(background);

    //			var download_div = element.parentNode.parentNode;

          var download_div = element.ownerDocument.getElementById('down');
    			download_div.parentNode.removeChild(download_div);
    		});
		}






		dmj(frame.document.getElementById('ptm_cancel')).click(function(e) {
			var targ;

			if (e.target)
				targ = e.target;
			else if (e.srcElement)
				targ = e.srcElement;
			if (targ.nodeType == 3) // defeat Safari bug
				targ = targ.parentNode;

			var element = targ;
			var background = element.ownerDocument.getElementById('bg');
			background.parentNode.removeChild(background);

//			var download_div = element.parentNode.parentNode;
			    //			var download_div = element.parentNode.parentNode;

//          var download_div = element.ownerDocument.getElementById('down');

            dmj("#down").remove();
//			download_div.parentNode.removeChild(download_div);
//			if(dmj(now_focus).get(0).tagName == "SPAN") dmj(now_focus).parent().focus();
			if(dmj(now_focus).children().get(0).tagName == "SPAN") dmj(now_focus).focus();
			else dmj(now_focus).focus();
//			    	else if(dmj("a[onclick*='fnWebPrint']").length > 0) dmj("a[onclick*='fnWebPrint']").focus();
		});



    dmj(frame.document.getElementById('ptm_cancel')).keypress(function(e){

        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13'){
              var targ;
/*
        			if (e.target)
        				targ = e.target;
        			else if (e.srcElement)
        				targ = e.srcElement;
        			if (targ.nodeType == 3) // defeat Safari bug
        				targ = targ.parentNode;

        			var element = targ;
        			var background = element.ownerDocument.getElementById('bg');
        			background.parentNode.removeChild(background);
 */

      			dmj("#ptm_cancel").click();
//        			var download_div = element.parentNode.parentNode;
  //            var download_div = element.ownerDocument.getElementById('down');
  //      			download_div.parentNode.removeChild(download_div);

            dmj("#down").remove();
        			if(dmj(now_focus).get(0).tagName == "SPAN") dmj(now_focus).parent().focus();
        			else dmj(now_focus).focus();
               }
    //    event.stopPropagation();
    });


	},
	_RemoveDownload : function (frame) {
		var deletediv = frame.document.getElementById('bg');
		deletediv.parentNode.removeChild(deletediv);

		deletediv = frame.document.getElementById('down');
		deletediv.parentNode.removeChild(deletediv);
	}
})

/*
 * Name : PluginCapture
 * Responsibility :
 */

var PTMCaptureController = Soo.Class.create({
	__init__ : function(plugin,frame){
		this.data = null;
		this._plugin = plugin;
		this._element = null;
		this.callback = null;
		this._targetframe = frame;
		if(GPrintmade.isLinux){
			this._imagefilepath = this._plugin.getTempPath() + "/Printmade2/temp/img";
		}else{
			var appdatapath = this._plugin.getAppDataPath();
			this._imagefilepath = appdatapath.replace(/\\/g, '/');
			this._imagefilepath = this._imagefilepath + "/Printmade2/temp/img";
		}

		this._uniqueimageid = 0;
	},
	_CheckCrossDomain : function(framewin) {
		try
		{
			var document_test = framewin.document;

			if (document_test == undefined || document_test.getElementById == undefined) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (e) {
			return true;
		}
	},
	_GetElementForFrame : function (frame) {
		if (frame == GPrintmade.top) {
			return GPrintmade.top;
		}

		var parent = frame.parent;
		var frm = parent.document.getElementsByTagName('frame');
		var ifrm = parent.document.getElementsByTagName('iframe');

		for (var i = 0; i < frm.length; i++) {
			if (frm[i].contentDocument == frame.document) {
				return frm[i];
			}
		}

		for (var i = 0; i < ifrm.length; i++) {
			if (ifrm[i].contentDocument == frame.document) {
				return ifrm[i];
			}
		}
	},
	/*
	 * 웹브라우저를 캡쳐하여 이미지로 생성하기 위한 함수.
	 * Event-Driven 방식이라 callback 함수로 알림.
	 */
	MakeImage : function(callback){
		if(this._HasData())
			return;
		this.callback = callback;
		this._Capture();
	},
	_GetWidthAndHeight : function (element)  {
		var id = element.id;
		var $element_offset = dmj(element).offset();
		var left = $element_offset.left;
		var top = $element_offset.top;
		var width = element.offsetWidth;
		var height = element.offsetHeight;
		var result = { left : 99999, right : 0, top : 99999, bottom : 0};

		if (element.offsetWidth == 0 || element.offsetHeight == 0) {
			return result;
		}

		result.left = $element_offset.left;
		result.top = $element_offset.top;
		result.right = $element_offset.left + element.offsetWidth;
		result.bottom = $element_offset.top + element.offsetHeight;

		if (element.childNodes.length == 0) {
			if (element.offsetLeft == undefined) {
				result.top = 99999;
				result.left = 99999;
				result.right = 0;
				result.bottom = 0;
				return result;
			} else
			{
				return result;
			}
		} else {
			var temp;
			for (var i = 0; i < element.childNodes.length; i++) {
				var node = element.childNodes[i];
				if ((node.id != undefined && node.id != '') || (node.tagName == 'EMBED' || node.tagName == 'OBJECT' || node.tagName == 'MARQUEE'))
				{
					temp = this._GetWidthAndHeight(element.childNodes[i]);

					if (temp.left < result.left)
						result.left = temp.left;
					if (temp.top < result.top)
						result.top = temp.top;
					if (temp.right > result.right)
						result.right = temp.right;
					if (temp.bottom > result.bottom)
						result.bottom = temp.bottom;
				}
			}
			return result;
		}
	},
	_FindFrame : function (frame, id) {
		if (this._CheckCrossDomain(frame) == true)
		{
			return null;
		}


		if (frame.document.getElementById(id) != null) {
			return frame;
		}


		if (frame.frames == null)
			return null;

		for (var i = 0; i < frame.frames.length; i++) {
			result = this._FindFrame(frame.frames[i], id);
			if (result != null) {
				return result;
			}
		}

		return null;
	},
	CaptureWithElement : function(id){
		if(id == 'ptm_plugin' || id.indexOf('printmade')  != -1)
			return '';

		var frm = this._FindFrame(GPrintmade.top, id);

		if (frm == null) {
			return '<div></div>';
		}

		var element = frm.document.getElementById(id);
		var $element = dmj(element);
		var left = 0, top = 0;

		if ((GPrintmade.isIE == true || GPrintmade.isSafari == true) && GPrintmade.isWindows == true)
		{
			var $element_offset = $element.offset();
			left = $element_offset.left;
			top = $element_offset.top;
		}
		//Embed 를 기준으로 잡는다.
		else if ((GPrintmade.isChrome == true || GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true || GPrintmade.isOpera == true || GPrintmade.isSafariOver51 == true)
			&& GPrintmade.isWindows == true)
		{
			if ($element.children("embed").length == 0) {
				var capture_div = document.createElement('div');
				capture_div.id = 'test';
				capture_div.width = 0;
				capture_div.height = 0;
				var $capture_div = dmj(capture_div);
				$capture_div.insertBefore(element);

				if($element.css('display') == 'None'){
					return '';
				}

		//		var temp = this._GetWidthAndHeight(element);

				left = $capture_div.offset().left;//this._getLeftFromBody(id) + temp.left;
				top = $capture_div.offset().top;//this._getTopFromBody(id) + temp.top;
				capture_div.parentNode.removeChild(capture_div);
			}
			else {
				left = $element.children("embed").offset().left;
				top = $element.children("embed").offset().top;
			}
		}
		else { // Mac
			if (GPrintmade.isSafari == true && GPrintmade.isMac == true && GPrintmade.isSafariOver51 == true)
			{
				left = $element.offset().left;
				top = $element.offset().top;
			}
			// Linux
			else {
				if ($element.children("embed").length == 0) {
					var capture_div = document.createElement('div');
					capture_div.id = 'test';
					capture_div.width = 0;
					capture_div.height = 0;

					var $capture_div = dmj(capture_div);
					$capture_div.insertBefore(element);

					if($element.css('display') == 'None'){
						return '';
					}

			//		var temp = this._GetWidthAndHeight(element);

					left = $capture_div.offset().left;
					top = $capture_div.offset().top;
					capture_div.parentNode.removeChild(capture_div);
				}
				else {
					left = $element.children("embed").offset().left;
					top = $element.children("embed").offset().top;
				}
			}
		}

		var width = element.width;
		if ((width > 0) == false)
		{
			if (element.style.width != '' && element.style.width > 0)
				width = parseInt(element.style.width);
			else
				width = $element.outerWidth(); //element.width;
		}

		var height = element.height;
		if ((height > 0) == false)
		{
			if (element.style.height != '' && element.style.width > 0)
				height = parseInt(element.style.height);
			else
				height = $element.outerHeight();
		}

		//var width = $element.outerWidth(); //element.width;
		//var height = $element.outerHeight(); //element.height;

		var tmpframe = frm;
		while(tmpframe != GPrintmade_NonCrossTop){
			left = left + dmj(tmpframe.frameElement).offset().left;
			top = top + dmj(tmpframe.frameElement).offset().top;
			tmpframe = tmpframe.parent.window;
		}

		//visibility이 hidden이면 눈엔 안보이지만 자리를 차지하고 있다.
		if($element.css('visibility') == 'hidden'){
			return "<span class = 'ptm_replace' style='height:"+height+"px;width:"+width+"px;margin:0px;padding:0px;display:inline-block;background-position:-"+left+"px -"+top+"px;'></>";
		}
		//공간을 차지하지 않는 것은 만들지 않는다.
		if(width == 0 || height == 0)
			return '';

//		if (GPrintmade.isWindows == true && (GPrintmade.isOpera == true || GPrintmade.isFirefoxOver3))
//			left = left - 3;

		//background-image에 넣기위한 경로
		var imagefilepath_background = 	this._imagefilepath+ this._uniqueimageid + ".png";;
		try{
			if(GPrintmade.isMac){
				var imagefilepath_mac = this._imagefilepath + this._uniqueimageid + ".png\0";
				this._plugin.saveImage(parseInt(top),parseInt(left),parseInt(width),parseInt(height),imagefilepath_mac);
				imagefilepath_background = "file://" + imagefilepath_background;
			}
			else if(GPrintmade.isLinux){
				var imagefilepath_linux = this._imagefilepath + this._uniqueimageid + ".png";
				this._plugin.saveImage(parseInt(top),parseInt(left),parseInt(width),parseInt(height),encodeURI(imagefilepath_linux));
				imagefilepath_background = "file://" + imagefilepath_background;
			}
			else if(GPrintmade.isIE){
				var imagefilepath_ie = this._imagefilepath + this._uniqueimageid + ".png";
				this._plugin.saveImage(parseInt(top),parseInt(left),parseInt(width),parseInt(height),(imagefilepath_ie));
			}
			else{
				var imagefilepath_windows = this._imagefilepath + this._uniqueimageid + ".png\0";
				this._plugin.saveImage(parseInt(top),parseInt(left),parseInt(width),parseInt(height),encodeURI(imagefilepath_windows));
			}
		}catch(e){
//			alert('Printmade 2 : ' + e.description);
		}
		var element_style = '';

		var left_css = 'left:' + $element.css('left') +';';
		var top_css = 'top:' + $element.css('top') + ';';
		if(left_css.indexOf('auto') != -1){
			left_css = '';
		}
		if(top_css.indexOf('auto') != -1){
			top_css = '';
		}
		var margin_top = 'margin-top:'+$element.css('margin-top') + ';';
		var margin_left = 'margin-top:'+$element.css('margin-left') + ';';
		var margin_right = 'margin-top:'+$element.css('margin-right') + ';';
		var margin_bottom = 'margin-top:'+$element.css('margin-bottom') + ';';

		var padding_top = 'padding-top:'+$element.css('padding-top') + ';';
		var padding_left = 'padding-top:'+$element.css('padding-left') + ';';
		var padding_right = 'padding-top:'+$element.css('padding-right') + ';';
		var padding_bottom = 'padding-top:'+$element.css('padding-bottom') + ';';

		var element_custom_style = 'display:inline-block;position:'+$element.css('position')+';'+margin_top+margin_right+margin_left+margin_bottom+padding_top+padding_right+padding_left+padding_bottom+'width:' + width + 'px;height:' + height + 'px;background-position:0 0;background-image:url(\''+imagefilepath_background+'\');'+left_css+top_css;
		var element_class = '';
		var element_attributes = '';

		if($element.attr("class") != undefined){
			element_class = $element.attr("class");
		}
		if($element.attr("style") != undefined){
			element_style = $element.attr("style");
		}

		var divtext = '<span style="'+ element_style +';' +element_custom_style+'" class="ptm_replace '+element_class+' '+element_attributes+'"></span>';
/* 		var divtext = "<div  class='ptm_replace' style='display:inline-block;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;width:" + width + "px;height:" + height + "px;background-position:0 0;background-image:url(\""+imagefilepath_background+"\");'></div>"; */

		this._uniqueimageid = this._uniqueimageid + 1;

		return divtext;
	},
	_Capture : function(){
		g_tmpcaptureclass = new PTMCaptureEngine(this._plugin,this._targetframe,this._imagefilepath);
		g_tmpcaptureclass.Calculate(this);
	},
	_HasData : function(){
		if(this.data == null)
			return false;
		return true;
	},
	_GetLeftFromBody : function(id){
		var frm = this._FindFrame(GPrintmade.top, id);
		var element = frm.document.getElementById(id);
		var result = 0;

		while (frm != GPrintmade.top) {
			var frm_element = this._GetElementForFrame(frm);
			result = result + frm_element.offsetLeft;
			frm = frm.parent;
		}

		return result;
	},
	_GetTopFromBody : function(id){
		var frm = this._FindFrame(GPrintmade.top, id);
		var element = frm.document.getElementById(id);
		var result = 0;

		while (frm != GPrintmade.top) {
			var frm_element = this._GetElementForFrame(frm);
			result = result + frm_element.offsetTop;
			frm = frm.parent;
		}

		return result;
	}
});


/*
 * Name : CaptureClass
 * Responsibility : Capture the page with plugin
 */
var g_tmpcaptureclass;
var PTMCaptureEngine = Soo.Class.create({
	__init__:function(plugin,frame,imagefilepath){
		this._frame = frame;
		this._plugincapture = null;
		this._imagefilepath = imagefilepath;
		var TBody = frame.document.body;
		this._original_left = TBody.scrollLeft; //document.body.scrollLeft;
		this._original_top = TBody.scrollTop; //document.body.scrollTop;

		var body_width = TBody.scrollWidth;

		//Linux - Firefox에는 document.documentElement에 scrollWidth가 존재한다.
		var documentElement_width = frame.document.documentElement.scrollWidth;
		if (body_width > documentElement_width)
		    this._body_width = body_width;
		else
		    this._body_width = documentElement_width;

		this._body_height = TBody.scrollHeight;//document.body.scrollHeight;

		this._scroll_width = this._GetScrollerWidth();
		/*
		 * this.list 는 4가지의 값을 가지게 된다.
		 * [0],[1] - 실제 스크롤을 움직일 위치
		 * [2],[3] - 캔버스에 조합할때의 위치(scroll_width 때문에 조정을 하게 된다.)
		 */
		this._list = [];
		this._current_pos = 0;
		this._plugin = plugin;

		this._canvas = document.createElement('canvas');
		this._canvas.width = this._body_width;
		this._canvas.height = this._body_height;


		this._browsercaptureoption = 0;

		if(GPrintmade.isChrome)
            this._browsercaptureoption = 0;
        else if(GPrintmade.isSafari)
            this._browsercaptureoption = 1;
        else if(GPrintmade.isSafariOver51)
            this._browsercaptureoption = 1;
        else if(GPrintmade.isFirefox3)
            this._browsercaptureoption = 2;
		else if(GPrintmade.isFirefoxOver3)
			this._browsercaptureoption = 3;
		else if(GPrintmade.isOpera)
			this._browsercaptureoption = 4;

		try{


	        if(GPrintmade.isMac == true){
	            this._plugin.initCapt(this._body_width, this._body_height, 1, GPrintmade_ToolbarHeight, GPrintmade_BrowserLeftEdge);
	        }
			else if (GPrintmade.isWindows == true){
	            this._plugin.initCapt(this._body_width, this._body_height, this._browsercaptureoption);
	        }
	        else if( GPrintmade.isLinux == true){
	        	var window_left = top.screenX + GPrintmade_BrowserLeftEdge;
	        	var window_top = top.screenY +  GPrintmade_ToolbarHeight;
	        	this._plugin.initCapt(this._body_width, this._body_height,window_left,window_top);
	        }
	    }catch(e){
//			alert('Printmade 2 : ' + e.description);
		}
	},
	Calculate:function(plugincapture){
		var body_width = this._body_width;
		var body_height = this._body_height;





		var body_client_width;
		var body_client_height;

		//둘중에 작은값을 넣는다.
		if (this._frame.document.body.clientWidth <= this._frame.innerWidth){
			body_client_width = this._frame.document.body.clientWidth;
		}
		else{
			body_client_width = this._frame.innerWidth;
		}

		var hscroll = (body_width> body_client_width)?1:0;
		var hscroll_width = this._scroll_width * hscroll;



		if (this._frame.document.body.clientHeight <= this._frame.innerHeight){
			body_client_height = this._frame.document.body.clientHeight;
		}else
		{
			body_client_height = this._frame.innerHeight;
		}

		var vscroll = (body_height> body_client_height)?1:0;
		var vscroll_width = this._scroll_width * vscroll;


		//inner 값들을 이용했다면 스크롤 존재여부에 따라서 값을 빼준다.
		if(body_client_width == this._frame.innerWidth){
			body_client_width = body_client_width - vscroll_width;
		}
		if(body_client_height == this._frame.innerHeight){
			body_client_height = body_client_height - hscroll_width;
		}

		/*
		 * Body의 height와 width를 window의 innerHeight, innerWidth랑 비교하여 몇 장의 캡쳐를 할 것 인지 계산한다.
		 * i => y
		 * j => x
		 */

		/*
		 * 스크롤 존재 유무
		 */

		//var hscroll = (body_width> this._frame.innerWidth)?1:0;
	/*
	var hscroll = (body_width> body_client_width)?1:0;
		var hscroll_width = this._scroll_width * hscroll;

		//var vscroll = (body_height != this._frame.innerHeight)?1:0;
		var vscroll = (body_height != body_client_height )?1:0;
		var vscroll_width = this._scroll_width * vscroll;

*/

		/*
		 * Body Height와 Window innerHeight을 비교하여 세로로 몇장의 스크롤을 할 것인가를 결정.
		 */

		var i = 0;
		for(i = 0; i < body_height - body_client_height; i = i + body_client_height) {
			//Width를 계산한다.
			for(var j = 0; j < body_width - body_client_width; j = j + body_client_width) {
				this._list.push([j,i,j,i]);
			}
			//위에서 계산하고 남은 Width 들(innerWidth 보다 작으면서 남은 애들)을 계산한다.
			if((body_width - j) >  0) {
				this._list.push([j,i,body_width - body_client_width,i]);
			}

		}
		if((body_height - i) > 0)
		{
			i = body_height - body_client_height;
			for(var j = 0; j < body_width - body_client_width; j = j + body_client_width) {
				this._list.push([j,i,j,i]);
			}
			if((body_width - j) >  0) {
				this._list.push([j,i,body_width - body_client_width,i]);
			}
		}
		this._plugincapture = plugincapture;
		this._Move();
	},
	_Move:function(){

		if(GPrintmade.isFirefox3 || GPrintmade.isFirefoxOver3){
			this._frame.scrollTo(this._list[this._current_pos][0],this._list[this._current_pos][1]);
		}
		else if(GPrintmade.isOpera){   // 5.17 추가 부분. Opera에서는 document.body.scrollTop 동작하지 않음.
			this._frame.document.body.scrollLeft = this._list[this._current_pos][0];
			this._frame.document.body.scrollTop = this._list[this._current_pos][1];
			this._frame.document.documentElement.scrollLeft = this._list[this._current_pos][0];
			this._frame.document.documentElement.scrollTop = this._list[this._current_pos][1];
		}
		else{
			this._frame.document.body.scrollLeft = this._list[this._current_pos][0];
			this._frame.document.body.scrollTop = this._list[this._current_pos][1];
		}


		var x = this._list[this._current_pos][2];
		var y = this._list[this._current_pos][3];

		this._current_pos++;

		setTimeout(function(){
			g_tmpcaptureclass._Capture(x,y);
		}, 100);

	},
	_Capture:function() {
		g_tmpcaptureclass._CaptureScreen(arguments[0],arguments[1]);

	},
	_CaptureScreen : function(x,y) {


		/*
		var img = new Image();
		var base64string = g_tmpcaptureclass.plugin.getBase64Image();
		img.src = 'data:image/png;base64,' + base64string;
		img.onload = function(){
			var ctx = g_tmpcaptureclass.canvas.getContext('2d');
			ctx.drawImage(img, x, y);
			g_tmpcaptureclass.move();
		}
		*/
		try{


			if(GPrintmade.isLinux){
				g_tmpcaptureclass._plugin.capture(x,y);
			}
			else{
				g_tmpcaptureclass._plugin.capture(x,y,0,0);
			}
		}catch(e){
//			alert('Printmade 2 : ' + e.description);
		}
		if (this._current_pos >= this._list.length){
			if(GPrintmade.isFirefox3 || GPrintmade.isFirefoxOver3){
				this._frame.scrollTo(this._original_left, this._original_top);
			}
			else if(GPrintmade.isOpera){   // 5.17 추가 부분. Opera에서는 document.body.scrollTop 동작하지 않음.
				this._frame.document.documentElement.scrollLeft = this._original_left;
				this._frame.document.documentElement.scrollTop = this._original_top;
			}else{
				this._frame.document.body.scrollLeft = this._original_left;
				this._frame.document.body.scrollTop = this._original_top;
			}
			try{
				g_tmpcaptureclass._plugin.endCapt(DEVELOPMENT_MODE);
			}catch(e){
//				alert('Printmade 2 : ' + e.description);
			}
/* 			g_tmpcaptureclass._plugin.endCapt(encodeURI(g_tmpcaptureclass._imagefilepath),DEVELOPMENT_MODE); */
			//g_tmpcaptureclass._plugincapture.data = 'data:image/png;base64,' + g_tmpcaptureclass._plugin.endCapt(DEVELOPMENT_MODE);
			g_tmpcaptureclass._plugincapture.callback();
			return;
		}

		setTimeout(function(){
			g_tmpcaptureclass._Move();
		},100);
	},
	_GetScrollerWidth : function() {
	    var scr = null;
	    var inn = null;
	    var wNoScroll = 0;
	    var wScroll = 0;

	    // Outer scrolling div
	    scr = document.createElement('div');
	    scr.style.position = 'absolute';
	    scr.style.top = '-1000px';
	    scr.style.left = '-1000px';
	    scr.style.width = '100px';
	    scr.style.height = '50px';

		// Start with no scrollbar
	    scr.style.overflow = 'hidden';

	    // Inner content div
	    inn = document.createElement('div');
	    inn.style.width = '100%';
	    inn.style.height = '200px';

	    // Put the inner div in the scrolling div
	    scr.appendChild(inn);
	    // Append the scrolling div to the doc
	    document.body.appendChild(scr);

	    // Width of the inner div sans scrollbar
	    wNoScroll = inn.offsetWidth;
	    // Add the scrollbar
	    scr.style.overflow = 'auto';
	    // Width of the inner div width scrollbar
	    wScroll = inn.offsetWidth;

	    // Remove the scrolling div from the doc
	    document.body.removeChild(
		document.body.lastChild);

	    // Pixel width of the scroller
	    return (wNoScroll - wScroll);
	}

});
/**********************************************************************************************
 *
 * Utility
 *
 **********************************************************************************************/

var GPrintmade=null;
var PTM_AFTERPRINTING = [];
var GPrintmade_ToolbarHeight = 0;
var GPrintmade_BrowserLeftEdge = 0;

dmj(document).ready(function(){
    if(!GPrintmade_NonCrossTop)
        GPrintmade_NonCrossTop = GetNonCrossTop(window);

	if(!GPrintmade_MainFrame)
		GPrintmade_MainFrame = GetMainFrame();
	if (navigator.appVersion.indexOf("Win")!=-1){
        return;
    }
	dmj(GPrintmade_MainFrame.document).ready(function(){
		//Print 버튼이 내부 iframe에 적용 될 수 있기 때문에, 메인 frame의 event가 필요하다.
		dmj(GPrintmade_MainFrame.document).mousemove(function(event){
		    GPrintmade_ToolbarHeight = event.screenY - event.clientY - GPrintmade_MainFrame.screenY;
			GPrintmade_BrowserLeftEdge = event.screenX - event.clientX - GPrintmade_MainFrame.screenX;
		});
	});
});
//Auto Frame Finder
function GetNonCrossTop(frm) {
    var non_cross_top = null;

    while (frm != window.top) {
        try {
            var parent_body = frm.parent.document.body;
            frm = frm.parent;
        } catch (e) {
            return frm;
        }
    }

    return window.top;
}
function GetMainFrame(){
	//DFS Algorithm
	var frame_basket = [];
	var frame_answer = null;
	if(GPrintmade_NonCrossTop.document.body.getElementsByTagName('frame').length == 0){
		frame_answer = GPrintmade_NonCrossTop;
	}
	for(var tmpframe = GPrintmade_NonCrossTop; tmpframe;){
		if(tmpframe.frames.length == 0)
			break;

		//tmpframe 이 Frameset 으로 구성되면
		if(tmpframe.document.body.getElementsByTagName('frame').length > 0){
			var heights = tmpframe.document.body.rows.split(',');
			var tmp_frame_answer = null;
			if(heights.length > 0){
				for(var i = 0 ; i < heights.length; i++){
					if(heights[i] == '*')
						tmp_frame_answer = tmpframe.frames[i];
				}
				if(tmp_frame_answer == null)
					tmp_frame_answer = tmpframe;

				frame_answer = tmp_frame_answer;
			}
		}
		//iFrame으로 구성되면
		else{
			for(var i = 0 ; i < tmpframe.frames.length; i++){
				try{
					if(tmpframe.frames[i].frameElement && tmpframe.frames[i].frameElement.width == "100%" && tmpframe.frames[i].frameElement.height == "100%")
						frame_answer = tmpframe.frames[i];
				}catch(e){

				}
			}
		}

		for(var i =0; i < tmpframe.frames.length; i++){
			frame_basket.push(tmpframe.frames[i]);
		}
		tmpframe = frame_basket.pop();
	}
	if(frame_answer == null){
		alert('frame_answer is error');
		return GPrintmade_NonCrossTop;
	}
	return frame_answer;
}



// JavaScript 검증 함수. 웹페이지에 제대로 로드되었는지 확인한다.
function validateJavaScript() {
	var list = [];

	if (typeof PTMMainController  == 'undefined')
		list.push('PTMMainController');

	if (typeof PTMInstaller  == 'undefined')
		list.push('PTMInstaller');

	if (typeof PTMCaptureController  == 'undefined')
		list.push('PTMCaptureController');

	if (typeof PTMCaptureEngine  == 'undefined')
		list.push('PTMCaptureEngine');

	if (typeof PTMFrameObject  == 'undefined')
		list.push('PTMFrameObject');

	if (typeof PTMDOMParser  == 'undefined')
		list.push('PTMDOMParser');

	if (typeof PTMOptionObject  == 'undefined')
		list.push('PTMOptionObject');

	if (list.length == 0)
		return true;
	else {
		alert(VALIDATECLASS_MSG + list.toString().replace(/,/g, '\n'));
		return false;
	}
}
/**********************************************************************************************
 *
 * PTMMainController
 *
 **********************************************************************************************/
var PTMMainController = Soo.Class.create({
	__init__ : function(){
		this._plugin = null;
		this.target = null;
		this.plugincapture = null;
		this.isObjectTagExist = null;
		this.isEmbedTagExist = null;
		this.isMarqueeTagExist = null;
		this.isExist = null;

		this.isIE = false;
		this.isIE9 = false;
		this.isSafari = false;
		this.isSafariOver51 = false;
		this.isFirefoxOver3 = false;
		this.isFirefox3 = false;
		this.isChrome = false;
		this.isOpera = false;

		this.isWindows = false;
		this.isMac = false;
		this.isUnix = false;
		this.isLinux = false;

		this.maxBodyWidth = 1500;
		this.top = top;
		this._make_id_index = 0;

		this.option = new PTMOptionObject();
		this._install = null;
	},
	Run:function(target){
		//브라우저 종류를 검색한다.
		if(this._CheckKindOfBrowser() == false){
			alert(UNDEFINED_WEBBROWSER_MSG);
			window.print();
			return;
		}
		//OS종류 검색
		if(this._CheckOS() == false){
			alert(UNDEFINED_OS_MSG);
			window.print();
			return;
		}
		if(GPrintmade.isFirefoxOver3 == true || GPrintmade.isFirefox3 == true || GPrintmade.isSafari == true || GPrintmade.isSafariOver51 == true){
			if(!this._initNPAPI(target)) return;
		}
		this.target = target;
		this._install = null;
		//플러그인이 들어갈 시간을 위해서 setTimeout 을 함
		setTimeout(function(){ GPrintmade.Initialize();}, 50);
	},
	_initNPAPI:function(target){
		this._install = new PTMInstaller(this.isIE,target);
		if (this._install.CheckInstall() == false)
			return;

		this.target = target;
		var inserted_plugin = this._InsertPlugin();
		this._plugin = inserted_plugin;

		if (this._install.CheckVersion(this._plugin) == false)
			return false;
		return true;
	},
	_CheckOS:function(){
        if (navigator.appVersion.indexOf("Win")!=-1){
	        this.isWindows = true;
	        return true;
        }
        if (navigator.appVersion.indexOf("Mac")!=-1){
        	this.isMac = true;
        	return true;
        }
        if (navigator.appVersion.indexOf("X11")!=-1){
        	this.isLinux = true;
        	return true;
        }
        return false;

/*         if (navigator.appVersion.indexOf("Linux")!=-1) this.isLinux = true; */
    },
	_CheckKindOfBrowser : function(){
		var browser = navigator.appName;
	  var useragent = navigator.userAgent;

		switch (browser){
			case 'Microsoft Internet Explorer':
				browser = "MSIE";


				this.isIE = true;
				try{
				var ieVersion = navigator.userAgent.match(/trident\/\d.\d/gi)[0].split("/")[1]*1;


				var PTMisIE9 = -1;

				try{
					PTMisIE9 = navigator.userAgent.indexOf("MSIE 9.0");
				}catch(e){

				}

					//if(ieVersion <= 5 || PTMisIE9 > -1){
						this.isIE9 = true;
					//}
						//this.isIE9 = true;

				}catch(e){

				}
				break;
			case 'Netscape':
				if (useragent.lastIndexOf('Chrome/') > 0) {
					browser = "Chrome";
					this.isChrome = true;
					break;
				}
				else if (useragent.lastIndexOf('Firefox/') > 0) {
					browser = "Firefox";
					if(useragent.lastIndexOf('Firefox/3.') > 0){
						this.isFirefox3 = true;
	            		break;
	            	} else {
						this.isFirefoxOver3 = true;
						break;
					}
				}
				else if (useragent.lastIndexOf('Safari/') > 0) {
					browser = "Safari";

					// Maxthon 브라우저의 경우에도 Object-Embed 중첩된 경우 Embed 따르므로 SafariOver51과 같이 처리
					if (useragent.indexOf('Maxthon') > 0) {
					    this.isSafariOver51 = true;
					    break;
					}

			        var regex = /version\/([0-9]+)\.([0-9]+)/i
			        var result = useragent.match(regex);
			        var major = parseInt(result[1]);
			        var minor = parseInt(result[2]);
			        if ( major >= 5 ) {
			        	if(minor ==0 )
			        		this.isSafari=true;
			        	else if(minor >= 1)
			        		this.isSafariOver51 = true;
			        }
					break;
				}else if(navigator.userAgent.match(/Trident\/(\d.\d)/i) != null){
					this.isIE = true;
					this.isIE9 = true;
					break;
				}else{
					this.isChrome = true;
				}
				break;
			case 'Opera':
				browser = "Opera";
				this.isOpera = true;
				break;
			default:
				return false;
				break;
		}
		return true;
	},
	_InsertPlugin :function(){
		var inserted_plugin = null;
		for (var i = 0; i < 10000; i++) {
			if (inserted_plugin != null){
				return inserted_plugin;
			}
			else
			{
				//IE는 ActiveX를 넣고, 나머지 브라우저들은 NPPlugin을 넣는다.
				if (this.isIE == true)  {
					dmj(this.target.document.body).append('<OBJECT id = "ptm_plugin" classid="clsid:1096F471-0A30-4FEA-B3F1-CA486126A6EB" codebase = "' + OCX_CODEBASE + '" width=1 height=1 align=center declare=fal hspace=0 vspace=0 style = "display:none"></OBJECT>');
					inserted_plugin = this.target.document.getElementById('ptm_plugin');
				}
				else {
					var left = this.target.document.body.scrollLeft;
					var top = this.target.document.body.scrollTop;
					var zindex = -999;
					if(this.isWindows == true && this.isOpera == true){
						zindex = 999;
					}
					dmj(this.target.document.body).prepend('<embed id="ptm_plugin" type="application/nagosoft/printmade3" width=1 height=1 style="opacity:0.1;position:absolute;z-index:' + zindex + ';left:' + left + 'px;top:' + top + 'px;"></embed>');
					inserted_plugin = this.target.document.getElementById('ptm_plugin');
				}
			}
		}
	},
	Initialize:function() {
		//object, marquee,embed 등 스크롤 캡쳐 기능이 필요한 곳이 있는지 확인 한다.
		this.isExist = this._FindReplaceTag();

		if (GPrintmade.option.GetCaptureEnabled() == true) {
			var fullcapture = GPrintmade.option.GetFullCapture();

			if (this.plugincapture == null) {
				this.plugincapture = new PTMCaptureController(this._plugin, this.target);
			}

			if (this.isIE == true) {
				// 권한 상승이 제대로 일어난 경우에는 Object, 실패한 경우에는 '' (문자열)
				// 권한 상승이 이미 되어 있어 필요 없는 경우엔 undefined 를 리턴함.

				//ActiveX에서 캡쳐할 element를 찾기 위한 임시 객체를 만든다.
				var dmjtmpelement = dmj(this.target.document.body).append('<div id = "ptm_ie_help"></div>');
				var tmpElement = this.target.document.getElementById('ptm_ie_help');

				this.plugincapture.data = this._plugin.MakeImageEx(tmpElement,DEVELOPMENT_MODE,1);
				tmpElement.parentNode.removeChild(tmpElement);
				var result = this._plugin.UACElevation();

				if ( fullcapture == true ) {
					this._FullCapture();
					return;
				}

				GPrintmade.CallDOMParser();
			}else {
				if ( fullcapture == true ) {
					this.plugincapture.MakeImage( this._FullCapture );
				} else {
					var tmp = this.plugincapture.MakeImage(GPrintmade.CallDOMParser);
				}
			}
		}else{

			GPrintmade.CallDOMParser();
		}
	},
	_FindReplaceTag : function() {
		var result = false;
		this.isObjectTagExist = this._FindTag(this.target, 'object');
		this.isMarqueeTagExist = this._FindTag(this.target, 'marquee');
		this.isEmbedTagExist = this._FindTag(this.target, 'embed');

		result = this.isObjectTagExist || this.isEmbedTagExist || this.isMarqueeTagExist;
		return result;
	},
	_FindTag : function (frame, tag) {
		try{
			if(frame.document != undefined){
				var elements = frame.document.getElementsByTagName(tag);
				for(var i=0; i < elements.length; i++){
					if(dmj(elements[i]).css('display') != 'none'){
						return true;
					}
				}
			}
			for (var i = 0; i < frame.frames.length; i++) {
				result = this._FindTag(frame.frames[i], tag);
				if (result == true) {
					return true;
				}
			}
			return false;
			}
		catch(e){
			return false;
		}
	},
	CallDOMParser : function(){
		var domparser = new PTMDOMParser(this._plugin);
		var frame = GPrintmade.target;
		domparser.Run(frame,GPrintmade.plugincapture);
		for(var i=0; i < PTM_AFTERPRINTING.length; i++)
		{
			PTM_AFTERPRINTING[i][0](PTM_AFTERPRINTING[i][1]);
		}
		domparser = null;
	}
});
var PTMFrameObject = Soo.Class.create({
	__init__:function(framewin){
 		this.framewin = framewin;
 		this._framewin_document = framewin.document;
		this._mode = 0;   // 0 is Body, 1 is Frameset

		//this._getFramewinDocument();
		this._SelectMode();
	},
	_GetFramewinDocument : function(){
		if (GPrintmade.isIE)
			this._framewin_document = this.framewin.document;
		else
			this._framewin_document = this.framewin.document;
	},
	_SelectMode:function(){
		var $tmp_obj = dmj('frameset',this.framewin.document);
		if($tmp_obj[0] == undefined){
			this._mode = 0;
			return;
		}
		this._mode = 1;
	},
	_Get_jQueryObject:function(){
		if(this._mode == 0){
			var $body = dmj('body',this.framewin.document);
			if($body[0] == undefined){
				return null;
			}
			return dmj('body',this._framewin_document);
		}

		return dmj('frameset',this._framewin_document);
	},
	/*
	 * body -> iframe, frameset -> frame
	 */
	GetEmbededFrame:function(index){
		if(this._mode == 0){
			return dmj('iframe:eq(' + index + ')',this._framewin_document);
		}

		return dmj('frame:eq(' + index + ')',this._framewin_document);
	},
	_ReplaceSRC : function(){
		var str = this._Get_jQueryObject().html();

		str = jQuery.trim(str);
		var regex = /<\S?frame.*?src_local_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
		var result = str.replace(regex, function(word){
			var result = word.replace(/src\s*=[\"|\'](\S*)[\"|\']/gi,"");
			result = result.replace(/src_local_ptm/gi,'src');

			return result;
		});

		regex = /<[^<]*?src_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
		result = result.replace(regex,function(word){

			var result = word.replace(/src\s*=[\"|\'](\S*)[\"|\']/gi,"");
			result = result.replace(/src_ptm/gi,'src');

			return result;
		});

		regex = /<[^<]*?href_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
		result = result.replace(regex,function(word){
			var result = word.replace(/href\s*=[\"|\'](\S*)[\"|\']/gi,"");
			result = result.replace(/href_ptm/gi,'href');
			return result;
		});


		regex = /<[^<]*?background_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
		result = result.replace(regex,function(word){
			var result = word.replace(/background\s*=([\"|\'])*(\S*)([\"|\'])*/gi,"");
			result = result.replace(/background_ptm/gi,'background');
			return result;
		});


		result = result.replace(/<[^<]*?ptm-loading-remove\s*=[\"|\'](\S*)[\"|\'].*?>/gi,"");


		/* 20130517 신한카드 프린트 메이드 */
		/* 확대 캡쳐시, 확대가 방지되는 스크립트*/
		regex = /<[^<]*?scroll\_height\_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
	  result = result.replace(regex,function(word){
  		  var result = word.replace(/scroll\_height\_ptm\s*=([\"|\'])*(\S*)([\"|\'])/gi,function(word2){
  			highpx = word2.replace(/scroll\_height\_ptm\s*=\s*[\"|\']/gi,'');
  			highpx = highpx.replace(/'/gi,'');
  			highpx = highpx.replace(/"/gi,'');
  			highpx = highpx.replace(/[\"|\']>/gi,'');
  			highpx = highpx;
  			return "scroll_height_fin_ptm=\'"+highpx+"\'";
  	 	});
  		result = result.replace(/height\s*:\s*[0-9]*px/gi,'');
  		result = result.replace(/overflow\s*:\s*auto/gi,'');
  		result = result.replace(/overflow-y\s*:\s*auto/gi,'');
  		result = result.replace(/style\s*=\s*\'/gi,"style = \'height:"+highpx+"px;");
  		result = result.replace(/style\s*=\s*\"/gi,"style = \"height:"+highpx+"px;")
  		if(result.match(/style/gi) == null){
  		  result = result.replace(/\>/gi," style = \"height:"+highpx+"px;\">");
  		}

		return result;

  	});

		return result;
	},
	/*
	 * Body 또는 Frameset의 HTML을 리턴한다
	 */
	GetFullHtml : function(){
		var result = '';
	    if(this._Get_jQueryObject() == null)
			return '';

		//src_ptm 을 src로 변환
		var html = this._ReplaceSRC();

		//원래 세팅값을 가져옴
		var str_attributes = this._GetAllAttributesStr();
		/*
		if(str_attributes == '')
		{

		  return "";
		}
*/
		if(this._mode == 0){
//			result = str_attributes + html + '</body>';
			result = '<body ' + str_attributes + '>' + html + '</body>';
		}
		else{
//			result = str_attributes + html + '</frameset>';
			result = '<frameset ' + str_attributes  + '>' + html + '</frameset>';
		}
		result = jQuery.trim(result);
		return result;
	},
	/*
	 * Body 또는 Frameset 에 있는 Attribute를 가져온다.
	 */
	_GetAllAttributesStr : function(){
		var $object = this._Get_jQueryObject();
		var isBackgroundPTMExist = false;

//		var finishindex = $object[0].outerHTML.indexOf($object[0].innerHTML);
//		var html = $object[0].outerHTML.substring(0, finishindex);

//		if (html.indexOf('background_ptm') != -1)
//		{
//			var regex = /<[^<]*?background_ptm\s*=[\"|\'](\S*)[\"|\'].*?>/gi
//			html = html.replace(regex,function(word){
//				var result = word.replace(/background\s*=([\"|\'])*(\S*)([\"|\'])*/gi,"");
//				result = result.replace(/background_ptm/gi,'background');
//				return result;
//			});
//		}
//		return html;
		var result = ' ';
		var tmp_dom_attributes = $object[0].attributes;
		if(tmp_dom_attributes.length) {


			if (tmp_dom_attributes['background_ptm'] != undefined)
				isBackgroundPTMExist = true;


			for(var i =0; i < tmp_dom_attributes.length; i++){
				var name = tmp_dom_attributes[i].name;
				var value = tmp_dom_attributes[i].value;

				if (isBackgroundPTMExist == true && name.toLowerCase() == 'background')
					continue;

				if (value != 'null' && value != '') {
					if (name.toLowerCase() == 'background' && value.toString().toLowerCase().indexOf('http://') && value.toString().toLowerCase().indexOf('https://') == -1)
					{
						var static_path = Soo.URL.getStaticPath(this.framewin.document.location);
						value = static_path + value;
					}
					else if (name.toLowerCase() == 'background_ptm')
					{
						name = 'background';
					}

					result += name + '="' + value +'" ';
				}
			}

			if (tmp_dom_attributes['style'] == null || tmp_dom_attributes['style'].value == null) {
				var styletext = $object[0].style.cssText;
				if (styletext != "")
					result = result + 'style="' + styletext + '"';
			}
		}
		else {
			var styletext = $object[0].style.cssText;
			if (styletext != "")
				result = result + 'style="' + styletext + '"';
		}

		return result;
	}
})

var PTMDOMParser = Soo.Class.create({
	/*
	 * 클래스 생성자 - 초기 세팅
	 */
	__init__: function(plugin){
		this._unique_id = 0;
		this._plugin = plugin;
		this._iwebbrowser = null;
		this._iezoomsize = 0;

		if (GPrintmade.isIE == true){
			try{
				//this._iezoomsize = this._plugin.getIEZoomSize();
   		    	//this._iwebbrowser = this._plugin.getIWebbrowser();
   		    }catch(e){
   		    	//alert('Printmade Error : ' + e.description);
   		    }

		}

		this._isExist = false;
		this._plugincapture = null;
		this._isObjectTagExist = false;
		this._isEmbedTagExist = false;
		this._isMarqueeTagExist = false;
		this._appdatapath = '';
		this._idindex = 1;
		this._target = null;
	},
	/*
	 * 실행 함수 - parseFrame을 바로 호출하지 않고 run을 거쳐서 호출
	 * Call back 방식 사용하므로 편집 필요함.
	 */
	Run:function(target,plugincapture){
		this._target = target;
		this._plugincapture = plugincapture;
		//alert("t1");
		if(GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true || GPrintmade.isSafari == true || GPrintmade.isSafariOver51 == true){
			try{
			this._appdatapath = this._plugin.getAppDataPath();
			}catch(e){
				this._appdatapath = "";
			}
		}else{
			this._appdatapath = "";
		}
		this._appdatapath = this._appdatapath.replace(/\\/g, '/');
		this._safaripath = this._appdatapath.toLowerCase();
		//alert("t2");
		//alert(this._appdatapath);
		this._ParseFrame(target,this._GetUniqueId());


/* 		this._RemovePrintmade2(); */
	},
	_RemovePrintmade2 : function() {
		var ptm_plugin = this._target.document.getElementById('ptm_plugin');
		ptm_plugin.style.display = 'none';
		//alert(ptm_plugin);
/* 		dmj("#ptm_plugin",this._target.document).remove(); */
/* 		alert(ptm_plugin); */
/* 		$(ptm_plugin).remove(); */
/* 		alert(this._plugin); */
		/* 		ptm_plugin.parentNode.removeChild(ptm_plugin); */
	},
	_IsCrossDomain : function(framewin) {
		/*
		 * framewin이 Cross-domain의 window일 때 framewin.document의 값
		 * 크롬, 사파리 : undefined
		 * IE, 파이어폭스, 오페라 : Exception 발생
		 */
		try
		{
			var frmdocument = framewin.document;

			if (frmdocument == undefined || frmdocument.getElementById == undefined)
			{
				return true;
			}
			else
				return false;

		}
		catch (e)
		{
			return true;
		}
	},
	/*
	 * Frame 마다 실행될 함수
	 * 기본 개념 - 각 프레임은 window 포인터가 root 이고, head, body(or frameset)이 하위 노드
	 */
	_ParseFrame:function(framewin,unique_id){
	  //framewin == IHTMLWindow
		var head_object;
		//크로스도메인 체크. 크로스도메인이면 parseFrame을 빠져나감.
//		if (this._IsCrossDomain(framewin) == true)
//		{
//			return;
//		}

		// head를 반드시 framewin.document 로 지정해주어야 한다.
		head_object = dmj('head',framewin.document);

		//PTMFrameObj 는 framewin의 body 또는 frameset 을 원활하게 스위칭하기 위한 클래스
		var PTMFrameObj = null;
		PTMFrameObj = new PTMFrameObject(framewin);

		/*
		 * 하위 Frame 검색 및 recursive call
		 */

		var tmp_frames = framewin.frames;

		for(var i=0; i < tmp_frames.length; i++){
			var tmp_framewin = tmp_frames[i];

			if (this._IsCrossDomain(tmp_framewin) == true)
			{
				continue;
			}

			var frame_unique_id = this._GetUniqueId();
			//현재 컨트롤하고 있는 frame의 jQuery Object를 가져온다
			var tmp_frame_object = PTMFrameObj.GetEmbededFrame(i);

			//그 frame의 Attribute에다가 frame_unique_id를 붙인다. 나중에 수정하기 위해서
			tmp_frame_object.attr('src_local_ptm',frame_unique_id +'.html');
			this._ParseFrame(tmp_framewin,frame_unique_id);
		}

		//Change relative address2 to static address
		//Background URL 처리도 필요하다
		this._RelativeToStaticOfAddress(head_object, framewin.document.location);
		/*
		 * Problem : 오페라의 경우 jquery('body') 오브젝트를 Sizzle안에 넣을 때
		 * 			오브젝트를 제대로 못 가지는 버그가 존재함. 그래서 framewin 원본을 전송함
		 */

	    this._RelativeToStaticOfAddress(PTMFrameObj.framewin.document, framewin.document.location);

	  	//캡쳐를 해야되며 아이디가 없는 엘리멘트에 강제로 지정해 준다.
	  	//embed, object, input, select, textarea
		dmj('embed:not(#ptm_plugin), object',framewin.document).each(function(index,Element){
			if(dmj(this).attr('id') == undefined || dmj(this).attr('id') == ''){
			  dmj(this).attr('id','ptm_object_'+unique_id+'_'+index);
			}
		});
		//inut, select, textarea 등의 크기를 지정해준다.

/*
		dmj('input, select, textarea',framewin.document).each(function(index,Element){
			if(this.style.width == ''){
				dmj(this).css({'width':this.offsetWidth});
			}
			if(this.style.height == ''){
				dmj(this).css({'height':this.offsetHeight});
			}
		});
*/
		//img 중에 png, jpg, jpeg, gif, tif,  tiff, bmp 가 아닌 경우 캡쳐를 한다.
		dmj('img:not([src$=".png"]):not([src$=".jpg"]):not([src$=".jpeg"]):not([src$=".bmp"]):not([src$=".tiff"]):not([src$=".tif"]):not([src$=".gif"])',framewin.document).attr("ptm_object_target","true").each(function(index,Element){
			var $obj = dmj(this).attr('id');
			if($obj == undefined || $obj == ''){
			  dmj(this).attr('id','ptm_object_img_'+unique_id+'_'+index);
			}
		});

		//2.0.1.0
		if(PTM_WorkAt != undefined && PTM_WorkAt != null){
			PTM_WorkAt(framewin.document);
		}

		this._MakeFile(head_object,PTMFrameObj, unique_id, framewin);

		//2.0.1.0
		if(PTM_AfterWorkingAt != undefined && PTM_AfterWorkingAt != null){
			PTM_AfterWorkingAt(framewin.document);
		}
		PTMFrameObj = null;
	},
	_RemovePTMAttr : function(obj) {

		dmj(obj).find('*[src_ptm]').each(function(){
			dmj(this).removeAttr('src_ptm');
		});

		dmj(obj).find('*[href_ptm]').each(function(){
			dmj(this).removeAttr('href_ptm');
		});

		dmj(obj).find('*[src_local_ptm]').each(function(){
			dmj(this).removeAttr('src_local_ptm');
		});

	},
	_ReplaceURL : function(str, PTMFrameObj) {



	  var static_path = Soo.URL.getStaticPath(PTMFrameObj.framewin.document.location);
		var result = str;
		var appdatapath = this._appdatapath;
		result = str.replace(/url\((\'|\")*.*?\)/gi, function(word) {
			//전체 경로를 가지고 있는 경우. 그냥 넘긴다.
			if(word.indexOf(appdatapath) != -1 || word.indexOf('http') != -1 || word.indexOf('file://') != -1){
				return word;
			}
			var result = word.match(/url\((\'|\")*(.*?)(\1)*\)/i);
			if(result == null)
				return word;
			var url = result[2];
			if(url.indexOf(appdatapath) != -1 || url.indexOf('http') != -1 || word.indexOf('file://') != -1){
				return word;
			}
			if (url.indexOf('http') == -1)
			{
				if(url.charAt(0) == '/'){
					url = location.protocal + '//'  + location.host + url;
				}else{
					url = static_path + url;
				}
			}
			return 'url(' + url + ')';

		});
		return result;
	  /*
		var static_path = Soo.URL.getStaticPath(PTMFrameObj.framewin.document.location);
		var result = str;
		var appdatapath = this._appdatapath;
		var ishttps = 0;
		result = str.replace(/url\((\'|\")*.*?\)/gi, function(word) {
			//전체 경로를 가지고 있는 경우. 그냥 넘긴다.
			if(word.indexOf(appdatapath) != -1 || word.indexOf('http://') != -1 || word.indexOf('file://') != -1){
				return word;
			}
			var result = word.match(/url\((\'|\")*(.*?)(\1)*\)/i);
			if(result == null)
				return word;
			var url = result[2];
			if(url.indexOf(appdatapath) != -1 || url.indexOf('http://') != -1 || word.indexOf('file://') != -1){
				return word;
			}

			if (url.indexOf('http://') == -1)
			{

    				if(url.charAt(0) == '/'){
    					url = 'http://' + location.host + url;
    				}else{
    					url = static_path + url;
    				}

			}
			return 'url(' + url + ')';

		});
		return result;
		*/
	},
	_FindPagebreakTag : function (frame) {
		var pagebreaks;

		try
		{
			pagebreaks = frame.document.getElementsByTagName('pagebreak');
		}
		catch (e)
		{
			return;
		}

		if (pagebreaks.length == 0) {
			return;
		}
		else {
			for (var i = 0; i < pagebreaks.length; i++)
			{
/*				var capture_div = document.createElement('div');
				capture_div.id = 'test';
				capture_div.width = 0;
				capture_div.height = 0;

				dmj(capture_div).insertBefore(pagebreaks[i]);
				*/
				var top = 0;
				var element = dmj(pagebreaks[i]).next()[0];
				var tmpelement = element;


				// IE8.0 MS 테스트 페이지의 경우 tmpelement의 offsetParent를 찾다보면 BODY가 없음
				while (tmpelement != element.ownerDocument.body && tmpelement != null)
				{
					top = top + tmpelement.offsetTop;
					tmpelement = tmpelement.offsetParent;
				}

				var tmpframe = frame;

				while(tmpframe != GPrintmade_NonCrossTop){
					top = top + dmj(tmpframe.frameElement).offset().top;
					tmpframe = tmpframe.parent.window;
				}

//				capture_div.parentNode.removeChild(capture_div);
				GPrintmade.option.AddPagebreak(top);

			}
		}

		if (frame.frames == null)
			return;

		for (var i = 0; i < frame.frames.length; i++) {
			this._FindPagebreakTag(frame.frames[i]);
		}
		return;


	},
	_MakeFile: function(head_object, PTMFrameObj, unique_id, framewin){
		var first_id_index = this._idindex;
/* 		this._insertID(framewin); */
		var last_id_index = this._index;

		var result_head = head_object.html();
		if (result_head == null)
		{
			result_head = '';
		}
		else
		{
			result_head = this._RemoveScriptTag(result_head);
			result_head = jQuery.trim(result_head);
			result_head = this._ChangeCharset(result_head);

			var regex = /<[^>]*href_ptm\s*=[\"|\'](\S*)[\"|\'].*>/gi
			result_head = result_head.replace(regex,function(word){
	  			var result = word.replace(/href\s*=[\"|\'](\S*)[\"|\']/gi,"");
		  		result = result.replace(/href_ptm/gi,'href');
	  			return result;
  			});
		}

		var result_body = PTMFrameObj.GetFullHtml();

		result_body = this._RemoveScriptTag(result_body);
		//result_body = this._RemoveComment(result_body);
		result_body = jQuery.trim(result_body);

		if (GPrintmade.option.GetCaptureEnabled() == true)
		{
			//if (GPrintmade.isExist == true) {
				result_body = this._ReplaceToCapturedImage(result_body, this._plugincapture);
				result_body = jQuery.trim(result_body);
			//}
		}

		// ??? HTML ?????? DOCTYPE ???
		var result = this._GetDoctype();

		var html_attributes = this._GetHTMLTagAttributes();
		var iscript = "<script src='"+SCRIPTURL+"'> </script>"
		result = result + '<html ' + html_attributes + '>';
		result = result + '<head>' + iscript + result_head + '</head>';
		result = result + result_body;
/*  		result = result + "<script type = \"text/javascript\">" + this._AddScript(framewin) + "</script>"; */

		result = this._ReplaceURL(result, PTMFrameObj);
		PTMFrameObj = null;
/* 		this._removeID(framewin, first_id_index, last_id_index); */

//		if (unique_id == 1) {
//			GPrintmade.option.SetOriginalURL(location.hostname);
//		}

		/*
var id = GPrintmade.option.GetElementId();

		//임의의 엘리먼트 스크립트 실행
		if (framewin.document.getElementById(id) != null)
		{
			var script = this._AddExecuteString();
			result = result + script;
		}
*/

		result = result + '</html>';
		result = jQuery.trim(result);

		//2.0.0.4 - pagebreak 위치 검색을 뷰어에서 찾는다.
/* 		this._FindPagebreakTag(window.top); */

		/* 테스트용으로 pagebreak 수동 삽입(MS 페이지)

		GPrintmade.option.add agebreak(689);
		GPrintmade.option.addPagebreak(1562);
		GPrintmade.option.addPagebreak(2697);

		*/
					//alert("run!!!");
		try{
			if(GPrintmade.isLinux){
				if(GPrintmade.isOpera == true || GPrintmade.isChrome == true){
					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}else{
					var path = encodeURI(this._plugin.getTempPath() + '/Printmade3/temp/' + unique_id + ".html");
					result = dmj.trim(result);
					this._plugin.writeFile(result, path);
				}
			}
			else if(GPrintmade.isMac){
				if(GPrintmade.isOpera == true || GPrintmade.isChrome == true){
					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}else{
					var path = encodeURI(this._appdatapath + '/Printmade3/temp/' + unique_id + ".html\0");
					result = dmj.trim(result + '\0');
					this._plugin.writeFile(result, path);
				}
			}else if(GPrintmade.isIE9 == true){


				try{
					localStorage.setItem("PTMSRC-"+unique_id,result);

				}
				catch(e){
					window.localStorage["PTMSRC-"+unique_id] = result;
				}

			}
			else{

				if(GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true || GPrintmade.isSafari == true || GPrintmade.isSafariOver51 == true){
					this._plugin.writeFile(result, this._appdatapath + '/Printmade3/temp/' + unique_id + '.html\0');

				}else{

					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}
	        }
		}catch(e){
//			alert('Printmade 3 : ' + e.description);
		}

		if (unique_id == 1)
		{
			if(DEVELOPMENT_MODE){
				alert(GPrintmade.option.GetParameterString());
			}
			try{


			if(GPrintmade.isMac){

				if(GPrintmade.isOpera == false && GPrintmade.isChrome == false){
					var path = encodeURI(this._appdatapath + "/Printmade3/Viewer.app\0");
					var filename = encodeURI("file://" +this._appdatapath + "/Printmade3/temp/1.html\0");
					var parameters = encodeURI(GPrintmade.option.GetParameterString() + "\0");
					this._plugin.runViewer(path, filename, parameters);
				}else{
					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+GPrintmade.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					PTMAnt.Cnt = 0;
					isOK = false;
				}
				dmj("#ptm-loading").remove();
				dmj("#ptm-loading-bg").remove();
			}
			else if(GPrintmade.isLinux){

				if(GPrintmade.isOpera == false && GPrintmade.isChrome == false){
					var path = encodeURI(this._appdatapath + "/Printmade3/Viewer");
					var filename = encodeURI(this._plugin.getTempPath() + "/Printmade3/temp/1.html");
					var parameters = encodeURI(GPrintmade.option.GetParameterString());
					this._plugin.runViewer(path, filename, parameters);
				}else{

					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+GPrintmade.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					PTMAnt.Cnt = 0;
					isOK = false;
				}
				dmj("#ptm-loading").remove();
				dmj("#ptm-loading-bg").remove();

			} else {

				if(GPrintmade.isFirefox3 == true || GPrintmade.isFirefoxOver3 == true  || GPrintmade.isSafari == true || GPrintmade.isSafariOver51 == true){
					var path;
					if(this._plugin.getRunPath()){
						path = this._plugin.getRunPath();
						path = path.replace(/\\/g, '/');
						path = path + '/Printmade3/Viewer.exe\0';
					}
					path = encodeURI(path);
					var parameter = encodeURI('\"' + this._appdatapath + '/Printmade3/temp/1.html\" \"' + GPrintmade.option.GetParameterString() + '\"\0');
					this._plugin.runViewer(path,parameter);


				}else if(GPrintmade.isIE9 == true){
					//alert(GPrintmade.option.GetFrameId());

					var frameid = "NOID"
					var elementid = ""
					//alert("바뀜");
					try{
						elementid = GPrintmade.option.GetElementId();
						frameid = GPrintmade.option.GetFrameId();
						//alert("던");
					}
					catch(e){
						alert(e);
					}
					//alert(PMPAGEWIDTH);
					var formurl = FORMURL;
					var pagewidth = PMPAGEWIDTH;

					var param = "FRAMEID:"+frameid+"|ELEMENTID:"+elementid+"|ALIGNMENT:left|CUTRECT:0,0,0,0|FORMURL:"+formurl+"|PAGEWIDTH:"+pagewidth;
					var ieVersion = "";
					var ptmversion = "";


					try{
						ieVersion = navigator.userAgent.match(/trident\/\d.\d/gi)[0].split("/")[1]*1;
						ptmversion = navigator.userAgent.match(/printmade=\d\d*.\d\d*.\d\d*.\d\d*/gi);
					}catch(e){

					}

						var replaceAfter = ["!ptmprotocolhelper!","!ptms1!","print!ptmsn!made"];
						var replaceBefore = ["://","/","printmade"];

						var resultformurl = FORMURL;

						dmj(replaceAfter).each(function(idx){
							resultformurl = resultformurl.split(replaceBefore[idx]).join(replaceAfter[idx]);
						})

						PTM_RemoveDialog();
						try{
							if(elementid.indexOf("#") == -1){
								elementid = "#"+elementid
							}
						}catch(e){

						}

						param = "I!FRAMEID:"+frameid+"|ELEMENTID:"+elementid+"|ALIGNMENT:left|CUTRECT:0,0,0,0|FORMURL:"+resultformurl+"|PAGEWIDTH:"+pagewidth;
						//alert(param);

						var lhostArray = location.hostname.split(".");
						var lhostlastindex = lhostArray.length -1;
						var lhost = location.hostname.replace("."+lhostArray[lhostlastindex],"");

						location.href="printmade25://"+param+"!"+lhost;

				}//    this._plugin.writeFileWithName(result, unique_id.toString());
				else{
						PTM_RemoveDialog();
					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+GPrintmade.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					dmj("#ptm-loading").remove();
					dmj("#ptm-loading-bg").remove();
				}
			}

			}catch(e){
//				alert('Printmade3 RunViewer Error : ' + e.description);
			}

			try{
				//if(GPrintmade.isIE)
				//	this._plugin.releaseUAC();
			}catch(e){
				//alert('Printmade 3 : ' + e.description);
			}

			GPrintmade.plugincapture = null;
			GPrintmade.option = null;
			GPrintmade = null;
		}

	},
	_insertID : function(framewin) {
		var objects = framewin.document.getElementsByTagName('object');
		var embeds = framewin.document.getElementsByTagName('embed');
		var inputs = framewin.document.getElementsByTagName('input');
		var selects = framewin.document.getElementsByTagName('select');
		var textareas = framewin.document.getElementsByTagName('textarea');

		for (var i = 0; i < objects.length; i++) {
			if (objects[i].id == '') {
				this._idindex++;
				objects[i].id = 'ptm_copy_' + this._idindex;
			}
		}

		for (var i = 0; i < embeds.length; i++) {
			if (embeds[i].id == '') {
				this._idindex++;
				embeds[i].id = 'ptm_copy_' + this._idindex;
			}
		}


		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == 'text') {
				if (inputs[i].id == '') {
					this._idindex++;
					inputs[i].id = 'ptm_copy_' + this._idindex;
				}
			}

			if (inputs[i].type == 'radio' || inputs[i].type == 'checkbox'){
				if (inputs[i].id == '') {
					this._idindex++;
					inputs[i].id = 'ptm_copy_' + this._idindex;
				}
			}
		}

		for (var i = 0; i < selects.length; i++) {
			if (selects[i].id == '') {
				this._idindex++;
				selects[i].id = 'ptm_copy_' + this._idindex;
			}
		}

		for (var i = 0; i < textareas.length; i++) {
			if (textareas[i].id == '') {
				this._idindex++;
				textareas[i].id = 'ptm_copy_' + this._idindex;
			}
		}
	},
	_removeID : function(framewin, first, last) {
		for (var i = first; i <= last; i++)
			framewin.document.getElementById('ptm_copy_' + i).removeAttribute('id');
	},
	_AddExecuteString : function() {
		var script = '';
		script = script + "<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>\n\n";

		var add_readyEvent = '<script type="text/javascript"> $(document).ready(function(){' + GPrintmade.option.GetExecuteString() + '}); </script>\n\n';
		script = script + add_readyEvent;
		return script;
	},
	_GetUniqueId:function(){
		this._unique_id = this._unique_id + 1;
		return this._unique_id;
	},
	_CopyTextData : function (id, framewin) {
		var data = framewin.document.getElementById(id);
		var script = '';

		script = script + '\nvar text = document.getElementById("' + id + '");';
		script = script + '\ntext.value = "' + data['value'] + '";';
		script = script + '\ntext.scrollLeft = ' + data.scrollLeft + ';';

		return script;
	},
	_CopyCheckedData : function (id, framewin) {
		var data = framewin.document.getElementById(id);
		var script = '';

		script = script + '\nvar check = document.getElementById("' + id + '");';
		script = script + '\ncheck.checked = ' + data.checked;

		return script;
	},
	_CopySelectedData : function (id, framewin) {
		var data = framewin.document.getElementById(id);
		var script = '';

		script = script + '\nvar select = document.getElementById("' + id + '");';

		for (var i = 0; i < data.length; i++) {
			script = script + '\nselect[' + i + '].selected = ' + data[i].selected + ';';
		}

		return script;
	},
	_CopyTextareaData : function (id, framewin) {
		var data = framewin.document.getElementById(id);
		var script = '';
		var content = data.value;
		var scrolltop = data.scrollTop;
		var scrollleft = data.scrollLeft;

		content = content.replace(/\t/gi, '\\t');
		content = content.replace(/\n/gi, '\\n');

		script = script + '\nvar textarea = document.getElementById("' + id + '");';
		script = script + '\ntextarea.value = "' + content + '";';
		script = script + '\ntextarea.scrollLeft = ' + scrollleft + ';';
		script = script + '\ntextarea.scrollTop = ' + scrolltop + ';';

		return script;
	},
	_ResizeBody : function() {
		if (parseInt(document.body.style.width) > GPrintmade.maxBodyWidth)
			return '\ndocument.body.style.width = \"' + GPrintmade.maxBodyWidth + 'px\";';
		else
			return '';
	},
	_AddScript : function (framewin) {
		var inputs = framewin.document.getElementsByTagName('input');
		var result = '';
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == 'text')
				result = result + this._CopyTextData(inputs[i].id, framewin);

			if (inputs[i].type == 'radio' || inputs[i].type == 'checkbox')
				result = result + this._CopyCheckedData(inputs[i].id, framewin);
		}

		var selects = framewin.document.getElementsByTagName('select');
		for (var i = 0; i < selects.length; i++) {
			result = result + this._CopySelectedData(selects[i].id, framewin);
		}

		var textareas = framewin.document.getElementsByTagName('textarea');
		for (var i = 0; i < textareas.length; i++) {
			result = result + this._CopyTextareaData(textareas[i].id, framewin);
		}

		result = result + this._ResizeBody();

		return result;
	},
	_GetDoctype : function() {
		var result = '';

		if (GPrintmade.isIE) {
			if (document.all[0].text != undefined)
				result = document.all[0].text;
		}
		else {
			if (document.doctype != null)
				result = '<!DOCTYPE ' + document.doctype.name + ' PUBLIC \"' +  document.doctype.publicId + '\"' + (document.doctype.systemId ? ' \"' + document.doctype.systemId + '\"' : '') + '>';
		}
		return result;
	},
	_RemoveComment : function(string) {
		var str = string;
		var regex = /\<!--(.|\n)*?--\>/gi
		var result = str.replace(regex, function(word) {
			var result = word.replace(/\<!--(.|\n)*?--\>/, '');
			return result;
		});

		return result;
	},
	_ReplaceToCapturedImage : function(string, plugincapture) {
		var str = string, index;
		var result = str;

		/*
		 * Object 태그 제거를 위한 스크립트
		 * Object 태그 안에 Object 태그가 중복해서 들어있는 경우를 고려해야 하므로
		 * 정규식으로 제거할 수가 없어서 별도의 함수를 만듦.
		 */

		if (GPrintmade.isObjectTagExist) {
			var match = str.match(/<object/i);
			while (match != null) {
				str = this._RemoveObjectTag(str, match.index, plugincapture);
				match = str.match(/<object/i);
			}
			result = str;
		}
		else {
			result = str;
		}

		if (GPrintmade.isMarqueeTagExist) {
			var regex  = /<marquee\s*([^\>])*?\sid\s*=\s*(\"|\')*\w*(\2)*\s*(.|\n)*?>(.|\n)*?<\/marquee>/gi

			result = result.replace(regex, function(word) {
				var result = word.match(/<marquee\s*([^\>])*?\sid\s*=\s*(\"|\')*(\w*)(\2)*\s*(.|\n)*?>(.|\n)*?<\/marquee>/i);
				var id = result[3];
				return plugincapture.CaptureWithElement(id);
			});
		}

		/*
		 * Embed 태그 제거를 위한 스크립트
		 * Embed 태그의 경우 HTML 파일에서 </embed>를 인식하지 못하기 때문에
		 * Object, Marquee 태그와 함께 처리할 수 없다.
		 * 그러므로 닫는 태그가 없는 정규식을 이용하여 따로 처리해주어야 한다.
		 */

		if (GPrintmade.isEmbedTagExist == true) {
			var regex2 = /<embed\s*([^\>])*?\sid\s*=\s*(\"|\')*\w*\2\s*(.|\n)*?>/gi
			result = result.replace(regex2, function(word) {
				var result = word.match(/<embed\s*([^\>])*?\sid\s*=\s*(\"|\')*(\w*)\2\s*(.|\n)*?>/i);
				var id = result[3];
				var tmp = plugincapture.CaptureWithElement(id);

				return tmp;
			});
		}

		/*
		 * Img 태그 제거를 위한 스크립트
		 * Img 태그 중 src에 png,gif,jpg 등 이미지가 아닌 스크립트로 연결되어 있는 경우 오브젝트 캡쳐를 한다.
		 *
		 */
	    var regex3 = /<img\s*([^\>])*?\sptm_object_target\s*=\s*(\"|\')*\w*\2\s*(.|\n)*?>/gi
		result = result.replace(regex3, function(word) {
			var result = word.match(/<img\s*([^\>])*?\sid\s*=\s*(\"|\')*(\w*)\2\s*(.|\n)*?>/i);
			var id = result[3];
			var tmp = plugincapture.CaptureWithElement(id);
			return tmp;
		 });

		return result;
	},
	_RemoveObjectTag : function (str, index, plugincapture) {
		var startindex = index;
		var tmpindex = index;

		var openregex = /<object/i
		var closeregex = /<\/object>/i

		var	remainstr = str.substring(index + 1);

		var openindex, closeindex;

		var findIndexOfTag = function(regex, index) {
			var remainstr = str.substring(index + 1);
			var match = remainstr.match(regex);

			if (match != null)
				return match.index + index;
			else
				return -1;
		};

		openindex = findIndexOfTag(openregex, tmpindex);
		closeindex = findIndexOfTag(closeregex, tmpindex);

		if (openindex != -1 && openindex < closeindex) {

			/*
			 * openindex : 현재 이후로 가장 먼저 나오는 <object> 태그의 위치
			 * closeindex : 현재 이후로 가장 먼저 나오는 </object> 태그의 위치
			 * openindex가 더 작다는 말은 기존의 object 태그가 닫히기 전 새로운 object 태그가 열렸다는 것을 의미한다.
			 * 그러므로 2개의 </object>가 나타나야 한다.
			 * closeindex가 더 작은 경우는 </object> 태그가 먼저 나온다는 뜻이고
			 * openindex가 -1인 경우는 더 이상 새로운 object 태그가 열리지 않는다는 말이기 때문에
			 * 기존의 object 태그를 가장 먼저 나오는 </object> 태그와 매치시키면 된다.
			 */

			var count = 2;
			var i_openindex, i_closeindex, index = openindex;
			while (count != 0) {
				i_openindex = findIndexOfTag(openregex, index + 1);
				i_closeindex = findIndexOfTag(closeregex, index + 1);

				if (i_openindex != -1) {
					if (i_openindex < i_closeindex) {
						count = count + 1;
						index = i_openindex;
					}
					else {
						count = count - 1;
						index = i_closeindex;
					}
				}
				else
					count = 0;
			}
			closeindex = i_closeindex;
		}

		/*
		 *  여기에 captureForTest 호출하기.
		 *
		 */

		var objectstring = str.substring(startindex, closeindex + 10);
		var regex = /<object([^>])*?\s+id\s*=\s*(\"|\')*(\w*)(\2)*[^>]*\>/i
		var match = objectstring.match(regex);
		if(match.length < 3)
			return front + objectstring + rear;
		var id = match[3];
		var replacestring = plugincapture.CaptureWithElement(id);
		var front = str.substring(0, startindex);
		var rear = str.substring(closeindex + 10);

		var result = front + replacestring + rear;
		return result;
	},
	_ChangeCharset : function(string) {
		var str = string;

		var regex = /(\<meta.*charset\s*=\s*(\"|\')*)([^(\'|\"|\s|\;|\>)]*)(.*)/gi

		var isCharsetExist = str.match(regex);
		if (isCharsetExist == null) {
            return str + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
		}

		var result = str.replace(regex, function(word) {
			var result = word.replace(/(\<meta.*charset\s*=\s*(\"|\')*)([^(\'|\"|\s|\;|\>)]*)(.*)/gi, '$1utf-8$4');
			return result;
		});

		return result;
	},
	_GetHTMLTagAttributes : function () {
		var html = dmj('html');
		var html_attributes = html[0].attributes;
	  	var result = '';
		if (html_attributes.length) {


			for (var i = 0; i < html_attributes.length; i++) {

				if (html_attributes[i].value != '' && html_attributes[i].value != 'null') {
					result += html_attributes[i].name + '="' + html_attributes[i].value + '" ';
				}
			}
		}
		return result;
	},
	_RelativeToStaticOfAddress : function(obj, currentURL){
        /*
         * 그냥 dom의 src를 잡으면 절대 경로를 가져오게 된다.
         * 하지만 jQuery의 attr로 가져오면 현재 설정된 상태를 가져온다.
         */

		var static_path = Soo.URL.getStaticPath(currentURL);
		var current_protocol = location.protocol;
		//SRC
		dmj(obj).find('*[src]:not(frame):not(iframe)').each(function(){
			if ((new String(dmj(this).attr('src'))).indexOf(current_protocol) == -1 && (new String(dmj(this).attr('src'))).indexOf('http://') == -1 && (new String(dmj(this).attr('src'))).indexOf('https://') == -1) {
				var src_string = new String(this.src);
				if(src_string.indexOf(current_protocol) == -1){
					if(src_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('src_ptm', current_protocol + '//'+location.host+'/' + (new String(dmj(this).attr('src'))));
					}else{
						//Document relative path
						dmj(this).attr('src_ptm', static_path + (new String(dmj(this).attr('src'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('src_ptm',src_string);
				}
			}
		});

		// 모든 href 를 상대 경로에서 절대 경로로 바꾼다.
		dmj(obj).find('*[href]').each(function(){
			if ((new String(dmj(this).attr('href'))).indexOf(current_protocol) == -1 && (new String(dmj(this).attr('href'))).indexOf('http://') == -1 && (new String(dmj(this).attr('href'))).indexOf('https://') == -1) {
				var href_string = new String(this.href);
				if(href_string.indexOf(current_protocol) == -1){
					if(href_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('href_ptm', current_protocol+'//'+location.host+'/' + (new String(dmj(this).attr('href'))));
					}else{
						//Document relative path
						dmj(this).attr('href_ptm', static_path + (new String(dmj(this).attr('href'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('href_ptm',href_string);
				}
			}else{
				dmj(this).attr('href_ptm',dmj(this).attr('href'));
			}
		});

		dmj(obj).find('*[background]').each(function(){
			if ((new String(dmj(this).attr('background'))).indexOf(current_protocol) == -1 && (new String(dmj(this).attr('background'))).indexOf('http://') == -1 && (new String(dmj(this).attr('background'))).indexOf('https://') == -1) {
				var background_string = new String(this.background);
				if(background_string.indexOf(current_protocol) == -1){
					if(background_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('background_ptm', current_protocol+'//'+location.host+'/' + (new String(dmj(this).attr('background'))));
					}else{
						//Document relative path
						dmj(this).attr('background_ptm', static_path + (new String(dmj(this).attr('background'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('background_ptm',background_string);
				}

			}
		});
		/*
		 * Path는 총 3가지로 이루어져 있다.
		 * Absolute Path - http://
		 * Root Relative Path - forward-slash
		 * Document Relative Path
		 *
		 * IE 6,7,8(모드전환)를 제외한 나머지 브라우저는 DOM.src가 absolute path를 나타낸다.
		 */
		/*
		 * 원래버전 : *[src]:not(frame,iframe)
		 * 수정된 버전 : *[src]:not(frame),*[src]:not(iframe)
		 * 이유 : Opera(10.62) 에서 jquery Sizzle 클래스가 not 안에 있는 multiple selector 작동이 되지
		 * 않는다. 임시 조치이며 추후 Sizzle 클래스를 수정하던가, 속도에 문제없다면 그대로 써야 한다.
		 */

		//dmj(obj).find("*[src]:not(frame,iframe)").each(function(){
		  //*[src]:not(frame),*[src]:not(iframe),
		/*
if(GPrintmade.isOpera){
			dmj(obj).find('iframe:not(src_local_ptm)').each(function() {
				if ((new String(dmj(this).attr('src'))).indexOf('http://') == -1) {
					dmj(this).attr('src_local_ptm', static_path + (new String(dmj(this).attr('src'))));
				}
			});

			dmj(obj).find('frame:not(src_local_ptm)').each(function() {
				if ((new String(dmj(this).attr('src'))).indexOf('http://') == -1) {
					dmj(this).attr('src_local_ptm', static_path + (new String(dmj(this).attr('src'))));
				}
			});

			dmj(obj).find('*[src]:not(frame)').each(function(){
			if ((new String(dmj(this).attr('src'))).indexOf('http://') == -1) {

				dmj(this).attr('src_ptm', static_path + (new String(dmj(this).attr('src'))));
				}
			});

			dmj(obj).find('*[src]:not(iframe)').each(function(){
			if ((new String(dmj(this).attr('src'))).indexOf('http://') == -1) {

				dmj(this).attr('src_ptm', static_path + (new String(dmj(this).attr('src'))));
				}
			});
		}else{
			dmj(obj).find('*[src]:not(frame):not(iframe)').each(function(){
			if ((new String(dmj(this).attr('src'))).indexOf('http://') == -1) {
				var src_string = new String(this.src);
				if(src_string.indexOf('http://') == -1){
					if(src_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('src_ptm', 'http://'+location.host+'/' + (new String(dmj(this).attr('src'))));
					}else{
						//Document relative path
						dmj(this).attr('src_ptm', static_path + (new String(dmj(this).attr('src'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('src_ptm',src_string);
				}
			}
			});
		}
		// 모든 href 를 상대 경로에서 절대 경로로 바꾼다.
		dmj(obj).find('*[href]').each(function(){
			if ((new String(dmj(this).attr('href'))).indexOf('http://') == -1) {
				var href_string = new String(this.href);
				if(href_string.indexOf('http://') == -1){
					if(href_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('href_ptm', 'http://'+location.host+'/' + (new String(dmj(this).attr('href'))));
					}else{
						//Document relative path
						dmj(this).attr('href_ptm', static_path + (new String(dmj(this).attr('href'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('href_ptm',href_string);
				}
			}
		});

		// 모든 href 를 상대 경로에서 절대 경로로 바꾼다.
		dmj(obj).find('*[background]').each(function(){
			if ((new String(dmj(this).attr('background'))).indexOf('http://') == -1) {

				var background_string = new String(this.background);
				if(background_string.indexOf('http://') == -1){
					if(background_string.indexOf('/') == 0){
						//Root relative path
						dmj(this).attr('background_ptm', 'http://'+location.host+'/' + (new String(dmj(this).attr('background'))));
					}else{
						//Document relative path
						dmj(this).attr('background_ptm', static_path + (new String(dmj(this).attr('background'))));
					}
				}else{
					//absolute path가 있으면 바로 적용.
					dmj(this).attr('background_ptm',background_string);
				}

			}
		});
*/
	},
	_RemoveScriptTag : function(string){
		var str = string;
		var result = str;

		/*
		 *  script 태그 중 실제 script 코드 없이 src 링크로 끝나는 경우를 제거하는 정규식
		 *  예1) <script type="text/javascript" src="natead_v20100320.js?v=20100320">
		 *  예2) <script type="text/javascript" src="natead_v20100320.js?v=20100320"></script>
		 *  <script 이후 src가 있는지 없는지 확인하고 만약 </script>가 바로 뒤에 붙어 있으면 없애기
		 */


//		예1의 경우가 없는 경우 아래의 스크립트만으로도 충분히 동작하므로 우선 주석 처리

//		var regex = /\<script([^>])*?\s*src\s*=\s*(.|\n)*?\>(\s|\n)*(\<\/script\>)*/gi
//		result = str.replace(regex, function(word) {
//			var result = word.replace(/\<script([^\>])*?\s*src\s*=\s*(.|\n)*?\>(\s|\n)*(\<\/script\>)*/gi, '');
//			return result;
//		});


		/*
		 * ?가 없는 정규식을 쓰는 경우 가장 넓은 범위를 매칭시키므로
		 * <script> abc </script> 123 <script> def </script>와 같은 경우 123까지 모두 포함하여 하나로 매칭된다.
		 * (.|\n) 뒤에 ?를 붙여주면 가장 좁은 범위를 매칭시키므로
		 * <script> abc </script>와 <script> def </script>가 각각 따로 매칭된다.
		 */
		regex = /\<script(.|\n)*?\<\/script\>/gi
		result = result.replace(regex,function(word){
			var result = word.replace(/\<script(.|\n)*?\<\/script\>/gi, '');
			return result;
		});

		return result;
	}
});
