 Ext.define('module.custom.iypkg.sale.sale.dailysalelist.DailySaleList', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.iypkg.sale.sale.dailysalelist.model.DailySaleList'
	],
	stores	: [
		'module.custom.iypkg.sale.sale.dailysalelist.store.DailySaleList'
	],
	views	: [
		'module.custom.iypkg.sale.sale.dailysalelist.view.DailySaleListLayout',
		'module.custom.iypkg.sale.sale.dailysalelist.view.DailySaleListSearch',
		'module.custom.iypkg.sale.sale.dailysalelist.view.DailySaleListLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-dailysalelist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-dailysalelist-layout button[action=exportAction]' : { click : me.exportAction },	// 조회

			'module-dailysalelist-lister button[action=printAction]' : { click : me.printAction }, 		/* 매출일보 */

		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-dailysalelist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dailysalelist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-dailysalelist-lister')[0] }
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

	printAction:function(){
		var	me      = this,
			search  = me.pocket.search(),
			records = search.getValues()
		;
		var	msg   = '',
			jrf   = 'Liebe_saleList.jrf',
			resId = _global.hq_id.toUpperCase(),
			chk   = ''
		;
		if(records.invc_date1==''){
			msg = '조회기간을 입력해주세요.';
		}else if(records.invc_date2==''){
			msg = '조회기간을 입력해주세요.';
		}

		if(records.chk==''){
			chk = '[0]';
		}else{
			chk = records.chk;
		}
		if(msg != ''){
			Ext.Msg.alert('알림',msg);
			return;
		}
		var arg =	  'invc_date1~'+records.invc_date1+'~'
					+ 'invc_date2~'+records.invc_date2+'~'
					+ 'chk~'       +chk+'~'
		;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});