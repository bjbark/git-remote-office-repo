/**
 * 기초코드팝업 (품목, 고객, 매입사 기초)
 */
Ext.define('lookup.popup.cust.B2BCustGroupPopup', { extend: 'Axt.popup.Search',

	alias   : 'widget.lookup-b2bcustgroup-popup',
	store   : 'lookup.popup.cust.store.B2BCustGroupPopup',

	title   : '계약 그룹 코드 정보',
	closable: true,
	autoShow: true,
	width   : 900,
	height  : 508,
	layout  : {
		type: 'border'
    },
    defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this
        ;
        if (!me.popup.values){ me.popup.values ={}; }
        if (!me.popup.option){ me.popup.option ={}; }

        me.items = [me.createForm()];
        me.callParent(arguments);
    },

    createForm: function(){
    	var me   = this, form =
    	{
    		xtype       : 'form-layout',
    		region      : 'center',
    		border      : false,
    		dockedItems : [ me.searchForm() ],
    		items       : [ me.createGrid() ]
    	};
    	return form;
    },

    /**
     * 검색폼
     */
    searchForm: function(){
    	var  me = this, form =
    	{
    		xtype         : 'form-search',
    		layout       : { type: 'vbox' },
    		fieldDefaults: { labelAlign : 'right', height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		items :
    		[
    		 	{
    		 		xtype  : 'fieldset',
    		 		layout : 'hbox',
    		 		border : 0,
    		 		items  :
					[
					 	{   fieldLabel : '',
					 		name       : 'search_id',
					 		xtype      : 'lookupfield',
					 		editable   : false,
					 		width      : 70,
					 		lookupValue: [ ['1','그룹명' ] ]  ,
					 		value      : '1'
					 	},
					 	{   name       : 'find_name' ,
					 		itemId     : 'initfocused' ,
					 		margin     :'0 0 0 2',
					 		width : 135,
					 		xtype      : 'searchfield'
					 	},
		    		 	{ 	xtype : 'button'      ,
			 	 	 		margin : '0 0 0 5' ,
			 	 	 		text: Const.SELECT.text ,
			 	 	 		iconCls: Const.SELECT.icon,
			 	 	 		scope: me,
			 	 	 		handler: me.selectAction
			 	 	 	}
					]
    		 	}
    		]
        };
        return form;
    },


    createGrid: function(){
    	var me = this, grid =
    	{
    		xtype   : 'grid-panel',
    		header  : false,
    		region  : 'center',
    		viewConfig: {
    			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
    		},
    		selModel : { selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
    		plugins :[{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
    		store    : Ext.create( me.store ),
    		paging   : {
    			xtype: 'grid-paging',
    			items:
    			[
    			 	'->',
    			 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},
    			 	'-',
    			 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close }
        		]
    		},
    		columns: [
    		 	{   text : Language.get( 'cust_grp'   ,'그룹코드'   ),   dataIndex: 'cust_grp'    ,width: 120 },
    		 	{   text : Language.get( 'cust_gn'   ,'그룹명'     ),   dataIndex: 'cust_gn'    ,width: 180 },
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
    	};
        return grid;
    },
    /**
     * 조회
     */
    selectAction: function(){
        var  me    = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( me.down('form').getValues(), {
        	}, me.popup.params );
        ;

        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
		store.load({
			 params   : {param:JSON.stringify(param)},
			 scope    : me,
			 callback : function(records, operation, success) {
			}
		});
    },
    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var  me    = this,
    		 panel    = me.down('grid'),
    		 selected = panel.getSelectionModel().getSelection(),
    		 select   = undefined
    	;
        if (selected.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
        	if (me.popup.apiurl && me.popup.apiurl.master) {

        		if (selected instanceof Array) {
         			if (selected[0] ){ select = selected[0]; }
        		} else { select = selected; }

        		var store = Ext.create('lookup.popup.cust.store.B2BCustGroupPopup' );
        			param = Ext.merge( me.down('form').getValues(), me.popup.params, {
        				cust_grp : select.get('cust_grp'),
        				cust_gn : select.get('cust_gn')
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
        		me.setResponse(selected);
        	}
        }
    }
});
