Ext.define('module.sale.sale.salelist2.SaleList2', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload'
	],
	models	: [
		'module.sale.sale.salelist2.model.SaleList2',
	],
	stores	: [
		'module.sale.sale.salelist2.store.SaleList2',
	],
	views	: [
		'module.sale.sale.salelist2.view.SaleList2Layout',
		'module.sale.sale.salelist2.view.SaleList2Lister',
		'module.sale.sale.salelist2.view.SaleList2Search'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-salelist2-layout button[action=selectAction]' : { click : me.selectAction },

			'module-salelist2-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-salelist2-lister button[action=insertAction]' : { click : me.insertAction },
			'module-salelist2-lister button[action=exportAction]' : { click : me.exportAction },
			'module-salelist2-lister button[action=deleteAction]' : { click : me.deleteAction },


			'module-salelist2-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-salelist2-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-salelist2-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-salelist2-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-salelist2-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('cstm_idcd'),orgn_dvcd : 'cstm_mast', line_seqn : 1 });
			editorlister.down('[name=file]').popup.params.invc_numb = record[0].get('cstm_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.

		}
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

