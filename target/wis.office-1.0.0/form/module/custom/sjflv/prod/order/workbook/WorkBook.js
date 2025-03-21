Ext.define('module.custom.sjflv.prod.order.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkctCvicPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.LottPopupSjflv',
		'lookup.popup.view.UserPopup',
	],

	models:['module.custom.sjflv.prod.order.workbook.model.WorkBook',
			 ],
	stores:['module.custom.sjflv.prod.order.workbook.store.WorkBook',
			],
	views:
	[
		'module.custom.sjflv.prod.order.workbook.view.WorkBookLayout',
		'module.custom.sjflv.prod.order.workbook.view.WorkBookSearch',
		'module.custom.sjflv.prod.order.workbook.view.WorkBookLister',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryStartFirstPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryStartSecondPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryStartThirdPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryStartLastPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryEndPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryMtrlPopup',
		'module.custom.sjflv.prod.order.workbook.view.WorkEntryStartMtrlPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-workbook-layout button[action=selectAction]'	: { click : me.selectAction	},	// 조회
			'module-sjflv-workbook-lister button[action=labelAction]'	: { click : me.labelAction	},	// 라벨발행
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-sjflv-workbook-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sjflv-workbook-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-sjflv-workbook-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister	= me.pocket.lister();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id, lgin_id : _global.login_pk}) );
	},

	labelAction: function(){
		var me = this,
		search	= me.pocket.search(),
		param   = search.getValues(),
		jrf	    = 'sjflv_label2.jrf',
		resId   = _global.hq_id.toUpperCase(),
		selection	= me.pocket.lister().getSelectionModel().getSelection()[0],
		item_idcd = selection.get('item_idcd'),
		arg =	'_param~'+item_idcd+'~',
		url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
		;

		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
	},
});
