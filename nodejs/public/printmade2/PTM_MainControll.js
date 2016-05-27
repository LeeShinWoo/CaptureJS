var PTM_AFTERPRINTING = [];
var GPrintmade_ToolbarHeight = 0;
var GPrintmade_BrowserLeftEdge = 0;

dmj(document).ready(function(){
    if(!GPrintmade_NonCrossTop)
        GPrintmade_NonCrossTop = GetNonCrossTop(window);

	if(!GPrintmade_MainFrame)
		GPrintmade_MainFrame = window.top;
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

//Printmade3 메인컨트롤러
var PTMMainController = {
	init : function(){
		this._plugin = null;
		this.target = null;
		this.isObjectTagExist = null;
		this.isEmbedTagExist = null;
		this.isMarqueeTagExist = null;
		this.isExist = null;

		this.maxBodyWidth = 1500;
		this.top = top;
		this._make_id_index = 0;

		this.option = Option_InfoFactory.create_OptionInfo();
	},
	NPAPIRun:function(target){

		this._initNPAPI(target);
		this.target = target;
		//플러그인이 들어갈 시간을 위해서 setTimeout 을 함
		setTimeout(function(){ PTMMainController.Initialize();}, 50);
	},
	WebSocketRun:function(target){
		this.target = target;
		this.Initialize();
	},
	LocalStroeageRun:function(target){
		this.target = target;
		this.Initialize();
	},
	Run:function(target){

	},
	_initNPAPI:function(target){
		this.target = target;
		var inserted_plugin = this._InsertPlugin();
		this._plugin = inserted_plugin;
	},
	_InsertPlugin :function(){
		var inserted_plugin = null;
		for (var i = 0; i < 10000; i++) {
			if (inserted_plugin != null){
				return inserted_plugin;
			}
			else
			{
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
	},
	Initialize:function() {
		//object, marquee,embed 등 스크롤 캡쳐 기능이 필요한 곳이 있는지 확인 한다.
		this.isExist = this._FindReplaceTag();
			this.CallDOMParser();
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
		PTMDOMParser.init(this._plugin);
		var domparser = PTMDOMParser;
		var frame = this.target;
		domparser.Run(frame);
		for(var i=0; i < PTM_AFTERPRINTING.length; i++)
		{
			PTM_AFTERPRINTING[i][0](PTM_AFTERPRINTING[i][1]);
		}
		domparser = null;
	}
}
function PTMFrameObject(framewin){
	this.framewin = framewin;
	this._framewin_document = framewin.document;
	this._mode = 0;   // 0 is Body, 1 is Frameset


	this._GetFramewinDocument = function(){
		if (GPrintmade.isIE)
			this._framewin_document = this.framewin.document;
		else
			this._framewin_document = this.framewin.document;
	}
	this._SelectMode=function(){
		var $tmp_obj = dmj('frameset',this.framewin.document);
		if($tmp_obj[0] == undefined){
			this._mode = 0;
			return;
		}
		this._mode = 1;
	}
	this._SelectMode();
	this._Get_jQueryObject=function(){
		if(this._mode == 0){
			var $body = dmj('body',this.framewin.document);
			if($body[0] == undefined){
				return null;
			}
			return dmj('body',this._framewin_document);
		}

		return dmj('frameset',this._framewin_document);
	}
	/*
	 * body -> iframe, frameset -> frame
	 */
	this.GetEmbededFrame=function(index){
		if(this._mode == 0){
			return dmj('iframe:eq(' + index + ')',this._framewin_document);
		}

		return dmj('frame:eq(' + index + ')',this._framewin_document);
	}
	this._ReplaceSRC = function(){
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
	}
	/*
	 * Body 또는 Frameset의 HTML을 리턴한다
	 */
	this.GetFullHtml = function(){
		var result = '';
	    if(this._Get_jQueryObject() == null)
			return '';

		//src_ptm 을 src로 변환
		var html = this._ReplaceSRC();

		//원래 세팅값을 가져옴
		var str_attributes = this._GetAllAttributesStr();

		if(this._mode == 0){
			result = '<body ' + str_attributes + '>' + html + '</body>';
		}
		else{
			result = '<frameset ' + str_attributes  + '>' + html + '</frameset>';
		}
		result = jQuery.trim(result);
		return result;
	}
	/*
	 * Body 또는 Frameset 에 있는 Attribute를 가져온다.
	 */
	this._GetAllAttributesStr = function(){
		var $object = this._Get_jQueryObject();
		var isBackgroundPTMExist = false;


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
}
