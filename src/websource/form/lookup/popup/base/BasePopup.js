Ext.define('lookup.popup.base.BasePopup', { extend: 'Axt.popup.Search',

	id      : 'lookup-base-popup',
	alias   : 'widget.lookup-base-popup',
	store   : 'lookup.popup.base.store.BasePopup',


	title   : Language.get('','기초 코드 찾기'),
	closable: true,
	autoShow: true,
	width   : 700,
	height  : 500,
	layout  : {
		type: 'border'
    },
    lookupTitle : [
		['9001'   , Language.get('9001_popup'  ,' VAN사  찾기'  )],
		['9100'   , Language.get('9100_popup'  ,' 거래처 찾기'  )],
		['9120'   , Language.get('9120_popup'  ,'고객 분류1 찾기')],
		['9121'   , Language.get('9121_popup'  ,'고객 분류2 찾기')],
		['9122'   , Language.get('9122_popup'  ,'고객 분류3 찾기')],
		['9123'   , Language.get('9123_popup'  ,'수금 기일  찾기')],
		['9124'   , Language.get('9124_popup'  ,'수금 방법  찾기')],
		['9125'   , Language.get('9125_popup'  ,'배달 방법 찾기')],
		['7100'   , Language.get('7100_popup'  ,'   품목  찾기 ')],
		['7101'   , Language.get('7101_popup'  ,'기타 분류 찾기')],
		['7102'   , Language.get('7102_popup'  ,'여유 분류 찾기')],
		['7103'   , Language.get('7103_popup'  ,' 제조사   찾기')],
		['brand'  , Language.get('brand_popup' ,' 브랜드  찾기 ')],
		['origin' , Language.get('origin_popup',' 원산지   찾기')],
		['9200'   , Language.get('9200_popup'  ,' 매입사   찾기')],
		['9220'   , Language.get('9220_popup'  ,'매입사분류1 찾기')],
		['9221'   , Language.get('9221_popup'  ,'매입사분류2 찾기')],
		['9222'   , Language.get('9222_popup'  ,'매입사분류3 찾기')],
		['9223'   , Language.get('9223_popup'  ,'지급 기일  찾기')],
		['9224'   , Language.get('9224_popup'  ,'지급 방법  찾기')],
		['9225'   , Language.get('9225_popup'  ,'배달 방법  찾기')],
		['5100'   , Language.get('5100_popup'  ,'  기 타   찾기')],
		['5101'   , Language.get('5101_popup'  ,'택배사 코드 찾기')],
		['5102'   , Language.get('5102_popup'  ,'은행 코드 찾기' )],
		['5305'   , Language.get('5305_popup'  ,'매출 계정 찾기' )],
		['5155'   , Language.get('5155_popup'  ,'포인트적립사유 찾기')],
		['6100'   , Language.get('6100_popup'  ,'휴가구분 찾기')],
		['6300'   , Language.get('6300_popup'  ,'근무반 찾기')],
		['6400'   , Language.get('6400_popup'  ,'근무구분 찾기')],
		['6500'   , Language.get('6500_popup'  ,'호봉 찾기')],
    ],

    defaultFocus : 'initfocused',
    initComponent: function(config){
    	var me = this;
        me.items = [me.createForm()];
        //console.debug ('me.popup.params.prnt_id' ,me.popup.params.prnt_id );

        if (me.popup.params.prnt_id) {
        	Ext.each(me.lookupTitle , function ( title ) {
        		if (me.popup.params.prnt_id == title[0] ) {
        			me.title = title[1]  ;
        			return;
        		}
        	});
        }
        me.callParent(arguments);
        me.selectAction();
    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this, form =
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
    	var me = this,
    		grid = {
	    		xtype   : 'grid-panel',
	    		header  : false,
	    		region  : 'center',
	    		viewConfig: {
	    			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
	    		},
	    		selModel: { selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
	    		store   : Ext.create( me.store ),
	    		paging	: {
    			xtype	: 'grid-paging',
    			items	: [
    			 	'->',
    			 	{	xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls		: 'button-style'
			 		},'-',
    			 	{	xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls		: 'button-style'
		 			}
        		]
    		},
    		columns:[
    		 	{   text : Language.get( 'bas_cd' , 'code'  ),     dataIndex: 'bas_cd',  width: 100
		 		},{	text : Language.get( 'bas_nm' , 'Code name'  ),    dataIndex: 'bas_nm',   width: 100
	 			},{	text : Language.get( 'user_memo' ,'memo'),    dataIndex: 'user_memo', flex  : 200
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
    	};
    	return grid;
    },
    /**
     * 조회
     */
    selectAction: function(){
        var  me    = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
        	}, me.popup.params );
        ;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
		store.load({
			 params:{param:JSON.stringify(param)}, scope:me,
			 callback:function(records, operation, success) {
			}
		});
    },
    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var  me    = this,
    		 panel = me.down('grid'),
    		 selected = panel.getSelectionModel().getSelection()
    	;
        if (selected.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
        	console.log(selected);
       		me.setResponse(selected);
        }
    }
});
