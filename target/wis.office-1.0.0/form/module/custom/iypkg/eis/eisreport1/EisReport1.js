Ext.define('module.custom.iypkg.eis.eisreport1.EisReport1', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.MoldPopup',
//		'lookup.popup.view.WkctCvicPopup'
	],

	models : [
		'module.custom.iypkg.eis.eisreport1.model.EisReport1Master',
		'module.custom.iypkg.eis.eisreport1.model.EisReport1Detail3',
		'module.custom.iypkg.eis.eisreport1.model.EisReport1Detail4',
		'module.custom.iypkg.eis.eisreport1.model.EisReport1Detail5',
	],
	stores:[
		'module.custom.iypkg.eis.eisreport1.store.EisReport1Master',
		'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail3',
		'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail4',
		'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail5',
	],
	views : [
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Layout',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Search',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Master',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Editor',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Detail3',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Detail4',
		'module.custom.iypkg.eis.eisreport1.view.EisReport1Detail5'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport1-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-eisreport1-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-eisreport1-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-eisreport1-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-eisreport1-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-eisreport1-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-eisreport1-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-eisreport1-master' : {
				itemdblclick : me.selectRecord ,
				selectionchange : me.attachRecord

			},
			'module-eisreport1-detail1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-eisreport1-detail2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-eisreport1-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-eisreport1-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-eisreport1-master')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-eisreport1-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-eisreport1-lister')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-eisreport1-detail3')[0] },
		detail4 : function () { return Ext.ComponentQuery.query('module-eisreport1-detail4')[0] },

	},


	//조회
	selectAction:function(callbackFn) {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			master.select({
				 callback:function(records, operation, success) {
					if (success) {
						mask.show();
						master.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			master = me.pocket.master(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			store  = detail3.getStore(),
			editor = me.pocket.editor()
		;


		if (record){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			editor.getForm().reset();

			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);

			detail4.getStore().clearData();
			detail4.getStore().loadData([],false);

			detail3.select({
				callback:function(records, operation, success) {
//					resource.mask.hide();
					if (success) {
					} else { }
					mask.hide();
					}, scope:me
			}, { invc_numb : record.get('invc_numb') });
			detail4.select({
					 callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
					}, { invc_numb : record.get('invc_numb') });

			editor.loadRecord(record);
				}

	},

	attachRecord:function( grid, records ){
		var me = this,
		detail3 = me.pocket.detail3(),
		detail4 = me.pocket.detail4()
		;
		detail3.getStore().clearData();
		detail3.getStore().loadData([],false);

		detail4.getStore().clearData();
		detail4.getStore().loadData([],false);
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