Ext.define('module.custom.iypkg.prod.worklist4.WorkList4', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.IypkgOrdrPopup',
	],
	models	: [
		'module.custom.iypkg.prod.worklist4.model.WorkList4',
		'module.custom.iypkg.prod.worklist4.model.WorkList4Lister2',
	],
	stores	: [
		'module.custom.iypkg.prod.worklist4.store.WorkList4',
		'module.custom.iypkg.prod.worklist4.store.WorkList4Lister2',
		'module.custom.iypkg.prod.worklist4.store.WorkList4Lister3',
	],
	views	: [
		'module.custom.iypkg.prod.worklist4.view.WorkList4Layout',
		'module.custom.iypkg.prod.worklist4.view.WorkList4Search',
		'module.custom.iypkg.prod.worklist4.view.WorkList4Lister',
		'module.custom.iypkg.prod.worklist4.view.WorkList4Lister2',
		'module.custom.iypkg.prod.worklist4.view.WorkList4Lister3',
		'module.custom.iypkg.prod.worklist4.view.WorkList4Lister4',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-worklist4-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-worklist4-layout button[action=selectAction]'			: { click : me.selectAction		},

			'module-worklist4-lister button[action=exportAction]'			: { click : me.exportAction		},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-worklist4-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-worklist4-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-worklist4-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-worklist4-lister2')[0] },
		lister3	: function () { return Ext.ComponentQuery.query('module-worklist4-lister3')[0] },
		lister4	: function () { return Ext.ComponentQuery.query('module-worklist4-lister4')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2= me.pocket.lister2(),
			lister3= me.pocket.lister3(),
			lister4= me.pocket.lister4(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(tindex==0){
			search.down('[name=invc_date1]').setFieldLabel('발주일자');
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '발주'}) );

		}else if(tindex==1){
			search.down('[name=invc_date1]').setFieldLabel('입고일자');
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '입고'}) );

		}else if(tindex==2){
			search.down('[name=invc_date1]').setFieldLabel('발주일자');
			lister3.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '발주'}) );

		}else if(tindex==3){
			search.down('[name=invc_date1]').setFieldLabel('입고일자');

		}
	},


	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

