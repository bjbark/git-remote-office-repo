Ext.define('module.custom.dehansol.sale.salelist4.SaleList4', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.WkctCvicPopup'
	],

	models:['module.custom.dehansol.sale.salelist4.model.SaleList4',],
	stores:['module.custom.dehansol.sale.salelist4.store.SaleList4',],
	views:
	[
		'module.custom.dehansol.sale.salelist4.view.SaleList4Layout',
		'module.custom.dehansol.sale.salelist4.view.SaleList4Search',
		'module.custom.dehansol.sale.salelist4.view.SaleList4Lister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salelist4-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			// editer event
			'module-salelist4-editor button[action=updateAction]'		: { click : me.updateAction },	// 저장
			'module-salelist4-editor button[action=cancelAction]'		: { click : me.cancelAction },	// 취소
			// lister event
			'module-salelist4-lister button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-salelist4-lister button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-salelist4-lister button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			'module-salelist4-lister button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			'module-salelist4-lister button[action=printAction]'	: { click : me.printAction  },	// 매출일보발행
			// lister event
			'module-salelist4-lister' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-salelist4-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salelist4-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salelist4-lister')[0] }
	},


	//조회
		selectAction:function() {
			var me = this,
				lister = me.pocket.lister(),
				search = me.pocket.search(),
				param = search.getValues(),
				tpanel = me.pocket.layout().down('#mainpanel')
			;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			if(param.invc1_date == ''|| param.invc2_date == '') {
				Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
				return;
			}else if(param.invc1_date>param.invc2_date) {
				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
				return;
			}
			else{
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}
		},

	// 일보발행
	printAction:function() {
		var me = this,
			jrf = 'Dehansol_Sale_Daily.jrf',
			resId = _global.hq_id.toUpperCase(),
			param = me.pocket.search().getValues(),
			cstm_idcd
		;

		if(param.cstm_idcd.length <= 0){
			cstm_idcd = 'null';
		}
		var err_msg = "";
			var arg =	'invc1_date~'+param.invc1_date+'~invc2_date~'+param.invc2_date+'~cstm_idcd~'+cstm_idcd+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
