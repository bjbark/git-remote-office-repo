Ext.define('module.custom.sjflv.prod.order.prodorder.ProdOrder', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.RevsPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.LottPopupSjflv',
	],
	models	: [
		'module.custom.sjflv.prod.order.prodorder.model.ProdOrder1',
		'module.custom.sjflv.prod.order.prodorder.model.ProdOrder2'
	],
	stores	: [
		'module.custom.sjflv.prod.order.prodorder.store.ProdOrder1',
		'module.custom.sjflv.prod.order.prodorder.store.ProdOrder2'
	],
	views	: [
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderLayout',
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderLister1',
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderLister2',
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderSearch',
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderListerSearch',
		'module.custom.sjflv.prod.order.prodorder.view.ProdOrderPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-prodorder-layout button[action=selectAction]'			: { click : me.selectAction			},	// 조회

			// lister2 event
			'module-sjflv-prodorder-lister2 button[action=writeAction]'			: { click : me.writeAction		},	// 작업지시서
			'module-sjflv-prodorder-lister2 button[action=updateAction]'		: { click : me.updateAction		},	// 저장
			'module-sjflv-prodorder-lister2 button[action=deleteAction]'		: { click : me.deleteAction		},	// 취소
			'module-sjflv-prodorder-lister2 button[action=exportAction]'		: { click : me.exportAction		},	// 엑셀
			//lister serch
			'module-sjflv-prodorder-lister-search button[action=selectAction2]'	: { click : me.selectAction2		}	// 조회
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-search') [0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-lister2')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-lister-search')[0]},
		popup		: function () { return Ext.ComponentQuery.query('module-sjflv-prodorder-popup')[0]},

	},

	//조회
	selectAction : function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 0){
			if(param.pdod_date1>param.pdod_date2) {
				Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
			}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
			}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
				Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
//							lister1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}else if(tindex == 1){
			if(param.pdod_date1>param.pdod_date2) {
				Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
			}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
			}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
				Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
//							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}else{
			Ext.Msg.alert("알림","생산지시작성의 조회를 클릭 해 주십시오.");
		}
	},

	selectAction2 : function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			search  = me.pocket.listersearch(),
			param   = search.getValues()
		;
		if(param.plan1_sttm>param.plan2_sttm){
			Ext.Msg.alert("알림", "착수일자를 다시 입력해주십시오");
		}else{
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	deleteAction : function() {
		var me	= this,
			lister2	= me.pocket.lister2(),
			store = lister2.getStore(),
			selects = lister2.getSelectionModel().getSelection()
		;
		var err_msg = "";
		var records = lister2.getSelectionModel().getSelection();

		if (selects) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(selects, function(record) {
						record.dirtyValue('line_stat', '2');
						record.store.commitChanges();
					});
				Ext.each(selects, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/prod/prodorder/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
								work_invc	: record.get('work_invc'),
								line_seqn	: '1',
								line_stat	: '2',
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								lister2.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
	},

	updateAction : function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			changes = lister2.getStore().getUpdatedRecords().length,
			new_invc_numb
		;
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			for(var i=0;i<changes;i++){
				Ext.Ajax.request({
					url : _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'pror'
						})
					},
					async	: false,
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				lister2.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister2.getStore();
			lister2.getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},
	// 생산지시등록
	writeAction:function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			jrf = 'workbook_sjung2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "생산지시리스트에서 선택하여주십시오.");
			return;
		}

		var arg = 'invc_numb~'+records[0].get('invc_numb')+'~item_idcd~'+records[0].get('item_idcd');

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
		return win;
	},

	exportAction : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});