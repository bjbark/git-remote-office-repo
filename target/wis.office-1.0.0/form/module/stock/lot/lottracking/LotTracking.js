Ext.define('module.stock.lot.lottracking.LotTracking', { extend:'Axt.app.Controller',

	requires : [
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.LottPopup'
	],
	models : [
	    'module.stock.lot.lottracking.model.LotTrackingIsos',
	    'module.stock.lot.lottracking.model.LotTrackingAcpt',
	    'module.stock.lot.lottracking.model.LotTrackingOrdr',
	    'module.stock.lot.lottracking.model.LotTrackingWorkMtrl',
	    'module.stock.lot.lottracking.model.LotTrackingIstt',
	    'module.stock.lot.lottracking.model.LotTrackingProd',
	    'module.stock.lot.lottracking.model.LotTrackingPror',
	],
	stores : [
	    'module.stock.lot.lottracking.store.LotTrackingIsos',
	    'module.stock.lot.lottracking.store.LotTrackingAcpt',
	    'module.stock.lot.lottracking.store.LotTrackingOrdr',
	    'module.stock.lot.lottracking.store.LotTrackingIstt',
	    'module.stock.lot.lottracking.store.LotTrackingWorkMtrl',
	    'module.stock.lot.lottracking.store.LotTrackingProd',
	    'module.stock.lot.lottracking.store.LotTrackingPror',
	],
	views : [
		'module.stock.lot.lottracking.view.LotTrackingLayout',
		'module.stock.lot.lottracking.view.LotTrackingIsosLister',
		'module.stock.lot.lottracking.view.LotTrackingAcptLister',
		'module.stock.lot.lottracking.view.LotTrackingOrdrLister',
		'module.stock.lot.lottracking.view.LotTrackingIsttLister',
		'module.stock.lot.lottracking.view.LotTrackingWorkMtrlLister',
		'module.stock.lot.lottracking.view.LotTrackingProrLister',
		'module.stock.lot.lottracking.view.LotTrackingProdLister',
		'module.stock.lot.lottracking.view.LotTrackingEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-lottracking-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-lottracking-editor textfield[name=lott_numb2]' : { change : me.selectAction },	// 엑셀
		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-lottracking-layout')[0]  },
		editor  : function () { return Ext.ComponentQuery.query('module-lottracking-editor')[0]  },
		isos    : function () { return Ext.ComponentQuery.query('module-lottracking-isos-lister')[0] },
		acpt    : function () { return Ext.ComponentQuery.query('module-lottracking-acpt-lister')[0] },
		ordr    : function () { return Ext.ComponentQuery.query('module-lottracking-ordr-lister')[0] },
		workmtrl: function () { return Ext.ComponentQuery.query('module-lottracking-workmtrl-lister')[0] },
		prod    : function () { return Ext.ComponentQuery.query('module-lottracking-prod-lister')[0] },
		pror    : function () { return Ext.ComponentQuery.query('module-lottracking-pror-lister')[0] },
		istt    : function () { return Ext.ComponentQuery.query('module-lottracking-istt-lister')[0] }
	},

	selectAction:function(field,value){
		var me      = this,
			layout	= me.pocket.layout(),
			editor  = me.pocket.editor(),
			values	= editor.getValues(),
			isos    = me.pocket.isos(),
			acpt    = me.pocket.acpt(),
			ordr    = me.pocket.ordr(),
			workmtrl= me.pocket.workmtrl(),
			prod    = me.pocket.prod(),
			pror    = me.pocket.pror(),
			istt    = me.pocket.istt(),
			dvcd	= "",
			lister1 = "",
			lister2 = "",
			lister3 = ""
		;
		if(value!=""){
			dvcd = values.acct_bacd.substring(0,1); // 품목구분 1 = 자재, 2 = 반제품, 3 = 품목

			isos.select({
				callback:function(){
				}
			},values)
			var tabs1 = layout.down('#topLeftPanel');
			var tabs2 = layout.down('#topRightPanel');
			var tabs3 = layout.down('#bottomPanel');
			switch (dvcd) {

			case '3':
				ordr.tab.hide();
				istt.tab.hide();
				prod.tab.hide();

				acpt.tab.show();
				tabs1.setActiveTab(acpt);
				pror.tab.show();
				tabs2.setActiveTab(pror);
				workmtrl.tab.show();
				tabs3.setActiveTab(workmtrl);

				lister1 = acpt;
				lister2 = pror;
				lister3 = workmtrl;
				break;

			default:
				acpt.tab.hide();
				pror.tab.hide();
				workmtrl.tab.hide();

				ordr.tab.show();
				tabs1.setActiveTab(ordr);

				istt.tab.show();
				tabs2.setActiveTab(istt);

				prod.tab.show();
				tabs3.setActiveTab(prod);


				lister1 = ordr;
				lister2 = istt;
				lister3 = prod;
				break;

			}

			lister1.select({
				callback:function(){
				}
			},Ext.merge(values,{dvcd : dvcd}));
			lister2.select({
				callback:function(){
				}
			},Ext.merge(values,{dvcd : dvcd}));
			lister3.select({
				callback:function(){
				}
			},Ext.merge(values,{dvcd : dvcd}));
		}else{
			editor.getForm().reset();

			isos.getStore().clearData();
			isos.getStore().loadData([],false);
			acpt.getStore().clearData();
			acpt.getStore().loadData([],false);
			ordr.getStore().clearData();
			ordr.getStore().loadData([],false);
			workmtrl.getStore().clearData();
			workmtrl.getStore().loadData([],false);
			prod.getStore().clearData();
			prod.getStore().loadData([],false);
			pror.getStore().clearData();
			pror.getStore().loadData([],false);
			istt.getStore().clearData();
			istt.getStore().loadData([],false);
		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});