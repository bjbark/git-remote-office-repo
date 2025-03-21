 Ext.define('module.workshop.sale.sale.coltwork.ColtWork', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.DeptPopup'],
	models	: ['module.workshop.sale.sale.coltwork.model.ColtWork'],
	stores	: ['module.workshop.sale.sale.coltwork.store.ColtWork'],
	views	: [
		'module.workshop.sale.sale.coltwork.view.ColtWorkLayout',
		'module.workshop.sale.sale.coltwork.view.ColtWorkSearch',
		'module.workshop.sale.sale.coltwork.view.ColtWorkLister',
		'module.workshop.sale.sale.coltwork.view.ColtOrderPopup',
		'module.workshop.sale.sale.coltwork.view.ColtInsertPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-coltwork-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			// lister event
			'module-coltwork-lister button[action=coltinsertAction]'	: { click : me.coltinsertAction },	// 개별 수금등록
			'module-coltwork-lister button[action=orderAction]'			: { click : me.orderAction },		// 수금등록
			'module-coltwork-lister button[action=exportAction]' 		: { click : me.exportAction },		// 엑셀

			'module-coltwork-editor button[action=inputAction]'			: { click : me.itemInputAction }, /* 고객등록 */
			// lister event
			'module-coltwork-lister' : {
//				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-coltwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-coltwork-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-coltwork-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-coltwork-lister')[0] }
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

	coltinsertAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-coltinsert-popup'
		});
	},

	orderAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-coltorder-popup'
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

	//삭제
	deleteAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});