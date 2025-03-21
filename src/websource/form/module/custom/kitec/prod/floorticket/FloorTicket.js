Ext.define('module.custom.kitec.prod.floorticket.FloorTicket', { extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CvicPopup',
	],
	models	: [
		'module.custom.kitec.prod.floorticket.model.FloorTicket'
	],
	stores	: [
		'module.custom.kitec.prod.floorticket.store.FloorTicket'
	],
	views	: [
		'module.custom.kitec.prod.floorticket.view.FloorTicketLayout',
		'module.custom.kitec.prod.floorticket.view.FloorTicketLister',
		'module.custom.kitec.prod.floorticket.view.FloorTicketSearch',
		'module.custom.kitec.prod.floorticket.view.FloorTicketPopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-kitec-floorticket-search button[action=selectAction]' : { click : me.selectAction },
			'module-kitec-floorticket-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-kitec-floorticket-lister button[action=insertAction]' : { click : me.insertAction },
			'module-kitec-floorticket-lister button[action=exportAction]' : { click : me.exportAction },
			'module-kitec-floorticket-editor button[action=updateAction]' : { click : me.updateAction },
			'module-kitec-floorticket-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-kitec-floorticket-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-kitec-floorticket-lister button[action=printAction]'  : { click : me.printAction   },		//

		});
		me.callParent(arguments);

	},
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-kitec-floorticket-search')[0]; },
		layout  : function () { return Ext.ComponentQuery.query('module-kitec-floorticket-layout')[0]; },
		editor  : function () { return Ext.ComponentQuery.query('module-kitec-floorticket-editor')[0]; },
		lister  : function () { return Ext.ComponentQuery.query('module-kitec-floorticket-lister')[0]; },
		popup   : function () { return Ext.ComponentQuery.query('module-kitec-floorticket-popup')[0]; }
	},

	/**
	 * 조회
	 */
	selectAction:function(config){
		var	me	= this,
			lister = me.pocket.lister(),
			values = me.pocket.search().getValues(),
			store  = lister.getStore()
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
		}, Ext.merge( me.pocket.search().getValues(), {hq_id :_global.hq_id, stor_grp:_global.stor_grp,acct_bacd:'제품',line_stat : 0} ) );
	},


	printAction:function() {
		var	me		= this,
			popup	= me.pocket.popup(),
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()[0],
			chk		= 0
		;
		if(select){
			if(select.get('item_idcd')==select.get('rpst_item_idcd')){
				chk = 1;
			}
			resource.loadPopup({
				widget : 'module-kitec-floorticket-popup',
				params : {
					item_idcd	: select.get('item_idcd')
				}
			});
		}else{
			Ext.Msg.alert('알림','품목을 선택해주세요.');
		}
	},

});