Ext.define('module.custom.iypkg.sale.order.slorlist3.SlorList3', { extend:'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.UserPopup'
	],
	models	: [
		'module.custom.iypkg.sale.order.slorlist3.model.SlorList3Master',
	],
	stores	: [
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master1',
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master2',
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master3',
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master4',
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master5',
		'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master6',
	],
	views	: [
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3Layout',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3Search',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster1',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster2',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster3',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster4',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster5',
		'module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster6',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-slorlist3-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-slorlist3-layout #mainpanel'							: { tabchange : me.selectAction },

			'module-slorlist3-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			'module-slorlist3-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-slorlist3-lister-master3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀
			'module-slorlist3-lister-master4 button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
			'module-slorlist3-lister-master5 button[action=exportAction]'	: { click : me.exportAction5 },	// 엑셀
			'module-slorlist3-lister-master6 button[action=exportAction]'	: { click : me.exportAction6 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-slorlist3-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-slorlist3-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master1')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master2')[0] },
		master3		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master3')[0] },
		master4		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master4')[0] },
		master5		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master5')[0] },
		master6		: function () { return Ext.ComponentQuery.query('module-slorlist3-lister-master6')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
			master3 = me.pocket.master3(),
			master4 = me.pocket.master4(),
			master5 = me.pocket.master5(),
			master6 = me.pocket.master6(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;

		if(param.invc1_date==''||param.invc1_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
		}else if(param.invc1_date > param.invc1_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			if(tindex == 0){
				lister = master1;
			}else if(tindex == 1){
				lister = master2;
			}else if(tindex == 2){
				lister = master3;
			}else if(tindex == 3){
				lister = master4;
			}else if(tindex == 4){
				lister = master5;
			}else if(tindex == 5){
				lister = master6;
			}

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},



	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.master4().writer({enableLoadMask:true});
	},
	exportAction5 : function() {
		this.pocket.master5().writer({enableLoadMask:true});
	},
	exportAction6 : function() {
		this.pocket.master6().writer({enableLoadMask:true});
	}
});