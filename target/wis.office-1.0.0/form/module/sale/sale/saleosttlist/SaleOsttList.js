Ext.define('module.sale.sale.saleosttlist.SaleOsttList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.vend.VendPopup',
		'lookup.popup.view.StorePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup'

	],

	models:[
		'module.sale.sale.saleosttlist.model.SaleOsttListMaster',
		'module.sale.sale.saleosttlist.model.SaleOsttListDetail',
		'module.sale.sale.saleosttlist.model.SaleOsttListPart5'
	],

	stores:[
		'module.sale.sale.saleosttlist.store.SaleOsttListMaster',
		'module.sale.sale.saleosttlist.store.SaleOsttListDetail',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart2Master',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart2Detail',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart3',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart4',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart5',
		'module.sale.sale.saleosttlist.store.SaleOsttListPart5Detail'
	],

	views :['module.sale.sale.saleosttlist.view.SaleOsttListLayout',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart1Master',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart1Detail',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart2Master',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart2Detail',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart3',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart4',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart5',
		'module.sale.sale.saleosttlist.view.SaleOsttListListerPart5Detail',
		'module.sale.sale.saleosttlist.view.SaleOsttListSearch'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);

		this.joinPermission(workspace.down('module-salelist-lister-part1-master menuitem[action=closeAction]'),			Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-salelist-lister-part1-master menuitem[action=closeCancel]'),			Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-salelist-lister-part5 button[action=invGroupPrintAction]'),			Const.PERMIT.REPORT);
	},
	init: function() {
		var me = this;
		// 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용
		me.control({
			'module-salelist-layout button[action=selectAction]' : { click : me.selectAction }, /* 조회 */
			'module-salelist-lister-part1-master menuitem[action=closeAction]' : { click : me.closeAction }, /* 마감 */
			'module-salelist-lister-part1-master menuitem[action=closeCancel]' : { click : me.closeCancel }, /* 해지 */


			// lister event
			'module-salelist-lister-part1-master button[action=exportAction]'   : { click : me.exportAction }, /* 엑셀 */
			'module-salelist-lister-part1-detail button[action=invoiceConfigAction]' : { click : me.invoiceConfigAction }, /* 환경설정 메뉴가 생기기 전까지 임시용 */
			'module-salelist-lister-part1-detail button[action=exportAction]'        : { click : me.exportAction        }, /* 엑셀 */

			'module-salelist-lister-part2-master button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-salelist-lister-part3 button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-salelist-lister-part4 button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-salelist-lister-part5 button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-salelist-lister-part5 button[action=invGroupPrintAction]' : { click : me.invGroupPrintAction }, /* 청구서 발행 (고객별 집계) */
			'module-salelist-lister-part5-detail button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */

			'module-salelist-lister-part1-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.selectRecord
			},
			'module-salelist-lister-part2-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.selectRecord
			},
			'module-salelist-lister-part5' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.selectRecord
			},
			'module-salelist-layout #mainpanel'	: { tabchange : me.selectAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-salelist-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-salelist-search')[0] } ,
		editor  : function () { return Ext.ComponentQuery.query('module-salelist-editor')[0] } ,
		lister  : {
			part1_master: function () { return Ext.ComponentQuery.query('module-salelist-lister-part1-master')[0] } ,
			part1_detail: function () { return Ext.ComponentQuery.query('module-salelist-lister-part1-detail')[0] } ,
			part2_master: function () { return Ext.ComponentQuery.query('module-salelist-lister-part2-master')[0] } ,
			part2_detail: function () { return Ext.ComponentQuery.query('module-salelist-lister-part2-detail')[0] } ,
			part3		: function () { return Ext.ComponentQuery.query('module-salelist-lister-part3')[0] } ,
			part4		: function () { return Ext.ComponentQuery.query('module-salelist-lister-part4')[0] } ,
			part5		: function () { return Ext.ComponentQuery.query('module-salelist-lister-part5')[0] } ,
			part5_detail: function () { return Ext.ComponentQuery.query('module-salelist-lister-part5-detail')[0] }
		}
	},



	/**
	 * 조회
	 */
	selectAction:function(callbackFn) {
		var me = this,
		lister = undefined ,
		search = me.pocket.search(),
		param  = me.pocket.search().getValues(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		if ( tindex == 0 ) { /* 매출전표별 */
			lister = me.pocket.lister.part1_master() ;
			mask.show();
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope    : me
			}, Ext.merge( param , { stor_grp : _global.stor_grp }));
		} else if ( tindex == 1 ) { /* 상품별 현황 */
			lister = me.pocket.lister.part3() ;
//			mask.show();
			lister.select({
				callback	: function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				},
				scope	: me
			}, Ext.merge( param , { stor_grp : _global.stor_grp }));
		} else if ( tindex == 2 ) { /* 상품별 집계 */
			lister = me.pocket.lister.part4() ;
			mask.show();
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				},
				scope	: me
			}, Ext.merge( param , { stor_grp : _global.stor_grp }));
		} else if ( tindex == 3 ) { /* 고객별 집계 */
			lister = me.pocket.lister.part5() ;
			mask.show();
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				},
				scope	: me
			}, Ext.merge( param , { stor_grp : _global.stor_grp }));
		}
	},

	/**
	 * 선택
	 */
	selectRecord:function( grid, records ){
		var me = this,
			detail = undefined ,  //me.pocket.lister.part1_detail(),
			record = records[0],
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if ( tindex == 0 ) {

			detail = me.pocket.lister.part1_detail() ;
			detail.getStore().clearData();
			detail.getStore().loadData([],false);

		} else if (tindex == 3) {
			detail = me.pocket.lister.part5_detail() ;
			detail.getStore().clearData();
			detail.getStore().loadData([],false);
		}
	},

	/**
	 * 선택
	 */
	selectDetail:function( grid, record ){
		var me = this,
		detail = undefined,
		search = me.pocket.search(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if ( tindex == 0 ) {

			detail = me.pocket.lister.part1_detail() ;
			if (record) {
				var param = { stor_id : record.get('stor_id'), invc_numb :  record.get('invc_numb')};
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope    : me
				}, Ext.merge( param ));

			}
		} else if (tindex == 3 ) {
			detail = me.pocket.lister.part5_detail();
			if (record) {
				var param  = me.pocket.search().getValues();

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();

				detail.select({
					callback : function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope    : me
				}, Ext.merge( param , { cstm_idcd : record.get('cstm_idcd')}));
			}
		}
	},


	/*
	 * 액셀 저장
	 *
	 */
	exportAction : function(button){
		var value = button.button ;
		if (value == 'part1master') {
			this.pocket.lister.part1_master().writer({enableLoadMask:true});
		}

		if (value == 'part1detail') {
			this.pocket.lister.part1_detail().writer({enableLoadMask:true});
		}

		if (value == 'part3') {
			this.pocket.lister.part3().writer({enableLoadMask:true});
		}

		if (value == 'part4') {
			this.pocket.lister.part4().writer({enableLoadMask:true});
		}

		if (value == 'part5') {
			this.pocket.lister.part5().writer({enableLoadMask:true});
		}

		if (value == 'part5Detail') {
			this.pocket.lister.part5_detail().writer({enableLoadMask:true});
		}
	},

	taxReportAction:function(button) {
	}


});