Ext.define('module.stock.isos.prodosttwait.ProdOsttWait', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.isos.prodosttwait.model.ProdOsttWaitMaster',
		'module.stock.isos.prodosttwait.model.ProdOsttWaitDetail'
	],
	stores	: [
		'module.stock.isos.prodosttwait.store.ProdOsttWaitMaster',
		'module.stock.isos.prodosttwait.store.ProdOsttWaitDetail'
	],
	views	: [
		'module.stock.isos.prodosttwait.view.ProdOsttWaitLayout',
		'module.stock.isos.prodosttwait.view.ProdOsttWaitListerMaster',
		'module.stock.isos.prodosttwait.view.ProdOsttWaitListerDetail',
		'module.stock.isos.prodosttwait.view.ProdOsttWaitSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodosttwait-layout button[action=selectAction]'		: { click : me.selectAction				},		// 조회

			'module-prodosttwait-lister-detail button[action=exportAction]'	: { click : me.exportDetailAction		},		// 엑셀
			'module-prodosttwait-lister-master button[action=exportAction]'	: { click : me.exportAction				},		// 엑셀

			'module-prodosttwait-lister-master' : {
				itemdblclick    : me.selectLister ,
				selectionchange : me.attachRecord
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout		 : function () { return Ext.ComponentQuery.query('module-prodosttwait-layout') [0] },
		search		 : function () { return Ext.ComponentQuery.query('module-prodosttwait-search') [0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-prodosttwait-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-prodosttwait-lister-detail')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			master  = me.pocket.listermaster(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(param.work_strt_dttm1>param.work_strt_dttm2) {
			Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			master.select({
				callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	selectLister:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster(),
			detail = me.pocket.listerdetail(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}

				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail = me.pocket.listerdetail()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);

	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});