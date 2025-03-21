/**
 * 은행계좌 팝업
 */
Ext.define('lookup.popup.view.BankPopup', { extend: 'Axt.popup.Search',

	requires:
	[
	 	'lookup.popup.view.StorePopup',
	],

    alias: 'widget.lookup-bank-popup',
	store: 'lookup.popup.store.BankPopup',

    title: '은행 계좌 정보',

    closable: true,
    autoShow: true,
    width: 700,
    height: 500,
    layout: {
        type: 'border'
    },
	defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this;
        //var form = me.createForm();
        me.items = [me.createForm()];
        me.callParent(arguments);
        me.selectAction();

    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this,
    		form = {
    		xtype : 'form-layout',
    		region : 'center',
    		border:false,
    		dockedItems : [ me.searchForm() ], items : [ me.createGrid() ]
    	};
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
	    		dockedItems		: [
	    		 	{	xtype	: 'toolbar',
	    		 		dock	: 'top',
	    		 		items	: [
	    		 		 	{	xtype : 'searchfield' , itemId : 'initfocused',
	    		 		 		name  : 'bank_nm', fieldLabel : '은행명',    labelWidth : 59, height : 22, width : 200,
	    		 		 		value	: me.popup.params.find,
	    		 		 	},{	xtype      : 'popupfield',
	    		 				fieldLabel : '사업장',
	    		 				name       : 'stor_nm',
	    		 				pair       : 'stor_id',
	    		 				margin     : '0 0 0 5',
	    		 				allowBlank : true,
	    		 			    clearable  : true,
	    		 			    value      : _global.stor_nm,
	    		 				popup: {
	    		 					select : 'SINGLE',
	    		 					widget : 'lookup-store-popup',
	    		 					params : { stor_grp : _global.stor_grp, row_sts : ( me.popup.params.row_sts && me.popup.params.row_sts != '')? me.popup.params.row_sts : '' },
	    		 		 			result :  function(records, nameField, pairField ){
	    			 					nameField.setValue(records[0].get('stor_nm'));
	    			 					pairField.setValue(records[0].get('stor_id'));
	    			 				}
	    		 				}
	    		 		    },{	xtype      : 'textfield', name : 'stor_id'  , hidden : true , value : _global.stor_id
    		 		    	},{	xtype : 'tbseparator'
	    		 		 	},{	xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style'
	    		 		 	},{	xtype : 'tbfill'
	    		 		 	}
	        			]
	    		 	},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
	    		 	}
	    		],
	    		layout: { type: 'vbox' },
	        	fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
	        	items :	[]
	        };
        return form;
    },
    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
    createGrid: function(){
        var me = this,
        	grid = {
        	xtype: 'grid-panel',
        	header : false,
        	region: 'center',
        	viewConfig: {
        		loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
        	},
        	selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        	features: [{ ftype : 'grid-summary' , remote : true } ],
            store	: Ext.create( me.store ),
            paging	: {
        		xtype: 'grid-paging',// displayInfo: false,
        		items: [
        		 	'->' ,
        		 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
        		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		]
        	},
            columns: [
				{   text: '은행'	   , dataIndex: 'bank_nm',  width: 150 , summaryType : 'count'
				},{	text: '계좌명'	   , dataIndex: 'account_nm',  width: 100
				},{	text: '계좌번호'  , dataIndex: 'account_no',  width: 150
				},{	text: '예금주'	   , dataIndex: 'account_ow',  width: 150
				},{	text: '관리부서'  ,	 dataIndex: 'dept_nm',  flex  : 1
				}
             	//{   text: '관리부서'	, dataIndex: 'dept_id',  hidden : true  }
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
	 					 binding:[
	 			     		  {
	 			     			 key: Ext.EventObject.ENTER,
	 			     			 fn: function(key,e){
	 			     				me.fireEvent('itemdblclick', me.getView() );
	 			     			 }
	 			     		  }
	 			     	]
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
        var me = this,
        	store = me.down('grid').getStore(),
        	storeid = me.down('form').down('[name=stor_id]').getValue(),
    		param = Ext.merge( me.down('form').getValues(), me.popup.params, {hq_id : _global.hq_id} )
        ;
        console.debug('param', param);
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
			}
		});
    },
    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
     */
    finishAction: function(){
    	var me = this,
    		panel = me.down('grid'),
    		selected = panel.getSelectionModel().getSelection()
    	;
        if (selected.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
    		me.setResponse(selected);
        }
    }
});
