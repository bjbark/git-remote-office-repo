Ext.define( 'module.custom.komec.item.bomlist.BomList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
	],
	models: [
		'module.custom.komec.item.bomlist.model.BomListLister1',
		'module.custom.komec.item.bomlist.model.BomListLister2',
		'module.custom.komec.item.bomlist.model.BomListLister3',
		'module.custom.komec.item.bomlist.model.BomListExcel',
		'module.custom.komec.item.bomlist.model.BomListSpecLister',
		'module.custom.komec.item.bomlist.model.BomListCstmLister1',
		'module.custom.komec.item.bomlist.model.BomListCstmLister2',
		'module.custom.komec.item.bomlist.model.BomListCstmLister3',
		'module.custom.komec.item.bomlist.model.BomListCstmLister4',
		'module.custom.komec.item.bomlist.model.BomListMtrlLister1',
		'module.custom.komec.item.bomlist.model.BomListMtrlLister2',
	],
	stores: [
		'module.custom.komec.item.bomlist.store.BomListLister1',
		'module.custom.komec.item.bomlist.store.BomListLister2',
		'module.custom.komec.item.bomlist.store.BomListLister3',
		'module.custom.komec.item.bomlist.store.BomListExcel',
		'module.custom.komec.item.bomlist.store.BomListSpecLister',
		'module.custom.komec.item.bomlist.store.BomListCstmLister1',
		'module.custom.komec.item.bomlist.store.BomListCstmLister2',
		'module.custom.komec.item.bomlist.store.BomListCstmLister3',
		'module.custom.komec.item.bomlist.store.BomListCstmLister4',
		'module.custom.komec.item.bomlist.store.BomListMtrlLister1',
		'module.custom.komec.item.bomlist.store.BomListMtrlLister2',
	],
	views : [
		'module.custom.komec.item.bomlist.view.BomListLayout',
		'module.custom.komec.item.bomlist.view.BomListLister1',
		'module.custom.komec.item.bomlist.view.BomListLister2',
		'module.custom.komec.item.bomlist.view.BomListLister3',
		'module.custom.komec.item.bomlist.view.BomListExcel',
		'module.custom.komec.item.bomlist.view.BomListSpecEditor',
		'module.custom.komec.item.bomlist.view.BomListSpecLister',
		'module.custom.komec.item.bomlist.view.BomListCstmLister1',
		'module.custom.komec.item.bomlist.view.BomListCstmLister2',
		'module.custom.komec.item.bomlist.view.BomListCstmLister3',
		'module.custom.komec.item.bomlist.view.BomListCstmLister4',
		'module.custom.komec.item.bomlist.view.BomListMtrlLister1',
		'module.custom.komec.item.bomlist.view.BomListMtrlLister2',
		'module.custom.komec.item.bomlist.view.BomListSearch'
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-komec-bomlist-search button[action=selectAction]'			: { click : me.selectAction }, // 조회
			// lister event
			'module-komec-bomlist-lister2 button[action=revInsertAction]'		: { click : me.revAction }, // 신규
			'module-komec-bomlist-lister2 button[action=revDeleteAction]'		: { click : me.revAction }, // 삭제

			'module-komec-bomlist-lister3 button[action=updateAction]'		: { click : me.updateAction      }, // 저장
			'module-komec-bomlist-lister3 button[action=exportAction]'		: { click : me.treeExportAction      }, // 엑셀
			'module-komec-bomlist-cstm-lister4 button[action=exportAction]'		: { click : me.treeExportAction      }, // 엑셀
			// lister event
			'module-komec-bomlist-lister1' : {
				itemclick      : me.selectAction1
			},
			'module-komec-bomlist-lister2' : {
				itemclick      : me.selectAction2
			},
			// cstmLister event
			'module-komec-bomlist-cstm-lister1' : {
				itemclick      : me.cstmSelectAction1
			},
			'module-komec-bomlist-cstm-lister2' : {
				itemclick      : me.cstmSelectAction2
			},
			'module-komec-bomlist-cstm-lister3' : {
				itemclick      : me.cstmSelectAction3
			},
			'module-komec-bomlist-mtrl-lister1' : {
				itemclick      : me.mtrlSelectAction1
			},
			'module-komec-bomlist-spec-lister' : {
				itemclick      : me.specSelectAction
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-komec-bomlist-layout ')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-komec-bomlist-search ')[0] } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-lister2')[0] } ,
		lister3 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-lister3')[0] } ,
		excel   : function () { return Ext.ComponentQuery.query('module-komec-bomlist-excel')[0] } ,
		cstmlister1 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-cstm-lister1')[0] } ,
		cstmlister2 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-cstm-lister2')[0] } ,
		cstmlister3 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-cstm-lister3')[0] } ,
		cstmlister4 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-cstm-lister4')[0] } ,
		mtrllister1 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-mtrl-lister1')[0] } ,
		mtrllister2 : function () { return Ext.ComponentQuery.query('module-komec-bomlist-mtrl-lister2')[0] },
		speclister  : function () { return Ext.ComponentQuery.query('module-komec-bomlist-spec-lister')[0] },
		editor      : function () { return Ext.ComponentQuery.query('module-komec-bomlist-spec-editor')[0] }
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister  = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),

			cstmlister1  = me.pocket.cstmlister1(),
			cstmlister2  = me.pocket.cstmlister2(),
			cstmlister3  = me.pocket.cstmlister3(),
			cstmlister4  = me.pocket.cstmlister4(),

			mtrllister1  = me.pocket.mtrllister1(),
			mtrllister2  = me.pocket.mtrllister2(),

			speclister  = me.pocket.speclister(),

			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		switch (tindex) {
		case 0:
			resource.mask.show({msg: Const.SELECT.mask });
			lister2.getStore().clearData();
			lister2.getStore().removeAll();
			lister3.getStore().clearData();
			lister3.getRootNode().removeAll();
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id  : _global.hq_id,
			}));
			break;
		case 1:
			resource.mask.show({msg: Const.SELECT.mask });
			cstmlister2.getStore().clearData();
			cstmlister2.getStore().removeAll();
			cstmlister3.getStore().clearData();
			cstmlister3.getStore().removeAll();
			cstmlister4.getStore().clearData();
			cstmlister4.getRootNode().removeAll();

			cstmlister1.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id  : _global.hq_id,
			}));

			break;
		case 2:
			resource.mask.show({msg: Const.SELECT.mask });
			mtrllister2.getStore().clearData();
			mtrllister2.getStore().removeAll();

			mtrllister1.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id  : _global.hq_id,
			}));

			break;
		case 3:
			speclister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id  : _global.hq_id,
			}));

			break;
		default:
			break;
		}

	},

	/**
	 *
	 */
	selectAction1:function( grid, record, item, index, e ){
		var me = this,
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;
		lister3.getStore().clearData();
		lister3.getRootNode().removeAll();

		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister2.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				item_idcd	: record.get('item_idcd') ,
			}));
		}
	},

	/**
	 *
	 */
	selectAction2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.getStore().load({
				params:{
					param:JSON.stringify({
						prnt_item_idcd	: record.get('prnt_item_idcd') ,
						revs_numb	: record.get('revs_numb') ,
						revs_dvcd	: record.get('revs_dvcd') ,
					})
				}, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						lister.getRootNode().expand();
						lister.getSelectionModel().select(0);
					} else {
					}
					resource.mask.hide();
				}
			});
		}
	},
	cstmSelectAction1:function( grid, record, item, index, e ){
		var	me = this,
			lister = me.pocket.cstmlister2()
			lister2 = me.pocket.cstmlister3()
			lister3 = me.pocket.cstmlister4()
		;
		lister2.getStore().clearData();
		lister2.getStore().removeAll();

		lister3.getStore().clearData();
		lister3.getRootNode().removeAll();
		resource.mask.show({msg: Const.SELECT.mask });
		lister.select({
			callback:function(records, operation, success) {
				resource.mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(),{
			hq_id		: _global.hq_id,
			cstm_idcd	: record.get('cstm_idcd') ,
		}));
	},
	cstmSelectAction2:function( grid, record, item, index, e ){
		var	me		= this,
			master	= me.pocket.cstmlister1(),
			lister	= me.pocket.cstmlister3()
			lister2	= me.pocket.cstmlister4()
			select	= master.getSelectionModel().getSelection()[0]
		;

		lister2.getStore().clearData();
		lister2.getRootNode().removeAll();
		resource.mask.show({msg: Const.SELECT.mask });
		lister.select({
			callback:function(records, operation, success) {
				resource.mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(),{
			hq_id		: _global.hq_id,
			cstm_idcd	: select.get('cstm_idcd') ,
			item_idcd	: record.get('item_idcd')
		}));
	},
	cstmSelectAction3:function( grid, record, item, index, e ){
		var	me = this,
			master = me.pocket.cstmlister2(),
			lister = me.pocket.cstmlister4()
			select = master.getSelectionModel().getSelection()[0]
		;
		resource.mask.show({msg: Const.SELECT.mask });
		lister.getStore().load({
			params:{
				param:JSON.stringify({
					prnt_item_idcd	: select.get('item_idcd'),
					revs_numb		: record.get('revs_numb'),
					revs_dvcd		: record.get('revs_dvcd')
				})
			}, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					lister.getRootNode().expand();
					lister.getSelectionModel().select(0);
				} else {
				}
				resource.mask.hide();
			}
		});
	},
	mtrlSelectAction1:function( grid, record, item, index, e ){
		var	me = this,
			lister = me.pocket.mtrllister2()
		;
		resource.mask.show({msg: Const.SELECT.mask });
		lister.select({
			callback:function(records, operation, success) {
				resource.mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(),{
			hq_id		: _global.hq_id,
			item_idcd	: record.get('item_idcd') ,
		}));
	},
	specSelectAction:function( grid, record ){
		var	me = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.speclister(), record : record }, me);
	},
	exportAction : function(){
		var me = this;
		me.pocket.lister3().writer({enableLoadMask:true});

	},
	//TODO treeExport
	treeExportAction: function(self) {
		var me = this,
		lister = me.pocket.lister3(),
		store  = lister.getStore(),
		excel  = me.pocket.excel(),
		excelStore =  excel.getStore()
		;
		excelStore.clearData();
		excelStore.removeAll();

		me.treeExchange(store,excelStore);
		excel.excelExport();
	},
	treeExportAction2: function(self) {
		var me = this,
			lister = me.pocket.cstmlister4(),
			store  = lister.getStore(),
			excel  = me.pocket.excel(),
			excelStore =  excel.getStore()
		;
		excelStore.clearData();
		excelStore.removeAll();

		me.treeExchange(store,excelStore);
		excel.excelExport();
	},
});
