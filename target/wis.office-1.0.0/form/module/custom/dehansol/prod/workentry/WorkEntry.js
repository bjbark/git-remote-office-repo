Ext.define('module.custom.dehansol.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'
	],
	models : [
		'module.custom.dehansol.prod.workentry.model.WorkEntry'
	],
	stores : [
		'module.custom.dehansol.prod.workentry.store.WorkEntry',
		'module.custom.dehansol.prod.workentry.store.WorkEntryDetail'
	],
	views : [
		'module.custom.dehansol.prod.workentry.view.WorkEntryLayout',
		'module.custom.dehansol.prod.workentry.view.WorkEntrySearch',
		'module.custom.dehansol.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.dehansol.prod.workentry.view.WorkEntryListerDetail1',
		'module.custom.dehansol.prod.workentry.view.WorkEntryListerDetailSearch'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// lister event
			'module-dehansol-workentry-lister button[action=exportAction]'		 : { click : me.exportAction },	// 엑셀
			'module-dehansol-workentry-lister button[action=deleteAction]'		 : { click : me.deleteAction },	// 삭제
			// lister event
			'module-dehansol-workentry-detailSearch button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-dehansol-workentry-detail1 button[action=exportAction]'		 : { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout       : function () { return Ext.ComponentQuery.query('module-dehansol-workentry-layout')[0] },
		search       : function () { return Ext.ComponentQuery.query('module-dehansol-workentry-search')[0] },
		lister       : function () { return Ext.ComponentQuery.query('module-dehansol-workentry-lister')[0] },
		detail1      : function () { return Ext.ComponentQuery.query('module-dehansol-workentry-detail1')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-dehansol-workentry-detailSearch')[0] }
	},

	//조회
	selectAction : function(){
		var me = this,
			detail1      = me.pocket.detail1(),
			detailSearch = me.pocket.detailSearch(),
			params       = detailSearch.getValues(),
			chk
		;
		detail1.select({
			callback:function(records, operation, success) {
				if (success) {
				}
			}, scope:me
		}, Ext.merge( { work_date2:params.work_date2,work_date3:params.work_date3,wkct_idcd:params.wkct_idcd2}) );
	},

	//엑셀
	exportAction : function(record){
		if(record.itemId == 'master'){
			this.pocket.lister().writer({enableLoadMask:true});
		}else if(record.itemId == 'detail'){
			this.pocket.detail1().writer({enableLoadMask:true});
		}
	}
});
