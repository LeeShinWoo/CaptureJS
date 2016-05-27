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
/**********************************************************************************************
 *
 * 프린트메이드 설정 전역변수
 *
 **********************************************************************************************/
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

var SCRIPTURL = SERVER_PATH + '/server_files/ptmscript.js';

//---------------------------------PrintmadeOption class------------------------------
function Option_Info(){
	/*
		전역변수로초기화
	*/
	var dialogmode = DIALOGMODE;
	var alignment = PAGEALIGNMENT;
	var dialog = DIALOG_RECT;
	var license = LICENSE_CODE;
	var formurl = FORMURL;
	var renderingtype = RENDERINGTYPE;
	var customer = PMCUSTOMER;
	var logoimg = PMLOGOIMG;
	var icon = PMICON;
	var pagesize = PMPAGESIZE;
	var memo = PMMEMO;
	var zoom = PMZOOM;
	var pagewidth = PMPAGEWIDTH;

	/*
		초기화해야될 변수들
	*/
	var frameid = 'NOID';
	var elementid = '';
	var cut = '0,0,0,0';
	var tag_pagebreak = [];
	var manual_pagebreak = '';
	var pagebreaks = ''
	var originalurl = '';
	var parameters = '';
	var frameindex = 1;
	var executestring = '';
	var orientation = 'portrait';
	var formvar = '';
	var pagemargin = '';
	var userpreference = 0;

	var Func = {
		SetPageMargin:function(){
			pagemargin = arguments[0];
		},
		SetUserPreference:function(){
			userpreference = arguments[0];
		},
		SetFormVariables : function() {
			formvar = arguments[0];
		},
		SetExecuteString : function() {
			executestring = arguments[0];
		},
		SetElementId : function() {
			elementid = arguments[0];
		},
		GetFrameId : function() {
			var temp_frameId = frameid;
			return temp_frameId;
		},
		GetElementId : function() {
			var temp_ElementId = elementid;
			return temp_ElementId;
		},
		SetLicense : function() {
			license = arguments[0];
		},
		SetRenderingType : function() {
			renderingtype = arguments[0];
		},
		SetFormURL : function() {
			formurl = arguments[0];
		},
		SetOriginalURL : function() {
			originalurl = arguments[0];
		},
		SetOrientation : function() {
			orientation = arguments[0];
		},
		SetCutRect : function() {
			cut = arguments[0];
		},
		AddPagebreak : function() {
			tag_pagebreak.push(parseInt(arguments[0]));
		},
		SetPagebreak : function() {
			manual_pagebreak = arguments[0];
		},
		FindFrame : function (frame, id) {
			if (frame.document.getElementById(id) != null) {
				return frame;
			}
			else {
				if (frame.frames == null)
					return null;
				for (var i = 0; i < frame.frames.length; i++) {
					result = this.FindFrame(frame.frames[i], id);
					if (result != null) {
						return result;
					}
				}
			}
			return null;
		},
		SetFrameIdWithElementId : function(id) {
			if (id == '')
				return;

			var frame = this.FindFrame(PTMMainController.top, id);

			if (frame == top) {
				frameid = id;
				return;
			}
			else {
				var frame_element = frame.frameElement;


				if (frame_element.id == '' || frame_element.id == null)
				{
					frame_element.id = 'ptm_frm' + frameindex;
					frameindex = frameindex + 1;
				}
				frameid = frame_element.id;
				return;
			}
		},
		GetPagebreak : function() {
			var all_pagebreak = tag_pagebreak;

			if (manual_pagebreak != '')
			{
				var tmp = manual_pagebreak.split(',');
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
		AddParameter : function(name, value) {
			if (parameters == '')
				parameters = name + ':' + value;
			else
				parameters = parameters + '|' + name + ':' + value;
		},
		GetParameterString : function() {

			if (frameid != '')
				this.AddParameter('FRAMEID', frameid);

			if (elementid != '')
				this.AddParameter('ELEMENTID', elementid);
			else{

				if(dmj('#printArea').length > 0){

					this.AddParameter('ELEMENTID', '#printArea');

				}else if(dmj('#printarea').length > 0){

					this.AddParameter('ELEMENTID', '#printarea');

				}else{

				}

			}
			this.AddParameter('DIALOGMODE', dialogmode);

			if (dialogmode == 1 && dialog != '0,0,0,0')
				this.AddParameter('DIALOGRECT', dialog);

			this.AddParameter('ALIGNMENT', alignment);

			this.AddParameter('CUTRECT', cut);

			pagebreaks = this.GetPagebreak();

			if (pagebreaks != '')
				this.AddParameter('PAGEBREAKS', pagebreaks);

			this.AddParameter('LICENSE', license);

			this.AddParameter('RENDERINGTYPE', renderingtype);

			this.AddParameter('FORMURL', formurl);

			this.AddParameter('ORIGINALURL', originalurl);

			this.AddParameter('ORIENTATION', orientation);

			this.AddParameter('FORMVAR', formvar);

			this.AddParameter('PAGEMARGIN', pagemargin);

			this.AddParameter('USERPREFERENCE', userpreference);

			this.AddParameter('CUSTOMER', customer);
			this.AddParameter('LOGOIMG', logoimg);
			this.AddParameter('ICON', icon);
			this.AddParameter('PAGESIZE', pagesize);

			this.AddParameter('MEMO', memo);
			this.AddParameter('ZOOM', zoom);

			this.AddParameter('PAGEWIDTH', pagewidth);

			return parameters;
		}
	};
	return Func;
}
//---------------------------------PrintmadeOption Factory class------------------------------
var Option_InfoFactory = {
	create_OptionInfo : function(){
		var option_Info = new Option_Info();
		return option_Info;
	}
}
