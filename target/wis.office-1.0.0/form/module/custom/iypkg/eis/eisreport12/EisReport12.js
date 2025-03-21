Ext.define('module.custom.iypkg.eis.eisreport12.EisReport12', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport12.model.EisReport121',
		'module.custom.iypkg.eis.eisreport12.model.EisReport122',
		'module.custom.iypkg.eis.eisreport12.model.EisReport12Detail1',
		'module.custom.iypkg.eis.eisreport12.model.EisReport12Detail2',
		'module.custom.iypkg.eis.eisreport12.model.EisReport12Chart1',
		'module.custom.iypkg.eis.eisreport12.model.EisReport12Chart2',
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport12.store.EisReport121',
		'module.custom.iypkg.eis.eisreport12.store.EisReport122',
		'module.custom.iypkg.eis.eisreport12.store.EisReport12Detail1',
		'module.custom.iypkg.eis.eisreport12.store.EisReport12Detail2',
		'module.custom.iypkg.eis.eisreport12.store.EisReport12Chart1',
		'module.custom.iypkg.eis.eisreport12.store.EisReport12Chart2',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Layout',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Lister1',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Lister2',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Chart1',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Chart2',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Detail1',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Detail2',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Search',
		'module.custom.iypkg.eis.eisreport12.view.EisReport12Search1',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport12-layout button[action=selectAction]'  : { click : me.selectAction },		// 조회
			'module-eisreport12-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
			// lister event
			'module-eisreport12-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-eisreport12-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
			// detail event
			'module-eisreport12-detail1 button[action=exportAction]' : { click : me.exportAction11 },	// 엑셀
			'module-eisreport12-detail2 button[action=exportAction]' : { click : me.exportAction22 },	// 엑셀

			// 클릭이벤트
			'module-eisreport12-lister1' :	{
				selectionchange	: me.selectRecord1
			},

			'module-eisreport12-lister2' :	{
				selectionchange	: me.selectRecord2
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport12-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport12-search') [0] },
		search1	: function () { return Ext.ComponentQuery.query('module-eisreport12-search1') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-eisreport12-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-eisreport12-lister2')[0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-eisreport12-detail1')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-eisreport12-detail2')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-eisreport12-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-eisreport12-chart2') [0] }
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			search1 = me.pocket.search1(),
			param1 = search1.getValues(),
			lister1 = me.pocket.lister1(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			lister2 = me.pocket.lister2(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport12.store.EisReport12Chart1'),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport12.store.EisReport12Chart2'),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.plan_year=='' || param.plan_year==null){
			Ext.Msg.alert("알림","계획년도를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

			if(tindex == 0){
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );

			}else if(tindex == 1){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id
							, vatx_rate : param1.vatx_rate}) );
			}
		}

		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		// 차트 리셋
		chart1.clearData();
		chart1.loadData([],false);

		chart2.clearData();
		chart2.loadData([],false);


	},

	selectRecord1:function( grid, records ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			lister1 = me.pocket.lister1(),
			detail1 = me.pocket.detail1(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport12.store.EisReport12Chart1')
		;
		var record = records[0];
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(record){
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.show();
					} else { }
					mask.hide();
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id
							, cstm_idcd : record.data.cstm_idcd
							, wkct_idcd : record.data.wkct_idcd}));

			chart1.load({
				params : {
					param:JSON.stringify({
						  cstm_idcd : record.data.cstm_idcd
						, wkct_idcd : record.data.wkct_idcd
						, plan_year : param.plan_year
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	selectRecord2:function( grid, records ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			lister2 = me.pocket.lister2(),
			detail2 = me.pocket.detail2(),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport12.store.EisReport12Chart2')
		;
		var record = records[0];

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(record){
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.show();
					} else { }
					mask.hide();
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id
							, cstm_idcd : record.data.cstm_idcd }));

			chart2.load({
				params : {
					param:JSON.stringify({
						  cstm_idcd : record.data.cstm_idcd
						, plan_year : param.plan_year
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction11 : function() {
		this.pocket.detail1().writer({enableLoadMask:true});
	},
	exportAction22 : function() {
		this.pocket.detail2().writer({enableLoadMask:true});
	}
});