Ext.define('module.prod.jig.jiglist.JigList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.upload.BoardUpload'
	],
	models : [
		'module.prod.jig.jiglist.model.JigList',
		'module.prod.jig.jiglist.model.JigListFile'
	],
	stores : [
		'module.prod.jig.jiglist.store.JigList',
		'module.prod.jig.jiglist.store.JigListFile'
	],
	views : [
		'module.prod.jig.jiglist.view.JigListLayout',
		'module.prod.jig.jiglist.view.JigListSearch',
		'module.prod.jig.jiglist.view.JigListLister',
		'module.prod.jig.jiglist.view.JigListEditor',
		'module.prod.jig.jiglist.view.JigListEditorLister',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-jiglist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-jiglist-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-jiglist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-jiglist-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-jiglist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-jiglist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-jiglist-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-jiglist-editor')[0] },
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
		var me = this,
		editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
