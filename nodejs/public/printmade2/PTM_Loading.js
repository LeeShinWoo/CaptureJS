//다운로드화면 띄워주는 함수
function PTM_DownloadDialog() {
	var browser = Client_Info.browser_Info.getBrowser();
	var os = Client_Info.os_Info.getOs();
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
			if ( browser == "MSIE" ) {
				scrollLeft = frame.document.documentElement.scrollLeft;
				scrollTop = frame.document.documentElement.scrollTop;
			}
		}catch(e){
		
			if ( os == "Win" ) {
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

	if (os == "Win") {
		download_url = WIN_DOWNLOAD_URL;
		$down_div.append('<a href = "' + download_url + '" id = "ptm_download" ><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download.png" style = "border:0"></a>');			
	} else if (os == "Mac") {
		download_url = MAC_DOWNLOAD_URL;
		$down_div.append('<a href = "' + download_url + '" id = "ptm_download" ><img alt = "다운로드" src = "' + INSTALL_IMG_URL + 'download.png" style = "border:0"></a>');
	} else if (os == "Linux") {
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

//로딩화면 없애주는 함수
function PTM_RemoveDialog(){
	dmj("#ptm-loading").remove();
	dmj("#ptm-loading-bg").remove();
	dmj(top.window.document.getElementById('ptm_bg')).remove();
	dmj(top.window.document.getElementById('ptm_down')).remove();
}

//로딩화면 띄워주는함수
function PTM_LoadDialog(){
	var browser = Client_Info.browser_Info.getBrowser();
	var os = Client_Info.os_Info.getOs();
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
				if ( browser == "MSIE" ) {
					scrollLeft = frame.document.documentElement.scrollLeft;
					scrollTop = frame.document.documentElement.scrollTop;
				}
			}catch(e){
			
				if ( os == "Win" ) {
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
		
		var divPopup = 	"<div id='ptm-loading' ptm-loading-remove='true' style='position:absolute;z-index:2000002;top:"+download_div_top+"px;left:"+download_div_left+"px'>" +
							"<div id='PTMLoadImage' style='width:500px;height:310px;background-image:url(\""+INSTALL_IMG_URL+"printmade_loading.gif\");margin:0px auto;'>" +
								"<div style='text-align:center;position:absolute;width:100%;top:70%;'><span></span></div>" +
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
