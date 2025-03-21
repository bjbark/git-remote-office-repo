Ext.define('module.stock.isos.goodsosttlist.GoodsOsttList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup'

	],
	models	: [
		'module.stock.isos.goodsosttlist.model.GoodsOsttListMaster1',
	],
	stores	: [
		'module.stock.isos.goodsosttlist.store.GoodsOsttListMaster1',
		'module.stock.isos.goodsosttlist.store.GoodsOsttListMaster2',
		'module.stock.isos.goodsosttlist.store.GoodsOsttListMaster3',
		'module.stock.isos.goodsosttlist.store.GoodsOsttListMaster4',
	],
	views	: [
		'module.stock.isos.goodsosttlist.view.GoodsOsttListLayout',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListListerMaster1',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListListerMaster2',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListListerMaster3',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListListerMaster4',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListWorkerSearch',
		'module.stock.isos.goodsosttlist.view.GoodsOsttListSearch',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsosttlist-layout #mainpanel'					: { tabchange : me.selectAction	},
			'module-goodsosttlist-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister1 event
			'module-goodsosttlist-lister-master1 button[action=printAction]' : { click : me.printAction }, 		/* 매출일보 */
			'module-goodsosttlist-lister-master1 button[action=exportAction]': { click : me.exportAction1	},		// 엑셀
			// lister2 event
			'module-goodsosttlist-lister-master2 button[action=exportAction]': { click : me.exportAction2	},		// 엑셀
			// lister3 event
			'module-goodsosttlist-lister-master3 button[action=exportAction]': { click : me.exportAction3	},		// 엑셀
			// lister4 event
			'module-goodsosttlist-lister-master4 button[action=exportAction]': { click : me.exportAction4	},		// 엑셀


		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-goodsosttlist-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-goodsosttlist-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-goodsosttlist-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-goodsosttlist-lister-master2')[0] },
		listermaster3	: function () { return Ext.ComponentQuery.query('module-goodsosttlist-lister-master3')[0] },
		listermaster4	: function () { return Ext.ComponentQuery.query('module-goodsosttlist-lister-master4')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-goodsosttlist-worker-search')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master1 = me.pocket.listermaster1(),
			master2 = me.pocket.listermaster2(),
			master3 = me.pocket.listermaster3(),
			master4 = me.pocket.listermaster4(),
			workersearch = me.pocket.workersearch(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			param2 = workersearch.getValues()
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if ( tindex == 0 ) {
			master1.select({
				callback:function(records, operation, success) {
					if (success) {
						master1.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}));
		} else if ( tindex == 1 ) {
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
						master2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}));
		} else if ( tindex == 2 ) {
			master3.select({
				callback:function(records, operation, success) {
					if (success) {
						master3.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}));
		} else if ( tindex == 3 ) {
			master4.select({
				callback:function(records, operation, success) {
					if (success) {
						master4.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( {invc_date : param2.invc_date , stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}));
		}
	},

	printAction: function(){
		var me = this,
		search	= me.pocket.search(),
		param   = search.getValues(),
		jrf	    = 'sjflv_slorlist4_list.jrf',
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
		console.log(param.invc_date1);
		console.log(param.invc_date2);
			var err_msg = "";
			var arg =
			'~invc_date1~'+param.invc_date1
			+'~invc_date2~'+param.invc_date2
			+'~invc_date3~'+param.invc_date1
			+'~invc_date4~'+param.invc_date2
			+'~invc_numb1~'+param.invc_numb
			+'~item_idcd~'+param.item_idcd
			+'~item_idcd1~'+param.item_idcd
			+'~line_stat~'+param.line_stat
			+'~line_stat1~'+param.line_stat
			+'~wrhs_idcd~'+param.wrhs_idcd
			+'~wrhs_idcd1~'+param.wrhs_idcd
			+'~acpt_numb~'+param.invc_numb
			+'~cstm_idcd~'+param.cstm_idcd
			+'~cstm_idcd1~'+param.cstm_idcd
			+'~deli_date1~'+param.deli_date1
			+'~deli_date2~'+param.deli_date2
			+'~deli_date3~'+param.deli_date1
			+'~deli_date4~'+param.deli_date2
			+'~acpt_dvcd~'+param.acpt_dvcd
			+'~acpt_dvcd1~'+param.acpt_dvcd
			+'~find_name~'+param.find_name
			+'~find_name1~'+param.find_name1
			+'~chk~'+param.chk;

//			var _param = '_param~{\'invc_date1\':\''+param.invc_date1.replace(/\-/g,'')+'\',\'invc_date2\':\''+param.invc_date2.replace(/\-/g,'')+'\',\'cstm_idcd1\':\''+param.cstm_idcd1.replace(/\-/g,'')+'\',\'acct_bacd\':\''+param.acct_bacd.replace(/\-/g,'')+'\',\'istt_wrhs_idcd1\':\''+param.istt_wrhs_idcd1.replace(/\-/g,'')+'\',\'item_name1\':\''+param.item_name1.replace(/\-/g,'')+'\',\'chk\':\''+param.chk+'\'}~';
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+_param+'\",\"resId\" : \"'+resId+'\"}';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
		},
	/**
	 * 확인 버튼 이벤트
	 */
//	previewAction: function(){
//		var me = this,
//		search	= me.pocket.search(),
//		param   = search.getValues(),
//		jrf	    = 'sjflv_slorlist4_list.jrf',
//		resId   = _global.hq_id.toUpperCase()
//		;
//			var err_msg = "";
////			var arg = 'invc_date1~'+param.invc_date1+'~invc_date2~'+param.invc_date2+'~cstm_idcd1~'+param.cstm_idcd+'~acct_bacd~'+param.acct_bacd+'~istt_wrhs_idcd1~'+param.istt_wrhs_idcd1+'~item_name1~'+param.item_name1;
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
//			return win;
//		},

	// 엑셀
	exportAction1: function(button) {
		var value = button.button ;
		this.pocket.listermaster1().excelExport();
	},

	exportAction2 : function(button) {
		var value = button.button ;
		this.pocket.listermaster2().excelExport();
	},

	exportAction3 : function(button) {
		var value = button.button ;
		this.pocket.listermaster3().excelExport();
	},

	exportAction4 : function(button) {
		var value = button.button ;
		this.pocket.listermaster4().excelExport();
	},
});