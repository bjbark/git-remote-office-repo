Ext.define('module.custom.iypkg.eis.eisreport15.EisReport15', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport15.model.EisReport15',
		'module.custom.iypkg.eis.eisreport15.model.EisReport15Detail',
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport15.store.EisReport15Lister',
		'module.custom.iypkg.eis.eisreport15.store.EisReport15Detail',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport15.view.EisReport15Layout',
		'module.custom.iypkg.eis.eisreport15.view.EisReport15Lister',
		'module.custom.iypkg.eis.eisreport15.view.EisReport15Detail',
		'module.custom.iypkg.eis.eisreport15.view.EisReport15Search',
		'module.custom.iypkg.eis.eisreport15.view.EisReport15Chart',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport15-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			'module-eisreport15-lister button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-eisreport15-detail button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀2

			// 클릭이벤트
			'module-eisreport15-lister' :	{
				selectionchange	: me.selectRecord1
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport15-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport15-search') [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-eisreport15-lister')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-eisreport15-detail')[0] },
		chart	: function () { return Ext.ComponentQuery.query('module-eisreport15-chart') [0] },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},


	selectRecord1:function( grid, record ){
		var me = this,
			search = me.pocket.search(),
			param  = search.getValues(),
			lister = me.pocket.lister(),
			detail = me.pocket.detail()
			chart  = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportDetail')
		;
		if(record.length > 0){
			record = record[0];
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else { }
				}, scope:me
			},Ext.merge( param, { stor_id : _global.stor_id
							, wkct_idcd : record.data.wkct_idcd
							, year      : param.year
			}));
//			chart1.load({
//				params : {
//					param:JSON.stringify({
//						  type : record.data.cstm_name
//						, cstm_idcd : record.data.cstm_idcd
//						, plan_year : param.plan_year
//						, sub : param1.sub
//					})
//				},
//				callback : function(records,operation,success){
//				}
//			});
		}
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	}
});