Ext.define('module.sale.order.slorlist5.SlorList5', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.sale.order.slorlist5.model.SlorList5Master1',
		'module.sale.order.slorlist5.model.SlorList5Master2',
	],
	stores	: [
		'module.sale.order.slorlist5.store.SlorList5Master1',
		'module.sale.order.slorlist5.store.SlorList5Master2',
	],
	views	: [
		'module.sale.order.slorlist5.view.SlorList5Layout',
		'module.sale.order.slorlist5.view.SlorList5ListerMaster1',
		'module.sale.order.slorlist5.view.SlorList5ListerMaster2',
		'module.sale.order.slorlist5.view.SlorList5Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-slorlist5-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-slorlist5-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister1 event
			'module-slorlist5-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-slorlist5-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-slorlist5-lister-master1' : {
				itemdblclick : me.selectDetail1 ,
				selectionchange : me.attachRecord
			},
			'module-slorlist5-lister-master2' : {
				itemdblclick : me.selectDetail2 ,
				selectionchange : me.attachRecord
			},
			//detail event
			'module-slorlist5-lister-detail button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-slorlist5-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-slorlist5-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-slorlist5-lister-master1')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-slorlist5-lister-master2')[0] },
	},

	//조회

	selectAction:function() {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
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
			}
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}) );
		}
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		master2= smodel ? smodel.view.ownerCt : me.pocket.master2(),
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master2.getSelectionModel().getSelection()[0]
		;
		if (record) {
		}
	},

	//선택


	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	}
});