/**
 */
Ext.define('lookup.popup.item.ItemBonsaPopup', { extend: 'Axt.popup.Search',

	alias   : 'widget.lookup-item-popup',

	requires:
	[
	 	'lookup.popup.class.ClassPopup',
	 	'lookup.popup.base.BasePopup',
	 	'lookup.popup.vend.VendPopup'

	],
	title   : Language.get('comm_itm_popup','공통 품목 찾기'),
	closable: true,
	autoShow: true,
	width   : 700,
	height  : 508,
	layout  : {
		type: 'border'
    },
    defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this;
        me.items = [me.createForm()];
        me.callParent(arguments);
        if (!me.popup.values){
        	me.popup.values ={};
        }

        if ('BonsaChange' === me.popup.values.gubun){
        	console.debug('me', me );
        	console.debug('header', me.title );
        	me.title = Language.get('local_itm_popup','로컬 품목') ;
        }

   		if (me.popup.values && me.popup.values.brcd && me.popup.values.brcd != '') {
   			me.selectAction();
		}
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
    		 	items        	: [
    		 	 	{
    		 	 		xtype : 'fieldset',
    		 	 		items : [
    		 	 		 	{
    		 	 		 		xtype		: 'searchfield' ,
    		 	 		 		name		: 'item_name',
    		 	 		 		itemId		: 'initfocused',
    		 	 		 		fieldLabel	: Language.get('search_itm_nm','찾을 품명'),
    		 	 		 		width		: 200
    		 	 		 	},{
    		 	 		 		xtype		: 'searchfield' ,
    		 	 		 		name		: 'brcd',
    		 	 		 		fieldLabel	: Language.get('bar_code','바코드'),
    		 	 		 		width		: 200
    		 	 		 	},{
    		 	 		 		xtype		: 'button'      ,
    		 	 		 		text		: Const.SELECT.text ,
    		 	 		 		iconCls		: Const.SELECT.icon,
    		 	 		 		scope		: me,
    		 	 		 		handler		: me.selectAction ,
    		 	 		 		margin		: '0 0 0 5',
    		 	 		 		cls			: 'button-style'
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
        		selModel	: { selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'MULTI'  },
        		store		: Ext.create('system.popup.itemhq.store.ItemBonsaPopup'),
        		paging		: {
        			 xtype: 'grid-paging',
        			 items: [
        		 		'->',
			     	    {xtype: 'button' , text : Const.INSERT.text, iconCls: Const.INSERT.icon , scope: me, handler: me.finishAction, cls : 'button-style' },
        		 		'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style' }
        		 	]
        		},
        		 columns: [
					{   dataIndex: 'item_code'		, width: 110, text: Language.get('itm_code',     '품목코드')
					},{ dataIndex: 'item_name'		, width: 150, text: Language.get('item_name',       '품명'  )
					},{ dataIndex: 'item_spec'		, width: 150, text: Language.get('itm_spec',     '규격'    )
					},{	dataIndex: 'unit_name'		, width:  50, text: Language.get('itm_unit',     '단위'    )
					},{	dataIndex: 'piece_qty'	, width:  60, text: Language.get('piece_qty',    '포장량'    ), align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: 'sale_pri'	, width:  70, text: Language.get('sale_pri' ,    '판매가'  ), align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: 'brand_nm'	, width:  80, text: Language.get('brand',		'브랜드'  )
					},{	dataIndex: 'mfg_nm'		, width:  80, text: Language.get('mfg',      	'제조사'  )
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
        var  me    = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
        	}, me.popup.params  ); // , { brcd : me.popup.values.brcd }
        ;
    	if ('BonsaChange' === me.popup.values.gubun){ /* 공통상품으로 전환 */
    		store.getProxy().api.read = _global.api_host_info+ "/system/item/itemrecv/get/itemstore.do" ;
    	} else {
        	store.getProxy().api.read = _global.api_host_info+ "/system/item/itemstore/get/dialoghq.do" ;
    	}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
		        me.down('grid').getSelectionModel().select(0);
				if (me.popup.values && me.popup.values.brcd) {
					delete me.popup.values.brcd ;
				}
			}
		});
    },


    /**
     * 등록 버튼 이벤트
     */
     finishAction: function(){
    	var  me    = this,
    		 panel   = me.down('grid'),
    		 selects = panel.getSelectionModel().getSelection(),
    		 hqstore = panel.getStore()
    	;
        if (selects.length <= 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {

        	if ('BonsaChange' === me.popup.values.gubun){ /* 공통상품으로 전환 */

        		Ext.each( selects , function( record  ){
        			console.debug('hq record', record );
        			record.set('stor_grp', record.get('stor_grp') );
        			record.set('stor_grp', record.get('stor_grp') );
        			record.set('stor_id', record.get('mngt_stor_id') );
        			record.set('shr_yn', '1' 					  );
        			record.set('upt_id', _global.login_pk );

        			record.dirty = true ;

        		});
        		hqstore.getProxy().api.update = _global.api_host_info+ "/system/item/itemrecv/set/hqchange.do" ;
        	} else {
        		Ext.each( selects , function( record  ){
        			record.dirty = true ;

        		});
        	}

        	var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
        	mask.show();

        	hqstore.sync({

        		callback: function(batch, options) {
        		} ,
        		scope: me
        	}, {synchro : _global.objects.synchro} );
        	mask.hide();
        	me.close();

        }
    }
});
