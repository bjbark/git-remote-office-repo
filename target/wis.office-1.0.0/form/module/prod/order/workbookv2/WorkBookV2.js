Ext.define('module.prod.order.workbookv2.WorkBookV2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.WkctCvicPopup'
	],

	models : [
		'module.prod.order.workbookv2.model.WorkBookV2',
		'module.prod.order.workbookv2.model.WorkBookV2Detail1',
		'module.prod.order.workbookv2.model.WorkBookV2Detail2',
	],
	stores:[
		'module.prod.order.workbookv2.store.WorkBookV2',
		'module.prod.order.workbookv2.store.WorkBookV2Detail1',
		'module.prod.order.workbookv2.store.WorkBookV2Detail2',
	],
	views : [
		'module.prod.order.workbookv2.view.WorkBookV2Layout',
		'module.prod.order.workbookv2.view.WorkBookV2Search',
		'module.prod.order.workbookv2.view.WorkBookV2Lister',
		'module.prod.order.workbookv2.view.WorkBookV2Detail1',
		'module.prod.order.workbookv2.view.WorkBookV2Detail2',
		'module.prod.order.workbookv2.view.WorkBookV2ModifyPopup',
		'module.prod.order.workbookv2.view.WorkBookV2RemkModifyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workbookv2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-workbookv2-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-workbookv2-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-workbookv2-lister button[action=remkModify]'   : { click : me.remkModify },	// 수정
			'module-workbookv2-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-workbookv2-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-workbookv2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbookv2-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-workbookv2-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-workbookv2-detail1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-workbookv2-detail2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-workbookv2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workbookv2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-workbookv2-lister')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-workbookv2-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-workbookv2-detail2')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister	= me.pocket.lister();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectRecord:function( grid, records ){
		var me = this,
		detail1 = me.pocket.detail1(),
		detail2 = me.pocket.detail2()
		;
		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
	},
	remkModify:function(){
		var me = this,
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			select		= lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-workbookv2-workbookv2remkmodifypopup',
				params : {
					user_memo : select.get('user_memo'),
					work_stdt : select.get('invc_date'),
					invc_numb : select.get('invc_numb')
				}
			});
		}else{
			Ext.Msg.alert('알림','생산일보를 선택해주세요.');
		}
	},
	modifyAction:function() {
		var me			= this,
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			select		= lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-workbookv2-workbookv2modifypopup',
				params : {
					work_eddt : select.get('work_eddt'),
					work_edtm : select.get('work_edtm'),
					work_stdt : select.get('work_stdt'),
					work_sttm : select.get('work_sttm'),
					invc_numb : select.get('invc_numb'),
					wkod_numb : select.get('wkod_numb'),
					wkod_seqn : select.get('wkod_seqn'),
					prog_stat_dvcd : select.get('prog_stat_dvcd')
				}
			});
		}else{
			Ext.Msg.alert('알림','생산일보를 선택해주세요.');
		}
	},
	selectDetail : function(grid, record) {
		var me = this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			select  = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if (select) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail1.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : select.get('invc_numb') });

			detail2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : select.get('invc_numb') });
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},
	exportAction1 : function(){
		this.pocket.detail1().writer({enableLoadMask:true});
	},
	exportAction2 : function(){
		this.pocket.detail2().writer({enableLoadMask:true});
	}
});