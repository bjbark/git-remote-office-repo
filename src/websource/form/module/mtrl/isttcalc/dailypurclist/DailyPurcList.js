Ext.define('module.mtrl.isttcalc.dailypurclist.DailyPurcList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopupV4',
	],
	models	: [
		'module.mtrl.isttcalc.dailypurclist.model.DailyPurcList',
	],
	stores	: [
		'module.mtrl.isttcalc.dailypurclist.store.DailyPurcList',
		'module.mtrl.isttcalc.dailypurclist.store.DailyPurcList2',
		'module.mtrl.isttcalc.dailypurclist.store.DailyPurcList3',
	],
	views	: [
		'module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLayout',
		'module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLister',
		'module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLister2',
		'module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLister3',
		'module.mtrl.isttcalc.dailypurclist.view.DailyPurcListSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-dailypurclist-layout #mainpanel'				  : { tabchange : me.selectAction },

			'module-dailypurclist-layout button[action=selectAction]' : { click : me.selectAction },

			'module-dailypurclist-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-dailypurclist-lister button[action=insertAction]' : { click : me.insertAction },
			'module-dailypurclist-lister button[action=exportAction]' : { click : me.exportAction },
			'module-dailypurclist-lister button[action=previewAction]'	: { click : me.previewAction },// 납기일별 미리보기 후 출력
			'module-dailypurclist-lister2 button[action=exportAction]' : { click : me.exportAction2 },
			'module-dailypurclist-lister3 button[action=exportAction]' : { click : me.exportAction3 },
			'module-dailypurclist-lister button[action=deleteAction]' : { click : me.deleteAction },

//			'module-dailypurclist-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-dailypurclist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-dailypurclist-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister2')[0] },
		lister3	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister3')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex==0) {
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
	//				lister.getSelectionModel().select(0);
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else if(tindex == 1) {
			lister2.select({
				callback:function(records, operation, success) {
				if (success) {
	//				lister2.getSelectionModel().select(0);
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else if(tindex == 2) {
			lister3.select({
				callback:function(records, operation, success) {
				if (success) {
	//				lister3.getSelectionModel().select(0);
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	previewAction: function(){
		var me = this,
		search	= me.pocket.search(),
		param   = search.getValues(),
		jrf	    = 'sjflv_slorlist3_list.jrf',
		chk   = '',
		resId   = _global.hq_id.toUpperCase()
		;
		var msg = '';

		if(param.chk==''){
			chk = '[0]';
		}else{
			chk = param.chk;
		}
		if(msg != ''){
			Ext.Msg.alert('알림',msg);
			return;
		}
			var err_msg = "";
			var arg = 'invc_date1~'+param.invc_date1+'~invc_date2~'+param.invc_date2+'~cstm_idcd~'+param.cstm_idcd1+'~acct_bacd~'+param.acct_bacd+'~istt_wrhs_idcd~'+param.istt_wrhs_idcd1+'~item_idcd~'+param.item_idcd+'~chk~'+param.chk;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
		},

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().excelExport();
	},

	exportAction2 : function(button){
		var value = button.button ;
		this.pocket.lister2().excelExport();
	},

	exportAction3 : function(button){
		var value = button.button ;
		this.pocket.lister3().excelExport();
	}
});