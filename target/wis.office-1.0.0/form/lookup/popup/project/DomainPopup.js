/**
 */
Ext.define('lookup.popup.project.DomainPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.lookup-domain-popup',
	store: 'lookup.popup.project.store.DomainPopup',
    title: '도메인 찾기' ,

    closable: true,
    autoShow: true,
    width: 900,
    height: 500,
    layout: {
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
    	var me = this, form =
    	{
    		xtype : 'form-layout',
    		region : 'center',
    		border:false,
    		dockedItems : [ me.searchForm() ] ,
    		items : [ me.createGrid() ]
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
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'container',
							border	: 0,
							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
							region	: 'center',
							flex	: 1,
							height	: 40,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 3,
									flex	: 1,
									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
									region	: 'center',
									height	: 34,
									margin	: '3 0 0 0',
									layout	: 'hbox',
									items	: [
										{	xtype	: 'label',
											text	: 'SEARCH  | ',
											margin	: '7 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '코드 또는 코드명을 입력하세요....',
									 		enableKeyEvents : true,
											listeners:{
									 			keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == 9) {
														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
													}
						 			 			},
						 					}
								 		}
								    ]
								},
							]
    		 		 	},
						{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")',
		                    action : Const.SELECT.action,
						}
        			]
    		 	},{
    		 		xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
    		 	}
    		],
    		layout: { type: 'vbox' },
        	fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
        	items :	[] // 기타 검색 조건이 필요한 경우
        };
        return form;
    },    /**
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
        		 	{ 	text : '필드ID'  	, dataIndex: 'field_id'	 , width: 100
        		 	},{ text : '필드명'  	, dataIndex: 'fied_name'	 , width: 100
        		 	},{ text : 'Type'   	, dataIndex: 'data_type' , width: 100  , align: 'center'
    		 		},{ text : '길이'    	, dataIndex: 'data_len'	 , width:  50  , align: 'right'
    		 		},{ text : '참조ID'  	, dataIndex: 'old_id'	 , width: 100
    		 		},{ text : '참조'    	, dataIndex: 'old_nm'	 , width: 100
    		 		},{ text : '단어명1'  	, dataIndex: 'w_nm_1'	 , width:  90
    		 		},{ text : '단어1'   	, dataIndex: 'w_id_1'  	 , width:  70
    		 		},{ text : '단어명2'  	, dataIndex: 'w_nm_2'  	 , width:  90
    		 		},{ text : '단어2'   	, dataIndex: 'w_id_2'  	 , width:  70
    		 		},{ text : '단어명3'  	, dataIndex: 'w_nm_3'  	 , width:  90
    		 		},{ text : '단어3'   	, dataIndex: 'w_id_3'  	 , width:  70
    		 		},{ text : '단어명4'  	, dataIndex: 'w_nm_4'  	 , width:  90
    		 		},{ text : '단어4'   	, dataIndex: 'w_id_4'  	 , width:  70
    		 		},{ text : '단어명5'  	, dataIndex: 'w_nm_5'  	 , width:  90
    		 		},{ text : '단어5'   	, dataIndex: 'w_id_5'  	 , width:  70
    		 		},{ text : '단어명6'  	, dataIndex: 'w_nm_6'  	 , width:  90
    		 		},{ text : '단어6'   	, dataIndex: 'w_id_6'  	 , width:  70
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
        				field_id	: eachrow.get('field_id'),
        				fied_name	: eachrow.get('fied_name'),
        				data_type	: eachrow.get('data_type'),
        				lnth		: eachrow.get('data_len'),
        				w_nm_1		: eachrow.get('w_nm_1'),
        				w_id_1		: eachrow.get('w_id_1'),
        				w_nm_2		: eachrow.get('w_nm_2'),
        				w_id_2		: eachrow.get('w_id_2'),
        				w_nm_3		: eachrow.get('w_nm_3'),
        				w_id_3		: eachrow.get('w_id_3'),
        				w_nm_4		: eachrow.get('w_nm_4'),
        				w_id_4		: eachrow.get('w_id_4'),
        				w_nm_5		: eachrow.get('w_nm_5'),
        				w_id_5		: eachrow.get('w_id_5'),
        				w_nm_6		: eachrow.get('w_nm_6'),
        				w_id_6		: eachrow.get('w_id_6'),
        				old_id		: eachrow.get('old_id'),
        				old_nm		: eachrow.get('old_nm'),
        				ref_table	: eachrow.get('ref_table'),
        				inter_val	: eachrow.get('inter_val'),
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
