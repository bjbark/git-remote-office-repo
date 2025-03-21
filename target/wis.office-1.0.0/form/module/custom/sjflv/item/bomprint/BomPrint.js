Ext.define( 'module.custom.sjflv.item.bomprint.BomPrint', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
	],
	models: [
		'module.custom.sjflv.item.bomprint.model.BomPrintLister1',
		'module.custom.sjflv.item.bomprint.model.BomPrintLister2',
		'module.custom.sjflv.item.bomprint.model.BomPrintLister3',
	],
	stores: [
		'module.custom.sjflv.item.bomprint.store.BomPrintLister1',
		'module.custom.sjflv.item.bomprint.store.BomPrintLister2',
		'module.custom.sjflv.item.bomprint.store.BomPrintLister3',
	],
	views : [
		'module.custom.sjflv.item.bomprint.view.BomPrintLayout',
		'module.custom.sjflv.item.bomprint.view.BomPrintLister1',
		'module.custom.sjflv.item.bomprint.view.BomPrintLister2',
		'module.custom.sjflv.item.bomprint.view.BomPrintLister3',
		'module.custom.sjflv.item.bomprint.view.BomPrintSearch'
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-bomprint-search button[action=selectAction]'			: { click : me.selectAction }, // 조회
			// lister event

			'module-sjflv-bomprint-lister3 button[action=printAction]'		: { click : me.printAction      }, // 저장
			'module-sjflv-bomprint-lister3 button[action=updateAction]'		: { click : me.updateAction      }, // 저장
			'module-sjflv-bomprint-lister3 button[action=exportAction]'		: { click : me.exportAction      }, // 엑셀
			// lister event
			'module-sjflv-bomprint-lister1' : {
				itemclick      : me.selectAction1
			},
			'module-sjflv-bomprint-lister2' : {
				itemclick      : me.selectAction2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-sjflv-bomprint-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-sjflv-bomprint-search')[0] } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-sjflv-bomprint-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-bomprint-lister2')[0] } ,
		lister3 : function () { return Ext.ComponentQuery.query('module-sjflv-bomprint-lister3')[0] } ,
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;

		resource.mask.show({msg: Const.SELECT.mask });
		lister2.getStore().clearData();
		lister2.getStore().removeAll();
		lister3.getStore().clearData();
		lister3.getStore().removeAll();
		lister.select({
			callback:function(records, operation, success) {
				resource.mask.hide();
			}, scope:me
		},Ext.merge( me.pocket.search().getValues(), {
			hq_id  : _global.hq_id,
		}));
	},

	/**
	 *
	 */
	selectAction1:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister2()
			lister3 = me.pocket.lister3()
		;
		lister3.getStore().clearData();
		lister3.getStore().removeAll();

		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				prnt_item_idcd	: record.get('item_idcd') ,
			}));

		}
	},
	selectAction2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				prnt_item_idcd	: record.get('prnt_item_idcd') ,
				revs_numb	: record.get('revs_numb') ,
				revs_dvcd	: record.get('revs_dvcd') ,
				prnt_idcd	: record.get('prnt_idcd') ,
			}));
		}
	},
	printAction:function() {
		var me = this,
			jrf = 'Sjflv_itemspec.jrf',
			resId = _global.hq_id.toUpperCase(),
			param = me.pocket.search().getValues(),
			lister = me.pocket.lister2(),
			select = lister.getSelectionModel().getSelection()[0],
			add='off'
		;
		if(select){
			if(param.add){
				add = param.add;
			}
			var arg =	'item_idcd~'+select.get('prnt_item_idcd')+'~add~'+add+'~'+'~revs_numb~'+select.get('revs_numb')+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'print','width=1400,height=800'),
			});
		}else{
			Ext.Msg.alert('알림','리비전을 선택해주세요.');
		}
	},
	exportAction : function(){
		var me = this;
		me.pocket.lister3().writer({enableLoadMask:true});

	}
});
