Ext.define('module.cust.cstmprice.CstmPrice', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [
		'module.cust.cstmprice.model.CstmPriceMaster',
		'module.cust.cstmprice.model.CstmPriceDetail'
	],
	stores : [
		'module.cust.cstmprice.store.CstmPriceMaster',
		'module.cust.cstmprice.store.CstmPriceDetail'
	],
	views: [
		'module.cust.cstmprice.view.CstmPriceLayout',
		'module.cust.cstmprice.view.CstmPriceSearch',
		'module.cust.cstmprice.view.CstmPriceLister',
		'module.cust.cstmprice.view.CstmPriceListerDetail1',
		'module.cust.cstmprice.view.CstmPriceListerDetail2',
		'module.cust.cstmprice.view.CstmPriceWorkerSearch',
		'module.cust.cstmprice.view.CstmPriceEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cstmprice-layout button[action=selectAction]' : { click : me.selectAction },			// 조회
			'module-cstmprice-worker-search button[action=selectAction2]' : { click : me.selectAction2 },	// 조회
			'module-cstmprice-worker-search button[action=selectAction3]' : { click : me.selectAction3 },	// 조회
			'module-cstmprice-layout #itempanel' : {
				tabchange : me.itemTabChange
			},
			// lister event
			'module-cstmprice-lister button[action=exportAction]' : { click : me.exportAction  },	// 엑셀

			// detail
			'module-cstmprice-lister-detail1 button[action=updateAction]' : { click : me.updateAction  },	// 저장
			'module-cstmprice-lister-detail2 button[action=updateAction]' : { click : me.updateAction2  },	// 저장
			'module-cstmprice-lister-detail2 button[action=cancelAction]' : { click : me.cancelAction  },	// 저장
			// lister event
			'module-cstmprice-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-cstmprice-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-cstmprice-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-cstmprice-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-cstmprice-lister')[0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-cstmprice-lister-detail1')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-cstmprice-lister-detail2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-cstmprice-worker-search')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister		= me.pocket.lister(),
			search		= me.pocket.search(),
			param		= search.getValues(),
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			layout		= me.pocket.layout(),
			search1		= layout.down('[itemId=search1]'),
			search2		= layout.down('[itemId=search2]'),
			optn1 	= param.optn_1,
			optn2 	= param.optn_2,
			optn3	= param.optn_3,
			optn4 	= param.optn_4,
			optn5 	= param.optn_5,
			optn6 	= param.optn_6
		;

		if(optn1 != 'on' && optn2 != 'on' && optn3 != 'on' && optn4 != 'on' && optn5 != 'on' && optn6 != 'on'){
			Ext.Msg.alert("알림","거래처 구분을 선택하여주십시오.");
			return;
		}

		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		search1.down('[itemId=sale1]').hide();
		search1.down('[itemId=buy1]').hide();
		search2.down('[itemId=sale1]').hide();
		search2.down('[itemId=buy1]').hide();
	},


	//선택
	selectRecord:function( grid, record){
		var me = this,
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			lister		= me.pocket.lister(),
			layout		= me.pocket.layout(),
			param		= me.pocket.search().getValues(),
			search		= me.pocket.workersearch(),
			buy			= layout.down('#buy'),  //구매단가목록
			sale		= layout.down('#sale'), //판매단가목록
			search1		= layout.down('[itemId=search1]'),
			search2		= layout.down('[itemId=search2]'),
			itempanel	= layout.down('#itempanel'),
			records		= lister.getSelectionModel().getSelection()[0]
		;
		if(record.length > 0){
			if(record[0].get('sale_cstm_yorn') == '1' && record[0].get('puch_cstm_yorn') == '0'){						// 체크해서 tab hide show 처리
				sale.tab.show();
				buy.tab.hide();
				search1.down('[itemId=sale1]').show();
				search1.down('[itemId=buy1]').hide();
				itempanel.setActiveTab(sale);								// 2022.03.16 - 뉴볼텍인 경우 거래처, 단가정보가 표시되지 않도록 처리
			}
			if(record[0].get('sale_cstm_yorn') == '0' && record[0].get('puch_cstm_yorn') == '1'){
				sale.tab.hide();
				buy.tab.show();
				search2.down('[itemId=sale1]').hide();
				search2.down('[itemId=buy1]').hide();
				itempanel.setActiveTab(buy);
				}
			if(record[0].get('sale_cstm_yorn') == '1' && record[0].get('puch_cstm_yorn') == '1'){
				sale.tab.show();
				buy.tab.show();
				search2.down('[itemId=sale1]').hide();
				search2.down('[itemId=buy1]').hide();
				itempanel.setActiveTab(sale);
				itempanel.setActiveTab(buy);
				}
//		else{
//				layout.down('[dataIndex=puch_cstm_yorn]').show();
//				layout.down('[dataIndex=sale_cstm_yorn]').show();
//			}


			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

				detail1.select({
					callback:function(records, operation, success) {
						if (success) {
							detail1.getSelectionModel().select(0);
						} else { }
							mask.hide();
					}, scope:me
				}, Ext.merge({stor_id : _global.stor_id,
							cstm_idcd : record[0].get('cstm_idcd'),
							})
						);
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
							detail2.getSelectionModel().select(0);
						} else { }
							mask.hide();
					}, scope:me
				}, Ext.merge({stor_id : _global.stor_id,
							cstm_idcd : record[0].get('cstm_idcd'),
							})
						);

