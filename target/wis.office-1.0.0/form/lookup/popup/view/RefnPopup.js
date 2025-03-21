/**
 */
Ext.define('lookup.popup.view.RefnPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-refn-popup',
	alias	: 'widget.lookup-refn-popup',
	store	: 'lookup.popup.store.RefnPopup',
	title	: '용도용법 코드 찾기',
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this
			tema	= '';
		;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}
		me.items = [me.createForm()];
		me.callParent(arguments);
		if(me.popup.params.find){
			me.selectAction();
		}
		if	(_global.options.refn_popp_auto) {
			me.selectAction();
		}
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var  me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]
			}
		;
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
										height	: 38,
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
													},{	// fieldLabel  : Language.get( 'base_gb', '코드종류' ),
														xtype	: 'lookupfield',
														name	: 'refn_dvcd',
														margin	: '3 10 0 0',
														width	: 100,
														editable	: true,
														lookupValue	: resource.lookup('refn_dvcd' )
													},{	name	: 'find_name',
														xtype	: 'searchfield',
														margin	: '3 10 0 0',
														flex	: 1,
														emptyText	: '코드 또는 코드명을 입력하세요....',
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
								 	},
									{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
										style	: 'background:url("../../../resource/img/btn_search_icon.png")'
									}
								]
//							},{
//								xtype : 'container'  , layout: 'border', border : 0 , height: 1  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
							}
						],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },

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
				cls: tema,
				selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store   : Ext.create( me.store ),
				paging:{
					xtype: 'grid-paging',
					items:[
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	text : Language.get( 'refn_dvcd'	, '코드구분'   )	, dataIndex: 'refn_dvcd'	, width : 60, align : 'center', xtype:'lookupcolumn', lookupValue : resource.lookup('refn_dvcd'),
					},{	text : Language.get( 'refn_code'	, '코드'   )	, dataIndex: 'refn_code'	, width : 80,
					},{	text : Language.get( 'refn_cont_1fst'	, '코드내용'  )		, dataIndex: 'refn_cont_1fst'	, flex : 1 , minWidth : 200,
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
	 */
	finishAction: function(){
		var  me    = this,
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
