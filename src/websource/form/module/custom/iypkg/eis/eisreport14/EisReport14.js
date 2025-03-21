Ext.define('module.custom.iypkg.eis.eisreport14.EisReport14', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport14.model.EisReport14',
		'module.custom.iypkg.eis.eisreport14.model.EisReport14Detail1'
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport14.store.EisReport14Lister1',
		'module.custom.iypkg.eis.eisreport14.store.EisReport14Lister2',
		'module.custom.iypkg.eis.eisreport14.store.EisReport14Detail1',
		'module.custom.iypkg.eis.eisreport14.store.EisReport14Detail2',
		'module.custom.iypkg.eis.eisreport14.store.EisReport14',
		'module.custom.iypkg.eis.eisreport14.store.EisReport14Chart2'
	],
	views	: [
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Layout',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Lister1',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Lister2',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Detail1',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Detail2',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Search',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Chart1',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14Chart2',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14WorkerSearch',
		'module.custom.iypkg.eis.eisreport14.view.EisReport14WorkerSearch2',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport14-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
			'module-eisreport14-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
//			// lister1 event
			'module-eisreport14-lister1' : {
				selectionchange: me.selectRecord1												// 메뉴 선택시 이벤트
			},
			'module-eisreport14-lister2' :	{
				selectionchange	: me.selectRecord2
			},
//			'module-eisreport14-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
//			// lister2 event
//			'module-eisreport14-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport14-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport14-search') [0] },
		worker_search1	: function () { return Ext.ComponentQuery.query('module-eisreport14-worker-search') [0] },
		worker_search2	: function () { return Ext.ComponentQuery.query('module-eisreport14-worker-search2') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-eisreport14-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-eisreport14-lister2')[0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-eisreport14-detail1')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-eisreport14-detail2')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-eisreport14-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-eisreport14-chart2') [0] },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			worker_search1 = me.pocket.worker_search1(),
			worker_search2 = me.pocket.worker_search2(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			param	= worker_search1.getValues(),
			param2	= worker_search2.getValues(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart1'),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart2')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

			if(tindex == 0){
//				worker_search1.getForm().reset();
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param,param2, {stor_id : _global.stor_id,
					plan_year: param.plan_year,
				}) );
			}else if(tindex == 1){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							mask.show();
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				},Ext.merge( param, param2, { stor_id : _global.stor_id,
							plan_year: param2.plan_year,
				}) );
			}

				detail1.getStore().clearData();
				detail1.getStore().loadData([],false);

				detail2.getStore().clearData();
				detail2.getStore().loadData([],false);

				chart1.clearData();
				chart1.loadData([],false);

				chart2.clearData();
				chart2.loadData([],false);

//		lister2.select({
//			callback:function(records, operation, success) {
//				if (success) {
//					lister2.getSelectionModel().select(0);
//				} else { me.pocket.editor().getForm().reset(true);}
//				mask.hide();
//			}, scope:me
//		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	selectRecord1:function( grid, record ){
		var me = this,
			worker_search1 = me.pocket.worker_search1(),
			param	= worker_search1.getValues(),
			detail1 = me.pocket.detail1(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart1')
		;
		if(record.length > 0){
			record = record[0];
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
						detail1.getSelectionModel().select(0);
					} else { }
				}, scope:me
			},Ext.merge( param, { stor_id : _global.stor_id,
				 cstm_idcd : record.data.cstm_idcd,
				 user_idcd : record.data.user_idcd,
				 user_name : record.data.user_name,
				 plan_year: param.plan_year,
				 sub : param.sub}));

//			chart1.load({
//				param : {
//					param:JSON.stringify({
//						 cstm_idcd : record.data.cstm_idcd,
//						 user_idcd : record.data.user_idcd,
//						 plan_year : param.plan_year,
//						 user_name : record.data.user_name,
//						 sub : param.sub
//					})
//				},
//				callback : function(records,operation,success){
//				}
//			});
		}
	},


	selectRecord2:function( grid, record ){
		var me = this,
		worker_search2 = me.pocket.worker_search2(),
			param = worker_search2.getValues(),
			lister2 = me.pocket.lister2(),
			detail2 = me.pocket.detail2(),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart2')
		;

		if(record.length > 0){
			record = record[0];
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					}, scope:me
				},Ext.merge( param,
					{	stor_id : _global.stor_id,
						cstm_idcd : record.get('cstm_idcd'),
						drtr_idcd : record.get('drtr_idcd'),
						type : record.get('drtr_name'),
						 plan_year: param.plan_year,
						drtr_name : record.get('drtr_name')
					}
				)
			);

			chart2.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.get('cstm_idcd'),
						 drtr_idcd : record.get('drtr_idcd'),
						 plan_year : param.plan_year,
						 drtr_name : record.get('drtr_name')
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
	}
});