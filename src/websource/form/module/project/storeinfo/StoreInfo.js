
Ext.define('module.project.storeinfo.StoreInfo', { extend:'Axt.app.Controller',
	requires:
	[
	 	'lookup.popup.project.BonsaPopup',
	 	'lookup.popup.project.StorePopup',
	    'Axt.popup.view.ZipcodeSearch',
	    'lookup.popup.project.DistrPopup',
	    'lookup.popup.project.AgentPopup',
	    'lookup.popup.project.PhonePopup',
	    'lookup.popup.project.ChargePopup',
	    'lookup.popup.project.ProjInfoPopup'
	],
	models:['module.project.storeinfo.model.StoreInfo'],
	stores:['module.project.storeinfo.store.StoreInfo'],
	views:[
	       'module.project.storeinfo.view.StoreInfoLayout' ,
	       'module.project.storeinfo.view.StoreInfoSearch' ,
	       'module.project.storeinfo.view.StoreInfoLister' ,
	       'module.project.storeinfo.view.StoreInfoEditor' ,
		   'module.project.storeinfo.view.StoreInfoInsert' ,
	       'module.project.storeinfo.view.StoreInfoTrader' ,
	       'module.project.storeinfo.view.StoreInfoUpload'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		// 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용
		me.control({
			// layout event
			'module-storeinfo-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-storeinfo-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-storeinfo-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			'module-storeinfo-editor button[action=mapAction]'    : { click : me.mapAction    }, /*지도보기*/
			'module-storeinfo-editor button[action=contrChange]' : { click : me.contrChange }, // 양도양수

			// lister event
			'module-storeinfo-lister button[action=traderAction]' : { click : me.traderAction }, /* 부가 서비스 정보 */
			'module-storeinfo-lister button[action=officeAccess]' : { click : me.officeAccess }, /*매장연결*/
			'module-storeinfo-lister button[action=legacyAccess]' : { click : me.legacyAccess }, /*매장연결*/

			'module-storeinfo-lister button[action=cloudAccess]'  : { click : me.cloudAccess }, /* 클라우드 access */

			'module-storeinfo-lister button[action=mapAction]'    : { click : me.mapAction    }, /*지도보기*/
			'module-storeinfo-lister button[action=smsAction]'    : { click : me.smsAction    }, // SMS 전송
			'module-storeinfo-lister button[action=faxAction]'    : { click : me.faxAction    }, // FAX 전송
			'module-storeinfo-lister button[action=insertAction]' : { click : me.insertAction }, // 저장
			'module-storeinfo-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-storeinfo-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			// lister event
			'module-storeinfo-lister' : {
				selectionchange: me.attachRecord  // 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-storeinfo-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-storeinfo-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-storeinfo-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-storeinfo-lister')[0] }
	},

	selectAction:function() {
		var me = this,
			lister = me.pocket.lister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				me.pocket.editor().getForm().reset(true);
//				if (success) {
//					lister.getSelectionModel().select(0);
//				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), {}) );
	},

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
					var addrbtn = lister.down('[action=mapAction]')
					if (addrbtn) {
						var addrurl = record.get('map_url');
						if (addrurl && addrurl.length > 20) {
							addrbtn.enable();
						} else {
							addrbtn.disable();
						}
					}
				}
			}
		});
	},

	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true});
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	traderAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			record = lister.getSelectionModel().getSelection()[0]
		;

 		if (record){
 			resource.loadPopup({
 				select : 'SINGLE',
 				widget : 'module-storeinfo-trader',
 				params : { stor_id : record.get('stor_id' ), row_sts : '0'},
 				result : function(records) {
 					config.callback({
 						success     : true,
 						selects     : records
 					});
 				}
 			});
 		}
	},

	officeAccess : function() {
		var me = this
			record = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if (record) {
			weburl = record.get('pjt_url');
			if (weburl && weburl.length > 5) {
				params = {
					stor_id : record.get('stor_id' ),
					login_id : record.get('login_id' ),
					password : record.get('login_pwd' )
				};
	 			resource.window({
	 				type      : "newtab",
	 				method    : 'post',
	 				url       : weburl.match('http://') ?  weburl : 'http://' + weburl,
	 				params    : 'process=' + encrypts.encryptAes( JSON.stringify( params ) , 'kwp@our2lkndhgsf' , 'kdyddsi!uo@dsfsd' ) ,
	 				resizable : true,
	 				newTab    : true
	 			});
			}
		}
	},

	contrChange : function() {
		var me = this,
			editor = me.pocket.editor(),
			record = editor.getRecord()
		;
		if (!record) {
			Ext.Msg.error( '양도/양수 처리할 데이터를 선택 하여 주시기 바랍니다.');
			return false;
		}
		if (record.get('hq_sts') != '1000') {
			Ext.Msg.error( '개통상태만 양도/양수 처리 가능 합니다.');
			return false;
		}
		if (record.get('ctrl_sts') != '1000') {
			Ext.Msg.error( '개통상태만 양도/양수 처리 가능 합니다.');
			return false;
		}

//		Ext.Msg.error( '개발 중입니다.');
//		return false;

//		var ctrl_id = record.get('ctrl_id')
//		if (ctrl_id.length != 14  && ctrl_id.length != 17 ) {
//			Ext.Msg.error( '양도/양수 처리 불가능한 코드 입니다.');
//			return false;
//		}

		Ext.Msg.confirm('확인', '양도/양수 처리 하시겟습니까?', function(button) {
			if (button == 'yes') {
				;
				var contrary = record.get('ctrl_id').split('-'),
					stor_id = contrary[0],
					contr_no = contrary[1] || '00',
					ctrl_id = ''
				;
				contr_no = '00' + String(Number(contr_no) + 1) ;
				ctrl_id = stor_id + '-' + contr_no.substring( contr_no.length -2 ,contr_no.length );
				editor.down('[name=ctrl_id]').setValue( ctrl_id );
				editor.down('[name=rqust_dt]').setValue( Ext.Date.format(new Date(),'Y-m-d') );
				// 자기 자신이 매출고객 이라면, 변경된 청약 ID 를 반영하여 준다.
				if (record.get('ctrl_id') == record.get('chrg_id')) {
					editor.down('[name=chrg_id]').setValue( ctrl_id );
				}
				//me.updateAction();
			}
		});
	},

	cloudAccess: function() {
		var me = this
			record = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if (record) {
			weburl = record.get('pjt_url');
			if (weburl && weburl.length > 5) {
				var params =
				{
					stor_id : 'N1010BONSA1000' ,
					login_id : 'developer' ,
					password : '2323',
					accessor : 'pos',
					location : '0000000285',
					onscreen : 'false'
				};
				console.debug( JSON.stringify( params ) ) ;
				console.debug( encrypts.encryptAes( JSON.stringify( params ), 'kwp@our2lkndhgsf' , 'kdyddsi!uo@dsfsd'  )) ;

	 			resource.window({
	 				type      : "newtab",
	 				method    : 'post',
//	 				url       : 'http://203.229.190.92:9080',
	 				url       : 'localhost:8070',
	 				params    : 'process=' + encrypts.encryptAes( JSON.stringify( params ) , 'kwp@our2lkndhgsf' , 'kdyddsi!uo@dsfsd' ) ,
	 				resizable : true,
	 				newTab    : true
	 			});
			}
		}
	},


	legacyAccess : function() {
		resource.window({
			type      : "newtab",
			method    : 'post',
			url       : 'http://asp.sky.com/control/listener/get/legacy.do',
			params    : '' ,
			resizable : true,
			newTab    : true
		});
	},

	/**
	*  고객 정보 조회
	*/
	insertKeygen:function(config) {
		var me = this
		;
		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-storeinfo-insert',
			params : { hq_sts : '1000' , row_sts : '0'},
			result : function(records) {
				config.callback({
					success     : true,
					selects     : records
				});
			}
		});
	},

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister()
		;
		editor.insertBefore({
			caller : me,
			keygen : {
				object : me.insertKeygen,
				params : {},
				masked : false
			},
			callback : function (keygen){
				if (keygen.success){
					console.debug(keygen.selects.stor_gb)
					editor.insertRecord({
						action : Const.EDITOR.DEFAULT,
						record   : Ext.create( lister.getStore().model.modelName,{
							pjt_id    : keygen.selects.pjt_id  ,
							pos_ddns  : keygen.selects.pos_ddns ,
							web_ddns  : keygen.selects.web_ddns ,
							hq_gb     : keygen.selects.hq_gb ,
							hq_id     : keygen.selects.hq_id ,
							stor_grp  : keygen.selects.stor_grp ,
							stor_gb   : keygen.selects.stor_gb ,
							_ctrl_id  : keygen.selects.stor_id ,
							ctrl_id   : keygen.selects.stor_id ,
							stor_id   : keygen.selects.stor_id ,
							hq_ver    : keygen.selects.hq_ver,
							chnl_id   : keygen.selects.chnl_id ,
							distr_nm  : keygen.selects.distr_nm ,
							agent_id  : keygen.selects.agent_id ,
							mngt_chnl_nm  : keygen.selects.mngt_chnl_nm ,
							call_cntr_id  : keygen.selects.call_cntr_id ,
							phone_nm  : keygen.selects.phone_nm ,
							chrg_id   : keygen.selects.chrg_id,
							chrg_nm   : keygen.selects.chrg_nm
						}),
						disables : [ me.pocket.layout().down('#mainpanel') ],
						callback: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true });
							}
						},
						finished : function(results, record){
							if (results.success){
								editor.expand(false);
							}
						}
					});
				}
			}
		}, me);
	},



	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {

					if (Ext.isEmpty(record.get('login_id'))) {
						record.dirtyValue('login_id' ,'$'+(Math.floor((1 + Math.random()) * 0x10000000 )));
						record.dirtyValue('login_pwd' ,     Math.floor((1 + Math.random()) * 0x100000000 ));
						record.dirtyValue('_login_issue_yn'  , '1' );
					}

					results.feedback({success : true  });
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							record.dirtyValue('_new_login_issue_yn'  , '0' );
							record.dirtyValue('_chrg_id'           , record.get('chrg_id' ));
							record.dirtyValue('_ctrl_id'            , record.get('ctrl_id'  ));
							record.dirtyValue('_contr_sts'           , record.get('ctrl_sts'  ));
//							if (record.get('chrg_id' )) == record.get('ctrl_id' )) ) {
//							}
//							record.dirtyValue('trns_sts'           , record.get('chrg_id' ));

							store.commitChanges();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});
	},



	/*
	 * SMS 전송
	 */
	smsAction:function(value) {
		var me  	= this,
			master  = me.pocket.lister(),
			select  = master.getSelectionModel().getSelection(),
			record  = Ext.create('Axt.data.message.Content' , {
				stor_id : _global.hq_id,
				provider : _global.hq_sms_id , 	/* 서비스 공급사 id (구분) */
				accounts : _global.hq_sms_cd  	/* 서비스 사용자 cd (계정) */
//				callback : _global.biz_hp_no  								/* 발신자 주소 or 전화번호 address */
//				dispatch : ,												/* 0 : 즉시 1 : 예약 발송  */
			})
		;
		console.debug('select', select );
//		if ( select[0] ){
		select.forEach( function(item){
			if (!Ext.isEmpty( item.get('biz_hp_no'))) {
//				var telhp = item.get('hp_no').substring(0,3) ;
				var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g ;
				var rgEx1 = /[01](0|1|6|7|8|9)(\d{4}|\d{3})\d{4}$/g ;
				var OK = rgEx.exec( item.get('biz_hp_no') );
				var OK1 = rgEx1.exec( item.get('biz_hp_no') );
				if( OK || OK1 ){
					record.records().add(
							Ext.create( record.records().model.modelName , {
								receive : item.get('ctrl_nm'),
								address : item.get('biz_hp_no')
							})
					);
				}
			}
		});
//		console.debug( 'record ' , record ) ;
		resource.loadPopup({
			select : 'SINGLE',
			widget : 'popup-sms-send',
			params : { url : _global.location.http() + "/services/sms/sender.do" },
			values : { record : record },
			result : function(records) {
			}
		});

	},


	/*
	 * FAX 전송
	 */
	faxAction:function(value) {
		var me  	= this,
			master  = me.pocket.lister(),
			select  = master.getSelectionModel().getSelection(),
			record  = Ext.create('Axt.data.message.Content' , {
				stor_id : _global.hq_id,
				provider : _global.bonsa_fax_id , 	/* 서비스 공급사 id (구분) */
				accounts : _global.bonsa_fax_cd  	/* 서비스 사용자 cd (계정) */
//				callback : _global.biz_hp_no  								/* 발신자 주소 or 전화번호 address */
//				dispatch : ,												/* 0 : 즉시 1 : 예약 발송  */
			})
		;
		console.debug('select', select );
//		if ( select[0] ){
		select.forEach( function(item){
			if (!Ext.isEmpty( item.get('biz_fax_no'))) {
//				var telhp = item.get('hp_no').substring(0,3) ;
				var rgEx = /[0](\d{1}|\d{2}|\d{3})[-](\d{4}|\d{3})[-]\d{4}$/g ;
				var rgEx1 = /[0](\d{1}|\d{2}|\d{3})(\d{4}|\d{3})\d{4}$/g ;
				var OK = rgEx.exec( item.get('biz_fax_no') );
				var OK1 = rgEx1.exec( item.get('biz_fax_no') );
				if( OK || OK1 ){
					console.debug('OK');
					record.records().add(
							Ext.create( record.records().model.modelName , {
								receive : item.get('ctrl_nm'),
								address : item.get('biz_fax_no')
							})
					);
				}
			}
		});
//		console.debug( 'record ' , record ) ;
		resource.loadPopup({
			select : 'SINGLE',
			widget : 'popup-fax-send',
			params : { url : _global.location.http() + "/services/fax/sender.do" },
			values : { record : record },
//			title  : '직인 이미지 업로드',               // popup title (옵션)
			waitMsg : '업로드중...',                    // upload시 progress bar의 wait message (옵션)
			allowExtension : ['txt', 'doc', 'pdf', 'gif', 'jpg', 'png']    // 지정하지 않으면 확장자 무제한 (옵션)
//			result : function(records) {
//			}
		});

	},


	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller   : me,

			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					results.feedback( {success : true , reload : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
	},


	/**
	 *
	 */
	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});


