Ext.define('lookup.popup.shopitem.ShopItemPopup', { extend: 'Axt.popup.Search',
	alias   : 'widget.lookup-shopitem-popup',
	requires:
	[
	 	'lookup.popup.view.ClassPopup',
	 	'lookup.popup.view.BasePopup',
	 	'lookup.popup.view.VendPopup'
	],
	title   : '전시 품목 정보',
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
   				console.debug( )
   	   			me.autoShow = false;
   			}
		}
   		me.items = [me.createForm()];
        me.callParent(arguments);


		if (autoSelect) {
			me.selectAction();
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
    			xtype: 'form-search',
    			bodyStyle: { padding: '0', background: 'transparent' },
    		 	layout       : { type: 'vbox' },
    		 	fieldDefaults: { labelAlign : 'right', height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		 	items        :
    		 	[
    		 	 	{
    		 	 		xtype : 'fieldset',
    		 	 		items :
    		 	 		[
    		 	 		 	{
    		 	 		 		xtype : 'searchfield' ,
    		 	 		 		itemId : 'initfocused',
    		 	 		 		name  : 'item_name',
    		 	 		 		fieldLabel : '품명',
    		 	 		 		width : 200,
    		 	 		 		value : ( me.popup.values.item_name && me.popup.values.item_name != '')? me.popup.values.item_name : ''
    		 	 		 	},{
    		 	 		 		xtype : 'searchfield' ,
    		 	 		 		name  : 'barcode',
    		 	 		 		fieldLabel : '바코드',
    		 	 		 		width : 200,
    		 	 		 		value : ( me.popup.values.barcode && me.popup.values.barcode != '')? me.popup.values.barcode : ''
    		 	 		 	},{
    		 	 		 		xtype : 'button'      ,
    		 	 		 		text: Const.SELECT.text ,
    		 	 		 		iconCls: Const.SELECT.icon,
    		 	 		 		scope: me,
    		 	 		 		handler: me.selectAction ,
    		 	 		 		margin : '0 0 0 5'
    		 	 		 	},{
    		 	 		 		fieldLabel  : '브랜드'       ,
    		 	 		 		xtype       : 'popupfield' ,
    		 	 		 		name       	: 'brand_nm'   ,
    		 	 		 		pair        : 'brand_id'   ,
    		 	 		 		allowBlank  : true         ,
    		 	 		 		clearable   : true         ,
    		 	 		 		width       : 200,
    		 	 		 		emptyText   : '',
    		 	 		 		popup       : {
    		 	 		 			select 	: 'SINGLE',
    		 	 		 			widget 	: 'lookup-base-popup' ,
    		 	 		 			params 	: { prnt_id : 'brand' , row_sts : ( me.popup.params.row_sts && me.popup.params.row_sts != '')? me.popup.params.row_sts : '' },
    		 	 		 			result 	: function(records, nameField, pairField ){
    		 	 		 				nameField.setValue(records[0].get('bas_nm'));
    		 	 		 				pairField.setValue(records[0].get('bas_id'));
    		 	 		 			}
    		 	 		 		}
    		 	 		 	},{
    		 	 		 		xtype     : 'textfield',
    		 	 		 		name : 'brand_id' ,
    		 	 		 		hidden: true
    		 	 		 	}
    		 	 		 ]
    		 	 	},{
    		 	 		xtype : 'fieldset',
    		 	 		items :
    		 	 		[
    		 	 		 	{
    		 	 		 		fieldLabel  : '품목분류'       ,
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
    		 	 		 	},{
    		 	 		 		xtype   : 'textfield',
    		 	 		 		name    : 'class_id' ,
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
        		store   : Ext.create('lookup.popup.store.ShopItemPopup'),
        		paging  :
        		{
        			 xtype: 'grid-paging',
        			 items:
        			 [
		     	        '->', '-',
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},
        		 		'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close }
        		 	]
        		},
        		 columns:
        		[
	        		 {   dataIndex: 'item_code'		, width: 110, text: Language.get('item_code',     '품목코드')},
//	        		 {   dataIndex: 'item_sc'		, width:  80, text: Language.get('',              '단축코드')},
	        		 {   dataIndex: 'item_name'		, width: 150, text: Language.get('item_name',       '품명'  )},
	        		 {   dataIndex: 'item_spec'		, flex:  100, text: Language.get('item_spec',     '규격'    )},
	        		 {   dataIndex: 'unit_name'		, width:  50, text: Language.get('item_unit',     '단위'    )},
	        		 {   dataIndex: 'unt_qty'		, width:  70, text: Language.get('unt_qty',      '포장수량'    ), align : 'right', xtype : 'numericcolumn'  },
	        		 {   dataIndex: 'web_price'	    , width:  70, text: Language.get(''         ,     '판매가'  ), align : 'right', xtype : 'numericcolumn'  },
	        		 {   dataIndex: 'mfg_nm'		, width:  80, text: Language.get('mfg',      	  '제조사'  )},
                     {   dataIndex: 'brand_nm'      , width:  80, text: Language.get('brand',         '브랜드'  )}
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
        	param = Ext.merge( me.down('form').getValues(), me.popup.params );
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

    	if ( selects.xtype ){ /* 확인버튼을 누르면 records에 button값이 들어와서 selects를 다시 입력함 */
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
        		var store = Ext.create('lookup.popup.store.ShopItemPopup' );
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




