/**
 */
Ext.define('lookup.popup.vend.VendPopup', { extend: 'Axt.popup.Search',

	id      : 'lookup-vend-popup',
	alias   : 'widget.lookup-vend-popup',
	store   : 'lookup.popup.vend.store.VendPopup',
	title   : Language.get( 'vend_mst' , '매입처 찾기'),
	closable: true,
	autoShow: true,
	width   : 700,
	height  : 500,
	layout  : {
		type : 'border'
    },
    defaultFocus : 'initfocused',
    initComponent: function(config){
    	var me = this;
        me.items = [me.createForm()];

        if (me.popup.params.pack_vend_yn) {

        	me.title = '직납업체 찾기'  ;
        }

        me.callParent(arguments);
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
										},{	name	: 'vend_nm',
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
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
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
    },
    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
     createGrid: function(){
        var  me   = this,
        	 grid = {
        		 xtype: 'grid-panel',
        		 header : false,
        		 region: 'center',
        		 viewConfig: {
        			loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        		},
        		 selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		 store: Ext.create( me.store ),
        		 paging:
        		 {
        			 xtype: 'grid-paging',
        			 items:[
        		 		 '->',
        		 		 {xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction , cls: 'button-style'},
        		 		 '-',
        		 		 {xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		 	]
        		},
        		columns:[
        		 	 { text: Language.get('vend_cd'     , '코드' )  , dataIndex: 'vend_cd',  	  width : 100 },
        		 	 { text: Language.get('vend_nm'     , '매입처명'   )  , dataIndex: 'vend_nm',    flex  : 1   },
        		 	 { text: Language.get('biz_tel_no'  , '전화번호'   )  , dataIndex: 'biz_tel_no', width : 80  },
        		 	 { text: Language.get('biz_fax_no'  , '팩스번호'   )  , dataIndex: 'biz_fax_no', width : 80  },
        		 	 { text: Language.get('biz_owner'   , '대표자'    )  , dataIndex: 'biz_owner',  width : 80  }
//        		 	 { text: Language.get('biz_nm'      , '등록명칭'   )  , dataIndex: 'biz_nm', 	  width : 150 }
        		],
        		 listeners: {
        			 itemdblclick: function() {
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
        	param = Ext.merge( me.down('form').getValues() , { hq_id : _global.hq_id
        	}, me.popup.params )
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
    	var me    = this,
    		panel    = me.down('grid'),
    		selects = panel.getSelectionModel().getSelection(),
    		request = []
    	;
//    	console.debug('selects', selects);
    	if (selects.length === 0) {
    		resource.showError( '선택 된 데이터가 없습니다.'  );
    	} else {
    		if (me.popup.apiurl && me.popup.apiurl.master) {

    			Ext.each( selects , function( eachrow ){
    				request.push(eachrow.data);
//    				request.push({
//    					stor_grp : eachrow.get('stor_grp'),
//    					vend_id  : eachrow.get('vend_id' )
//    				});
    			});
    			var store = Ext.create( me.store );
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
