Ext.define('module.qc.project.remklist.RemkList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.qc.project.remklist.model.RemkListMaster1',
		'module.qc.project.remklist.model.RemkListMaster2',
		'module.qc.project.remklist.model.RemkListDetail'
	],
	stores	: [
		'module.qc.project.remklist.store.RemkListMaster1',
		'module.qc.project.remklist.store.RemkListMaster2',
		'module.qc.project.remklist.store.RemkListDetail'
	],
	views	: [
		'module.qc.project.remklist.view.RemkListLayout',
		'module.qc.project.remklist.view.RemkListSearch',
		'module.qc.project.remklist.view.RemkListListerMaster1',
		'module.qc.project.remklist.view.RemkListListerMaster2',
		'module.qc.project.remklist.view.RemkListListerDetail',
		'module.qc.project.remklist.view.RemkListEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-remklist-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// layout event
			'module-remklist-lister-master1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-remklist-lister-master2 button[action=exportAction]'	: { click : me.exportAction1},	// 엑셀
			// lister detail event
			'module-remklist-lister-detail button[action=exportAction]'		: { click : me.exportAction2},	// 엑셀
			// lister master1 event
			'module-remklist-lister-master1' : {
				itemdblclick    : me.selectMaster ,
				selectionchange : me.attachRecord1
			},
			// lister master2 event
			'module-remklist-lister-master2' : {
				itemdblclick    : me.selectDetail ,
				selectionchange : me.attachRecord2
			},
			'module-remklist-lister-detail' : {
				selectionchange : me.attachRecord3
			},
			'module-remklist-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-remklist-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-remklist-search')[0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-remklist-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-remklist-lister-master2')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-remklist-lister-detail')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-remklist-editor')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster1(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			},{	pjod_idcd : record.get('pjod_idcd'),
				line_seqn : record.get('line_seqn')
			});
		}
	},

	selectMaster : function(grid, record) {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			listermaster2 = me.pocket.listermaster2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listermaster2.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd')});
		}
	},

	attachRecord1:function( smodel, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		listermaster.getStore().clearData();
		listermaster.getStore().loadData([],false);
	},

	attachRecord2:function( smodel, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	attachRecord3:function( smodel, record ){
		var me      = this,
			editor  = me.pocket.editor(),
			lister  = smodel ? smodel.view.ownerCt : me.pocket.listerdetail(),
			mrecord = lister.getSelectionModel().getSelection()
		;

		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : mrecord ? mrecord : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},

	exportAction2 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});