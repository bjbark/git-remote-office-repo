Ext.define('module.item.itemprice.ItemPrice', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [
		'module.item.itemprice.model.ItemPriceMaster',
		'module.item.itemprice.model.ItemPriceDetail'
	],
	stores : [
		'module.item.itemprice.store.ItemPriceMaster',
		'module.item.itemprice.store.ItemPriceDetail'
	],
	views: [
		'module.item.itemprice.view.ItemPriceLayout',
		'module.item.itemprice.view.ItemPriceSearch',
		'module.item.itemprice.view.ItemPriceLister',
		'module.item.itemprice.view.ItemPriceListerDetail1',
		'module.item.itemprice.view.ItemPriceListerDetail2',
		'module.item.itemprice.view.ItemPriceEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemprice-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

			//
			'module-itemprice-layout #itempanel' : {
				tabchange : me.itemTabChange
			},
			// lister event
			'module-itemprice-lister button[action=exportAction]' : { click : me.exportAction  },	// 엑셀

			// detail
			'module-itemprice-lister-detail1 button[action=updateAction]' : { click : me.updateAction  },	// 저장
			'module-itemprice-lister-detail2 button[action=updateAction]' : { click : me.updateAction2  },	// 저장
			'module-itemprice-lister-detail2 button[action=cancelAction]' : { click : me.cancelAction  },	// 저장
			// lister event
			'module-itemprice-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout 	: function () { return Ext.ComponentQuery.query('module-itemprice-layout')[0] },
		search 	: function () { return Ext.ComponentQuery.query('module-itemprice-search')[0] },
		lister 	: function () { return Ext.ComponentQuery.query('module-itemprice-lister')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-itemprice-lister-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-itemprice-lister-detail2')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister		= me.pocket.lister(),
			detail1		= me.pocket.detail1(),
			detail2		= me.pocket.detail2(),
			search		= me.pocket.search(),
			param		= search.getValues(),
			layout		= me.pocket.layout(),
			buy			= layout.down('#buy'),  //구매단가
			sale		= layout.down('#sale'), //판매단가
			itempanel	= layout.down('#itempanel'),
			str			= Language.get('acct_bacd','계정구분')
		;
		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);
		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		if(param.acct_code == ''||param.acct_code == null) {
			Ext.Msg.alert("알림",str+"을(를) 반드시 선택하여주십시오.");
		}else{
			if(param.acct_code == '3000' || param.acct_code == '4000'){			// 체크해서 tab hide show 처리
				if(_global.hq_id.toUpperCase() !='N1000NBOLT') {				// 2022.03.16 - 뉴볼텍인 경우 거래처, 단가정보가 표시되지 않도록 처리
					lister.down('[dataIndex=cont_cstm_name]').show();
					lister.down('[dataIndex=shpm_pric_1fst]').show();
					lister.down('[dataIndex=shpm_pric_2snd]').show();
					lister.down('[dataIndex=shpm_pric_3trd]').show();
					lister.down('[dataIndex=shpm_pric_4frt]').show();
					lister.down('[dataIndex=shpm_pric_5fit]').show();
	//				lister.down('[dataIndex=cnsr_pric]').hide();
					lister.down('[dataIndex=puch_pric]').hide();
				}
				if(param.acct_code == '4000'){
					buy.tab.show();
				}else{
					buy.tab.hide();
				}
				sale.tab.show();
				itempanel.setActiveTab(sale);
			}else{
				lister.down('[dataIndex=cont_cstm_name]').hide();
				lister.down('[dataIndex=shpm_pric_1fst]').hide();
				lister.down('[dataIndex=shpm_pric_2snd]').hide();
				lister.down('[dataIndex=shpm_pric_3trd]').hide();
				lister.down('[dataIndex=shpm_pric_4frt]').hide();
				lister.down('[dataIndex=shpm_pric_5fit]').hide();
//				lister.down('[dataIndex=cnsr_pric]').hide();
				lister.down('[dataIndex=puch_pric]').show();
				buy.tab.show();
				sale.tab.hide();
				// 2023.10.10 - 삼정이면서 원재료인 경우 판매단가 목록을 표시한다.
				if(_global.hq_id.toUpperCase() =='N1000SJUNG' && param.acct_code == '1001') {
					sale.tab.show();
				}
				itempanel.setActiveTab(buy);
			}
			console.log

			if(_global.hq_id.toUpperCase() =='N1000SJUNG') {
				if(param.acct_code == '3000') { 					// 2023.09.08 - 삼정이면서 제품 , 상품 일때 판매단가에 최종여부 및 비고 보이기
					detail1.down('[dataIndex=last_yorn]').hide();
					detail1.down('[dataIndex=user_memo]').hide();
					detail2.down('[dataIndex=last_yorn]').show();
					detail2.down('[dataIndex=user_memo]').show();
				}else if(param.acct_code == '4000') {				// 2023.08.28 - 삼정이면서 제품일때만 최종여부 및 비고 보이기
					detail1.down('[dataIndex=last_yorn]').show();
					detail1.down('[dataIndex=user_memo]').show();
					detail2.down('[dataIndex=last_yorn]').show();
					detail2.down('[dataIndex=user_memo]').show();
					itempanel.setActiveTab(buy);
				}else{
					detail1.down('[dataIndex=last_yorn]').hide();
					detail1.down('[dataIndex=user_memo]').hide();
					detail2.down('[dataIndex=last_yorn]').hide();
					detail2.down('[dataIndex=user_memo]').hide();
				}
			}

			/*
			if(_global.hq_id.toUpperCase() =='N1000SJUNG' && param.acct_code == '4000' ) {	// 2023.08.28 - 삼정이면서 제품일때만 최종여부 및 비고 보이기
				detail1.down('[dataIndex=last_yorn]').show();
				detail1.down('[dataIndex=user_memo]').show();
				detail2.down('[dataIndex=last_yorn]').show();
				detail2.down('[dataIndex=user_memo]').show();
				itempanel.setActiveTab(buy);
			}else{
				detail1.down('[dataIndex=last_yorn]').hide();
				detail1.down('[dataIndex=user_memo]').hide();
				detail2.down('[dataIndex=last_yorn]').hide();
				detail2.down('[dataIndex=user_memo]').hide();
			}

			if(_global.hq_id.toUpperCase() =='N1000SJUNG' && param.acct_code == '3000' ) {	// 2023.09.08 - 삼정이면서 제품 , 상품 일때 판매단가에 최종여부 및 비고 보이기
				detail2.down('[dataIndex=last_yorn]').show();
				detail2.down('[dataIndex=user_memo]').show();
			}else if (_global.hq_id.toUpperCase() =='N1000SJUNG' && param.acct_code != '3000'&& param.acct_code != '4000' ){
				detail2.down('[dataIndex=last_yorn]').hide();
				detail2.down('[dataIndex=user_memo]').hide();
			}
			*/

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
		}
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2()
		;
		if(record.length > 0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
						mask.hide();
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id , item_idcd : record[0].get('item_idcd')}));
		}
	},

	updateAction:function() {
		var me		= this,
			detail1	= me.pocket.detail1(),
			store	= detail1.getStore(),
			msg		= '';
		;
		console.log(detail1);
		store.each(function(findrecord) {
			var	cstm = findrecord.get('cstm_idcd'),
				pric = findrecord.get('cont_pric'),
				date = findrecord.get('cont_date')
				drtr = findrecord.get('drtr_idcd')
			;
			if(!cstm){
				msg = '거래처를 선택하여 주십시오..';
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
					Ext.Msg.alert("알림", "저장되었습니다.");
				},
				callback: function(batch, options) {
					store.reload();
				} ,
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
			var	cstm = findrecord.get('cstm_idcd'),
				pric = findrecord.get('pric_dvcd'),
				date = findrecord.get('cont_date')
			;
			if(!cstm){
				msg = '거래처를 선택하여 주십시오..';
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
					Ext.Msg.alert("알림", "저장되었습니다.");
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
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister		= me.pocket.detail1(),
			store		= lister.getStore(),
			itemId = tpanel.getActiveTab().itemId
		;
		console.log(itemId);
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
