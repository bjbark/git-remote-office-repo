Ext.define('lookup.popup.project.GridFieldPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.lookup-gridfield-popup',
	store: 'lookup.popup.project.store.GridFieldPopup',
    title: '그리드 필드 찾기' ,

    closable: true,
    autoShow: true,
    width	: 900,
    height	: 500,
    layout	: {
        type: 'border'
    },
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this;
        me.items = [me.createForm()];
        me.callParent(arguments);
    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this,
    		form = {
	    		xtype		: 'form-layout',
	    		region		: 'center',
	    		border		: false,
	    		dockedItems : [ me.searchForm() ] ,
	    		items		: [ me.createGrid() ]
	    	};
    	return form;
    },
    /**
     * 검색폼
     */
    searchForm: function(){
    	var me = this,
    		form = {
	    		xtype		: 'form-search',
//    			bodyStyle: { padding: '0', background: 'transparent' },
    		 	layout       : { type: 'vbox' },
    		 	fieldDefaults: { labelAlign : 'right', height : 22, width : 200, labelWidth : 60, labelSeparator : '' },
    		 	items        : [
    		 	 	{	xtype : 'fieldset',
    		 	 		items : [
					 		{
					 			fieldLabel	: 'Table ID',
					 			name		: 'tabl_name'   ,
					 			xtype		: 'searchfield',
//					 		},{
//					 			fieldLabel	: 'Table 명',
//					 			name		: 'tabl_idcd'   ,
//					 			xtype       : 'searchfield',
					 		},{
					 			fieldLabel  : 'DB',
					 			xtype       : 'lookupfield',
					 			name        : 'prjt_dvsn',
					 			editable    : false,
					 			lookupValue : [['','전체'],['MAIN','MAIN'],['CONTROL','관제'], ['SKY','SKY ERP'], ['CHAM1ST','참플러스']],
					 			value       : '',
    		 	 		 	},{ xtype		: 'button'      ,
    		 	 		 		text		: Const.SELECT.text ,
    		 	 		 		iconCls		: Const.SELECT.icon,
    		 	 		 		scope		: me,
    		 	 		 		handler		: me.selectAction ,
    		 	 		 		margin		: '0 0 0 10',
    		 	 		 		cls			: 'button-style'
					 		}
					 	]
			 		},{ xtype : 'fieldset',
    		 	 		items : [
					 		{
					 			fieldLabel	: 'Field ID'       ,
					 			name		: 'fied_idcd'   ,
					 			xtype       : 'searchfield',
					 		},{
					 			fieldLabel	: 'Field 명'       ,
					 			name		: 'fied_name'   ,
					 			xtype       : 'searchfield',
					 		}
	        			]
	    		 	}
	    		]
	        };
        return form;
    },
    /**
     * 리스트
     */
    createGrid: function(){
        var me   = this ,
        	grid = {
        		xtype  : 'grid-panel',
        		header : false,
        		region : 'center',
        		viewConfig: {
        			loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        		},
        		selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		store   : Ext.create( me.store ),
        		paging  : {
        			xtype: 'grid-paging',
        			items: [
        		 		'->' ,
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
        		 	]
        		},
        		columns: [
					{	dataIndex: 'ord'           , width :  50, align: 'center' , text: 'Ord'
		            },{ dataIndex: 'data_index'    , width : 150, align: 'left'   , text: 'Data Index'
		            },{ dataIndex: 'view_text'     , width : 150, align: 'left'   , text: 'Text'
		            },{ dataIndex: 'tabl_name'        , width : 100, align: 'center' , text: 'Table'
		            },{ dataIndex: 'xtype'         , width : 100, align: 'center' , text: 'xtype'
		            },{ dataIndex: 'lnth'          , width :  50, align: 'center' , text: '길이'
		            },{ dataIndex: 'align'         , width :  70, align: 'center' , text: 'Align'
		            },{ dataIndex: 'sum_type'      , width :  70, align: 'center' , text: 'Summary'
		            },{ dataIndex: 'format_str'    , width :  80, align: 'center' , text: 'Format'
		            },{ dataIndex: 'lookup_str'    , width : 100, align: 'center' , text: 'LookUp'
		            },{ dataIndex: 'remarks'       , width : 200, align: 'center' , text: '비고'
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
                			target		: me.getEl(),
                			eventName	: 'keyup',
                			binding		: [
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
        	}
        ;
        return grid;
    },

    /**
     * 조회
     */
    selectAction: function(){
    	var me    = this,
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
        		if (me.popup.values && me.popup.values.barcode) {
        			delete me.popup.values.barcode ;
        		}
        	}
        });
    },

    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var  me    = this,
    		 panel    = me.down('grid'),
    		 selects = panel.getSelectionModel().getSelection(),
    		 request = []
    	;
        if (selects.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
        	if (me.popup.apiurl && me.popup.apiurl.master) {
        		Ext.each( selects , function( eachrow ){
        			request.push({
                        ord           : eachrow.get( 'ord'),
	                    data_index    : eachrow.get( 'data_index'),
	                    view_text     : eachrow.get( 'view_text'),
	                    tabl_name        : eachrow.get( 'tabl_name'),
	                    xtype         : eachrow.get( 'xtype'),
	                    lnth          : eachrow.get( 'lnth'),
	                    align         : eachrow.get( 'align'),
	                    sum_type      : eachrow.get( 'sum_type'),
	                    format_str    : eachrow.get( 'format_str'),
	                    lookup_str    : eachrow.get( 'lookup_str'),
	                    remarks       : eachrow.get( 'remarks') ,
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
