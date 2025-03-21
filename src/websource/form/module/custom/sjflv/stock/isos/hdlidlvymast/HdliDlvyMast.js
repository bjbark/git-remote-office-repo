Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.HdliDlvyMast', { extend:'Axt.app.Controller',

	requires : [

	],
	models : [
	    'module.custom.sjflv.stock.isos.hdlidlvymast.model.HdliDlvyMast',
	],
	stores : [
	    'module.custom.sjflv.stock.isos.hdlidlvymast.store.HdliDlvyMast',
	],
	views : [
		'module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastLayout',
		'module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastSearch',
		'module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event.
			'module-hdlidlvymast-layout #mainpanel'					 : { tabchange : me.selectAction	},
			'module-hdlidlvymast-layout button[action=selectAction]' : { click : me.selectAction 		},	// 조회
			// lister event
			'module-hdlidlvymast-lister button[action=exportAction]' : { click : me.exportAction 		},	// 엑셀

		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-hdlidlvymast-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-hdlidlvymast-search')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-hdlidlvymast-lister')[0] },
	},

	//조회//
	selectAction : function() {
		var me = this,
			lister  = me.pocket.lister(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel')
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},
});