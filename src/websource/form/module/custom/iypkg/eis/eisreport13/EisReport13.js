Ext.define('module.custom.iypkg.eis.eisreport13.EisReport13', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport13.model.EisReport131',
		'module.custom.iypkg.eis.eisreport13.model.EisReport132',
		'module.custom.iypkg.eis.eisreport13.model.EisReport133',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Detail1',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Detail2',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Detail3',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Chart1',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Chart2',
		'module.custom.iypkg.eis.eisreport13.model.EisReport13Chart3',
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport13.store.EisReport131',
		'module.custom.iypkg.eis.eisreport13.store.EisReport132',
		'module.custom.iypkg.eis.eisreport13.store.EisReport133',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Detail1',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Detail2',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Detail3',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Chart1',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2',
		'module.custom.iypkg.eis.eisreport13.store.EisReport13Chart3',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Layout',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Lister1',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Lister2',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Lister3',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Chart1',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Chart2',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Chart3',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Detail1',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Detail2',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Detail3',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Search',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Search1',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Search2',
		'module.custom.iypkg.eis.eisreport13.view.EisReport13Search3',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport13-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			'module-eisreport13-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
			// lister1 event
			'module-eisreport13-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			'module-eisreport13-detail1 button[action=exportAction]' : { click : me.exportAction11 },	// 엑셀
			'module-eisreport13-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
			'module-eisreport13-detail2 button[action=exportAction]' : { click : me.exportAction22 },	// 엑셀
			'module-eisreport13-lister3 button[action=exportAction]' : { click : me.exportAction3 },	// 엑셀
			'module-eisreport13-detail3 button[action=exportAction]' : { click : me.exportAction33 },	// 엑셀

			// 클릭이벤트
			'module-eisreport13-lister1' :	{
				selectionchange	: me.selectRecord1
			},

			'module-eisreport13-lister2' :	{
				selectionchange	: me.selectRecord2
			},

			'module-eisreport13-lister3' :	{
				selectionchange	: me.selectRecord3
			},


		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport13-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport13-search') [0] },
		search1	: function () { return Ext.ComponentQuery.query('module-eisreport13-search1') [0] },
		search2	: function () { return Ext.ComponentQuery.query('module-eisreport13-search2') [0] },
		search3	: function () { return Ext.ComponentQuery.query('module-eisreport13-search3') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-eisreport13-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-eisreport13-lister2')[0] },
		lister3	: function () { return Ext.ComponentQuery.query('module-eisreport13-lister3')[0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-eisreport13-detail1')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-eisreport13-detail2')[0] },
		detail3	: function () { return Ext.ComponentQuery.query('module-eisreport13-detail3')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-eisreport13-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-eisreport13-chart2') [0] },
		chart3	: function () { return Ext.ComponentQuery.query('module-eisreport13-chart3') [0] }
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			search1 = me.pocket.search1(),
			search2 = me.pocket.search2(),
			param2 = search2.getValues(),
			search3 = me.pocket.search3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart1'),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2'),
			chart3 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart3')
		;

		if(param.year=='' || param.year==null){
			Ext.Msg.alert("알림","연도를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

			if(tindex == 0){
				search1.getForm().reset();
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
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}else if(tindex == 2){
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

			detail2.getStore().clearData();
			detail2.getStore().loadData([],false);

			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);

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
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart1')
		;

		if(record.length > 0){
			record = record[0];
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id,
							 cstm_idcd : record.data.cstm_idcd,
							 user_idcd : record.data.user_idcd,
							 user_name : record.data.user_name,
							 year: param.year,
							 sub : param1.sub}));
			chart1.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.data.cstm_idcd,
						 user_idcd : record.data.user_idcd,
						 year : param.year,
						 user_name : record.data.user_name,
						 sub : param1.sub
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	selectRecord2:function( grid, record ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			lister2 = me.pocket.lister2(),
			detail2 = me.pocket.detail2(),
			chart2 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2')
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
						drtr_name : record.get('drtr_name')
					}
				)
			);

			chart2.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.get('cstm_idcd'),
						 drtr_idcd : record.get('drtr_idcd'),
						 year : param.year,
						 drtr_name : record.get('drtr_name')
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
	},

	selectRecord3:function( grid, record ){
		var me = this
			search = me.pocket.search(),
			param = search.getValues(),
			search2 = me.pocket.search2(),
			param2 = search2.getValues(),
			search3 = me.pocket.search3(),
			lister3 = me.pocket.lister3(),
			detail3 = me.pocket.detail3(),
			chart3 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart3')
		;

		console.log('aga');

		if(record.length > 0){
			record = record[0];
			console.log(record);
			detail3.select({
				callback:function(records, operation, success) {
					if (success) {
						Ext.Ajax.request({
							url			: _global.location.http() + '/custom/iypkg/eis/eisreport13/get/cary_amnt.do',
							method		: "POST",
							params		: {
							 	token	: _global.token_id,
							 	param : JSON.stringify({
							 		  cstm_idcd : record.data.cstm_idcd
									, year : param.year
									, amnt : param2.amnt
								})
							},
							async	: false,
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									search3.down('[name=cary_amnt]').setValue(result.records[0].cary_amnt);
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});

						Ext.Ajax.request({
							url			: _global.location.http() + '/custom/iypkg/eis/eisreport13/get/befr_amnt.do',
							method		: "POST",
							params		: {
							 	token	: _global.token_id,
							 	param : JSON.stringify({
							 		  cstm_idcd : record.data.cstm_idcd
									, year : param.year
									, amnt : param2.amnt
								})
							},
							async	: false,
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									search3.down('[name=befr_amnt]').setValue(result.records[0].befr_amnt);
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					} else { }
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id
							, cstm_idcd : record.data.cstm_idcd
							, user_idcd : record.data.user_idcd
							, amnt : param2.amnt}));

			chart3.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.data.cstm_idcd
						, user_idcd : record.data.user_idcd
						, year : param.year
						, amnt : param2.amnt
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
	exportAction22 : function() {
		this.pocket.detail2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.lister3().writer({enableLoadMask:true});
	},
	exportAction33 : function() {
		this.pocket.detail3().writer({enableLoadMask:true});
	}
});