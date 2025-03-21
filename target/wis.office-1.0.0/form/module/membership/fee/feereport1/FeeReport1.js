Ext.define('module.membership.fee.feereport1.FeeReport1', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
	 	'module.membership.fee.feereport1.model.FeeReport1Master',
		'module.membership.fee.feereport1.model.FeeReport1Detail'
	],
	stores:
	[
		'module.membership.fee.feereport1.store.FeeReport1Master',
		'module.membership.fee.feereport1.store.FeeReport1Detail'
	],
	views:
	[
		'module.membership.fee.feereport1.view.FeeReport1Layout',
		'module.membership.fee.feereport1.view.FeeReport1Search',
		'module.membership.fee.feereport1.view.FeeReport1ListerMaster',
		'module.membership.fee.feereport1.view.FeeReport1ListerDetail'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-feereport1-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-feereport1-lister-master button[action=exportAction]' : { click : me.exportMasterAction },// 엑셀
			'module-feereport1-lister-detail button[action=exportAction]' : { click : me.exportDetailAction },// 엑셀
			'module-feereport1-lister-master' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-feereport1-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-feereport1-search')[0] },
		listerMaster : function () { return Ext.ComponentQuery.query('module-feereport1-lister-master')[0] },
		listerDetail : function () { return Ext.ComponentQuery.query('module-feereport1-lister-detail')[0] },
	},


	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.listerMaster(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
					me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	//선택
	selectRecord:function( grid, record ){
		var me = this,
			crctlister = me.pocket.listerDetail(),
			param  = me.pocket.search().getValues();
		;

		if(record.length > 0){
			if(record[0].get('acce_date')){
				crctlister.select({
					callback:function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , acce_date : record[0].get('acce_date').replace(/-/gi,"")}) );
			}else{
				crctlister.getStore().clearData();
				crctlister.getStore().loadData([],false);
			}
//			editor.selectRecord({ mngtlister : me.pocket.mngtlister(), record : record }, me);
		}
	},


	//엑셀
	exportMasterAction : function(){
		this.pocket.listerMaster().writer({enableLoadMask:true});
	},
	//엑셀
	exportDetailAction : function(){
		this.pocket.listerDetail().writer({enableLoadMask:true});
	}
});
