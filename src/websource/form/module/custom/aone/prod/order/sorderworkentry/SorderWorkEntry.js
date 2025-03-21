Ext.define('module.custom.aone.prod.order.sorderworkentry.SorderWorkEntry', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.WrhsPopup',
		'Axt.popup.view.ZipcodeSearch'
	],

	models:[
		'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryMaster',
		'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryDetail',
		'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryDetailMans',
		'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryFile'
	],
	stores:[
		'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryMaster',
		'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryPopupMtrl',
		'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryPopupMans',
		'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryFile'
	],
	views: [
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryLayout',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntrySearch',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryPopup',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryFile',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryImage',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryPopupMtrl',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryPopupMans',
		'module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryListerMaster',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-sorderworkentry-layout button[action=selectAction]'			: { click : me.selectAction	},	// 조회
			'module-sorderworkentry-lister-master button[action=waitAction]'	: { click : me.waitAction	},	// 부품대기
			'module-sorderworkentry-lister-master button[action=popupAction]'	: { click : me.popupAction	},	// 실적보고
			'module-sorderworkentry-lister-master button[action=exportAction]'	: { click : me.exportAction	},	// 엑셀
			'module-sorderworkentry-popup button[action=itemAction]'			: { click : me.itemAction	},	// 품목추가
			'module-sorderworkentry-popup button[action=itemupdateAction]'		: { click : me.itemupdateAction	},// 품목지정

			'module-sorderworkentry-popup button[action=updateAction]' : { click : me.updateAction	},	//저장버튼
			'module-sorderworkentry-popup button[action=cancelAction]' : { click : me.close			},	//취소버튼
			'module-sorderworkentry-popup button[action=closeAction]'  		  : { click : me.closeAction	},	//닫기버튼


			'module-sorderworkentry-lister-master' : {
				itemclick       : me.selectDetail,
			},
			'module-sorderworkentry-file'		: {
				selectionchange	: me.selectImage
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-sorderworkentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderworkentry-search')[0] },
		lister : {
			master   : function () { return Ext.ComponentQuery.query('module-sorderworkentry-lister-master')[0] },
		},
		popup   : function () { return Ext.ComponentQuery.query('module-sorderworkentry-popup')[0] },
		mtrl    : function () { return Ext.ComponentQuery.query('module-sorderworkentry-popup-mtrl')[0] },
		mans    : function () { return Ext.ComponentQuery.query('module-sorderworkentry-popup-mans')[0] },
		file    : function () { return Ext.ComponentQuery.query('module-sorderworkentry-file')[0] },
		image   : function () { return Ext.ComponentQuery.query('module-sorderworkentry-image')[0] },
	},

	closeAction :function() {
		var me = this,
			popup	= me.pocket.popup(),
			master	= me.pocket.lister.master(),
			store	= master.getStore()
		;
		popup.close();

		store.clearData();
		store.reload();
	},

	//조회
	selectAction:function() {
		var me = this,
			master		= me.pocket.lister.master(),
			store		= master.getStore(),
			search		= me.pocket.search(),
			param		= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			master.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp
// 				, drtr_idcd : _global.login_pk
				}
			));
		}
		store.reload();
	},

	//선택
	selectDetail : function(grid, record ){
		var me = this,
			master = me.pocket.lister.master()
		;
	},

	// 실적보고 버튼
	popupAction:function() {
		var me = this,
			master  = me.pocket.lister.master(),
			select  = master.getSelectionModel().getSelection(),
			popup   = me.pocket.popup(),
			mtrl   = me.pocket.mtrl(),
			mans   = me.pocket.mans()
		;
		
		if(select && select.length == 1){
			
			if(select[0].get('acpt_stat_dvcd') == '6000') {
				Ext.Msg.alert('알림','출고완료된 항목은 수정할 수 없습니다.');
				return;
			} 
			
			var work_invc_numb = select[0].get('work_invc_numb');
			if (Ext.isEmpty(work_invc_numb)) {
				Ext.Ajax.request({
					url			: _global.location.http() + '/custom/aone/prod/order/sorderworkentry/get/workBookInvcNumb.do', // workbook 가져오기
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							invc_numb : select[0].get('invc_numb'),
							amnd_degr : select[0].get('amnd_degr'),
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if (result.success) {
							if (result.records.length == 0) {
								Ext.Ajax.request({
									url			: _global.location.http() + '/listener/seq/maxid.do',
									params		: {
										token	: _global.token_id ,
										param	: JSON.stringify({
											stor_id	: _global.stor_id,
											table_nm: 'work_book'
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										work_invc_numb = result.records[0].seq;
									}
								});
							} else {
								work_invc_numb = result.records[0].invc_numb;
							}
						}
					}
				});
			}

			//워크북 검색
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/prod/order/sorderworkentry/get/workBook.do',
				method	: "POST",
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb : select[0].get('invc_numb'),
						amnd_degr : select[0].get('amnd_degr'),
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
							//팝업에 워크북 데이터 넣기
							var record = select[0].data;
							var	popup  = resource.loadPopup({
								widget : 'module-sorderworkentry-popup',
								params : {
									repa_stat_dvcd : (result.records.length == 0) ? "" : result.records[0].repa_stat_dvcd,
									work_strt_date : (result.records.length == 0) ? "" : result.records[0].work_strt_date,
									work_endd_date : (result.records.length == 0) ? "" : result.records[0].work_endd_date,
									work_sttm 	   : (result.records.length == 0) ? "" : result.records[0].work_sttm,
									work_edtm 	   : (result.records.length == 0) ? "" : result.records[0].work_edtm,
									wker_name	   : (result.records.length == 0) ? "" : result.records[0].wker_name,
									invc_date	   : (result.records.length == 0) ? "" : result.records[0].invc_date,
									invc_numb	   : (result.records.length == 0) ? "" : result.records[0].invc_numb,
									user_memo	   : (result.records.length == 0) ? "" : result.records[0].user_memo,
									item_code	   : (result.records.length == 0) ? "" : result.records[0].item_code,
									plan_strt_date : (result.records.length == 0) ? "" : result.records[0].plan_strt_date,
									plan_endd_date : (result.records.length == 0) ? "" : result.records[0].plan_endd_date,
									prog_rate	   : (result.records.length == 0) ? "" : result.records[0].prog_rate,
									prnt_idcd	   : (result.records.length == 0) ? "" : result.records[0].prnt_idcd,
									acpt_numb	   : result.records[0].acpt_numb,
									acpt_degr	   : result.records[0].acpt_degr,
									acpt_dvcd	   : result.records[0].acpt_dvcd,
									work_invc_numb : work_invc_numb,
									orgn_dvcd	   : 'acpt_mast',
									controller	   : me
								},
							});
						popup.down('form').getForm().setValues(record);

						//워크북 자재사용내역

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
		}else {
			Ext.Msg.alert('알림','작업건을 선택하여 주세요');
		}
	},

	//부품대기
	waitAction:function() {
		var me = this,
			master  = me.pocket.lister.master(),
			store   = master.getStore(),
			select  = master.getSelectionModel().getSelection()
		;
		if(select && select.length == 1){
			Ext.Ajax.request({
				url			: _global.location.http() + '/custom/aone/prod/order/sorderworkentry/get/waitPats.do', // workbook 가져오기
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						invc_numb : select[0].get('invc_numb'),
						amnd_degr : select[0].get('amnd_degr'),
						line_seqn : select[0].get('line_seqn'),
						repa_stat_dvcd : '1000'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if (result.success) {
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','작업 1건을 선택하여 주세요');
		}
		store.reload();
	},

	tabChange : function(tab,popup){
		var	me		= this,
			active	= tab.getActiveTab(),
			index	= tab.items.indexOf(active),
			master	= me.pocket.lister.master(),
			select  = master.getSelectionModel().getSelection()[0],
			lister,esti_list
		;
		var work_invc_numb = popup.down('[name=work_invc_numb]').getValue();

		var selectedRecord = me.getSelectedRecord();
		me.saveSelectedRecord(index, selectedRecord);

		// 저장된 데이터가 있다면 해당 탭의 데이터를 로드
		var savedRecord = me.loadSelectedRecord(index);
		console.log(index);

		if (savedRecord) {
		    popup.down('form').getForm().setValues(savedRecord);
		    return;
		} else{
			if(index == 0){
				lister = me.pocket.mans();
				esti_list	= 1;

				if(select.get('work_invc_numb')== 0){
					esti_list	= 2;
				}

				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							resource.loadPopup({
								widget : 'module-sorderworkentry-popup-mans',
								params : {
									work_invc_numb : work_invc_numb
								},
							});
						} else { }
					}, scope:me
				}, Ext.merge({ work_invc_numb : work_invc_numb
							 , esti_list : esti_list
							 , invc_numb : select.get('invc_numb')
							 , amnd_degr : select.get('amnd_degr')
					})
				);
			}else if(index == 1){
				lister	= me.pocket.mtrl();
				esti_list	= 1;

				if(select.get('work_invc_numb')== 0){
					esti_list	= 2;
				}

				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							resource.loadPopup({
								widget : 'module-sorderworkentry-popup-mtrl',
								params : {
									work_invc_numb : work_invc_numb
								},
							});
						} else { }
					}, scope:me
				}, Ext.merge({ work_invc_numb : work_invc_numb
							 , esti_list : esti_list
							 , invc_numb : select.get('invc_numb')
							 , amnd_degr : select.get('amnd_degr')
					})
				);
			}else if(index == 2){
				lister = me.pocket.file();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {
						}
					}, scope:me
				}, Ext.merge( {
					stor_grp  :_global.stor_grp,
					invc_numb : select.get('invc_numb'),
					orgn_dvcd : 'acpt_mast',
					line_seqn : 0,
					uper_seqn : select.get('amnd_degr'),
					prnt_idcd : select.get('prnt_idcd')?select.get('prnt_idcd'):select.get('acpt_numb'),
					file_dvcd_1fst : "3200"
				}, {stor_id : _global.stor_id}) );
			}
		}
	},

	getSelectedRecord: function() {
		var master = this.pocket.lister.master();
		var selectedRecord = master.getSelectionModel().getSelection()[0];
		return selectedRecord ? selectedRecord.data : null;
	},

	saveSelectedRecord: function(tabIndex, recordData) {
		var storeKey = 'tabData_' + tabIndex;
		var store = Ext.getStore(storeKey);

		if (!store) {
			store = Ext.create('Ext.data.Store', {
				storeId: storeKey,
				fields: ['work_invc_numb', 'invc_date', /* 기타 필드 */ ],
				autoLoad: false
			});
		}

		store.removeAll();
		if (recordData) {
			store.add(recordData);
		}
	},

	loadSelectedRecord: function(tabIndex) {
		var storeKey = 'tabData_' + tabIndex;
		var store = Ext.getStore(storeKey);

		if (store && store.getCount() > 0) {
			return store.getAt(0).getData();
		}

		return null;
	},

	selectImage:function(grid, record){
		var me = this,
			image = me.pocket.image()
		;

		image.down('[name=work_enty_imge]').setSrc('');
		var reg = new RegExp('\.(jpeg|jpg|gif|png)', 'i')
		if(record.length > 0 && record[0].get('file_name').search(reg)){
			var url = _global.img_http+'/'+record[0].get('file_name');
			image.down('[name=work_enty_imge]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
			image.down('[name=work_enty_imge]').setSrc(url);

		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
});

