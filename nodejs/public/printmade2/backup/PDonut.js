
//
// DONUT BY YYS 
//
// VERSION : 1.0.0.0
// Q&A : cocacolar@nate.com
// 작성일 : 2016.02.10
var doj = jQuery.noConflict();
doj.support.cors = true;

doj(window).ready(function(){
	Donut.init();
	
	if(isWindow()){
		Donut.checkPrintmade("check");
	}else{
	//	alert("No");
	}
})


function isWindow(){
	
	return (PTMInstallChecker.checkOS == "Win" && (PTMInstallChecker.checkWebBrowser != "FireFox" || PTMInstallChecker.checkWebBrowser != "Safari"));
}

var PrintmadeInstalled = 0;
var Donut = {
	init : function(){

	doj.support.cors = true;
	Donut.idx = 0;	
	Donut.installed = 0;
	Donut.checkmode = 0;
	Donut.browser = "";
	Donut.OS = "";
	},
	sendDonut : {}	
};
/// 사용자 함수

/// #2 메시지 부분 : 메시지가 리턴되는 부분

PTMRunFinished = function(data){

	PTM_RemoveDialog();
}

PTMValidateVersion = function(data){
	//alert(data.PTMVersion);
	Donut.installed = 1;
	
	if(Donut.checkmode == 0){
		try{
			var ieVersion = navigator.userAgent.match(/trident\/\d.\d/gi)[0].split("/")[1]*1;

			//if(ieVersion <= 5){
				location.href =  "printmade25://";
				var printmade = GPrintmade;
				printmade.Run(DONUTPARAMETERTARGETFRAME);
			/*
			}else{
				if(!PTMAnt.isClick){
					PTMAnt.Ant = setInterval(function(){PTMAnt.run()},2000);
				}
				
			}*/
		}catch(e){
			alert("IE 실행에러!");
		}
	}else{
		Donut.checkmode = 0;
		//alert("체크모드!");
	}
}

//// #3 전송부분

var firsterror = 0;
	Donut.sendDonut = function(targeturl,jsondata,delay,callbackFunction){
		
		if(!isWindow()) return;
		
		var turl=targeturl;
		var jdata=jsondata;
		var dd = delay;
		var defaultType = "application/json; charset=utf-8";
		var ieVersion = "";
		try{
			ieVersion = navigator.userAgent.match(/trident\/\d.\d/gi)[0].split("/")[1]*1;
			if(ieVersion == 5){
				defaultType = "text/html; charset=utf-8";
				dd = 2000;
			
			
			}
		}catch(e){
			
			
		}
	
	//alert(defaultType);

	
	setTimeout(function(){
		doj.ajax({
			   url:turl,
			   type:"GET",
               contentType: defaultType,            
			   dataType:"JSONP",
			   jsonpCallback:callbackFunction,
			   withCredentials:true,
			   crossDomain: true,
			   withCredentials:true,
			   timeout: 10000,
			   data: (jdata),
			   success : function(data) {
					 // TODO
					if(data.PTMVersion !== undefined){
						//alert("서비스 성공")	
					}else{
						//alert("실행파일 성공");
					}
					firsterror = 0;
					
					return true;

					//alert("성공 : "+data);
					//Donut.sendDonut(""); 
			   },
			   complete : function(data) {
					 // TODO					 
					 				   //console.log("Finished");
						//alert('프린트메이드가 설치되어있지 않습니다.');
						//Donut.SetupPrintmade();

			   },
			   error : function(jqXHR, exception, req) {
						if(jqXHR.status == 0){
						
							if(firsterror == 0){ firsterror++; Donut.sendDonut(turl,jdata,dd,callbackFunction);}
								else 
									Donut.SetupPrintmade();
									
						} else if (jqXHR.status == 404) {
							Donut.SetupPrintmade();

						} else if (jqXHR.status == 500) {
							Donut.SetupPrintmade();

						} else if (exception === 'parsererror') {
							if(firsterror == 0){  firsterror++; Donut.sendDonut(turl,jdata,dd,callbackFunction);}
								else 
									Donut.SetupPrintmade();

						} else if (exception === 'timeout') {
							Donut.SetupPrintmade();

						} else if (exception === 'abort') {
							Donut.SetupPrintmade();

						} else {
							Donut.SetupPrintmade();

						}
					
			   }
		 });

	},dd)
}

Donut.SetupPrintmade = function(){
	
	Donut.installed = 0;
	PTMLoadingClose();
}

Donut.RunPrintmade = function(param){
	
	
	//?callback=?
	//DonutLoad();
	Donut.sendDonut(
	"https://127.0.0.1:3040",
	{  "!PTMRUNVIEWER!"	:"!",
	   "!" 				:"!PULS!"+location.hostname+"!SLUP!",
	   "!!"				:"!PPRA"+param+"ARPP!"},
	
	100,
	"PTMRunFinished");
}

Donut.checkPrintmade = function(textdata){
	//PrintmadeInstalled = 0;
	//DonutLoad();
	if(textdata == "check"){
		Donut.checkmode = 1;		
	}else{
		Donut.checkmode = 0;				
	}
	Donut.sendDonut(
	"https://127.0.0.1:30403",
	{  "!_!":"!_!" },
	
	100,
	"PTMValidateVersion");
	
}




var PTMInstallChecker = {Extend : {}};	

	
PTMInstallChecker.Extend = function(destination,source){
	for(property in source){
		destination[property] = source[property];
	}
	return destination;
}


	
PTMInstallChecker.Extend(PTMInstallChecker,{

	init : function(){
		PTMInstallChecker.browser = this.checkWebBrowser();
		Donut.browser = PTMInstallChecker.browser;
		Donut.OS = this.checkOS();
		PTMInstallChecker.isPTM = false;
		PTMInstallChecker.version = '0.0.0.0';
	},
	checkWebBrowser : function(){ // browser check!!!!
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
	fromUserAgent : function(){							//userAgent(IE)
		var userAgent = navigator.userAgent;
		var isPTM = userAgent.indexOf('printmade');
		if(isPTM != -1){
			this.version = userAgent.match(/printmade=\d.\d.\d.\d/)[0].split('=')[1];		//printmade version check
			this.isPTM = true;
		}
		else{
			this.isPTM = false;
		}
	},
	fromNPPlugin : function(){						//NP Plugin(fire fox, Safari)
		var mimetype = navigator.mimeTypes["application/nagosoft/printmade3"];
		if (mimetype == undefined) {
			this.isPTM = false;
		}else{
			this.version = mimetype.enabledPlugin.version;
			this.isPTM = true;
		}
	},
	check : function(){		//install check function

		PTMInstallChecker.init();
		
		if(Donut.installed == 0){
			switch(this.browser){
				case 'Safari':
				case 'Firefox':
					this.fromNPPlugin();
					break;
				case 'MSIE':
					this.fromUserAgent();
					if(this.isPTM == true){
						break;				
					}	
				default:
					this.isPTM = false;
					break;
			}
		}else{
			this.isPTM = true;
		}
	}
});