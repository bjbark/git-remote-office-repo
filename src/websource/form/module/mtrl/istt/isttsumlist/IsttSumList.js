Ext.define('module.mtrl.istt.isttsumlist.IsttSumList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.mtrl.istt.isttsumlist.model.IsttSumListLister',
		'module.mtrl.istt.isttsumlist.model.IsttSumListMaster',
	],
	stores	: [
		'module.mtrl.istt.isttsumlist.store.IsttSumListLister',
		'module.mtrl.istt.isttsumlist.store.IsttSumListMaster',
	],
	views	: [
		'module.mtrl.istt.isttsumlist.view.IsttSumListLayout',
		'module.mtrl.istt.isttsumlist.view.IsttSumListListerMaster',
		'module.mtrl.istt.isttsumlist.view.IsttSumListLister',
		'module.mtrl.istt.isttsumlist.view.IsttSumListSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-isttsumlist-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-isttsumlist-layout button[action=selectAction]'			: { click : me.selectAction	},		// 조회
			// lister master event
			'module-isttsumlist-lister button[action=exportAction]'			: { click : me.exportAction1},		// 엑셀

			// lister detail event
			'module-isttsumlist-lister-master button[action=exportAction]'	: { click : me.exportAction2},		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-isttsumlist-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-isttsumlist-search')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-isttsumlist-lister')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-isttsumlist-lister-master')[0] },
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;

		switch (index) {
			case 1: {
				me.selectAction();
			};
			default : {
			}
		};
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			listermaster = me.pocket.listermaster(),
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(param.invc_date1 == '' && param.invc_date2 == ''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}
		if(param.invc_date1 != '' && param.invc_date2 != '') {
			if (param.invc_date1 > param.invc_date2){
				Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
				return;
			}
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(tindex == 0){
			lister = lister;
		}else if(tindex == 1){
			lister = listermaster;
		}

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},
});