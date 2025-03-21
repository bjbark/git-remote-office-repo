
Ext.define('module.qc.insp.inspreport.InspReport', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.qc.insp.inspreport.model.InspReportMaster',
		'module.qc.insp.inspreport.model.InspReportLister1',
		'module.qc.insp.inspreport.model.InspReportLister2',
		'module.qc.insp.inspreport.model.InspReportLister3',

	],
	stores:[
		'module.qc.insp.inspreport.store.InspReportMaster',
		'module.qc.insp.inspreport.store.InspReportLister1',
		'module.qc.insp.inspreport.store.InspReportLister2',
		'module.qc.insp.inspreport.store.InspReportLister3',

	],
	views : [
		'module.qc.insp.inspreport.view.InspReportLayout',
		/* 현황 */
		'module.qc.insp.inspreport.view.InspReportSearch',
		'module.qc.insp.inspreport.view.InspReportListerMaster',
		'module.qc.insp.inspreport.view.InspReportLister1',
		'module.qc.insp.inspreport.view.InspReportLister2',
		'module.qc.insp.inspreport.view.InspReportLister3',

	],
	init: function() {
		var me = this;
		me.control({
			'module-inspreport-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-inspreport-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-inspreport-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction			}, /* 마감 */
			'module-inspreport-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeAction			}, /* 마감취소 */

			'module-inspreport-lister-master button[action=exportAction]'			: { click : me.exportAction			}, /* 엑셀 */
			'module-inspreport-lister1 button[action=exportAction]'					: { click : me.exportLister1Action	}, /* 엑셀 */
			'module-inspreport-lister2 button[action=exportAction]'					: { click : me.exportLister2Action	}, /* 엑셀 */

			'module-inspreport-lister-master' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inspreport-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspreport-search')[0] },
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-inspreport-lister-master')[0] },
		},
		lister1 : function () { return Ext.ComponentQuery.query('module-inspreport-lister1')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-inspreport-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-inspreport-lister3')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister.master(),
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			master = undefined
		;
		if(tindex==0){
			master = lister;
			temp = 'query';
		}else{
			master = lister1;
			temp = 'entry';
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		if(tindex==0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, query : temp  }));
		}else if(tindex==1){
			lister1.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==2){
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==3){
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportLister1Action : function(self) {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportLister2Action : function(self) {
		this.pocket.lister2().writer({enableLoadMask:true});
	},

	reportAction : function(button) {
		var me = this, lister = me.pocket.lister.master(),
			param = me.pocket.search().getValues(), store = lister.getStore()
		;
		var selModel = lister.getSelectionModel();
		var selected = selModel.getSelection();
		if(!selected[0]){
			return
		}
	},
});
