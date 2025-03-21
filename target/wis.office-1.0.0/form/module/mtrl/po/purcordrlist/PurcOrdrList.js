Ext.define('module.mtrl.po.purcordrlist.PurcOrdrList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.OrdrHjsysPopup',
		'lookup.popup.view.OrdrHjsysPopup2',
	],
	models	: [
		'module.mtrl.po.purcordrlist.model.PurcOrdrList'
	],
	stores	: [
		'module.mtrl.po.purcordrlist.store.PurcOrdrList',
		'module.mtrl.po.purcordrlist.store.PurcOrdrList2',
		'module.mtrl.po.purcordrlist.store.PurcOrdrList3',
		'module.mtrl.po.purcordrlist.store.PurcOrdrList4'
	],
	views	: [
		'module.mtrl.po.purcordrlist.view.PurcOrdrListLayout',
		'module.mtrl.po.purcordrlist.view.PurcOrdrListLister1',
		'module.mtrl.po.purcordrlist.view.PurcOrdrListLister2',
		'module.mtrl.po.purcordrlist.view.PurcOrdrListLister3',
		'module.mtrl.po.purcordrlist.view.PurcOrdrListLister4',
		'module.mtrl.po.purcordrlist.view.PurcOrdrListSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-purcordrlist-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-purcordrlist-layout #mainpanel'						: { tabchange : me.selectAction },
			// lister1 event
			'module-purcordrlist-lister1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-purcordrlist-lister2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			// lister3 event
			'module-purcordrlist-lister3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀
			// lister4 event
			'module-purcordrlist-lister4 button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-purcordrlist-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-purcordrlist-search') [0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-purcordrlist-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-purcordrlist-lister2')[0] },
		lister3		: function () { return Ext.ComponentQuery.query('module-purcordrlist-lister3')[0] },
		lister4		: function () { return Ext.ComponentQuery.query('module-purcordrlist-lister4')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(tindex == 0){
			lister = lister1;
		}else if(tindex == 1){
			lister = lister2;
		}else if(tindex == 2){
			lister = lister3;
		}else if(tindex == 3){
			lister = lister4;
		}
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.lister3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.lister4().writer({enableLoadMask:true});
	}
});