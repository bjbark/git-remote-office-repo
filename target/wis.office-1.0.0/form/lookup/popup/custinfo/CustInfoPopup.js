/**
 * 기초코드팝업
 */
Ext.define('lookup.popup.custinfo.CustInfoPopup', { extend: 'Axt.popup.Search',

	alias   : 'widget.lookup-custinfo-popup',
	id      : 'lookup-custinfo-popup',
	requires: [
	 	'Axt.form.Layout',
	 	'Axt.form.Search',
	 	'Axt.grid.Panel'
	],
	title   : Language.get('memb_popup','회원 정보 찾기'),
	closable: true,
	autoShow: true,
	width   : 700,
	height  : 500,
	layout  : {
		type: 'border'
    },
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
										},{	fieldLabel : '',
											name       : 'search_gb',
											xtype      : 'lookupfield',
											editable   : false,
											width      : 70,
											margin     :'3 10 0 0',
											lookupValue: [ ['1','고객명' ], ['2', '회원명'] ]  ,
											value      : '1'
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
        var  me = this,
        	 grid = {
        		 xtype   : 'grid-panel',
        		 header  : false,
        		 region  : 'center',
        		 viewConfig: {
        			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
        		},
        		selModel : { selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		store    : Ext.create('lookup.popup.custinfo.store.CustInfoPopup' ),
        		paging   : {
        			xtype: 'grid-paging',
        			items: [
        		 		 '->',
        		 		 {xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
        		 		 '-',
        		 		 {xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
        		 	]
        		},
        		 columns: [
        		 	{   text : Language.get( 'cust_cd'   ,'고객코드'),    dataIndex: 'cust_cd',  width: 100
    		 		},{	text : Language.get( 'cust_nm'   ,'고객명'  ),    dataIndex: 'cust_nm',   width: 120
		 			},{	text : Language.get( 'biz_tel_no','전화번호' ),   dataIndex: 'biz_tel_no',width: 100
	 				},{	text : Language.get( 'addr'      ,'주소'  ),      dataIndex: 'biz_addr_1',   width: 200
	 				},{	text : Language.get( 'memb_cd' ,'회원코드' ),   dataIndex: 'memb_cd',   width: 120, hidden : true
 					},{	text : Language.get( 'memb_nm' ,'회원명'   ),   dataIndex: 'mmb_nm',   width: 120
					},{	text : Language.get( 'memb_tel_no','회원 전화번호' ),   dataIndex: 'memb_tel_no',width: 100
					},{	text : Language.get( 'memb_addr' ,'회원 주소'  ),      dataIndex: 'memb_addr_1',   width: 200
					},{	text : Language.get( 'user_memo' ,'메모사항'  ),    dataIndex: 'user_memo', width: 150 }
//        			{ 	text : Language.get( 'cust_en'   ,  '영문명'  ),    dataIndex: 'cust_en',   width: 120 },
//				 	{ 	text : Language.get( 'notuse'    ,  '숨김'    ),    dataIndex: 'notuse' ,   width : 45,   xtype: 'checkcolumn' , processEvent: function () { return false; } }

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

        		var store = Ext.create('lookup.popup.custinfo.store.CustInfoPopup' );
        			param = Ext.merge( me.down('form').getValues(), me.popup.params, {
        				cust_id : select.get('cust_id'),
        				mmb_id : select.get('mmb_id')
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
