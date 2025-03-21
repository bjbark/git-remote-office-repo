Ext.define('module.custom.iypkg.eis.eisreport11.EisReport11', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport11.model.EisReport111',
		'module.custom.iypkg.eis.eisreport11.model.EisReport112',
		'module.custom.iypkg.eis.eisreport11.model.EisReport113',
		'module.custom.iypkg.eis.eisreport11.model.EisReportChart111',
		'module.custom.iypkg.eis.eisreport11.model.EisReportChart112',
		'module.custom.iypkg.eis.eisreport11.model.EisReportChart113',
		'module.custom.iypkg.eis.eisreport11.model.EisReportDetail111',
		'module.custom.iypkg.eis.eisreport11.model.EisReportDetail112',
		'module.custom.iypkg.eis.eisreport11.model.EisReportDetail113',
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport11.store.EisReport111',
		'module.custom.iypkg.eis.eisreport11.store.EisReport112',
		'module.custom.iypkg.eis.eisreport11.store.EisReport113',
		'module.custom.iypkg.eis.eisreport11.store.EisReportChart111',
		'module.custom.iypkg.eis.eisreport11.store.EisReportChart112',
		'module.custom.iypkg.eis.eisreport11.store.EisReportChart113',
		'module.custom.iypkg.eis.eisreport11.store.EisReportDetail111',
		'module.custom.iypkg.eis.eisreport11.store.EisReportDetail112',
		'module.custom.iypkg.eis.eisreport11.store.EisReportDetail113',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Layout',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Lister1',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Lister2',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Lister3',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Search',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Chart1',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Chart2',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Chart3',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Detail1',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Detail3',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Search',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Search1',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Search2',
		'module.custom.iypkg.eis.eisreport11.view.EisReport11Search3',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport11-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			'module-eisreport11-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
			'module-eisreport11-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-eisreport11-detail1 button[action=exportAction]' : { click : me.exportAction11 },	// 엑셀
			'module-eisreport11-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
			'module-eisreport11-lister3 button[action=exportAction]' : { click : me.exportAction3 },	// 엑셀
			'module-eisreport11-detail3 button[action=exportAction]' : { click : me.exportAction33 },	// 엑셀

			// 클릭이벤트
			'module-eisreport11-lister1' :	{
				selectionchange	: me.selectRecord1
			},

			'module-eisreport11-lister2' :	{
				selectionchange	: me.selectRecord2
			},

			'module-eisreport11-lister3' :	{
				selectionchange	: me.selectRecord3
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport11-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport11-search') [0] },
		search1	: function () { return Ext.ComponentQuery.query('module-eisreport11-search1') [0] },
		search2	: function () { return Ext.ComponentQuery.query('module-eisreport11-search2') [0] },
		search3	: function () { return Ext.ComponentQuery.query('module-eisreport11-search3') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-eisreport11-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-eisreport11-lister2')[0] },
		lister3	: function () { return Ext.ComponentQuery.query('module-eisreport11-lister3')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-eisreport11-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-eisreport11-chart2') [0] },
		chart3	: function () { return Ext.ComponentQuery.query('module-eisreport11-chart3') [0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-eisreport11-detail1')[0] },
		detail3	: function () { return Ext.ComponentQuery.query('module-eisreport11-detail3')[0] },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			search2 = me.pocket.search2(),
			param2 = search2.getValues(),
			search3 = me.pocket.search3(),
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			detail1 = me.pocket.detail1(),
			detail3 = me.pocket.detail3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart111'),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart112'),
			chart3 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart113')
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
			}
			else if(tindex == 1){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}
			else if(tindex == 2){
				lister3.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister3.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, param2, {stor_id : _global.stor_id}) );
			}

			detail1.getStore().clearData();
			detail1.getStore().loadData([],false);

			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);

			// 차트 리셋
			chart1.clearData();
			chart1.loadData([],false);

			chart2.clearData();
			chart2.loadData([],false);

			chart3.clearData();
			chart3.loadData([],false);

			// search 리셋
			search3.getForm().reset();

		}
	},

	selectRecord1:function( grid, record ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			search1 = me.pocket.search1(),
			param1 = search1.getValues(),
			lister1 = me.pocket.lister1(),
			detail1 = me.pocket.detail1(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart111')
		;
		if(record.length > 0){
			record = record[0];
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id
							, type : record.data.cstm_name
							, cstm_idcd : record.data.cstm_idcd
							, plan_year : param.plan_year
							, sub : param1.sub}));
			chart1.load({
				params : {
					param:JSON.stringify({
						  type : record.data.cstm_name
						, cstm_idcd : record.data.cstm_idcd
						, plan_year : param.plan_year
						, sub : param1.sub
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	selectRecord2:function( grid, record ){
		var me = this,
			lister2 = me.pocket.lister2(),
			chart2 = me.pocket.chart2(),
			search = me.pocket.search(),
			param = search.getValues(),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart112')
		;
		if(record.length > 0){
			record = record[0];
			chart2.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.data.cstm_idcd
						, plan_year : param.plan_year
						, find_name : param.find_name
						, cstm_name : record.data.cstm_name
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	selectRecord3:function( grid, record ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			search2 = me.pocket.search2(),
			param2 = search2.getValues(),
			search3 = me.pocket.search3(),
			lister3 = me.pocket.lister3(),
			detail3 = me.pocket.detail3(),
			chart3 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart113')
		;

		if(record.length > 0){
			record = record[0];
			detail3.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			},Ext.merge( param, param2, { stor_id : _global.stor_id
						, cstm_idcd : record.data.cstm_idcd
						, cstm_name : record.data.cstm_name}
					)
			);
			chart3.load({
				params : {
					param:JSON.stringify({
						  cstm_idcd : record.data.cstm_idcd
						, amnt : param2.amnt
						, type : record.data.cstm_name
						, cstm_name : record.data.cstm_name
						, plan_year : param.plan_year
						, find_name : param.find_name
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
	exportAction11 : function() {
		this.pocket.detail1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.lister3().writer({enableLoadMask:true});
	},
	exportAction33 : function() {
		this.pocket.detail3().writer({enableLoadMask:true});
	}

});
