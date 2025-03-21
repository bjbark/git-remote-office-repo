Ext.define('module.prod.project.prjtworkentry.PrjtWorkEntry', { extend:'Axt.app.Controller',

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
		'lookup.popup.view.PjodPopup'

	],

	models:[
		'module.prod.project.prjtworkentry.model.PrjtWorkEntry',
		'module.prod.project.prjtworkentry.model.PrjtWorkEntryDetail',
		'module.prod.project.prjtworkentry.model.PrjtWorkEntryDetail2',
		'module.prod.project.prjtworkentry.model.PrjtWorkEntryDetail3'
	],
	stores:[
		'module.prod.project.prjtworkentry.store.PrjtWorkEntry',
		'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail',
		'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail2',
		'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail3'
	],
	views:
	[
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryLayout',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntrySearch',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryListerMaster',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail2',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail3',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetailSearch',
		'module.prod.project.prjtworkentry.view.PrjtWorkEntryEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			// editer event
			'module-prjtworkentry-layout #mainpanel'				  : { tabchange : me.tabChange },
			'module-prjtworkentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-prjtworkentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-prjtworkentry-lister button[action=exportAction]' : { click : me.exportAction },	// master엑셀

			'module-prjtworkentry-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-prjtworkentry-lister' : {
//				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
			},
			'module-prjtworkentry-detailSearch button[action=selectAction]' : { click : me.selectAction}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-prjtworkentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prjtworkentry-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-prjtworkentry-lister')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-prjtworkentry-detail')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-prjtworkentry-detail2')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-prjtworkentry-detail3')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-prjtworkentry-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-prjtworkentry-detailSearch')[0] }
		},
	//선택
	tabChange:function( ){
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
			lister2 = undefined
		;
		if(param.wkct_name){
			if(tindex == 0){
				lister = me.pocket.lister();
				lister2 = me.pocket.detail();
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( {wkct_idcd : param.wkct_name,stor_id : _global.stor_id}) );

			}else{
				if(tindex == 1){
					lister = me.pocket.detail2();
				}
			}
			if(tindex != 2){
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( {wkct_idcd : param.wkct_name,stor_id : _global.stor_id,work_date:param.work_date}) );
			}
		}
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
//					editor.collapse(false);
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
