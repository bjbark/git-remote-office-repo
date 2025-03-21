Ext.define('module.mtrl.po.poplan.PoPlan', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupKortc',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.mtrl.po.poplan.model.PoPlanMaster1',
		'module.mtrl.po.poplan.model.PoPlanMaster2',
	],
	stores	: [
		'module.mtrl.po.poplan.store.PoPlanMaster1',
		'module.mtrl.po.poplan.store.PoPlanMaster2',
	],
	views	: [
		'module.mtrl.po.poplan.view.PoPlanLayout',
		'module.mtrl.po.poplan.view.PoPlanListerMaster1',
		'module.mtrl.po.poplan.view.PoPlanListerMaster2',
		'module.mtrl.po.poplan.view.PoPlanSearch',
		'module.mtrl.po.poplan.view.PoPlanOrderPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-poplan-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-poplan-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister1 event
			'module-poplan-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-poplan-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-poplan-lister-master1' : {
				itemdblclick : me.selectDetail1 ,
				selectionchange : me.attachRecord
			},
			'module-poplan-lister-master2' : {
				itemdblclick : me.selectDetail2 ,
				selectionchange : me.attachRecord
			},
			//detail event
			'module-poplan-lister-detail button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
			'module-poplan-lister-master1 button[action=orderAction]'	: { click : me.orderAction	 }, /* 발주실행 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-poplan-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-poplan-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-poplan-lister-master1')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-poplan-lister-master2')[0] },
	},

	//조회

	selectAction:function() {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(param.invc1_date==''||param.invc1_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
		}else if(param.invc1_date > param.invc1_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
		}else{
//			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//			mask.show();

			if(tindex == 0){
				lister = master1;
			}else if(tindex == 1){
				lister = master2;
			}
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},
	orderAction:function() {
		var me = this,
			master = me.pocket.master1()
		;
		var err_msg = "";


		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "발주실행할 주문 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-poplan-order-popup',
		});

		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.line_seqn);
		Ext.ComponentQuery.query('#amnd_degr')[0].setValue(records[0].data.amnd_degr);
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		master2= smodel ? smodel.view.ownerCt : me.pocket.master2(),
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master2.getSelectionModel().getSelection()[0]
		;
		if (record) {
		}
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
});