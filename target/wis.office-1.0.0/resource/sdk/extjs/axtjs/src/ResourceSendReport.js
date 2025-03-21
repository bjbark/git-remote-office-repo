/**
 * 보고서 양식을 Jasper Report로 생성하여<br/>
 * 이메일, 팩스로 전송해주는 클래스.<br/>
 * 단독으로 사용하지않고 Resource.js의 내부에서 호출한다.
 * 
 * @author kdarkdev
 * @since 
 * @version 1.0
 * 
 */
Ext.define('Axt.ResourceSendReport', {  
	alternateClassName: [ 'ResourceSendReport' ],
    singleton : true,
    requires : [ 
    ],
    
	/**
	 * 프린터 출력을 호출 한다.<br/>
	 * 호출방법은 Resource.js의 loadPrint메서드의 주석을 참고.
	 */
	sendReport : function( config ) {
		var me = this;
		
		if(config.params.send_type === 'email') {
			me.sendReportEmail(config);
		} else if (config.params.send_type === 'fax') { // <== 개발중
			me.sendReportFax(config);
		} else {
			Ext.Msg.alert("알림", "params.send_type을 설정해 주십시오.");
			return false;
		}
		
	},
	
	/**
	 * @private
	 * 이메일로 레포트 전송
	 */
	sendReportEmail : function (config) {
		var me = this;
		
		var batch = Axt.util.Batch.getInstance();
		
		var successArr = []; // 이메일 전송에 성공 했을때 inv_no가 담긴다.
		var failureArr = []; // 이메일 전송에 실패 했을때 inv_no가 담긴다.
		var emptyEmail = []; // 만약 invNo에 대한하는 email번호가 없다면 이곳에 push된다
		
		if(Ext.isEmpty(config.params.emailSendInfo)) { // emailSendInfo가 없다면 이메일 제목, 내용을 입력받는 팝업을 띄워야 한다.
			// 이메일 제목, 내용을 입력받은후 콜백 받는다.
			me.createSendEmailPopup(function (success, data) {
				var emailSendInfo = {
					cc: "",
					title : data.title,
					cont_cont : data.cont_cont
				};	
				
				// 1. controller로 부터 전달된 그리드의 선택된 row갯수만큼 이메일 전송 요청을 보내기위해 batch에 add를 한다.
				me.sendReportEmailAddBatch(config, emailSendInfo, batch, successArr, failureArr, emptyEmail);
				
				// 2. 이메일 전송 배치시작
				me.sendReportEmailRunBatch(config, batch, successArr, failureArr, emptyEmail);
				
			}); // end popup callback
		} else {
			var emailSendInfo = config.params.emailSendInfo;	
			
			// 1. controller로 부터 전달된 그리드의 선택된 row갯수만큼 이메일 전송 요청을 보내기위해 batch에 add를 한다.
			me.sendReportEmailAddBatch(config, emailSendInfo, batch, successArr, failureArr, emptyEmail);
			
			// 2. 이메일 전송 배치시작
			me.sendReportEmailRunBatch(config, batch, successArr, failureArr, emptyEmail);
		}
		
		
	},
	
	/**
	 * @private (sendReportEmail에서 사용)
	 * 이메일 보내기전 제목, 내용 입력하는 팝업
	 */
	createSendEmailPopup : function (callbackFunction) {
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
		    items: [{
				xtype : 'textfield',
				name : 'title',
				fieldLabel : '제목',
			// requires a non-empty value
			}, {
				xtype : 'textareafield',
				name : 'cont_cont',
				fieldLabel : '내용',
				rows:20
			}],

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
	},
	
	/**
	 * @private (sendReportEmail에서 사용)
	 * controller로 부터 전달된 그리드의 선택된 row갯수만큼 이메일 전송 요청을 보내기위해 batch에 add를 한다.
	 */
	sendReportEmailAddBatch : function (config, emailSendInfo, batch, successArr, failureArr, emptyEmail) {
		var me = this;
		var gridSelectData = config.params.data;
		
		/* 종합청구서 데이터 */
		var storegp 	= config.params.stor_grp;
		var storeid		= config.params.stor_id;
		var frdt		= config.params.fr_dt;
		var todt		= config.params.to_dt;
		var custid		= config.params.cust_id;
		var cls1id		= config.params.clss_1;
		var cls2id		= config.params.clss_2;
		var cls3id		= config.params.clss_3;
		var invnosale	= config.params.inv_no_sale;		
//		var prevbalance = me.popup.params.prev_balance;
		/* 종합청구서 */
		var banknm     	= config.params.bank_nm;
		var bankno		= config.params.acct_no;
		var bankow		= config.params.acct_own_nm;
		var usermsg		= config.params.user_msg;
		var worknm		= config.params.work_nm;
		var workphoneno	= config.params.work_phone_no;
		var totalcustid = undefined;

		var param = {
				send_type   : 'email',
				address     : _global.objects.address,
				stor_id : _global.stor_id ,     /* 사업장 ID */
				isReport : true,
				fr_dt	 : frdt,   
				bank_nm  : banknm,   
				acct_no : bankno ,   
				acct_own_nm : bankow ,
				user_msg : usermsg , 
				work_nm : worknm ,
				work_phone_no : workphoneno ,   
				total_cust_id : totalcustid ,
				jasperParam : {
					download : false,
					format : 'pdf'
				},
				emailSendInfo : emailSendInfo
		};
		
		// 파라미터로 온 Ext model의 inv_no와 email의 field명  
		var invNoFieldName = config.params.field.inv_no;
		var emailFieldName = config.params.field.email;
		var custIdFieldName = config.params.field.cust_id;
		
		gridSelectData.forEach( function(rec) {
			batch.add(function(){
				var inv_no     = rec.get(invNoFieldName);
				var reve_email = rec.get(emailFieldName);
				var custId = rec.get(custIdFieldName);
				
				if(reve_email === '' || Ext.isEmpty(reve_email)) { // 이메일 주소가 없는경우.
					emptyEmail.push(inv_no);
					batch.next(false);
				} else {					  // 이메일 주소가 있는경우
					param.inv_no = inv_no;
					param.emailSendInfo.toEmail = reve_email;
					param.total_cust_id = custId ; /* 종합청구서 */
	
					var url = config.requrl.search;
					
					Ext.Ajax.request({
						url : url,
						timeout : 60000,
						params : {
							param : JSON.stringify(param),
							token : _global.token_id
						},
						success : function(response, opts) {
							var res = Ext.decode(response.responseText);
							if (res.success) {
								successArr.push(inv_no);
								batch.next(true);
							} else {
								failureArr.push(inv_no);
								batch.next(false);
							}
						},
						failure : function(response, opts) {
							failureArr.push(inv_no);
							batch.next(false);
						}
					});
				}
				
			}); // batch end
			
		});
	},
	
	/**
	 * @private (sendReportEmail에서 사용)
	 *  이메일 전송 배치시작
	 */
	sendReportEmailRunBatch : function (config, batch, successArr, failureArr, emptyEmail) {
		var me = this;
		var callback = config.callback;
		
		batch.run({
			enableLoadMask : true,
			maskMsg : '전송중 입니다... ($count/$total)',
			callback : function (success, message) {
				var resultMsg = '';
				resultMsg += '전송성공 : ' + successArr.length + '건<br/><br/>';
				
				if(failureArr.length > 0) {
					resultMsg += '전송실패 : ' + failureArr.length + '건<br/>';
					var cnt = 0;
					for(var i=0; i<failureArr.length; i++) {
						resultMsg += failureArr[i];
						resultMsg += ', ';
						cnt++;
						if(cnt === 4) { // 한줄당 표시될 전송실패 inv_no갯수
							cnt = 0;
							resultMsg += '<br/>';
						}
					}
					resultMsg += '<br/><br/>';
				}
				
				if(emptyEmail.length > 0) {
					resultMsg += '이메일주소 없음 : ' + emptyEmail.length + '건<br/>';
					var cnt = 0;
					for(var i=0; i<emptyEmail.length; i++) {
						resultMsg += emptyEmail[i];
						resultMsg += ', ';
						cnt++;
						if(cnt === 4) {// 한줄당 표시될 이메일주소 없음 inv_no갯수
							cnt = 0;
							resultMsg += '<br/>';
							continue;
						}
					}
					resultMsg += '<br/>';
				}
				
				if(Ext.isFunction(callback) ) {
					callback(true, resultMsg);
				}
			}
		}); // end batch
	},
	
	/**
	 * @private 레포트 생성하여 팩스 전송
	 */
	sendReportFax : function (config) {
		var me = this;
		
		var batch = Axt.util.Batch.getInstance();
		
		var successArr = []; // 팩스 전송에 성공 했을때 inv_no가 담긴다.
		var failureArr = []; // 팩스 전송에 실패 했을때 inv_no가 담긴다.
		var emptyFax = [];   // 만약 invNo에 대한하는 팩스 전송정보가 없다면 이곳에 push된다
		
		// 1. controller로 부터 전달된 그리드의 선택된 row갯수만큼 팩스 전송 요청을 보내기위해 batch에 add를 한다.
		me.sendReportFaxAddBatch(config, batch, successArr, failureArr, emptyFax);
		
		// 2. 팩스전송 배치시작
		me.sendReportFaxRunBatch(config, batch, successArr, failureArr, emptyFax);
	},
	
	sendReportFaxAddBatch : function (config, batch, successArr, failureArr, emptyFax) {
		var me = this;
		var gridSelectData = config.params.data;
		
		/* 종합청구서 데이터 */
		var storegp 	= config.params.stor_grp;
		var storeid		= config.params.stor_id;
		var frdt		= config.params.fr_dt;
		var todt		= config.params.to_dt;
		var custid		= config.params.cust_id;
		var cls1id		= config.params.clss_1;
		var cls2id		= config.params.clss_2;
		var cls3id		= config.params.clss_3;
		var invnosale	= config.params.inv_no_sale;		
//		var prevbalance = me.popup.params.prev_balance;
		/* 종합청구서 */
		var banknm     	= config.params.bank_nm;
		var bankno		= config.params.acct_no;
		var bankow		= config.params.acct_own_nm;
		var usermsg		= config.params.user_msg;
		var worknm		= config.params.work_nm;
		var workphoneno	= config.params.work_phone_no;
		var totalcustid = undefined;
//		console.debug('gridSelectData', gridSelectData);
//		return;
		var param = {
				jasperParam : {
					download : false,
					format : 'pdf'
				},
				send_type   : 'fax',
				isReport : true,
				stor_fax_cd : _global.stor_fax_cd, /* store fax 업체 id */
				stor_id : _global.stor_id ,     /* 사업장 ID */
				fr_dt	 : frdt,   
				bank_nm  : banknm,   
				acct_no : bankno ,   
				acct_own_nm : bankow ,
				user_msg : usermsg , 
				work_nm : worknm ,
				work_phone_no : workphoneno ,   
				total_cust_id : totalcustid

		};
		
		gridSelectData.forEach( function(rec) {
			batch.add(function(){
				
				var invNo      = rec.get(config.params.field.inv_no);      // 매출번호
				var custId     = rec.get(config.params.field.cust_id);     // 고객 id
				var sendFaxNo  = rec.get(config.params.field.sendFaxNo);  // 발신번호
				var recvCustNm = rec.get(config.params.field.recvCustNm); // 수신자명
				var recvFaxNo  = rec.get(config.params.field.recvFaxNo);  // 수신 전화번호
				
				if(Ext.isEmpty(sendFaxNo) || Ext.isEmpty(recvCustNm) || Ext.isEmpty(recvFaxNo) ) { // 팩스전송 정보가 없는경우.
					emptyFax.push(invNo);
					batch.next(false);
				} else {					  // 이메일 주소가 있는경우
					
					param.inv_no = invNo;
					param.total_cust_id = custId ; /* 종합청구서 */
					param.records = [
						{
						    "stor_id"  : _global.stor_id ,
						    "provider"  : _global.stor_fax_id ,
						    "accounts"  : _global.stor_fax_cd  ,
						    "callback"  : sendFaxNo.replace(/-/gi, "") || "000000000" ,
						    "dispatch"  : "0",
						    "attribute" : "0",
						    "subject"   : config.params.faxInfo.subject ,
						    "method"	: "20",
						    "attach"	: "",
						    "user_cd"	: _global.login_id ,
						    "emp_nm"	: _global.login_nm ,
						    "dept_id"	: _global.dept_id ,
						    "dept_nm"	: _global.dept_nm ,
						    "cust_id"	: custId,
						    "inv_no"	: invNo,
						    "records": [
						        {
						            "receive" : recvCustNm, 
						            "address" : recvFaxNo   
						        }
						    ]
						}
					]; // end records
					
					var url = config.requrl.search;
					
					Ext.Ajax.request({
						url : url,
						timeout : 60000,
						params : {
							param : JSON.stringify(param),
							token : _global.token_id
						},
						success : function(response, opts) {
							var res = Ext.decode(response.responseText);
							if (res.success) {
								successArr.push(invNo);
								batch.next(true);
							} else {
								failureArr.push(invNo);
								batch.next(false);
							}
						},
						failure : function(response, opts) {
							failureArr.push(invNo);
							batch.next(false);
						}
					});
				}
				
			}); // batch end
			
		});
	},
	
	sendReportFaxRunBatch : function (config, batch, successArr, failureArr, emptyFax) {
		var me = this;
		var callback = config.callback;
		
		batch.run({
			enableLoadMask : true,
			maskMsg : '전송중 입니다... ($count/$total)',
			callback : function (success, message) {
				var resultMsg = '';
				resultMsg += '전송성공 : ' + successArr.length + '건<br/><br/>';
				
				if(failureArr.length > 0) {
					resultMsg += '전송실패 : ' + failureArr.length + '건<br/>';
					var cnt = 0;
					for(var i=0; i<failureArr.length; i++) {
						resultMsg += failureArr[i];
						resultMsg += ', ';
						cnt++;
						if(cnt === 4) { // 한줄당 표시될 전송실패 inv_no갯수
							cnt = 0;
							resultMsg += '<br/>';
						}
					}
					resultMsg += '<br/><br/>';
				}
				
				if(emptyFax.length > 0) {
					resultMsg += '팩스정보 없음 : ' + emptyFax.length + '건<br/>';
					var cnt = 0;
					for(var i=0; i<emptyFax.length; i++) {
						resultMsg += emptyFax[i];
						resultMsg += ', ';
						cnt++;
						if(cnt === 4) {// 한줄당 표시될 팩스정보 없음 inv_no갯수
							cnt = 0;
							resultMsg += '<br/>';
							continue;
						}
					}
					resultMsg += '<br/>';
				}
				
				if(Ext.isFunction(callback) ) {
					callback(true, resultMsg);
				}
			}
		}); // end batch
	},
	
	
});
