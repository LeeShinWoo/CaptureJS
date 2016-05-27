function getStaticPath(url){
	var regex = /[\w:\/\/]+.*\//;
	//		var regex = /[\w:\/\/\.%]+\//;
	var result = (""+url).match(regex);
	return result;
}
var PTMDOMParser = {
	init: function(plugin){
		this._unique_id = 0;
		this._plugin = plugin;
		this._iwebbrowser = null;
		this._iezoomsize = 0;
		this._isExist = false;
		this._isObjectTagExist = false;
		this._isEmbedTagExist = false;
		this._isMarqueeTagExist = false;
		this._appdatapath = '';
		this._idindex = 1;
		this._target = null;
	},
	/*
	 * ���� �Լ� - parseFrame�� �ٷ� ȣ������ �ʰ� run�� ���ļ� ȣ��
	 * Call back ���� �����ϹǷ� ���� �ʿ���.
	 */
	Run:function(target){
		var browser = Client_Info.browser_Info.getBrowser()
		this._target = target;
		if(browser == 'Safari' || browser == 'Firefox'){
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
		this._ParseFrame(target,this._GetUniqueId());

	},
	_RemovePrintmade2 : function() {
		var ptm_plugin = this._target.document.getElementById('ptm_plugin');
		ptm_plugin.style.display = 'none';

	},
	_IsCrossDomain : function(framewin) {
		/*
		 * framewin�� Cross-domain�� window�� �� framewin.document�� ��
		 * ũ��, ���ĸ� : undefined
		 * IE, ���̾�����, ������ : Exception �߻�
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
	 * Frame ���� ������ �Լ�
	 * �⺻ ���� - �� �������� window �����Ͱ� root �̰�, head, body(or frameset)�� ���� ����
	 */
	_ParseFrame:function(framewin,unique_id){
		var head_object;

		// head�� �ݵ��� framewin.document �� �������־��� �Ѵ�.
		head_object = dmj('head',framewin.document);

		//PTMFrameObj �� framewin�� body �Ǵ� frameset �� ��Ȱ�ϰ� ����Ī�ϱ� ���� Ŭ����
		var PTMFrameObj = null;
		PTMFrameObj = new PTMFrameObject(framewin);

		/*
		 * ���� Frame �˻� �� recursive call
		 */

		var tmp_frames = framewin.frames;

		for(var i=0; i < tmp_frames.length; i++){
			var tmp_framewin = tmp_frames[i];

			if (this._IsCrossDomain(tmp_framewin) == true)
			{
				continue;
			}

			var frame_unique_id = this._GetUniqueId();
			//���� ��Ʈ���ϰ� �ִ� frame�� jQuery Object�� �����´�
			var tmp_frame_object = PTMFrameObj.GetEmbededFrame(i);

			//�� frame�� Attribute���ٰ� frame_unique_id�� ���δ�. ���߿� �����ϱ� ���ؼ�
			tmp_frame_object.attr('src_local_ptm',frame_unique_id +'.html');
			this._ParseFrame(tmp_framewin,frame_unique_id);
		}

		//Change relative address2 to static address
		//Background URL ó���� �ʿ��ϴ�
		this._RelativeToStaticOfAddress(head_object, framewin.document.location);
		/*
		 * Problem : �������� ���� jquery('body') ������Ʈ�� Sizzle�ȿ� ���� ��
		 * 			������Ʈ�� ������ �� ������ ���װ� ������. �׷��� framewin ������ ������
		 */

	    this._RelativeToStaticOfAddress(PTMFrameObj.framewin.document, framewin.document.location);

	  	//ĸ�ĸ� �ؾߵǸ� ���̵��� ���� ������Ʈ�� ������ ������ �ش�.
	  	//embed, object, input, select, textarea
		dmj('embed:not(#ptm_plugin), object',framewin.document).each(function(index,Element){
			if(dmj(this).attr('id') == undefined || dmj(this).attr('id') == ''){
			  dmj(this).attr('id','ptm_object_'+unique_id+'_'+index);
			}
		});

		//img �߿� png, jpg, jpeg, gif, tif,  tiff, bmp �� �ƴ� ���� ĸ�ĸ� �Ѵ�.
		dmj('img:not([src$=".png"]):not([src$=".jpg"]):not([src$=".jpeg"]):not([src$=".bmp"]):not([src$=".tiff"]):not([src$=".tif"]):not([src$=".gif"])',framewin.document).attr("ptm_object_target","true").each(function(index,Element){
			var $obj = dmj(this).attr('id');
			if($obj == undefined || $obj == ''){
			  dmj(this).attr('id','ptm_object_img_'+unique_id+'_'+index);
			}
		});

		this._MakeFile(head_object,PTMFrameObj, unique_id, framewin);

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

	  var static_path = getStaticPath(PTMFrameObj.framewin.document.location);
		var result = str;
		var appdatapath = this._appdatapath;
		result = str.replace(/url\((\'|\")*.*?\)/gi, function(word) {
			//��ü ���θ� ������ �ִ� ����. �׳� �ѱ���.
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
				var top = 0;
				var element = dmj(pagebreaks[i]).next()[0];
				var tmpelement = element;


				// IE8.0 MS �׽�Ʈ �������� ���� tmpelement�� offsetParent�� ã�ٺ��� BODY�� ����
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
		var browser = Client_Info.browser_Info.getBrowser();
		var os = Client_Info.os_Info.getOs();
		var first_id_index = this._idindex;
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

		result_body = jQuery.trim(result_body);
		var result = this._GetDoctype();

		var html_attributes = this._GetHTMLTagAttributes();
		var iscript = "<script src='"+SCRIPTURL+"'> </script>"
		result = result + '<html ' + html_attributes + '>';
		result = result + '<head>' + iscript + result_head + '</head>';
		result = result + result_body;

		result = this._ReplaceURL(result, PTMFrameObj);
		PTMFrameObj = null;


		result = result + '</html>';
		result = jQuery.trim(result);

		try{
			if(os == "Linux"){
				if(browser == 'Opera' || browser == 'Chrome'){
					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}else{
					var path = encodeURI(this._plugin.getTempPath() + '/Printmade3/temp/' + unique_id + ".html");
					result = dmj.trim(result);
					this._plugin.writeFile(result, path);
				}
			}
			else if(os == "Mac"){
				if(browser == 'Opera' || browser == 'Chrome'){
					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}else{
					var path = encodeURI(this._appdatapath + '/Printmade3/temp/' + unique_id + ".html\0");
					result = dmj.trim(result + '\0');
					this._plugin.writeFile(result, path);
				}
			}else if(browser == 'MSIE'){

				try{
					localStorage.setItem("PTMSRC-"+unique_id,result);

				}
				catch(e){
					window.localStorage["PTMSRC-"+unique_id] = result;
				}

			}
			else{

				if(browser == 'Safari' || browser == 'Firefox'){
					this._plugin.writeFile(result, this._appdatapath + '/Printmade3/temp/' + unique_id + '.html\0');

				}else{

					PTMAnt.sendBridge("writeFile!!!PTMBLOCK!!!"+ unique_id +"!!!PTMBLOCK!!!"+result);
				}
	        }
		}catch(e){

		}

		if (unique_id == 1)
		{
			if(DEVELOPMENT_MODE){
				alert(GPrintmade.option.GetParameterString());
			}
			try{


			if(os == "Mac"){

				if(browser != 'Opera' && browser != 'Chrome'){
					var path = encodeURI(this._appdatapath + "/Printmade3/Viewer.app\0");
					var filename = encodeURI("file://" +this._appdatapath + "/Printmade3/temp/1.html\0");
					var parameters = encodeURI(PTMMainController.option.GetParameterString() + "\0");
					this._plugin.runViewer(path, filename, parameters);
				}else{
					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+PTMMainController.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					PTMAnt.Cnt = 0;
					isOK = false;
				}
				dmj("#ptm-loading").remove();
				dmj("#ptm-loading-bg").remove();
			}
			else if(os == "Linux"){

				if(browser != 'Opera' && browser != 'Chrome'){
					var path = encodeURI(this._appdatapath + "/Printmade3/Viewer");
					var filename = encodeURI(this._plugin.getTempPath() + "/Printmade3/temp/1.html");
					var parameters = encodeURI(PTMMainController.option.GetParameterString());
					this._plugin.runViewer(path, filename, parameters);
				}else{

					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+PTMMainController.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					PTMAnt.Cnt = 0;
					isOK = false;
				}
				dmj("#ptm-loading").remove();
				dmj("#ptm-loading-bg").remove();

			} else {

				if(browser == 'Safari' || browser == 'Firefox'){
					var path;
					if(this._plugin.getRunPath()){
						path = this._plugin.getRunPath();
						path = path.replace(/\\/g, '/');
						path = path + '/Printmade3/Viewer.exe\0';
					}
					path = encodeURI(path);
					var parameter = encodeURI('\"' + this._appdatapath + '/Printmade3/temp/1.html\" \"' + PTMMainController.option.GetParameterString() + '\"\0');
					this._plugin.runViewer(path,parameter);


				}else if(browser == 'MSIE'){

					var frameid = "NOID"
					var elementid = ""

					try{
						elementid = PTMMainController.option.GetElementId();
						frameid = PTMMainController.option.GetFrameId();
					}
					catch(e){
						alert(e);
					}


					var isPTM = navigator.userAgent.indexOf("printmade");
					if(isPTM != -1){

						var replaceAfter = ["!ptmprotocolhelper!","!ptms1!","print!ptmsn!made"];
						var replaceBefore = ["://","/","printmade"];

						//var resultformurl = FORMURL;
						var resultformurl = "";
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

						var param = "I!FRAMEID:"+frameid+"|ELEMENTID:"+elementid+"|ALIGNMENT:left|CUTRECT:0,0,0,0|FORMURL:"+resultformurl+"|PAGEWIDTH:"+PMPAGEWIDTH;

						var lhostArray = location.hostname.split(".");
						var lhostlastindex = lhostArray.length -1;
						var lhost = location.hostname.replace("."+lhostArray[lhostlastindex],"");

						location.href="printmade25://"+param+"!"+lhost;
					}else{
						PTMLoadingClose();
					}
				}
				else{
					PTM_RemoveDialog();
					PTMAnt.sendBridge("runViewer!!!PTMBLOCK!!!1!!!PTMBLOCK!!!"+PTMMainController.option.GetParameterString());
					PTMAnt.sendBridge("Quit");
					dmj("#ptm-loading").remove();
					dmj("#ptm-loading-bg").remove();
				}
			}

			}catch(e){

			}

		}
		PTMLoadingClose();
	},

	_GetUniqueId:function(){
		this._unique_id = this._unique_id + 1;
		return this._unique_id;
	},
	_GetDoctype : function() {
		var browser = Client_Info.os_Info.getOs();
		var result = '';

		if (browser == 'MSIE') {
			if (document.all[0].text != undefined)
				result = document.all[0].text;
		}
		else {
			if (document.doctype != null)
				result = '<!DOCTYPE ' + document.doctype.name + ' PUBLIC \"' +  document.doctype.publicId + '\"' + (document.doctype.systemId ? ' \"' + document.doctype.systemId + '\"' : '') + '>';
		}
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
         * �׳� dom�� src�� ������ ���� ���θ� �������� �ȴ�.
         * ������ jQuery�� attr�� �������� ���� ������ ���¸� �����´�.
         */

		var static_path = getStaticPath(currentURL);
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
					//absolute path�� ������ �ٷ� ����.
					dmj(this).attr('src_ptm',src_string);
				}
			}
		});

		// ���� href �� ���� ���ο��� ���� ���η� �ٲ۴�.
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
					//absolute path�� ������ �ٷ� ����.
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
					//absolute path�� ������ �ٷ� ����.
					dmj(this).attr('background_ptm',background_string);
				}

			}
		});
	},
	_RemoveScriptTag : function(string){
		var str = string;
		var result = str;
		regex = /\<script(.|\n)*?\<\/script\>/gi
		result = result.replace(regex,function(word){
			var result = word.replace(/\<script(.|\n)*?\<\/script\>/gi, '');
			return result;
		});

		return result;
	}
};
