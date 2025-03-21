Ext.define('lookup.popup.view.CpstNumbPopup', { extend: 'Axt.popup.Search',

	id		: 'lookup-cpst-popup',
	alias	: 'widget.lookup-cpst-popup',
	store	: 'lookup.popup.store.CpstNumbPopup',
	title	: '기초 코드 정보',
	closable: true,
	autoShow: true,
	width	: 550,
	height	: 700,
	layout	: {
		type: 'border'
	},
	lookupTitle : [
		['1102'		, 'common'		, Language.get('acct_bacd_popup'		, ' 계정구분 찾기'			)]
		,['9003'	, 'N1000LIEBE'	, Language.get('Cpst_Numb_popup'		, ' 조판번호 찾기'			)]
	],

	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];

		if (me.popup.params.prnt_idcd) {
			Ext.each(me.lookupTitle , function ( title ) {
				if (me.popup.params.prnt_idcd == title[0] && _global.hqof_idcd == title[1]) {
					me.title = title[2]  ;
					return;
				}
			});
		}
		if (me.popup.params.prnt_idcd) {
			Ext.each(me.lookupTitle , function ( title ) {
				if (me.popup.params.prnt_idcd == title[0] && 'common' == title[1]) {
					me.title = title[2]  ;
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
		var me = this,
			form = {
			xtype		: 'form-layout',
			region		: 'center',
			border		: false,
			dockedItems	: [ me.searchForm() ],
			items		: [ me.createGrid() ]
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
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '코드 또는 코드명을 입력하세요....',
											value	: me.popup.params.find,
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
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	: { selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( me.store ),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
					]
				},
				columns:[
					{	text : Language.get( 'base_code' , '조판코드'       )	, dataIndex: 'base_code'	, width: 70 , align	: 'center'
					},{	text : Language.get( 'base_name' , '제품명'         )	, dataIndex: 'base_name'	, width: 200
					},{	text : Language.get( 'user_memo' , '제품코드'       )	, dataIndex: 'user_memo'	, width : 90, align	: 'center'
					},{	text : Language.get( 'sysm_memo' , '수주처'         )	, dataIndex: 'sysm_memo'	, width : 120
					}

				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var me = this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
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
		var  me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge( me.down('form').getValues(), {
			}, me.popup.params , {hqof_idcd : _global.hqof_idcd} );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				 if(records){
//						me.down('grid').getSelectionModel().select(0);
				}
			}
		});
		var me = this;
	},
	/**
	 * 확인 버튼 이벤트
	 */
	 finishAction: function(){
		var	me    = this,
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
