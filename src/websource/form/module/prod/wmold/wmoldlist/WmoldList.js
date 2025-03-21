Ext.define('module.prod.wmold.wmoldlist.WmoldList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WmoldPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.prod.wmold.wmoldlist.model.WmoldList',
		'module.prod.wmold.wmoldlist.model.WmoldListFile',
		'module.prod.wmold.wmoldlist.model.WmoldListMove',
		'module.prod.wmold.wmoldlist.model.WmoldListInvoice',
		'module.prod.wmold.wmoldlist.model.WmoldListShot',
	],
	stores	: [
		'module.prod.wmold.wmoldlist.store.WmoldList',
		'module.prod.wmold.wmoldlist.store.WmoldListFile',
		'module.prod.wmold.wmoldlist.store.WmoldListMove',
		'module.prod.wmold.wmoldlist.store.WmoldListInvoice',
		'module.prod.wmold.wmoldlist.store.WmoldListShot',
	],
	views	: [
		'module.prod.wmold.wmoldlist.view.WmoldListLayout',
		'module.prod.wmold.wmoldlist.view.WmoldListSearch',
		'module.prod.wmold.wmoldlist.view.WmoldListLister',
		'module.prod.wmold.wmoldlist.view.WmoldListEditor',
		'module.prod.wmold.wmoldlist.view.WmoldListEditorLister',
		'module.prod.wmold.wmoldlist.view.WmoldListShotLister',
		'module.prod.wmold.wmoldlist.view.WmoldListMoveLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wmoldlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-wmoldlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-wmoldlist-lister' : {
				selectionchange: me.selectRecord	// 메뉴 선택 시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-wmoldlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-wmoldlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-wmoldlist-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-wmoldlist-editor')[0] },
		filelister : function () { return Ext.ComponentQuery.query('module-wmoldlist-editorlister')[0] },
		upload : function () { return Ext.ComponentQuery.query('module-wmoldlist-upload')[0] },
		movelister : function () { return Ext.ComponentQuery.query('module-wmoldlist-movelister')[0] },
		},


	//조회
	selectAction:function()
		{
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
		if(record[0] == null){
			return;
		}else{
			var me = this,
			editor = me.pocket.editor(),
			filelister = me.pocket.filelister(),
			movelister = me.pocket.movelister();
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ mold_idcd : record[0].get('mold_idcd') })},
				lister	: movelister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
					}
				},
			}, me);
			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('mold_idcd'),orgn_dvcd : 'mold_mast' });
		}
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
