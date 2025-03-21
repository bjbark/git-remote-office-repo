 Ext.define('module.workshop.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.DeptPopup'],
	models	: ['module.workshop.prod.workentry.model.WorkEntry'],
	stores	: ['module.workshop.prod.workentry.store.WorkEntry'],
	views	: [
		'module.workshop.prod.workentry.view.WorkEntryLayout',
		'module.workshop.prod.workentry.view.WorkEntrySearch',
		'module.workshop.prod.workentry.view.WorkEntryLister',
		'module.workshop.prod.workentry.view.WorkPopup',
		'module.workshop.prod.workentry.view.PlanPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-workentry-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-workentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-workentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-workentry-lister button[action=code_ini]'	 : { click : me.copyAction },	// 수정
			'module-workentry-lister button[action=modifyAction]' : { click : me.modifyAction },// 수정
			'module-workentry-lister button[action=planAction]' : { click : me.planAction },	// 생산실적등록
			'module-workentry-lister button[action=exportAction]' : { click : me.exportAction },// 엑셀

			// lister event
			'module-workentry-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workentry-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-workentry-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-workentry-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	itemInputAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-clntcode-input-popup'
		});
	},

	planAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-plan-popup'
		});
	},

	workAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-work-popup'
		});
	},

	ReleaseAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-release-popup'
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});