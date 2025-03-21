Ext.define('module.custom.iypkg.sale.order.slorlist1.SlorList1', { extend:'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.custom.iypkg.sale.order.slorlist1.model.SlorList1'
	],
	stores	: [
		'module.custom.iypkg.sale.order.slorlist1.store.SlorList1'
	],
	views	: [
		'module.custom.iypkg.sale.order.slorlist1.view.SlorList1Layout',
		'module.custom.iypkg.sale.order.slorlist1.view.SlorList1Lister',
		'module.custom.iypkg.sale.order.slorlist1.view.SlorList1Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-slorlist1-layout button[action=selectAction]' : { click : me.selectAction },		// 조회
			// lister event
			'module-slorlist1-lister button[action=exportAction]' : { click : me.exportAction },		// 엑셀
			'module-slorlist1-lister button[action=printAction]' : { click : me.printAction },			// 수발대장발행
			'module-slorlist1-lister' : {
				selectionchange : me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-slorlist1-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-slorlist1-search') [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-slorlist1-lister') [0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date>param.invc2_date){
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
			mask.show();
		
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	attachRecord:function( smodel, record ){
		var	me	= this,
			lister= smodel ? smodel.view.ownerCt : me.pocket.lister(),
			record= record ? record[0] : lister.getSelectionModel().getSelection()[0],
			store = lister.getStore()
			selection = lister.getSelectionModel().getSelection()[0]
		;
//		if(selection){
////			console.log(store);
//			store.each(function(findrecord){
//				if(findrecord.get('hidden_numb') == selection.data.hidden_numb && findrecord.get('hidden_rnum') == selection.data.hidden_rnum){
//					lister.getSelectionModel().select(findrecord.index,true);
//				}
//			});
//		}
	},

	// 수발대장 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister(),
			search = me.pocket.search(),
			select = master.getSelectionModel().getSelection()[0],
			param	= search.getValues(),
			jrf = 'daea_slorlist1.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {


			var param = 'param~{\'fr_invc_date\':\''+param.fr_invc_date.replace(/\-/g,'')+'\',\'to_invc_date\':\''+param.to_invc_date.replace(/\-/g,'')+'\',\'chk\':\''+param.chk+'\'}~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+param+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},


	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});