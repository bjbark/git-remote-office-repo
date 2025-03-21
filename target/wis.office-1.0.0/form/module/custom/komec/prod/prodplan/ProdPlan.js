Ext.define('module.custom.komec.prod.prodplan.ProdPlan', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.RevsPopup',
		'lookup.popup.view.UserPopup'
	],

	models:[
		'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster',
		'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster2',
		'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster3',
		'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster4',
	],
	stores:[
		'module.custom.komec.prod.prodplan.store.ProdPlanMaster',
		'module.custom.komec.prod.prodplan.store.ProdPlanMaster2',
		'module.custom.komec.prod.prodplan.store.ProdPlanMaster3',
		'module.custom.komec.prod.prodplan.store.ProdPlanMaster4',
	],
	views : [
		/* 현황 */
		'module.custom.komec.prod.prodplan.view.ProdPlanSearch',
		'module.custom.komec.prod.prodplan.view.ProdPlanLayout',
		'module.custom.komec.prod.prodplan.view.ProdPlanPopup',
		'module.custom.komec.prod.prodplan.view.ProdPlanModiPopup',
		'module.custom.komec.prod.prodplan.view.ProdPlanListerMaster',
		'module.custom.komec.prod.prodplan.view.ProdPlanListerMaster2',
		'module.custom.komec.prod.prodplan.view.ProdPlanListerMaster3',
		'module.custom.komec.prod.prodplan.view.ProdPlanListerMaster4',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.joinPermission(workspace.down('module-porderlist-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-porderlist-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-porderlist-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodplan-layout button[action=selectAction]'			: { click : me.selectAction	}, /* 조회	*/
			'module-prodplan-layout button[action=deleteAction]'			: { click : me.deleteAction	}, /* 취소	*/
			'module-prodplan-layout button[action=updateAction]'			: { click : me.updateAction	}, /* 취소	*/
			'module-prodplan-layout button[action=exportAction]'			: { click : me.exportAction	}, /* 엑셀	*/
			'module-prodplan-layout button[action=exportAction2]'			: { click : me.exportAction2}, /* 엑셀	*/
			'module-prodplan-layout button[action=prodAction]'				: { click : me.prorAction	}, /* 생산지시 */
			'module-prodplan-layout button[action=modifyAction]'			: { click : me.modifyAction	}, /* 생산지시 수정 */
			'module-prodplan-lister-master' : {
				selectionchange : me.selectDetail
			},
			'module-prodplan-lister-master2' : {
				selectionchange : me.selectDetail2
			},
			'module-prodplan-lister-master3' : {
				selectionchange : me.selectDetail3
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout 	: function () { return Ext.ComponentQuery.query('module-prodplan-layout'			)[0] },
		search 	: function () { return Ext.ComponentQuery.query('module-prodplan-search'			)[0] },
		lister	: {
			master 	: function () { return Ext.ComponentQuery.query('module-prodplan-lister-master'		)[0] },
			master2	: function () { return Ext.ComponentQuery.query('module-prodplan-lister-master2'	)[0] },
			master3	: function () { return Ext.ComponentQuery.query('module-prodplan-lister-master3'	)[0] },
			master4	: function () { return Ext.ComponentQuery.query('module-prodplan-lister-master4'	)[0] },
		}
	},

	selectAction:function(callbackFn) {
		var me 		= this,
			master 	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			master3	= me.pocket.lister.master3(),
			master4	= me.pocket.lister.master4(),
			param	= me.pocket.search().getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			if(tindex==1){
				master = master3;
			}else{
				master3.getStore().clearData();
				master3.getStore().loadData([],false);
				master4.getStore().clearData();
				master4.getStore().loadData([],false);
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			master.select({
				 callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else {  }
					mask.hide();
					master2.getStore().clearData();
					master2.getStore().loadData([],false);
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			master2 = me.pocket.lister.master2()
		;
		if (record[0]) {
			master2.getStore().clearData();
			master2.getStore().loadData([],false);
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			master2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });
		}
	},

	selectDetail2 : function(grid, record) {
		var	me = this,
			master2 = me.pocket.lister.master2()
		;
		if(record[0]) {
			record[0].data;
			console.log(record[0].data);
		}
	},

	selectDetail3 : function(grid, record) {
		var me = this,
			lister = me.pocket.lister.master4()
		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, record[0].data);
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportAction2: function(self) {
		this.pocket.lister.master3().writer({enableLoadMask:true});
	},

	prorAction:function() {
		var	me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			master3 = me.pocket.lister.master3(),
			master4 = me.pocket.lister.master4(),
			select  = master.getSelectionModel().getSelection()[0],
			select2 = master2.getSelectionModel().getSelection()[0],
			select3 = master3.getSelectionModel().getSelection()[0],
			records = master2.getSelectionModel().getSelection();
		;

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "품목 1건을 선택 후 진행하십시오.");
			return;
		}

		if(select){
			var	record	 	= "",
				_set		= 'insert',
				pror_numb 	= ''
			;
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'pror_mast'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					pror_numb = result.records[0].seq;
				}
			});
				record = Ext.merge(select.data,select2.data,{pror_numb : pror_numb,lott_numb:"",indn_qntt:""});
			
			var popup = resource.loadPopup({
				widget : 'module-prodplan-popup',
				params : {
					_set : _set
				}
			});
			popup.down('form').getForm().setValues(record);
			popup.down('[name=revs_numb]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0', item_idcd:record.item_idcd }			
			popup.down('form').down('[name=indn_qntt]').setValue(record.pror_remn_qntt);
			if(popup.down('form').down('[name=strt_dttm]').getValue() == null){
				popup.down('form').down('[name=strt_dttm]').setValue(new Date());
				popup.down('form').down('[name=endd_dttm]').setValue(new Date());
			}
		}
	},

	deleteAction:function(){
		var me		= this,
			master2 = me.pocket.lister.master2(),
			master3 = me.pocket.lister.master3(),
			master4 = me.pocket.lister.master4(),
			select3	= master3.getSelectionModel().getSelection(),
			store	= master3.getStore()
		;
		if(select3.length>0){
			var msg = "";
			Ext.each(select3, function(rec){
				if(rec.get('prog_stat_dvcd') != 0){
					msg = "진행중인 지시는 삭제할 수 없습니다.";
				}

				if(msg != ""){
					Ext.Msg.alert('알림', msg);
					return;
				}
				Ext.Msg.confirm('확인', '취소 하시겠습니까?', function(val){
					if(val === 'yes'){
						store.remove(select3);
						store.sync({
							callback:function(){
								master2.getStore().reload();
								master4.getStore().reload();
							}
						})
					}else{
						return;
					}
				})
			})
		}
	},
	updateAction:function(){
		var me		= this,
			master3	= me.pocket.lister.master3(),
			store	= master3.getStore()
		;
		store.sync({
			callback:function(){
				store.reload();
			}
		})
	},
	modifyAction:function(){
		var me = this,
			select3	= me.pocket.lister.master3().getSelectionModel().getSelection()[0],
			select4	= me.pocket.lister.master4().getSelectionModel().getSelection()[0],
			record = Ext.merge(select3.data,select4.data);
		;
		var popup = resource.loadPopup({
			widget : 'module-prodplanmodi-popup',
			params : {
				invc_numb 	: record.invc_numb,
				line_seqn	: record.line_seqn
			}
		});
		popup.down('form').getForm().setValues(record);
		popup.down('form').down('[name=strt_dttm]').setValue(select4.data.plan_strt_dttm);
		popup.down('form').down('[name=endd_dttm]').setValue(select4.data.plan_endd_dttm);
	}
});
