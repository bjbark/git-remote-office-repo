Ext.define('module.sale.sale.salearlist2.SaleArList2', { extend:'Axt.app.Controller',

	requires	: [
				'lookup.popup.view.BzplPopup',
				'lookup.popup.view.ItemPopup',
				'lookup.popup.view.UserPopup'
			],
	models	: ['module.sale.sale.salearlist2.model.SaleArList2'],
	stores	: [
				'module.sale.sale.salearlist2.store.SaleArList2Lister',
				'module.sale.sale.salearlist2.store.SaleArList2Lister2'
			],
	views	: [
		'module.sale.sale.salearlist2.view.SaleArList2Layout',
		'module.sale.sale.salearlist2.view.SaleArList2Search',
		'module.sale.sale.salearlist2.view.SaleArList2Lister',
		'module.sale.sale.salearlist2.view.SaleArList2Lister2'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salearlist2-layout #mainpanel'					 : { tabchange : me.selectAction		},
			'module-salearlist2-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			'module-salearlist2-lister button[action=exportAction]'  : { click : me.exportAction },	// 엑셀
			'module-salearlist2-lister2 button[action=exportAction]' : { click : me.export2Action },	// 엑셀
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salearlist2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salearlist2-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-salearlist2-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salearlist2-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-salearlist2-lister2')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			param = search.getValues(),
			temp = '',
			master = undefined
		;

		if(tindex==0){
			me.pocket.search().down('[name=bzpl_name]' ).hide();
			me.pocket.search().down('[name=item_name]' ).hide();
			me.pocket.search().down('[name=drtr_name]' ).hide();

			master = lister;
			temp = 'query';
		}else{
			me.pocket.search().down('[name=bzpl_name]' ).show();
			me.pocket.search().down('[name=item_name]' ).show();
			me.pocket.search().down('[name=drtr_name]' ).show();

			master = lister2;
			temp = 'entry';
		}

		if(param.invc_date1 == ''|| param.invc_date2 == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
			return;
		}else if(param.invc_date1>param.invc_date2) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(tindex==0){
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
		}else if(tindex==1){
			mask.show();
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	//엑셀
	export2Action : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});