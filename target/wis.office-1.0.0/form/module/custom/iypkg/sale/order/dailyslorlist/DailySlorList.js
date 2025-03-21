 Ext.define('module.custom.iypkg.sale.order.dailyslorlist.DailySlorList', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.iypkg.sale.order.dailyslorlist.model.DailySlorList'
	],
	stores	: [
		'module.custom.iypkg.sale.order.dailyslorlist.store.DailySlorList'
	],
	views	: [
		'module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListLayout',
		'module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListSearch',
		'module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-dailyslorlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-dailyslorlist-layout button[action=exportAction]' : { click : me.exportAction },	// 엑셀


			'module-dailyslorlist-lister button[action=printAction]' : { click : me.printAction },	// 수주일보발행

		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-dailyslorlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dailyslorlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-dailyslorlist-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	// 수주일보 발행
	printAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			search = me.pocket.search(),
			jrf		= 'Liebe_dailyslorlist.jrf',
			resId	= _global.hq_id.toUpperCase(),
			param	= search.getValues()
		;

		var _param = '_param~{\'to_invc_date\':\''+param.to_invc_date.replace(/\-/g,'')+'\',\'fr_invc_date\':\''+param.fr_invc_date.replace(/\-/g,'')+'\',\'chk\':\''+param.chk+'\'}~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+_param+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
	},


	//엑셀
	exportAction : function(){
		var me = this
		;
		this.pocket.lister().excelExport();
	}
});