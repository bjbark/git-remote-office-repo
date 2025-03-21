 Ext.define('module.workshop.sale.order.estilist.EstiList', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.MmbrPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.ShetPopup',
		'lookup.popup.view.ItemClassPopup',
	],
	models	: [
		'module.workshop.sale.order.estilist.model.EstiList',
		'module.workshop.sale.order.estilist.model.EstiListCnslLister'
	],
	stores	: [
		'module.workshop.sale.order.estilist.store.EstiList',
		'module.workshop.sale.order.estilist.store.EstiListCnslLister',
		'module.workshop.sale.order.estilist.store.EstiListCopy',
	],
	views	: [
		'module.workshop.sale.order.estilist.view.EstiListLayout',
		'module.workshop.sale.order.estilist.view.EstiListSearch',
		'module.workshop.sale.order.estilist.view.EstiListLister',
		'module.workshop.sale.order.estilist.view.EstiListLister2',
		'module.workshop.sale.order.estilist.view.EstiListCnslLister',
		'module.workshop.sale.order.estilist.view.EstiListUploadPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-workshop-estilist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			// lister event
			'module-workshop-estilist-lister button[action=fileAction]'   : { click : me.fileAction   },	// 수주확정
			// lister event
			'module-workshop-estilist-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workshop-estilist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workshop-estilist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-workshop-estilist-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-workshop-estilist-lister2')[0] }
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
		var	me = this,
			editor2 = me.pocket.lister2()
		;
		editor2.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},
	fileAction:function(){
		var	me     = this,
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-estilist-upload-popup',
				params : {
					invc_numb : select.get('invc_numb'),
					line_seqn : select.get('line_seqn')
				},
				result : function(records) {
				}
			});
		}else{
			Ext.Msg.alert('알림','견적을 선택해주세요.');
		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});