/**
 * Resource Class
 *
 */
Ext.define('Axt.Resource', {
	alternateClassName: [ 'resource', 'Resource'],
    singleton : true,
    requires :
    [
     	'Ext.ComponentQuery' ,
     	'Ext.util.Cookies'   ,
     	'Ext.Ajax'           ,
     	'Axt.ResourcePrint'  ,
     	'Axt.ResourceBarcodePrint',
     	'Axt.ResourceSendReport',
     	'Axt.Constant'       ,
     	'Axt.Language'       ,
     	'Axt.Encrypts'       ,
     	'Axt.popup.Search'   ,
     	'Axt.popup.Report'   ,
     	'Axt.data.message.Recipient' ,
     	'Axt.data.message.Content'
    ],
    _resource : {},
    _language : {},

    /**
     *
     */
    loadResource : function(config) {
    	var me = this;
	 	Ext.Ajax.request({
	 		type     : config.type   ,
	 		params   : config.params ,
	 		method   : config.method ,
            url      : config.url    ,
            callback : function(options, success, response) {
            	Ext.merge(me._resource, Ext.decode(response.responseText));
//            	console.log( Ext.decode(response.responseText));
            	if (typeof config.callback == 'function') {
            		config.callback(options, success, response);
            	}
            }
		});
    },

    /**
     *
     */
    loadLanguage : function(config) {
    	var me = this;
	 	Ext.Ajax.request({
	 		type     : config.type   ,
	 		params   : config.params ,
	 		method   : config.method ,
            url      : config.url    ,
            callback : function(options, success, response) {
            	me._language = Ext.decode(response.responseText)
            	if (typeof config.callback == 'function') {
            		config.callback(options, success, response);
            	}
            }
		});
    },


	/**
     * 객체의 값을 리턴한다.
     */
    getData : function(key) {
    	return this._resource[ key ];
    },


	/**
     * 배열 객체를 리턴한다.
     */
    lookup : function(key){
    	var value = this._resource[ key ];
    	if (value) {
    		return JSON.parse(value);
    	} else {
    		return [];
    	}
    },
    keygen : function(config){
    	Ext.Ajax.request({
    		async  : (typeof config.async  === 'undefined') ? true : config.async,
    		url    : (typeof config.url    === 'undefined') ? _global.api_host_info + '/' + _global.api_path + '/listener/seq/default.do' : config.url , // || _global.api_host_info + '/' + _global.app_site + '/listener/seq/default.do' ,
    		params : Ext.merge({ token : _global.token_id }, config.params ),
    		method : 'POST',
    		success:function(response){
    			config.callback( Ext.decode(response.responseText) );
			},
			failure:function(result, request){
				config.callback({ success:false, message : '일련번호를 생성하지 못하였습니다.' });
			}
    	});
    },

    /**
     * #{itm_nm}/#{itm_sp} 등의 패턴을 입력받아 레코드의 값으로 매핑하여 결과물을 보낸다.
     */
    fusion : function( patton , record ){
    	if (!Ext.isEmpty( patton )) {
    		var result = patton ;
    		var parser = result.match(/(\#\{\w{1,10}\})/g);
    		if(parser){
    			for(var key in parser){
    				var index = parser[key].replace('#{','').replace('}','');
    				result = result.replace( '#{'+ index +'}', record.get(index));
    			}
    			result = result.replace(/\/\//g, '/' ).replace(/^\//, '').replace(/\/$/, '');
    			return result ;
    		}
    	}
	},

	_mask  : undefined,
	mask : {
		show : function(config) {
			_mask = new Ext.LoadMask(Ext.getBody(), config );
			_mask.show();
			return _mask;
		},
		hide : function(){
			_mask.hide();
		}
	},

    _popup : null,
    window : function (config) {
    	var me = this;
    	var url = config.url;
    	var width  = config.width;
    	var height = config.height;
    	var method = config.method;
    	var resizable = config.resizable;
    	var params = CommonUtils.strDefault(config.params, '');

    	if(config.type === 'newtab') { // 순수 자바스크립트로 native새창 띄우기

	    	var paramArray = params.split('&');
			var items = [];
			for(var i=0; i<paramArray.length; i++) {
				var key = paramArray[i].split('=')[0];
				var value = paramArray[i].split('=')[1];
				items.push({
					xtype : 'hiddenfield',
					name : key,
					value : value
				});
			}
			var hiddenForm = Ext.create('Ext.form.Panel', {
				url : url,
				timeout : 120000,
				height : 0,
				width : 0,
				hidden : true,
				items : items
			});
			hiddenForm.getForm().doAction('standardsubmit', {
				target : 'new',
				method : method,
				standardSubmit : true,
			});


    	}else
    	if(config.type === 'native') { // 순수 자바스크립트로 native새창 띄우기
    		var posX = (screen.width - width) / 2;
    	    var posY = (screen.height - height)/ 2;

    	    var isNewTab = config.newTab;
	    	window.open(url ,"new", "width="+width+", height="+height+", left="+posX+", top="+posY+", toolbar=yes,location=yes,status=yes,menubar="+ (isNewTab?'yes':'no') +",scrollbars=yes,titlebar=yes,resizable="+(resizable?"yes":"no")+",fullscreen=no");


    	} else { // ext의 window객체를 이용해 layer새창 띄우기
    		if(this._popup!=null) {
    			this._popup.close();
    		}
    		this._popup = Ext.create('Ext.window.Window', {
				closable : true,
				width  : width,
				height : height,
				autoShow : true,
				resizable : resizable,
				layout : 'fit',
				items : [ {
					xtype : 'component',
					name : 'iframe',
					autoEl : {
						tag : "iframe",
						name : 'iframeName',
						// cls: 'x-hidden',
						src : Ext.SSL_SECURE_URL
					}
				} ],
			});

			var paramArray = params.split('&');
			var items = [];
			for(var i=0; i<paramArray.length; i++) {
				var key = paramArray[i].split('=')[0];
				var value = paramArray[i].split('=')[1];
				items.push({
					xtype : 'hiddenfield',
					name : key,
					value : value
				});
			}
			var hiddenForm = Ext.create('Ext.form.Panel', {
				url : url,
				timeout : 120000,
				height : 0,
				width : 0,
				hidden : true,
				items : items
			});
			hiddenForm.getForm().doAction('standardsubmit', {
				target : 'iframeName',
				method : method,
				standardSubmit : true,
			});

    	}
    },


    /**
     * 팝업 창을 띄운다.
     *
     * ## 예제
     *
     *     resource.loadPopup({
     *         widget : 'popup-file-upload',
     *         url    : _global.api_host_info + '/system/basic/storeinfo/set/uploadExcel.do', // url (필수)
     *         params : { // 파라미터 (옵션)
     *             test1:'gggg',
     *         },
     *         title  : '테스트용 엑셀 업로드',               // popup title (옵션)
     *         waitMsg : '업로드중...',                    // upload시 progress bar의 wait message (옵션)
     *         allowExtension : ['xls', 'xlsx'],    // 지정하지 않으면 확장자 무제한 (옵션)
     *         fileFieldConfig : {                        // fileField의 config속성 (속성은 api참고) (옵션)
     *             fieldLabel:'엑셀',
     *             buttonText:'선택'
     *         },
     *         uploadBtnConfig : {                        // upload버튼의 config속성 (속성은 api참고) (옵션)
     *             text:'엑셀 업로드'
     *         }
     *     });
     *
     */
    loadPopup : function( param ) {
    	var params = {},
    		widget = param.widget
    	;
    	if (widget == 'native'){


    	} else {
        	if (Ext.isEmpty(widget)){ console.debug('loadPopup error' , 'Ext.isEmpty(widget)' ); return; }
    		if (Ext.getCmp(widget)) { console.debug('loadPopup erroe' , 'Ext.getCmp (widget)' ); return; }
    		Ext.merge(params, param);
    		params.popup = param || {}  ;
    		params.owner = param.caller || {};
    		return Ext.widget(widget, params);
    	}
	},





	/**
	 * 배열 객체를 리턴한다.
	 */
    lookupValue : function(key , removes ){
    	var lookup = this._resource[ key ];
    	if (lookup) {
    		lookup = JSON.parse(lookup);
    		if (removes && removes instanceof Array) {
    			removes.forEach( function( remove ) {
    				for (var i = 0; i < lookup.length; i++) {
    					if (lookup[i][0] == remove) {
    						lookup.splice(i, 1);
    					}
    	    		}
    			});
    		}
   			return lookup;//JSON.parse(value);
    	} else {
    		return [];
    	}
    },

	/**
     * 배열 객체를 리턴한다.
     */
    getList : function(key){
    	var value = this._resource[ key ];
    	if (value) {
    		return JSON.parse(value);
    	} else {
    		return [];
    	}
    },


    /**
     * 단어 정보를 리턴한다. 해당하는 키의 값이 없을 경우 디폴트 값을 리턴한다.
     */
    getWord : function(key, defaultText){
    	return Language.get( key, defaultText);
    },





	/**
	 * 프린터 출력을 호출 한다.<br/>
	 *
	 * ## 예제
     *
     *     // type1. 미리보기후 프린트
     *     // paperType속성은 옵션값이다 아무것도 입력안하면 1차적으로 invoiceType값으로 설정정보를 조회해서
     *     // 만약 설정정보가 있다면 설정되어있는 용지를 가져오고 아니라면 A4순면지가 설정된다
     *     // A4순면지로 설정되어있으면소 preview=true이면 미리보기가 되지만
     *     // A4순면지가 아닌 다른 용지가 설정되어있을경우 preview=true라도 좌표설정 프린트가 실행된다.
     *     resource.loadPrint({
     *         preview        : true,                                 // 미리보기
     *         enableLoadMask : true,                                 // mask 띄우기
     *         // paperType      : Const.PaperType.A5_DOUBLE,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
     *         invoiceType    : Const.InvoiceType.SALE,               // 거래명세서 (필수)
     *         params         : { inv_no : select[0].get('inv_no') }, // url로 보낼 파라미터
     *         requrl         : {                                     // url
     *             search : _global.api_host_info + '/' + _global.api_path +'/sale/deliveryclose/get/printing.do',
     *         },
     *         callback       : function (success) {
     *             if(success) {
     *                 Ext.Msg.alert('', '출력이 완료 되었습니다.');
     *             }
     *         }
     *     });
     *
     *     // type2. 미리보기 팝업없이 applet을 통한 다중 출력
     *     // 순차적인 callback을 받기위해 Batch util클래스를 이용해야 한다.
     *
     *     var batch = Axt.util.Batch.getInstance();
     *
	 *     // 출력할 내용을 담은 function을 batch에 add해 놓은후 아래의 run()에서 순차적으로 실행한다.
	 *     for(var i=0; i<3; i++) {
	 *         batch.add(function(){
     *             // 출력 호출
     *             resource.loadPrint({
     *                  preview     : false,                           // 미리보기 안함
     *                  // paperType   : Const.PaperType.A5_DOUBLE,       // A5*2 양식지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
     *                  invoiceType : Const.InvoiceType.SALE,          // 거래명세서 (필수)
     *                  params      : { inv_no : data.get('inv_no') }, // url로 보낼 파라미터
     *                  requrl      : {                                // url
     *                      search : _global.api_host_info + '/' + _global.api_path +'/sale/deliveryclose/get/printing.do',
     *                  },
     *                  callback : function (success) {
     *                      if(success){
     *                          // next()를 실행해줘야 순차적으로 실행된다.
     *                          batch.next();
     *                      }
     *                  }
     *             }); // end loadPrint
	 *         });
	 *     }
	 *
	 *     // 여기서 출력 시작!
     *     batch.run({
     *         enableLoadMask : true, // progressbar mask 띄우기
     *         maskMsg : '출력중입니다... ($count/$total)',
     *         callback : function () {
     *             Ext.Msg.alert('', '출력이 완료 되었습니다.');
     *         }
     *     });
	 *
	 */
	loadPrint : function( param ) {
		ResourcePrint.loadPrint(param);
	},

	/**
	 * 바코드 프린트
	 */
	loadBarcodePrint : function (param) {
		ResourceBarcodePrint.loadBarcodePrint(param);
	},

	/**
	 * FAX, Email로 Jasper Report를 생성하여 보낸다.
	 *
	 * ## 예제
	 *
	 *     // 이메일 전송
	 *     resource.sendReport({
     *         requrl      : { // 레포트생성 요청 url
	 *             search : _global.api_host_info + '/' + _global.api_path +'/sale/deliveryclose/get/printing.do'
     *         },
     *         params   : {
     *             send_type : 'email', // email or fax
     *             data : select,       // 그리드의 선택된 row배열 ( 그리드.getSelectionModel().getSelection() )
     *             field : {
     *                 inv_no : 'inv_no',    // 그리드 row(model)의 매출번호 field명
     *                 email  : 'reve_email' // 그리드 row(model)의 받을사람 email주소 field명
     *             },
     *             emailSendInfo : { // emailSendInfo 속성을 넣으면 이메일 제목 내용을 입력받는 팝업이 뜨지 않는다.
     *                 title : 'test title',
     *                 cont_cont : '테스트 컨텐츠'
     *             }
     *         },
     *         callback : function (success, message) { // 결과 콜백
     *             Ext.Msg.alert("알림", message);
     *         }
     *     });
     *
     *     // 팩스 전송
     *     resource.sendReport({
     *         requrl      : { // 레포트생성 요청 url
     *             search : _global.api_host_info + '/' + _global.api_path +'/sale/deliveryclose/get/printing.do'
     *         },
     *         params   : {
     *             send_type : 'fax', // email or fax
     *             data : select,       // 그리드의 선택된 row배열 ( 그리드.getSelectionModel().getSelection() )
     *             field : {
     *                 cust_id	: 'cust_id',         // 고객id
     *                 inv_no  : 'inv_no',          // 그리드 row(model)의 매출번호 field명
     *                 sendFaxNo : 'fax_no',        // 그리드 row(model)의 보내는사람 팩스번호 field명
     *                 recvCustNm : 'cust_nm',      // 그리드 row(model)의 받을사람 고객명 field명
     *                 recvFaxNo  : 'reve_fax_no'   // 그리드 row(model)의 받을사람 팩스번호 field명
     *             },
     *             faxInfo : { // 팩스전송 정보
     *                 subject : '거래명세서' // fax전송 테이블에 들어가는 제목
     *             }
     *         },
     *         callback : function (success, message) { // 결과 콜백
     *             Ext.Msg.alert("알림", message);
     *         }
     *     });
	 *
	 */
	sendReport : function (config) {
		ResourceSendReport.sendReport(config);
	},

	INTERNET_ERROR : '인터넷 연결 오류',
    HTTP_ERROR_000 : '인터넷이 연결되지 않았거나 서버와 연결을 할수 없는 상태 입니다.',
    HTTP_ERROR_404 : '요청하신 서비스를 찾을수 없습니다.',
    httpError : function(response) {
    	var me = this;
		switch(response.status){
			case 200:break; // 200 인경우 정상이므로 메세지를 띄우지 않는다.
			case 000:Ext.MessageBox.show({ title: me.INTERNET_ERROR +'[000]', msg: me.HTTP_ERROR_000, icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK}); break;
			case 404:Ext.MessageBox.show({ title: me.INTERNET_ERROR +'[404]', msg: me.HTTP_ERROR_404, icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK}); break;
			default :Ext.MessageBox.show({ title: me.INTERNET_ERROR         , msg: response.status + ' : ' + response.statusText , icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK});
		}
		return response.status;
    },
    INTERNAL_ERROR : '에러',
    showError : function (message) { //, fn, scope
    	var me = this;
    	Ext.MessageBox.show({ title: me.INTERNAL_ERROR, msg: message, icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK});
    }

});
