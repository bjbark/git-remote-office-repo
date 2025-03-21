Ext.define('module.custom.sjflv.sale.sale.salearlist.SaleArList', { extend:'Axt.app.Controller',

	requires:[
			'lookup.popup.view.BzplPopup',
			'lookup.popup.view.ItemPopup',
			'lookup.popup.view.UserPopup',
			'lookup.popup.view.CstmPopup',
		],

	models	: [
		'module.custom.sjflv.sale.sale.salearlist.model.SaleArList',
		'module.custom.sjflv.sale.sale.salearlist.model.SaleArListLister'
	],
	stores	: [
		'module.custom.sjflv.sale.sale.salearlist.store.SaleArList',
		'module.custom.sjflv.sale.sale.salearlist.store.SaleArListLister'
	],
	views	: [
		'module.custom.sjflv.sale.sale.salearlist.view.SaleArListLayout',
		'module.custom.sjflv.sale.sale.salearlist.view.SaleArListSearch',
		'module.custom.sjflv.sale.sale.salearlist.view.SaleArListLister',
		'module.custom.sjflv.sale.sale.salearlist.view.SaleArListLister2',
		'module.custom.sjflv.sale.sale.salearlist.view.SaleArListWorkerSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salearlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-salearlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

			'module-salearlist-lister' : {
				selectionchange    : me.selectDetail,				
			},

			'module-salearlist-worker-search button[action=selectAction2]' 	: { click : me.selectAction2 },	// 조회
			'module-salearlist-lister2 button[action=printAction]' 			: { click : me.printAction },	// 원장발행
			'module-salearlist-lister2 button[action=exportAction]' 		: { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salearlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salearlist-search')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-salearlist-worker-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-salearlist-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salearlist-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-salearlist-lister2')[0] }
	},

	// 조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues(),
			workersearch = me.pocket.workersearch()
		;

		if (Ext.isEmpty(param.invc_date1) || Ext.isEmpty(param.invc_date2)) {
			Ext.Msg.alert(Const.NOTICE, "기준일자를 입력 후 조회하세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					//lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		workersearch.down('[name=cstm_name]').setValue(null);
		workersearch.down('[name=buss_numb]').setValue(null);
		workersearch.down('[name=boss_name]').setValue(null);
		workersearch.down('[name=tele_numb]').setValue(null);
		workersearch.down('[name=mail_addr]').setValue(null);
		workersearch.down('[name=cstm_addr]').setValue(null);
	},

	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2(),
			search  = me.pocket.search(),
			param2  = search.getValues(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues()			
		;		

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

		if (record[0]) {
			workersearch.down('[name=cstm_name]').setValue(record[0].get('cstm_name'));
			workersearch.down('[name=buss_numb]').setValue(record[0].get('buss_numb'));
			workersearch.down('[name=boss_name]').setValue(record[0].get('boss_name'));
			workersearch.down('[name=tele_numb]').setValue(record[0].get('tele_numb'));
			workersearch.down('[name=mail_addr]').setValue(record[0].get('mail_addr'));
			workersearch.down('[name=cstm_addr]').setValue(record[0].get('cstm_addr'));
		
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { cstm_idcd : record[0].get('cstm_idcd') , invc_date1 : param2.invc_date1 , invc_date2 : param2.invc_date2 });
		}
	},
	
	// selectDetail에 추가 
	/*selectRecord:function( grid, records ){
		var me = this,
			lister2 = me.pocket.lister2()
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);
	},*/

	// 거래명세서 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues(),
			search = me.pocket.search(),
			param2  = search.getValues()
		;

		select	= lister.getSelectionModel().getSelection();
		if (select.length != 1) {
			Ext.Msg.alert(Const.NOTICE, "매출처 원장에서 거래처를 선택 후 조회하세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister2.select({
			 callback : function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope : me
		}, { cstm_idcd : select[0].get('cstm_idcd') , invc_date1 : param2.invc_date1 , invc_date2 : param2.invc_date2 });
	},
	
	// 원장 발행
	printAction:function() {		
		var me = this,
			master = me.pocket.lister(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'sjung_saleAr_list.jrf',			
			resId =_global.hq_id.toUpperCase(),
			search = me.pocket.search(),
			param2  = search.getValues()
		;
		
		if (!select || select.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}	
		
		var cstm_idcd = select[0].get('cstm_idcd');		
		var invc_date1 = param2.invc_date1;
		var invc_date2 = param2.invc_date2;
		
		var arg =	'cstm_idcd~'+cstm_idcd+'~'+'invc_date1~'+invc_date1+'~'+'invc_date2~'+invc_date2+'~';
		
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});