/**
 * 레포트 출력 공통 팝업
 */
Ext.define('Axt.popup.Report', {
	extend : 'Ext.window.Window',
	alias : 'widget.popup-report',
	id : 'popup-report',

	closable : true,
	width : 750,
	height : 550,
	autoShow : true,
	layout : 'border',

	enableExcel : true,
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

	initComponent : function() {
		var me = this;
		me.dockedItems = [ me.createToolbar() ];
		me.callParent(arguments);
		
		// iframe이 panel에 붙을때까지 약간 딜레이를 줘야 한다.
		setTimeout(function() {
			me.sendRequest();
		}, 200);
	},

	/**
	 * 서버로 보고서 요청
	 */
	sendRequest : function() {
		var me = this;
		var iframe = me.down('[name=iframe]');
		var param = me.popup.params || {};
		param.jasperParam = param.jasperParam || {};
		param.jasperParam.download = false;

		param.send_type = '';
		param.send_value = '';

		// format지정 안되어있을때 기본 포맷은 pdf
		if (Ext.isEmpty(param.jasperParam.format)) {
			param.jasperParam.format = 'pdf';
		}

		// 기본 url
		if (Ext.isEmpty(me.popup.requrl.search)) { // param.url
			me.url = _global.api_host_info + '/' + _global.app_site
					+ '/common/report/jasperReport.do';
		} else {
			me.url = me.popup.requrl.search;// _global.api_host_info + param.url;
		}

		var waitMsg = me.popup.maskMsg || 'Report 생성중 입니다...';
		// 서버에 이 값을 보내서 서버로부터 클라이언트로 파일이 모두 다운로드 되었는지
		// 체크를 하게 된다.
		param.downloadToken = CommonUtils.checkDownload(
				me.popup.enableLoadMask, waitMsg, me.popup.callback);
		var hiddenForm = Ext.create('Ext.form.Panel', {
			url : me.url,
			timeout : 120000,
			height : 0,
			width : 0,
			hidden : true,
			items : [ {
				xtype : 'hiddenfield',
				name : 'param',
				value : JSON.stringify(param)
			}, {
				xtype : 'hiddenfield',
				name : 'token',
				value : _global.token_id
			} ]
		});

		hiddenForm.getForm().doAction('standardsubmit', {
			target : 'iframeName',
			method : 'POST',
			standardSubmit : true,
		});

	},

	/**
	 * 상단 툴바
	 * 
	 * @return {}
	 */
	createToolbar : function() {
		var me = this;
		var items = [ {
			text : "PDF",
			iconCls : 'icon-pdf',
			scope : this,
			handler : this.download,
			type : 'pdf'
		}, ];

		// if (this.enableExcel) {
		// items.push({text: "엑셀", iconCls: 'icon-export', scope: this, handler:
		// this.download, type:'xls' });
		// }
		// items.push({text: "워드", iconCls: 'icon-word', scope: this, handler:
		// this.download, type:'docx' })
		items.push({
			text : "출력",
			iconCls : 'icon-report',
			scope : this,
			handler : this.print
		});
		items.push({
			text : "닫기",
			iconCls : 'icon-closer',
			scope : this,
			handler : this.close
		});

		if (_global.stor_fax_id !== 0 && _global.stor_fax_cd !== null) {
			items.push('->');
			items.push('-');
			
			if ( me.popup.params.use_fax != '0' ){ /* 발주명세서에서만 FAX combo 표시되게함 - 2014-02-27 한동진*/
				var store = Ext.create('Ext.data.Store', {
					fields : [ 'value', 'name' ],
					data : [
					        {
					        	"value" : "email",
					        	"name" : "E-mail"
					        } 
					        ,{
					        	"value" : "fax",
					        	"name" : "Fax"
					        }]
				});
			} else {								/* 발주명세서를 제외한 명세서. client에서 use_fax값을 '0'로 올리면 FAX combo 표시안됨 */
				var store = Ext.create('Ext.data.Store', {
					fields : [ 'value', 'name' ],
					data : [
					        {
					        	"value" : "email",
					        	"name" : "E-mail"
					        }
					       ]
				});				
			}

			var faxValue='';
			var emailValue='';
			if(me.previewParams) {
				faxValue   = CommonUtils.strDefault(me.previewParams.fax);
				emailValue = CommonUtils.strDefault(me.previewParams.email);
			}
			
			var previewParam = me.previewParams;
			
			// Create the combo box, attached to the states data store
			var combobox = Ext.create('Ext.form.ComboBox', {
				// fieldLabel: 'Choose State',
				store : store,
				queryMode : 'local',
				displayField : 'name',
				valueField : 'value',
				value : 'email',
				width : 70,
				editable : false,
				name : 'sendType',
				listeners : {
					change : function (combobox, newValue, oldValue, eOpts) {
						if(newValue === 'fax') {
							me.down('[name=sendValue]').setValue(faxValue);
						} else {
							me.down('[name=sendValue]').setValue(emailValue);
						}
					}
				}
			});

			var textField = {
				xtype : 'textfield',
				name : 'name',
				width : 160,
				name : 'sendValue',
//				vtype : 'email2',
				allowBlank : false,
				value : emailValue
			// requires a non-empty value
			};

			items.push(combobox);
			items.push(textField);
			items.push({
				text : "전송",
				iconCls : 'icon-fax',
				scope : this,
				handler : function(button){
					var sendType = me.down('[name=sendType]').getValue();
					if(sendType==='fax') {
						me.sendFax(button);
					} else {
						me.sendEmail(button);
					}
				},
				type : 'pdf'
			});
			items.push('-');
		}

		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
			items : items
		});
		return toolbar;
	},

	enableLoadMask : false,

	/**
	 * pdf, excel, word의 버튼 클릭시 이 메서드를 공통 호출한다
	 */
	download : function(obj) {
		var me = this;
		var param = me.popup.params || {};
		if (param.jasperParam) {
			param.jasperParam.download = true;
			param.jasperParam.format = obj.type;
			param.send_type = '';
			param.send_value = '';
		}

		var waitMsg = me.popup.maskMsg || 'Report 생성중 입니다...';
		// 서버에 이 값을 보내서 서버로부터 클라이언트로 파일이 모두 다운로드 되었는지
		// 체크를 하게 된다.
		param.downloadToken = CommonUtils.checkDownload(
				me.popup.enableLoadMask, waitMsg, me.popup.callback);
		var hiddenForm = Ext.create('Ext.form.Panel', {
			url : me.url,
			timeout : 120000,
			height : 0,
			width : 0,
			hidden : true,
			items : [ {
				xtype : 'hiddenfield',
				name : 'param',
				value : JSON.stringify(param)
			}, {
				xtype : 'hiddenfield',
				name : 'token',
				value : _global.token_id
			} ]
		});

		hiddenForm.getForm().doAction('standardsubmit', {
			target : 'downloadIframe', // loader.js에서 index.html의 body에 iframe을
										// 삽입
			method : 'POST',
			standardSubmit : true
		});

	},

	/**
	 * javascript print()는 ie에서 깨짐
	 * 
	 * @deprecated
	 */
	print : function() {
		var me = this;
		var inv_no = me.popup.params.inv_no;
		var button = me.popup.params.button; /* button Action명 */
		
		if ( !Ext.isEmpty( me.popup.params.stor_grp )  ){ /* 고객별 거래원장(약식), 외상매출장(도매) */
			var storegp 	= me.popup.params.stor_grp;
			var storeid		= me.popup.params.stor_id;
			var frdt		= me.popup.params.fr_dt;
			var todt		= me.popup.params.to_dt;
			var custid		= me.popup.params.cust_id;
			var cls1id		= me.popup.params.clss_1;
			var cls2id		= me.popup.params.clss_2;
			var cls3id		= me.popup.params.clss_3;
			var invnosale	= me.popup.params.inv_no_sale;		
//			var prevbalance = me.popup.params.prev_balance;
			/* 종합청구서 */
			var banknm     	= me.popup.params.bank_nm;
			var bankno		= me.popup.params.acct_no;
			var bankow		= me.popup.params.acct_own_nm;
			var usermsg		= me.popup.params.user_msg;
			var worknm		= me.popup.params.work_nm;
			var workphoneno	= me.popup.params.work_phone_no;
			var totalcustid = me.popup.params.total_cust_id;
//			console.debug('rrrrrrrrrrrr');
			
			// type1. 애플릿 프린트
			resource.loadPrint({
				// copy : 2, // 인쇄매수
				preview        : false,                                 // 미리보기
				enableLoadMask : true,                                 // mask 띄우기
				paperType      : Const.PaperType.A4_NORMAL,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
				invoiceType    : Const.InvoiceType.SALE,               // 거래명세서 (필수)
		        params         : { inv_no : inv_no, button : button ,
		        				stor_grp : storegp,  stor_id : storeid,  fr_dt : frdt,  to_dt : todt,
		        				cust_id  : custid,  clss_1 : cls1id, clss_2 : cls2id, clss_3 : cls3id,
		        				inv_no_sale : invnosale,// prev_balance : prevbalance,
		        				/* 종합청구서 */
		        				bank_nm  : banknm,   acct_no : bankno ,   acct_own_nm : acct_own_nm ,
		        				user_msg : usermsg , work_nm : worknm ,
		        				work_phone_no : workphoneno ,   total_cust_id : totalcustid
		        }, // url로 보낼 파라미터
		        requrl         : {                                     // url
		        	search : me.url,
		        },
		        callback       : function (success) {
		        	if(success) {
		        	}
		        }
			});			
		} else {											/* 일반 명세서 */
			// type1. 애플릿 프린트
			resource.loadPrint({
				// copy : 2, // 인쇄매수
				preview        : false,                                 // 미리보기
				enableLoadMask : true,                                 // mask 띄우기
				paperType      : Const.PaperType.A4_NORMAL,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
				invoiceType    : Const.InvoiceType.SALE,               // 거래명세서 (필수)
		        params         : { inv_no : inv_no, button : button }, // url로 보낼 파라미터
		        requrl         : {                                     // url
		        	search : me.url,
		        },
		        callback       : function (success) {
		        	if(success) {
		        	}
		        }
			});	
		}
		

		

		
		/*
		 * type2. 브라우저의 print기능
		var iframe = this.items.getAt(0).el.dom, win;
		if (iframe.contentWindow) {
			win = iframe.contentWindow;
		} else {
			win = iframe.contentDocument;
		}
		win.focus();
		win.print();
		*/

	},

	/**
	 * 팩스 전송
	 */
	sendFax : function(obj) {
		var me = this;
		var param = me.popup.params || {};
		
//		console.debug('param', param );
		var sendType = me.down('[name=sendType]').getValue();
		var sendValue = me.down('[name=sendValue]').getValue().replace(/-/gi, "");
		if (param.jasperParam) {
			param.jasperParam.download = false;
			param.jasperParam.format = obj.type;

			param.send_type = sendType;
			param.send_value = sendValue;
			param.stor_fax_id = _global.stor_fax_id; /* store fax 업체 id */
			param.stor_fax_cd = _global.stor_fax_cd; /* store fax 코드 */
//			param.smsdb_id     = _global.smsdb_id ;  /* sms서버 연결 DB ID */
			param.stor_id     = _global.stor_id ;  /* 사업장 ID */
			param.records = [
               {
                  "stor_id": _global.stor_id ,
                  "provider": _global.stor_fax_id ,
                  "accounts": _global.stor_fax_cd  ,
                  "callback": param.biz_fax_no.replace(/-/gi, "") || "000000000" ,
                  "dispatch": "0",
//                  "schedule": "20140224173537",
                  "attribute": "0",
                  "subject" : param.subject ,
                  "method"	: "20",
                  "attach"	: "",
                  
                  "user_cd"	: _global.login_id ,
                  "emp_nm"	: _global.login_nm ,
                  "dept_id"	: _global.dept_id ,
                  "dept_nm"	: _global.dept_nm ,
                  "cust_id"	: param.cust_id,
                  "inv_no"	: param.inv_no,
                  
                  "records": [
                    {
                      "receive": param.cust_nm ,
                      "address": sendValue
                    }
                  ]
                }
              ]
		}

		if (Ext.isEmpty(Ext.String.trim(sendValue))) {
			var msg = '';
				msg = 'Fax 번호를 입력해 주십시오.';
			Ext.Msg.alert('', msg);
			return false;
		}

		var cookieToken = new Date().getTime();
		Ext.Ajax.request({
			url : me.url,
			timeout : 60000,
			params : {
				param : JSON.stringify(param),
				token : _global.token_id
//				cookieToken : cookieToken
			},
			success : function(response, opts) {
//				console.debug('success');
				Ext.MessageBox.hide();
//				console.log('response', response);
				if(Ext.isEmpty(response.responseText)) {
					Ext.Msg.alert(Const.CONFIRM, '팩스  전송을 실패 했습니다.');
					console.error('파라미터 점검이 필요 합니다.', res);
					return false;
					
				}
				var res = Ext.decode(response.responseText);
				if (res.success) {
					Ext.Msg.alert('', '팩스 전송을 완료 했습니다.');
				} else {
					Ext.Msg.alert('', '팩스 전송을 실패 했습니다.');
				}
			},
			failure : function(response, opts) {
//				console.debug('failure', response );
				Ext.MessageBox.hide();
				Ext.Msg.alert('', '팩스 전송을 실패 했습니다.');
			}
		});

		param.send_type 	= '';
		param.send_value 	= '';
		param.stor_fax_id 	= '';
		param.stor_fax_cd 	= '';
		param.stor_id     	= '' ;  /* 사업장 ID */
		param.cust_id	   	= '';
		param.cust_nm		= '';
		param.inv_no		= '';
		param.records 		= {} ;

	},
	
	/**
	 * 이메일 전송
	 */
	sendEmail :function (obj) {
		var me = this;
		var param = me.popup.params || {};

		var sendType = me.down('[name=sendType]').getValue();
		var sendValue = me.down('[name=sendValue]').getValue();
		if (param.jasperParam) {
			param.jasperParam.download = false;
			param.jasperParam.format = obj.type;

			param.send_type = sendType;
//			param.send_value = sendValue;
			param.stor_fax_id = _global.stor_fax_id; /* store fax 업체 id */
			param.stor_fax_cd = _global.stor_fax_cd; /* store fax 코드 */

		}
		
		me.createSendEmailPopup(sendValue, function (success, data) {
			param.address = _global.objects.address;
			param.emailSendInfo = data;

			Ext.MessageBox.show({
				title : '잠시만 기다려 주십시오.',
				width : 300,
				progress : true,
				closable : false,
				wait : true,
				waitConfig : {
					interval : 500, // bar will move fast!
					duration : 50000,
					increment : 15,
					text : me.popup.maskMsg || 'Email 전송중 입니다...',
					scope : me
				}
			});

			Ext.Ajax.request({
				url : me.url,
				timeout : 60000,
				params : {
					param : JSON.stringify(param),
					token : _global.token_id
				},
				success : function(response, opts) {
					Ext.MessageBox.hide();
					var res = Ext.decode(response.responseText);
					if (res.success) {
						 me.down('[name=sendValue]').setValue("");
						Ext.Msg.alert(Const.CONFIRM, 'Email 전송을 완료 했습니다.');
					} else {
						Ext.Msg.alert(Const.CONFIRM, 'Email 전송을 실패 했습니다.<br/>'+res.message);
					}
				},
				failure : function(response, opts) {
					Ext.MessageBox.hide();
					Ext.Msg.alert(Const.CONFIRM, 'Email 전송을 실패 했습니다.');
				}
				
			});
			
			param.send_type = '';
			param.send_value = '';
			param.stor_fax_id = '';
			param.stor_fax_cd = '';
		});
		
	},
	
	/**
	 * combobox에서 이메일 선택하고 전송누르면 뜨는 popup
	 */
	createSendEmailPopup : function (sendValue, callbackFunction) {
		var window;
		var panel = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,

		    // The form will submit an AJAX request to this URL when submitted
		    url: 'save-form.php',

		    // Fields will be arranged vertically, stretched to full width
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },

		    // The fields
		    defaultType: 'textfield',
		    items: [ {
				xtype : 'textfield',
				name : 'toEmail',
				fieldLabel : '받는사람',
				vtype : 'email2', // requires value to be a valid
				allowBlank : false,
				value : sendValue,
				emptyText:'여러명에게 보낼경우 (,)로 구분 됩니다.'
			}, {
				xtype : 'textfield',
				name : 'cc',
				fieldLabel : '참조',
				vtype : 'email2',
				emptyText:'여러명에게 보낼경우 (,)로 구분 됩니다.'
			}, {
				xtype : 'textfield',
				name : 'title',
				fieldLabel : '제목',
			// requires a non-empty value
			}, {
				xtype : 'textareafield',
				name : 'cont_cont',
				fieldLabel : '내용',
				rows:20
			} ],

		    // Reset and Submit buttons
		    buttons: [{
		        text: '전송',
		        handler: function() {
		        	if(Ext.isFunction(callbackFunction)) {
		        		console.debug('panel', panel.isValid() );
		        		if(panel.isValid()) {
		        			var values = panel.getValues();
		        			if(Ext.isEmpty(values.title) || Ext.isEmpty(values.cont_cont)) {
		        				Ext.Msg.confirm('', '제목 또는 내용 텍스트 없이 메일을 보내시겠습니까?', function(value){
		        					if(value === 'yes') {
		        						callbackFunction(true, panel.getValues());
		        						window.close();
		        					}
		        				});
		        			} else {
		        				callbackFunction(true, values);
		        				window.close();
		        			}
		        		} else {
		        			Ext.Msg.alert(Const.CONFIRM, '필수 항목을 입력해 주십시오.');
		        		}
		        	}
		        }
		    },{
		        text: '닫기',
		        handler: function() {
		        	window.close();
		        }
		    }]
		});
		
		window = Ext.create('Ext.window.Window', {
			title : '이메일 전송',
			height : 430,
			width : 500,
			layout : 'fit',
			items : panel
		}).show();
	}

});