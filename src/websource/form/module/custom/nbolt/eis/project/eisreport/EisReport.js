Ext.define('module.custom.nbolt.eis.project.eisreport.EisReport', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.BasePopup'
	],
	models	: [
		'module.custom.nbolt.eis.project.eisreport.model.EisReport'
	],
	stores	: [
		'module.custom.nbolt.eis.project.eisreport.store.EisReport'
	],
	views	: [
		'module.custom.nbolt.eis.project.eisreport.view.EisReportLayout',
		'module.custom.nbolt.eis.project.eisreport.view.EisReportLister',
		'module.custom.nbolt.eis.project.eisreport.view.EisReportSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport-layout button[action=selectAction]' : { click : me.selectAction	},		// 조회
			// lister event
			'module-eisreport-lister button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-eisreport-lister button[action=writeAction]' : { click : me.writeAction		},		// 생산지시서
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-eisreport-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-eisreport-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-eisreport-lister')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister()
			search  = me.pocket.search(),
			param   = search.getValues()
		;
		if(param.pdod_date1>param.pdod_date2) {
			Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
		}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
			Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
		}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
			Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});