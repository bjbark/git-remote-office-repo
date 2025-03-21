Ext.define('module.custom.aone.sale.order.sorderostt.SorderOstt', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.aone.sale.order.sorderostt.model.SorderOsttMaster',
		'module.custom.aone.sale.order.sorderostt.model.SorderOsttPopupMans',
		'module.custom.aone.sale.order.sorderostt.model.SorderOsttPopupMtrl',
	],
	stores:[
		'module.custom.aone.sale.order.sorderostt.store.SorderOsttMaster2',
		'module.custom.aone.sale.order.sorderostt.store.SorderOsttPopupMans',
		'module.custom.aone.sale.order.sorderostt.store.SorderOsttPopupMtrl'
	],
	views : [
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttLayout',
		/* 현황 */
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttSearch'       ,
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttListerMaster' ,
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttListerMaster2',
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttMaster2Editor',
		/* 작업 */
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttCalcPopup',
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttPopup',
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttPopupMans',
		'module.custom.aone.sale.order.sorderostt.view.SorderOsttPopupMtrl',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sorderostt-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sorderostt-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sorderostt-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sorderostt-layout #mainpanel'									: { tabchange : me.tabChange       },
			'module-sorderostt-layout button[action=selectAction]'					: { click : me.selectAction        }, /* 조회 */

			'module-sorderostt-lister-master button[action=deleteAction]'			: { click : me.releaseCancelAction }, /* 삭제(출고취소) */
			'module-sorderostt-lister-master button[action=exportAction]'			: { click : me.exportAction        }, /* 엑셀 */

			'module-sorderostt-lister-master2 button[action=calcAction]'			: { click : me.calcAction          }, /* 수리비 산출*/
			'module-sorderostt-lister-master2 button[action=updateAction]'			: { click : me.releaseAction       }, /* 저장(출고) */
			'module-sorderostt-lister-master2 button[action=exportAction]'			: { click : me.exportAction2       }, /* 엑셀 */

//			'module-sorderostt-worker-editor button[action=cancelAction]'			: { click : me.cancelAction        }, /* 취소 */

			'module-sorderostt-lister-master' : {
				selectionchange : me.selectRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sorderostt-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderostt-search')[0] },
		lister : {
			master   : function () { return Ext.ComponentQuery.query('module-sorderostt-lister-master')[0]  },
			master2  : function () { return Ext.ComponentQuery.query('module-sorderostt-lister-master2')[0] },
			ms2editor: function () { return Ext.ComponentQuery.query('module-sorderostt-lister-editor')[0]  },
		},
		worker : {
			editor  : function () { return Ext.ComponentQuery.query('module-sorderostt-worker-editor')[0]   },
		},
		popup  : function () { return Ext.ComponentQuery.query('module-sorderostt-amend-popup')[0] },
		popup2  : function () { return Ext.ComponentQuery.query('module-sorderostt-calc-popup')[0] },
	},

	//에디티 숨기기 및 보이기
	tabChange:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
			if ( tindex == 0 ) {
				Ext.ComponentQuery.query('module-sorderostt-layout')[0].down('#osttEdit').show();
			}else{
				Ext.ComponentQuery.query('module-sorderostt-layout')[0].down('#osttEdit').hide();
			}
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			master2	= me.pocket.lister.master2(),
			editor	= me.pocket.worker.editor(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			layout	= me.pocket.layout(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;

		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			lister = master2;

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id,mes_system_type:_global.options.mes_system_type}) );
		}
	},

	//출고 리스트 Detail 조회
	selectRecord:function( grid, record ){
		var me = this,
			master	= me.pocket.lister.master(),
			editor	= me.pocket.worker.editor()
		;

		if(record.length > 0 && record[0].get('invc_numb').length > 0){
			editor.selectRecord({ lister : me.pocket.lister.master() , record : record }, me);
			//수리후 이미지 불러오기
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sorderostt/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: record[0].get('invc_numb'),
						amnd_degr		: record[0].get('amnd_degr'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var ostt_imge1 = result.records[0].item_imge;
						var ostt_imge2 = result.records[0].item_imge2;
						if(ostt_imge1 != undefined){
							var x = ostt_imge1.toString();
							var img = new Uint8Array(x.split(","));
							var blob = new Blob([img],{type:'image/png'});
							var url = URL.createObjectURL(blob);
							editor.down('[name=ostt_imge1]').setSrc(url);
						}
						if(ostt_imge2 != undefined){
							var x = ostt_imge2.toString();
							var img = new Uint8Array(x.split(","));
							var blob = new Blob([img],{type:'image/png'});
							var url = URL.createObjectURL(blob);
							editor.down('[name=ostt_imge2]').setSrc(url);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},

//	//저장 취소
//	cancelAction:function() {
//		var me = this,
//			editor = me.pocket.worker.editor(),
//			param  = me.pocket.search().getValues()
//		;
//
//		editor.down('[name=ostt_imge1]').setSrc('');
//		editor.down('[name=ostt_imge2]').setSrc('');
//
//		editor.cancelRecord({
//			caller : me,
//			lister : me.pocket.worker.editor(),
//			callback : function( results ) {
//				results.feedback( {success : true, visible : true, selectRecord : true });
//				me.pocket.layout().down('#mainpanel').setDisabled(false);
//				me.pocket.search().setDisabled(false);
//				me.pocket.worker.editor().getForm().reset(true);
//			}
//		}, me);
//
//		editor.attachRecord({
//			caller : me ,
//			lister : me.pocket.worker.lister(),
//			callback : function (results , record ) {
//				if (results.success) {
//				}
//			}
//		});
//	},

	//수리비 산출
	calcAction:function() {
		var me = this,
			select	= me.pocket.lister.master2().getSelectionModel().getSelection()
		;
		if (select && select.length == 1) {

			if (select[0].get("repa_stat_dvcd") == "2100" || select[0].get("repa_stat_dvcd") == "3100" || select[0].get("repa_stat_dvcd") == "4000"
				|| select[0].get("acpt_stat_dvcd") == "6000" ) {
				Ext.Msg.alert("알림", "수리비 산출 할 리스트가 아닙니다.");
				return;
			}

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sorderostt/get/repairCalc.do',
				method	: "POST",
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select[0].get('invc_numb'),
						amnd_degr		: select[0].get('amnd_degr'),
					})
				},
				success : function(response, request) {
					var object = response,
					result = Ext.decode(object.responseText)
					;
					if (result.success) {
						resource.loadPopup({
							widget : 'module-sorderostt-calc-popup',
							params : {
								invc_numb	   :select[0].get('invc_numb'),
								amnd_degr	   :select[0].get('amnd_degr'),
								cstm_name	   :select[0].get('cstm_name'),
								invc_date	   :select[0].get('invc_date'),
								item_name	   :select[0].get('item_name'),
								sral_numb	   :select[0].get('sral_numb'),
								need_time	   :result.records[0].need_time,
								prts_repa_amnt :(result.records[0].prts_repa_amnt == null) ? 0 : result.records[0].prts_repa_amnt,
								prod_drtr_idcd :result.records[0].prod_drtr_idcd,
								prod_drtr_name :result.records[0].prod_drtr_name,
								work_invc_numb :result.records[0].work_invc_numb,
							}
						});
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		} else {
			Ext.Msg.alert("알림", "수리비 산출 목록을  1건 선택하여 주십시오.");
		}
	},

	//출고등록(멀티)
	releaseAction:function() {
		var me	= this,
			master2		= me.pocket.lister.master2(),
			ms2editor	= me.pocket.lister.ms2editor(),
			select		= master2.getSelectionModel().getSelection(),
			ostt_date	= me.dateFormat(ms2editor.getValues().ostt_date),
			err_msg		= ""
		;

		if (select && select.length > 0) {
//			Ext.each(select, function(record) {
//				if(record.get("repa_stat_dvcd") == "2000" || record.get("repa_stat_dvcd") == "3000" ){
//					if(record.get("invc_amnt") == "0"){
//						err_msg = "수리비 산출이 완료되지 않았습니다.";
//						return false;
//					}
//				}
//			});

			Ext.each(select, function(record) {	
				if(record.get("acpt_stat_dvcd") == "3000" && record.get("repa_stat_dvcd") == "2000" || record.get("repa_stat_dvcd") == "3000" ){
					if(record.get("invc_amnt") == "0"){
						err_msg = "수리비 산출이 완료되지 않았습니다.";
						return false;
					}
				}
			});
			
			if(ostt_date > Ext.Date.format(new Date(),'Ymd')){
				Ext.Msg.alert('알림','출고일은 금일 이후가 될 수 없습니다. 확인해주세요.');
				return;
			}
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
//			var ostt_date = ms2editor.down('[name=ostt_date]').getValue();

			Ext.Msg.confirm("확인", "출고등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					var a =[];
					Ext.each(select,function(rec){
						rec.set('ostt_date',ostt_date);
						rec.set('ostt_drtr_idcd',_global.login_id);
					})
					master2.getStore().sync({
						callback:function(a,b){
							master2.getStore().reload();
						}
					})
				}
			});
		} else {
			Ext.Msg.alert("알림","출고목록을 선택해주십시오.");
			return;
		}
	},

	dateFormat:function(date){
		var	yyyy,
			mm  ,
			dd  ,
			value = ""
		;
		if(date.length==8){
			yyyy = date.substr(0,4),
			mm =  date.substr(4,2),
			dd = date.substr(6,2),
			value = yyyy+mm+dd
		}
		return value;
	},

	//출고 취소 등록(단건)
	releaseCancelAction:function() {
		var me	= this,
			master	= me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection(),
			err_msg = ""
		;

		if (select && select.length == 1) {
			Ext.Msg.confirm("확인", "출고취소 하시겠습니까?", function(button) {
				if (button == 'yes') {

					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/aone/sale/order/sorderostt/set/releasecancel.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param : Ext.encode({
								invc_numb : select[0].get('invc_numb'),
								amnd_degr : select[0].get('amnd_degr'),
								line_seqn : select[0].get('line_seqn'),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
							} else {
								Ext.Msg.alert("알림", "출고 취소가 완료 되었습니다.");
								master.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		} else {
			Ext.Msg.alert("알림","출고취소할 목록 1건을 선택해주십시오.");
			return;
		}
	},




	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportAction2 : function(self) {
		this.pocket.lister.master2().writer({enableLoadMask:true});
	},
});