//				search.down('[name=cstm_idcd]').setValue(record[0].get('cstm_idcd'));
		}
	},

	//구매목록 조회
	selectAction2 : function() {
		var me = this,
			layout		= me.pocket.layout(),
			lister		= me.pocket.lister(),
			records		= lister.getSelectionModel().getSelection()
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			search		= me.pocket.workersearch(),
			param		= search.getValues(),
			search1		= layout.down('[itemId=buy]')
			cstm_idcd	= search1.down('[name=cstm_idcd]').getValue()
			item_name	= search1.down('[name=item_name]').getValue()
			item_spec	= search1.down('[name=item_spec]').getValue()
			item_clss_bacd_name = search1.down('[name=item_clss_bacd_name]').getValue()
			record		= undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "품목을 조회할 거래처를 먼저 조회하여 선택해 주십시오.");
			return;
		}else{
			mask.show();
			var param = ({
				stor_id		: _global.stor_id,
				hqof_idcd	: _global.hqof_idcd,
				cstm_idcd	: records[0].get('cstm_idcd'),
				item_name	: item_name,
				item_spec	: item_spec,
				item_clss_bacd_name	: item_clss_bacd_name,
				job_dvcd	: 'cstm'
			})
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.hide();
					} else { }
				}, scope:me
			}, Ext.merge(	{cstm_idcd : records[0].get('cstm_idcd'), item_name : item_name, item_spec : item_spec, item_clss_bacd_name : item_clss_bacd_name,
							stor_id : _global.stor_id}));

			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.hide();
					} else { }
				}, scope:me
			}, Ext.merge(	{cstm_idcd : records[0].get('cstm_idcd'), item_name : item_name, item_spec : item_spec, item_clss_bacd_name : item_clss_bacd_name,
							stor_id : _global.stor_id}));
		}
	},

	//판매목록 조회
	selectAction3 : function() {
		var me = this,
			layout		= me.pocket.layout(),
			lister		= me.pocket.lister(),
			records		= lister.getSelectionModel().getSelection()
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			search		= me.pocket.workersearch(),
			param		= search.getValues(),
			search2		= layout.down('[itemId=sale]')
			cstm_idcd	= search2.down('[name=cstm_idcd]').getValue()
			item_name2	= search2.down('[name=item_name]').getValue()
			item_spec2	= search2.down('[name=item_spec]').getValue()
			item_clss_bacd_name2 = search2.down('[name=item_clss_bacd_name]').getValue()
			record		= undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "품목을 조회할 거래처를 먼저 조회하여 선택해 주십시오.");
			return;
		}else{
			mask.show();
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.hide();
					} else { }
				}, scope:me
			}, Ext.merge(	{cstm_idcd : records[0].get('cstm_idcd'), item_name : item_name2, item_spec : item_spec2, item_clss_bacd_name : item_clss_bacd_name2,
							stor_id : _global.stor_id}));

			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.hide();
					} else { }
				}, scope:me
			}, Ext.merge(	{cstm_idcd : records[0].get('cstm_idcd'), item_name : item_name2, item_spec : item_spec2, item_clss_bacd_name : item_clss_bacd_name2,
							stor_id : _global.stor_id}));
		}
	},


	updateAction:function() {
		var me		= this,
			detail1	= me.pocket.detail1(),
			store	= detail1.getStore(),
			msg		= '';
		;
		store.each(function(findrecord) {
			var	item = findrecord.get('item_idcd'),
				pric = findrecord.get('cont_pric'),
				date = findrecord.get('cont_date'),
				drtr = findrecord.get('drtr_idcd')
			;
			if(!item){
				msg = '품명을 선택하여 주십시오..';
				return;
			}
			if(!date){
				msg = '계약일자를 선택하여 주십시오..';
				return;
			}
			if(!pric ){
				msg = '계약단가를 입력하여 주십시오..';
				return;
			}
		});
		if(msg){
			Ext.Msg.alert('알림',msg);
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			store.sync({
				success : function(operation){
//					Ext.Msg.alert("알림","저장되었습니다. ");
				},
				callback: function(batch, options) {
					store.reload();
				},
				scope: me
			},{	synchro : _global.objects.synchro} );

			mask.hide();
		}
	},

	updateAction2:function() {
		var me		= this,
			detail2	= me.pocket.detail2(),
			store	= detail2.getStore(),
			msg		= '';
		;
		store.each(function(findrecord) {
			var	item = findrecord.get('item_idcd'),
				pric = findrecord.get('pric_dvcd'),
				date = findrecord.get('cont_date')
			;
			if(!item){
				msg = '품명을 선택하여 주십시오..';
				return;
			}
			if(!date){
				msg = '계약일자를 선택하여 주십시오..';
				return;
			}
			if(!pric ){
				msg = '단가구분을 선택하여 주십시오..';
				return;
			}
		});
		if(msg){
			Ext.Msg.alert('알림',msg);
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			store.sync({
				success : function(operation){
//					Ext.Msg.alert("알림","저장되었습니다. ");
				},
				callback: function(batch, options) {
					store.reload();
				} ,
				scope: me
			},{	synchro : _global.objects.synchro} );

			mask.hide();
		}
	},

	itemTabChange : function(tpanel){
		var	me			= this,
			tindex 	= tpanel.items.indexOf(tpanel.getActiveTab()),
			lister	= me.pocket.detail1(),
			store	= lister.getStore(),
			itemId 	= tpanel.getActiveTab().itemId
		;
		if(itemId == 'buy'){
			store.clearFilter(true);
			store.filter('pric_dvcd','3000');
		}else{
			store.clearFilter(true);
			store.filter([
		          {filterFn: function(item){
		        	  return item.get("pric_dvcd") < 3000;
		          }}
		    ]);
		}
	},

	cancelAction : function(){
		var me		= this
			detail2	= me.pocket.detail2(),
			store	= detail2.getStore()
		;
		store.reload();
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});

	}
});
