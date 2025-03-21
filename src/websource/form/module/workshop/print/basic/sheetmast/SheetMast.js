Ext.define('module.workshop.print.basic.sheetmast.SheetMast', { extend:'Axt.app.Controller',

	requires : [
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup'
	],
	models : [
		'module.workshop.print.basic.sheetmast.model.SheetMast',
		'module.workshop.print.basic.sheetmast.model.SheetMastDetail',
		'module.workshop.print.basic.sheetmast.model.SheetMastClss',
	],

	stores : [
		'module.workshop.print.basic.sheetmast.store.SheetMast',
		'module.workshop.print.basic.sheetmast.store.SheetMastDetail',
		'module.workshop.print.basic.sheetmast.store.SheetMastLcls',
		'module.workshop.print.basic.sheetmast.store.SheetMastMcls',
		'module.workshop.print.basic.sheetmast.store.SheetMastScls',
	],

	views : [
		'module.workshop.print.basic.sheetmast.view.SheetMastLayout',
		'module.workshop.print.basic.sheetmast.view.SheetMastSearch',
		'module.workshop.print.basic.sheetmast.view.SheetMastLister',
		'module.workshop.print.basic.sheetmast.view.SheetMastDetail',
		'module.workshop.print.basic.sheetmast.view.SheetMastLclsLister',
		'module.workshop.print.basic.sheetmast.view.SheetMastMclsLister',
		'module.workshop.print.basic.sheetmast.view.SheetMastSclsLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sheetmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-sheetmast-lister button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-sheetmast-lister button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// detail event
			'module-sheetmast-detail button[action=updateAction]' : { click : me.updateAction2 },	// 저장
			'module-sheetmast-detail button[action=cancelAction]' : { click : me.cancelAction2 },	// 취소

			// lister event
			'module-sheetmast-lclslister' : {
				selectionchange: me.selectRecord1												// 메뉴 선택시 이벤트
			},
			'module-sheetmast-mclslister' : {
				selectionchange: me.selectRecord2												// 메뉴 선택시 이벤트
			},
			'module-sheetmast-sclslister' : {
				selectionchange: me.selectRecord3												// 메뉴 선택시 이벤트
			},
			'module-sheetmast-lister' : {
				selectionchange: me.selectRecord4												// 메뉴 선택시 이벤트
			},
		});
		me.callParent(arguments);
	},

	pocket : {
		layout     : function () { return Ext.ComponentQuery.query('module-sheetmast-layout')[0] },
		search     : function () { return Ext.ComponentQuery.query('module-sheetmast-search')[0] },
		lister     : function () { return Ext.ComponentQuery.query('module-sheetmast-lister')[0] },
		lclslister : function () { return Ext.ComponentQuery.query('module-sheetmast-lclslister')[0] },
		mclslister : function () { return Ext.ComponentQuery.query('module-sheetmast-mclslister')[0] },
		sclslister : function () { return Ext.ComponentQuery.query('module-sheetmast-sclslister')[0] },
		detail     : function () { return Ext.ComponentQuery.query('module-sheetmast-detail')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lclslister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {  }
					mask.hide();
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id,line_levl:1}) );
	},

	//대분류선택
	selectRecord1 : function( grid, record ) {
		var	me = this,
			lister = me.pocket.mclslister(),
			sStore = me.pocket.sclslister().getStore(),
			dStore = me.pocket.detail().getStore(),
			store  = me.pocket.lister().getStore()
		;
		if(record[0]){
			dStore.clearData();
			dStore.loadData([],false);
			sStore.clearData();
			sStore.loadData([],false);
			store.clearData();
			store.loadData([],false);
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {  }
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, prnt_idcd:record[0].get('clss_idcd')}) );
		}
	},
	//중분류선택
	selectRecord2 : function( grid, record) {
		var	me		= this,
			lister	= me.pocket.sclslister(),
			store	= me.pocket.lister().getStore(),
			dStore	= me.pocket.detail().getStore()
		;
		if(record[0]){
			store.clearData();
			store.loadData([],false);
			dStore.clearData();
			dStore.loadData([],false);
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {  }
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, prnt_idcd:record[0].get('clss_idcd')}) );
		}

	},
	//소분류선택
	selectRecord3 : function( grid, record) {
		var	me		= this,
			lister	= me.pocket.lister(),
			lcls	= me.pocket.lclslister(),
			mcls	= me.pocket.mclslister(),
			lclsRec	= lcls.getSelectionModel().getSelection()[0],
			mclsRec	= mcls.getSelectionModel().getSelection()[0],
			dStore	= me.pocket.detail().getStore()
		;
		if(record[0]){
			dStore.clearData();
			dStore.loadData([],false);

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {  }
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id,lcls_idcd : lclsRec.get('clss_idcd'),mcls_idcd : mclsRec.get('clss_idcd'), scls_idcd:record[0].get('clss_idcd')}) );
		}

	},
	//용지선택
	selectRecord4 : function( grid, record) {
		var	me		= this,
			lister	= me.pocket.lister(),
			detail	= me.pocket.detail()
		;
		if(record[0]){
			if(record[0].get('insert')!="Y"){
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( {stor_id : _global.stor_id,shet_idcd : record[0].get('shet_idcd')}) );
			}
		}
	},


	//저장
	updateAction : function() {
		var me = this,
		lister = me.pocket.lister(),
		store  = lister.getStore()
		;
		store.sync({
			callback:function(){
				store.reload();
			}
		});
	},

	//취소
	cancelAction : function() {
		var	me     = this,
		lister = me.pocket.lister(),
		store  = lister.getStore()
		;
		store.reload();
	},
	//저장
	updateAction2 : function() {
		var me = this,
			lister = me.pocket.detail(),
			store  = lister.getStore()
		;
		store.sync({
			callback:function(){
				store.reload();
			}
		});
	},

	//취소
	cancelAction2 : function() {
		var	me     = this,
			lister = me.pocket.detail(),
			store  = lister.getStore()
		;
		store.reload();
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});