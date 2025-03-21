Ext.define('module.custom.symct.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.custom.symct.prod.workentry.view.WorkCvicPopup',
		'module.custom.symct.prod.workentry.view.WorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.PjodPopup',
	],

	models:[
		'module.custom.symct.prod.workentry.model.WorkEntry',
		'module.custom.symct.prod.workentry.model.WorkEntryDetail',
		'module.custom.symct.prod.workentry.model.WorkEntryDetail2',
		'module.custom.symct.prod.workentry.model.WorkEntryDetail3'
	],
	stores:[
		'module.custom.symct.prod.workentry.store.WorkEntry',
		'module.custom.symct.prod.workentry.store.WorkEntryDetail',
		'module.custom.symct.prod.workentry.store.WorkEntryDetail2',
		'module.custom.symct.prod.workentry.store.WorkEntryDetail3'
	],
	views:
	[
		'module.custom.symct.prod.workentry.view.WorkEntryLayout',
		'module.custom.symct.prod.workentry.view.WorkEntrySearch',
		'module.custom.symct.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.symct.prod.workentry.view.WorkEntryListerDetail',
		'module.custom.symct.prod.workentry.view.WorkEntryListerDetail2',
		'module.custom.symct.prod.workentry.view.WorkEntryListerDetail3',
		'module.custom.symct.prod.workentry.view.WorkEntryListerDetailSearch',
//		'module.custom.symct.prod.workentry.view.WorkEntryEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			// editer event
			'module-symct-workentry-layout #mainpanel'					: { tabchange : me.tabChange },
			'module-symce-workentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-symce-workentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-symct-workentry-lister button[action=exportAction]' : { click : me.exportAction },	// master엑셀

			'module-symct-workentry-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-symct-workentry-lister' : {
//				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
			},
			'module-symct-workentry-detailSearch button[action=selectAction]' : { click : me.selectAction}

		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-symct-workentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-symct-workentry-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-symct-workentry-lister')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-symct-workentry-detail')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-symct-workentry-detail2')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-symct-workentry-detail3')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-symce-workentry-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-symct-workentry-detailSearch')[0] }
	},

	//선택
	tabChange:function(){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
			lister2 = undefined
		;
		if(tindex == 0){
			lister = me.pocket.lister();

		}else{
			if(tindex == 1){
				lister = me.pocket.detail2();
			}
		}
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( {wkct_idcd : param.wkct_name,stor_id : _global.stor_id,work_date:param.work_date, pjod_idcd: param.pjod_idcd}) );
	},
	selectAction:function(){
		var me = this,
			detailSearch = me.pocket.detailSearch(),
			params = detailSearch.getValues(),
			detail3 = me.pocket.detail3()
		;
		detail3.select({
			callback:function(records, operation, success) {
				if (success) {

				} else { }
			}, scope:me
		}, Ext.merge( {work_date:params.work_date, work_date2:params.work_date2,prog_stat_dvcd:params.prog_stat_dvcd,wkct_idcd:params.wkct_idcd,pjod_idcd:params.pjod_idcd}) );
	},
	//수정
	modifyAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			mrecord		= mrecord ? record[0] : lister.getSelectionModel().getSelection()[0],
			editor = me.pocket.editor()
		;
		var dssedate = mrecord.data.dsse_date;
		editor.modifyRecord({
			caller	: me,
			callback: function( results) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}
			}
		});
	},

	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					 { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true,  });},
						failure : function(operation){ results.feedback({success : false,  });},
						callback: function(operation){ results.callback({});}
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					switch (operation) {
					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
					break;
				}
				}
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.getForm().reset();
	},

	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(record){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
