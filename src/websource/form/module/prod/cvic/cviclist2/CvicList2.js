Ext.define('module.prod.cvic.cviclist2.CvicList2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup'
	],

	models	: [	'module.prod.cvic.cviclist2.model.CvicList2',
				'module.prod.cvic.cviclist2.model.CvicList2Detal1',
				'module.prod.cvic.cviclist2.model.CvicList2Detal2'
	],
	stores	: [	'module.prod.cvic.cviclist2.store.CvicList2',
				'module.prod.cvic.cviclist2.store.CvicList2Detail1',
				'module.prod.cvic.cviclist2.store.CvicList2Detail2'
	],
	views:
	[
		'module.prod.cvic.cviclist2.view.CvicList2Layout',
		'module.prod.cvic.cviclist2.view.CvicList2Search',
		'module.prod.cvic.cviclist2.view.CvicList2Lister',
		'module.prod.cvic.cviclist2.view.CvicList2ListerDetail1',
		'module.prod.cvic.cviclist2.view.CvicList2ListerDetail2'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cviclist2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-cviclist2-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-cviclist2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-cviclist2-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-cviclist2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cviclist2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-cviclist2-lister')[0] },
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
		var me = this;
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
