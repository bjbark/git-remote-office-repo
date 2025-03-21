/**
 */
Ext.define('lookup.popup.item.ItemPopupRecv', { extend: 'Axt.popup.Search',

	alias   : 'widget.lookup-item-popup-recv',
	store   : 'lookup.popup.item.store.ItemPopup',
	requires:
	[
	 	'lookup.popup.base.BasePopup',
	 	'lookup.popup.vend.VendPopup',
	 	'lookup.popup.item.ItemClassPopup',
	 	'lookup.popup.item.ItemSharePopup'
	],
	title   : Language.get('item_copy_popup','품목정보 가져오기'),
	closable: true,
	autoShow: true,

	width   : 900,
	height  : 508,
	layout  : {
		type: 'border'
    },
    defaultFocus : 'initfocused',

    initComponent: function(config){
        var me = this,
	    	autoSelect = false
	    ;
	    if (!me.popup.values){ me.popup.values ={}; }
	    if (!me.popup.option){ me.popup.option ={}; }

        //  상품이 즉시 검색 되는 경우
	    if ((me.popup.values.brcd && me.popup.values.brcd != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
	    	autoSelect = true ;
	    	if (me.popup.option.direct_result) {
	    		me.autoShow = false;
	    	}
		}
        me.items = [me.createForm()];
        me.callParent(arguments);

        /* 공통상품수신 버튼 표시 여부 */
   		if ( me.popup.option.use_itm_share ) {
   			me.down('[name=downloadItemBtn]').setVisible(true);
		}

		if (autoSelect) {
			me.selectAction();
		}
		//  자동 조회후 매입사를 넣어준다.
        if (me.popup.values) {
			me.down('[name=vend_id]').setValue(me.popup.values.vend_id);
			me.down('[name=vend_nm]').setValue(me.popup.values.vend_nm);
        }

   		/* 상품의 조회 조건을 숨기고자 하는 목록을 받아 숨김 처리 한다. */
		var hiddenlist = me.popup.hidden;
		Ext.each(hiddenlist, function(record, index) {
			me.down('[name='+record+']').setVisible(false);
		});
    },

    /**
     * 화면폼
     */
     createForm: function(){
    	var  me   = this,
    		 form = {
    			 xtype       : 'form-layout',
    			 region      : 'center',
    			 border      : false,
    			 dockedItems : [ me.searchForm() ],
    			 items       : [ me.createGrid() ]
    		}
    	;
    	return form;
    },
    /**
     * 검색폼
     */
     searchForm: function(){
    	var me = this,
    		form = {
    			xtype		: 'form-search',
    			bodyStyle	: { padding: '0', background: 'transparent' },
    		 	layout      : { type: 'vbox' },
    		 	fieldDefaults: { labelAlign : 'right', height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		 	items       : [
    		 	 	{
    		 	 		xtype : 'fieldset',
    		 	 		items : [
    		 	 		 	{
    		 	 		 		xtype		: 'searchfield' ,
    		 	 		 		itemId		: 'initfocused',
    		 	 		 		name		: 'item_name',
    		 	 		 		fieldLabel	: Language.get('search_itm_nm','찾을 품명'),
    		 	 		 		width		: 200,
    		 	 		 		value		: ( me.popup.values.item_name && me.popup.values.item_name != '')? me.popup.values.item_name : ''
    		 	 		 	},{
    		 	 		 		xtype		: 'searchfield' ,
    		 	 		 		name		: 'brcd',
    		 	 		 		fieldLabel	: Language.get('bar_code','바코드'),
    		 	 		 		width		: 200,
    		 	 		 		value		: ( me.popup.values.brcd && me.popup.values.brcd != '')? me.popup.values.brcd : ''
    		 	 		 	},{
    		 	 		 		xtype		: 'button'      ,
    		 	 		 		text		: Const.SELECT.text ,
    		 	 		 		iconCls		: Const.SELECT.icon,
    		 	 		 		scope		: me,
    		 	 		 		handler		: me.selectAction ,
    		 	 		 		margin		: '0 0 0 5',
    		 	 		 		cls			: 'button-style'
    		 	 		 	},{
    		 	 		 		fieldLabel  : Language.get('mfg_nm','제조사'),
    		 	 		 		xtype       : 'popupfield' ,
    		 	 		 		name       	: 'mfg_nm'   ,
    		 	 		 		pair        : 'maker_id'   ,
    		 	 		 		allowBlank  : true         ,
    		 	 		 		clearable   : true         ,
    		 	 		 		width       : 200,
    		 	 		 		emptyText   : '',
    		 	 		 		hidden		: true,
    		 	 		 		popup       : {
    		 	 		 			select 	: 'SINGLE',
    		 	 		 			widget 	: 'system-base-popup' ,
    		 	 		 			params 	: { prnt_id : '7103' , row_sts : '0' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('base_nm'));
    		 	 		 				pairField.setValue(records[0].get('base_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{
    		 	 		 		xtype		: 'textfield',
    		 	 		 		name		: 'maker_id' ,
    		 	 		 		hidden		: true
    		 	 		 	},{
    		 	 		 		fieldLabel  : Language.get('brand_nm','브랜드'),
    		 	 		 		xtype       : 'popupfield' ,
    		 	 		 		name       	: 'brand_nm'   ,
    		 	 		 		pair        : 'brand_id'   ,
    		 	 		 		allowBlank  : true         ,
    		 	 		 		clearable   : true         ,
    		 	 		 		width       : 200,
    		 	 		 		emptyText   : '',
    		 	 		 		hidden		: true,
    		 	 		 		popup       : {
    		 	 		 			select 	: 'SINGLE',
    		 	 		 			widget 	: 'lookup-base-popup' ,
    		 	 		 			params 	: { prnt_id : 'brand' , row_sts : '0' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('base_nm'));
    		 	 		 				pairField.setValue(records[0].get('base_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{
    		 	 		 		xtype		: 'textfield',
    		 	 		 		name		: 'brand_id' ,
    		 	 		 		hidden		: true
    		 	 		 	},{
        		 		 		fieldLabel : Language.get('itm_sts','판매 상태'),
        		 		 		xtype      : 'lookupfield',
        		 		 		name       : 'itm_sts',
        		 		 		editable   : false,
        		 		 		width       : 200,
        		 		 		clearable  : true,
        		 		 		lookupValue: resource.lookup('search_all').concat( resource.lookup('itm_sale_sts' )) ,
        		 		 		value      : Ext.isEmpty( me.popup.values.itm_sts) ? '' : me.popup.values.itm_sts
        		 		 	}
    		 	 		 ]
    		 	 	},{
    		 	 		xtype : 'fieldset',
    		 	 		items :  [
    		 	 		 	{
    		 	 		 		fieldLabel  : Language.get('itm_clsss','품목분류'),
    		 	 		 		xtype       : 'popupfield' ,
    		 	 		 		name       	: 'clss_nm'   ,
    		 	 		 		pair        : 'clss_id'   ,
    		 	 		 		allowBlank  : true         ,
    		 	 		 		clearable   : true         ,
    		 	 		 		width       : 455,
    		 	 		 		emptyText   : '',
    		 	 		 		popup       : {
    		 	 		 			choice  : 'free' ,
    		 	 		 			select 	: 'SINGLE',
    		 	 		 			widget 	: 'lookup-item-class-popup' ,
    		 	 		 			params 	: {row_sts : '0' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('class_ds'));
    		 	 		 				pairField.setValue(records[0].get('clss_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{
    		 	 		 		xtype   : 'textfield',
    		 	 		 		name    : 'clss_id' ,
    		 	 		 		hidden  : true
    		 	 		 	},{
    		 	 		 		fieldLabel : Language.get('pur_vend', '매입처' ),
    		 	 		 		xtype      : 'popupfield',
    		 	 		 		name       : 'vend_nm',
    		 	 		 		pair       : 'vend_id',
    		 	 		 		clearable  : true,
    		 	 		 		readOnly   : false,
    		 	 		 		width      : 200,
    		 	 		 		hidden		: true,
    		 	 		 		popup      : {
    		 	 		 			widget : 'lookup-vend-popup',
    		 	 		 			select : 'SINGLE',
    		 	 		 			params : { stor_grp : _global.stor_grp , vend_sts : '1', row_sts : '0' },
    		 	 		 			result : function(records, nameField, pairField) {
    		 	 		 				nameField.setValue(records[0].get('vend_nm'));
    		 	 		 				pairField.setValue(records[0].get('vend_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{
    		 	 		 		xtype 	: 'textfield',
    		 	 		 		name    : 'vend_id',
    		 	 		 		hidden  : true
    		 	 		 	}
    		 	 		]
    		 	 	}
    		 	] // 기타 검색 조건이 필요한 경우
        	}
    	;
        return form;
    },

    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
     createGrid: function(){
        var  me = this,
        	grid = {
        		 xtype   : 'grid-panel',
        		 header  : false,
        		 region  : 'center',
        		 viewConfig: {
        			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
        		},
        		selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		plugins :[{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
        		features: [{  ftype: 'grid-summary' , remote : true  } ],

        		store   : Ext.create( me.store ),
        		paging  :
        		{
        			 xtype: 'grid-paging',
        			 items:
        			 [
		 				{   xtype		: 'button' ,
							text 		: Language.get('hq_itm_copy','본사상품 가져오기'),
							iconCls     : Const.INSERT.icon ,
							name        : 'downloadItemBtn',
							//action 		: 'ItemBonsaAction',

							hidden      : true,
						    handler: function() {
								resource.loadPopup({
									select : 'SINGLE',
									widget : 'lookup-itemshare-popup',
									params : { stor_id : _global.stor_id },
//									apiurl : {
//										search : _global.api_host_info+ '/system/item/itemstore/get/dialoghq.do',
//										master : _global.api_host_info+ '/system/item/itemstore/set/itemhq.do'
//									},
									result : function(records) {
									}
								});

						    }
						},
						'->', '-',
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
        		 		'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		 	]
        		},
        		 columns: [
          		 	{   dataIndex: 'item_code'		, width: 110, text: Language.get('itm_code',     '품목코드') , summaryType: 'count'
      		 		},{	dataIndex: 'item_name'		, width: 195, text: Language.get('item_name',       '품명'  )
  		 			},{	dataIndex: 'item_spec'		, width: 140, text: Language.get('itm_spec',     '규격'    )
	 				},{	dataIndex: 'po_pri'		, width:  70, text: Language.get('pur_pri' ,     '매입가'  ), align : 'right', xtype : 'numericcolumn'
 					},{	dataIndex: 'unit_name'		, width:  45, text: Language.get('itm_unit',     '단위'    )
					},{	dataIndex: 'piece_qty'	, width:  60, text: Language.get('piece_qty',      '포장량'    ), align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: 'itm_sts'   	, width:  60, text: Language.get('itm_sts',       '판매상태')  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('itm_sale_sts')
					}
//          		 	{   dataIndex: 'vend_nm'		, width: 110, text: Language.get('vend_nm',		  '매입사'  )}
          		],

        		listeners: {
        			 itemdblclick: function(dataview, index, item, e) {
        				me.finishAction();
        			},
        			 render: function(){
        				var me = this
        				;
        				new Ext.util.KeyMap({
        					 target: me.getEl(),
        					 eventName : 'keyup',
        					 binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemdblclick', me.getView() ); }}]
        				});
        			}
        	   }
    		}
        ;
        return grid;
    },
    /**
     * 조회
     */

    selectAction: function(){
        var  me    = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( Ext.merge( me.down('form').getValues(), me.popup.params ), { recv_sts : '1' },{ hq_id : _global.hq_id});
        ;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
		store.load({
			 params   : {param:JSON.stringify(param)},
			 scope    : me,
			 callback : function(records, operation, success) {
				if (success && me.popup.option.direct_result && records.length === 1) {
					me.finishAction(records);
				} else {
					if(!me.autoShow) {
						me.autoShow = !me.autoShow;
						me.show();
			    	}
				}
			}
		});
    },

    /**
     * 확인 버튼 이벤트
     */
     finishAction: function( records ){
    	var  me    = this,
    		 selects = records ? records : me.down('grid').getSelectionModel().getSelection(),
    		 request = []
    	;

    	if ( selects.xtype ){
    		selects = me.down('grid').getSelectionModel().getSelection() ;
    	}

        if (selects.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
        	if (me.popup.apiurl && me.popup.apiurl.master) {
        		Ext.each( selects , function( eachrow ){
        			request.push({
        				item_idcd : eachrow.get('item_idcd')
        			});
        		});
        		var store = Ext.create( me.store  );
        			param = Ext.merge( me.popup.params, {
        				records : request
        			});
	           		store.getProxy().api.read = me.popup.apiurl.master ;
	           		store.load({
	           			params   : {param:JSON.stringify(param)},
	           			scope    : me,
	           			callback : function(records, operation, success) {
	           				if (success) {
	           					me.setResponse(records);
	           				}
	        			}
	           		});
        	} else {
        		me.setResponse(selects);
        	}
        }
    }
});
