/**
 */
Ext.define('lookup.popup.item.ItemPopup', { extend: 'Axt.popup.Search',

	alias   : 'widget.lookup-iteminfo-popup',
	id      : 'lookup-iteminfo-popup',
	requires: [
	 	'lookup.popup.class.ClassPopup',
	 	'lookup.popup.base.BasePopup',
	 	'lookup.popup.vend.VendPopup',
	 	'lookup.popup.itembonsa.ItemBonsaPopup'
	],
	title   : Language.get('local_itm_popup','로컬 품목 찾기'),
	closable: true,
	autoShow: true,

	width   : 800,
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
   		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
   			autoSelect = true ;
   			if (me.popup.option.direct_result) {
   	   			me.autoShow = false;
   			}
		}
   		me.items = [me.createForm()];
        me.callParent(arguments);


        /* 공통상품수신 버튼 표시 여부 */
   		if ( me.popup.option.bonsa_item_recv ) {
   			me.down('[name=commonBtn]').setVisible(true);
		}
		if (autoSelect) {
			me.selectAction();
		}
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
    			xtype			: 'form-search',
    			bodyStyle		: { padding: '0', background: 'transparent' },
    		 	layout			: { type: 'vbox' },
    		 	fieldDefaults	: { labelAlign : 'right', height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		 	items			: [
    		 	 	{	xtype	: 'fieldset',
    		 	 		items	: [
    		 	 		 	{	xtype : 'searchfield' ,
    		 	 		 		itemId : 'initfocused',
    		 	 		 		name  : 'item_name',
    		 	 		 		fieldLabel : Language.get('search_itm_nm','찾을 품명'),
    		 	 		 		width : 200,
    		 	 		 		value : ( me.popup.values.item_name && me.popup.values.item_name != '')? me.popup.values.item_name : ''
    		 	 		 	},{	xtype : 'searchfield' ,
    		 	 		 		name  : 'barcode',
    		 	 		 		fieldLabel : Language.get('bar_code','바코드'),
    		 	 		 		width : 200,
    		 	 		 		value : ( me.popup.values.barcode && me.popup.values.barcode != '')? me.popup.values.barcode : ''
    		 	 		 	},{	xtype : 'button'      ,
    		 	 		 		text: Const.SELECT.text ,
    		 	 		 		iconCls: Const.SELECT.icon,
    		 	 		 		scope: me,
    		 	 		 		handler: me.selectAction ,
    		 	 		 		margin : '0 0 0 5'
    		 	 		 	},{	fieldLabel  : Language.get('brand_nm','브랜드'),
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
    		 	 		 			params 	: {  stor_grp : _global.stor_grp, prnt_id : 'brand' , row_sts : ( me.popup.params.row_sts && me.popup.params.row_sts != '')? me.popup.params.row_sts : '' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('bas_nm'));
    		 	 		 				pairField.setValue(records[0].get('bas_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{	xtype     : 'textfield',
    		 	 		 		name : 'brand_id' ,
    		 	 		 		hidden: true
    		 	 		 	}
    		 	 		 ]
    		 	 	},{	xtype : 'fieldset',
    		 	 		items :	[
    		 	 		 	{	fieldLabel  : Language.get('item_class','품목분류'),
    		 	 		 		xtype       : 'popupfield' ,
    		 	 		 		name       	: 'class_nm'   ,
    		 	 		 		pair        : 'class_id'   ,
    		 	 		 		allowBlank  : true         ,
    		 	 		 		clearable   : true         ,
    		 	 		 		width       : 455,
    		 	 		 		emptyText   : '',
    		 	 		 		popup       : {
    		 	 		 			choice  : 'free' ,
    		 	 		 			select 	: 'SINGLE',
    		 	 		 			widget 	: 'lookup-class-popup' ,
    		 	 		 			params 	: {row_sts : ( me.popup.params.row_sts && me.popup.params.row_sts != '')? me.popup.params.row_sts : '' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('clss_desct'));
    		 	 		 				pairField.setValue(records[0].get('class_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{ xtype   : 'textfield',
    		 	 		 		name    : 'class_id' ,
    		 	 		 		hidden  : true
    		 	 		 	},{ fieldLabel : Language.get('pur_vend', '매입처' ),
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
    		 	 		 			params : { stor_grp : _global.stor_grp , vend_sts : '1', row_sts : ( me.popup.params.row_sts && me.popup.params.row_sts != '')? me.popup.params.row_sts : '' },
    		 	 		 			result : function(records, nameField, pairField) {
    		 	 		 				nameField.setValue(records[0].get('vend_nm'));
    		 	 		 				pairField.setValue(records[0].get('vend_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{	xtype	: 'textfield',
    		 	 		 		name	: 'vend_id',
    		 	 		 		hidden	: true
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
        		features: [{  ftype: 'grid-summary' , remote : true  } ],
         		store   : Ext.create('lookup.popup.item.store.ItemPopup'),
        		paging  : {
        			 xtype: 'grid-paging',
        			 items: [
		 				{   xtype		: 'button' ,
							text 		: Language.get('hq_itm_copy','본사품목 가져오기') ,
							iconCls     : Const.INSERT.icon ,
							name        : 'commonBtn',
							action 		: 'ItemBonsaAction',
							hidden      : true,
						    handler: function() {
								resource.loadPopup({
									select : 'SINGLE',
									widget : 'lookup-itembonsa-popup',
									params : { stor_id : _global.stor_id },
									apiurl : {
										search : _global.api_host_info + '/lookup/item/itemstore/get/dialogbonsa.do',
										master : _global.api_host_info + '/lookup/item/itemstore/set/itembonsa.do'
									},
									result : function(records) {
									}
								});

						    }
						}, '-',
		     	        '->', '-',
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
        		 		'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
        		 	]
        		},
        		 columns: [
	        		 {   dataIndex: 'item_code'		, width: 110, text: Language.get('item_code',     '품목코드') , summaryType: 'count'
        			 },{ dataIndex: 'brcd_1'		, width: 110, text: Language.get('bar_code',              '바코드'  )
//        			 },{ dataIndex: 'brand_nm'		, width:  80, text: Language.get('brand',		  '브랜드'  )
    				 },{ dataIndex: 'item_name'		, width: 150, text: Language.get('item_name',       '품명'  )
					 },{ dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec',     '규격'    )
					 },{ dataIndex: 'unit_name'		, width:  40, text: Language.get('item_unit',     '단위'    )
					 },{ dataIndex: 'unt_qty'		, width:  60, text: Language.get('unt_qty',      '포장량' ), align : 'right', xtype : 'numericcolumn'
					 },{ dataIndex: 'stad_sale_pri'	, width:  70, text: Language.get('sale_pri'         ,     '판매가'  ), align : 'right', xtype : 'numericcolumn'
//					 },{ dataIndex: 'mfg_nm'		, width:  80, text: Language.get('mfg',      	  '제조사'  )
					 }
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
        var me = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( me.down('form').getValues(), me.popup.params , { hq_id : _global.hq_id});
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
    	var me = this,
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
        		var store = Ext.create('lookup.popup.item.store.ItemPopup' );
        			param = Ext.merge( me.popup.params, {
        				records : request
        			});
	           		store.getProxy().api.read = me.popup.apiurl.master ;
	           		store.load({
	           			params   : {param:JSON.stringify(param)},
	           			scope    : me,
	           			callback : function(records, operation, success) {
	           				if (success) {
	           					records.forEach( function( data ) {
	           						if ( !Ext.isEmpty( data.get('item_ds') ) ) { /* item_ds 값이 있으면 */
	           							data.set('item_name', data.get('item_ds') );

	           						} else {
	           							var brand_nm = data.get('brand_nm');
	           							if (brand_nm) {
	           								if (brand_nm != ""){
	           									data.set('item_name', data.get('brand_nm')+"/"+data.get('item_name') );
	           								}
	           							}
	           						}

		         				});
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



