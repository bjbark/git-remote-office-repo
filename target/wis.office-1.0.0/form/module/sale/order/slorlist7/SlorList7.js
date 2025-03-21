Ext.define('module.sale.order.slorlist7.SlorList7', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.sale.order.slorlist7.model.SlorList5Master1',
	],
	stores	: [
		'module.sale.order.slorlist7.store.SlorList7Master1',
	],
	views	: [
		'module.sale.order.slorlist7.view.SlorList7Layout',
		'module.sale.order.slorlist7.view.SlorList7ListerMaster1',
		'module.sale.order.slorlist7.view.SlorList7WorkerSearch',
		'module.sale.order.slorlist7.view.SlorList7Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-slorlist7-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-slorlist7-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister1 event
			'module-slorlist7-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-slorlist7-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-slorlist7-lister-master1' : {
				itemdblclick : me.selectDetail1 ,
				selectionchange : me.attachRecord
			},
			//detail event
			'module-slorlist7-lister-detail button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-slorlist7-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-slorlist7-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-slorlist7-lister-master1')[0] },
		worker		: function () { return Ext.ComponentQuery.query('module-slorlist7-worker-search')[0] },
	},

	//조회

	selectAction:function() {
		var me = this,
			search = me.pocket.search(),
			worker = me.pocket.worker(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.master1()
		;

		invc1_date  = param.invc1_date;
		invc2_date  = param.invc2_date;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}) );

		console.log()

		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/order/slorlist7/get/search2.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc1_date		: invc1_date,
					invc2_date		: invc2_date,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					console.log()
					worker.down('[name=count]').setValue(result.records[0].count);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0]
		;

	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
});