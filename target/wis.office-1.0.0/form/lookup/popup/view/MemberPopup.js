Ext.define('lookup.popup.view.MemberPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-member-popup',
	alias	: 'widget.lookup-member-popup',
	store	: 'lookup.popup.store.MemberPopup',
	title	: Language.get( 'membr' , '회원 찾기') ,
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode	: undefined,
	matname	: undefined,
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
				xtype	: 'form-layout',
				region	: 'center',
				border	:false,
				dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
			};
		return form;
	},

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
										},{	name	: 'emp_nm',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '회원코드 또는 회원명, 전화번호 등을 입력하세요....',
											enableKeyEvents : true,
											value	: me.popup.params.find,
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
			 		 	},{	xtype	: 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3
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
				xtype: 'grid-panel',
				header : false,
				region: 'center',
				viewConfig: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create( me.store ),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
					]
				},
				columns:[
					{	dataIndex: 'mmbr_code'		, text : Language.get('mnbr_code'	,'회원코드'	) , width : 100	, align : 'center'
					},{ dataIndex: 'mmbr_name'		, text : Language.get('mnbr_name'	,'회원명'		) , width : 120	, align : 'center'
					},{ dataIndex: 'entr_date'		, text : Language.get('entr_date'	,'등록일자'	) , width : 120	, align : 'center'
					},{ dataIndex: 'hdph_numb'		, text : Language.get('hdph_numb'	,'연락처'		) , width : 130	, align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'	,'담당코치'	) , width : 120	, align : 'center'
					},{ dataIndex: 'mond_yorn'		, text : Language.get('mond_yorn'	,'월'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'tued_yorn'		, text : Language.get('tued_yorn'	,'화'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'wedd_yorn'		, text : Language.get('wedd_yorn'	,'수'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'thud_yorn'		, text : Language.get('thud_yorn'	,'목'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'frid_yorn'		, text : Language.get('frid_yorn'	,'금'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'satd_yorn'		, text : Language.get('satd_yorn'	,'토'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'sund_yorn'		, text : Language.get('sund_yorn'	,'일'		) , width : 40	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'비고'		) , flex  :  1	, align : 'center'
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var me = this;
						new Ext.util.KeyMap({
							target		: me.getEl(),
							eventName	: 'keyup',
							binding		:[
								{	key	: Ext.EventObject.ENTER,
									fn	: function(key,e){
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
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params	: {param:JSON.stringify(param)},
			scope	: me,
			callback: function(records, operation, success) {
				if(records){
					me.down('grid').getSelectionModel().select(0);
				}
				if (me.popup.values && me.popup.values.barcode) {
					delete me.popup.values.barcode ;
				}
			}
		});
	},

	/**
	 * 선택
	 */
	finishAction: function(){
		var me		= this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection(),
			request	= []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						mnbr_idcd	: eachrow.get('mnbr_idcd' )
					});
				});
				var store = Ext.create( me.store );
				param = Ext.merge( me.popup.params, {
					records : request
				});
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params	: {param:JSON.stringify(param)},
					scope	: me,
					callback: function(records, operation, success) {
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
