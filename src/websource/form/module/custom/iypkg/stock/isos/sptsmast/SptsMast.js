Ext.define('module.custom.iypkg.stock.isos.sptsmast.SptsMast', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CarPopup',
		'lookup.popup.view.BzplPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload',
		],

	models	: [
		'module.custom.iypkg.stock.isos.sptsmast.model.SptsMast'
		],
	stores	: [
		'module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister',
		'module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister2',
		'module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister3',
	 	],
	views	: [
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLayout',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastSearch',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLister',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLister2',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLister3',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastEditor',
		'module.custom.iypkg.stock.isos.sptsmast.view.SptsMastPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-sptsmast-layout #mainpanel'					: { tabchange : me.selectAction		},
			'module-sptsmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

			// lister event
			'module-sptsmast-lister2 button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-sptsmast-lister2 button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			'module-sptsmast-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀

			'module-sptsmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
//			'module-sptsmast-search combobox[name=site_id]' : { select: me.selectLookup  },

			'module-sptsmast-lister3 button[action=openAction]' : { click : me.openAction }, /* 출하계획서 출력 */


			'module-sptsmast-lister' : {
				selectionchange    : me.selectDetail,
			},
		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-sptsmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sptsmast-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-sptsmast-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-sptsmast-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-sptsmast-lister3')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-sptsmast-popup')[0] },
	},


	//조회
	selectAction:function(){
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex==0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp  }));
		}else{
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp  }));
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2()
		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb')});
		}
	},

	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			store  = lister2.getStore(),
			changes  = lister2.getStore().getUpdatedRecords().length,
			change   = lister2.getStore().data.items,
			length   = lister2.getStore().data.items.length,
			remove   = lister2.getStore().removed.length,
			tpanel = me.pocket.layout().down('#mainpanel'),
			record2 = lister.getSelectionModel().getSelection()[0]
		;
		var qntt = 0;
		store.each(function(rec){
			qntt += rec.get('trst_qntt');
		})
		if(qntt > record2.get('acpt_qntt')){
			Ext.Msg.alert("알림","수주수량보다 계획량이 더많습니다.");
			return;
		}
		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무

			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister2.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('invc_date')==""){
				msg = "계획일자를 입력해주세요.";
				return false;
			}
			if(record.get('trst_qntt')==""){
				msg = "계획수량을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		var rec = lister2.getStore().getUpdatedRecords();
		lister2.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

//	updateAction2:function() {
//		var me = this,
//			lister = me.pocket.lister2(),
//			store  = lister.getStore(),
//			changes  = lister.getStore().getUpdatedRecords().length,
//			change   = lister.getStore().data.items,
//			length   = lister.getStore().data.items.length,
//			remove   = lister.getStore().removed.length,
//			tpanel = me.pocket.layout().down('#mainpanel')
//		;
//
//		for (var i = 0; i < changes; i++) {
//			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
//				chk = 1;
//				break;
//			}
//		}
//
//		if (changes == 0 && change.length == 0 && remove==0 ) {
//			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
//		}else{
//			if(length >0){
//				modify   = change[length-1].get('modify');		//수정유무
//			}
//			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
//				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
//				return;
//			}
//		}
//		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
//		mask.show();
//		var store = lister.getStore();
//		var msg = "";
//		store.each(function(record){
//			if(record.get('cstm_name')==""){
//				msg = "거래처를 입력해주세요.";
//				return false;
//			}
//			if(record.get('item_name')==""){
//				msg = "샘플명을 입력해주세요.";
//				return false;
//			}
//			if(record.get('spec_1fst')==""){
//				msg = "규격1을 입력해주세요.";
//				return false;
//			}
//		});
//		if(msg!=""){
//			Ext.Msg.alert('알림',msg);
//			mask.hide();
//			return;
//		}
//		lister.getStore().sync({
//			success : function(operation){ me.selectAction();},
//			failure : function(operation){ },
//			callback: function(operation){
//				mask.hide();
//			}
//		});
//	},



	//취소
	cancelAction : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister2()
		;

		lister.getStore().reload();
	},

	openAction : function() {
		resource.loadPopup({
			widget : 'module-sptsmast-popup',
			param: {}
		});
	},



	//엑셀
	exportAction : function(){
		this.pocket.lister().excelExport();
	},

	exportAction2 : function(button){
		var value = button.button ;
		this.pocket.lister2().excelExport();
	},
});

