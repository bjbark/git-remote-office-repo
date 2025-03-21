/**
 */
Ext.define('lookup.popup.view.AsmtPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-asmt-popup',
	store	: 'lookup.popup.store.AsmtPopup',

	title	: Language.get('asmt_popup','부자재 찾기'),
	closable: true,
	autoShow: true,

	width	: 800,
	height	: 508,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},

	/**
	 * 화면폼
	 */
	 createForm: function(){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm() ],
				items		: [ me.createGrid() ]
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
			id			: 'search',
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
										},{	xtype		: 'lookupfield',
											name		: 'asmt_dvcd',
											margin		: '3 10 0 0',
											width		: 80,
											editable	: false,
											lookupValue	: resource.lookup('search_all').concat(resource.lookup('asmt_dvcd')),
											value		: ''
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '부자재코드 또는 부자재명을 입력하세요....',
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
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'line_stat'	, width:  50, align : 'center', text: Language.get( 'line_stat'	, '상태'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
						hidden	: true
					},{	dataIndex:	'asmt_code'	, width:  80, align : 'center', text: Language.get( 'asmt_code'	, '부자재코드'		),
					},{	dataIndex:	'asmt_name'	, flex :   1, align : 'left'  , text: Language.get( 'asmt_name'	, '부자재명'		),
					},{	dataIndex:	'asmt_dvcd'	, width: 100, align : 'center', text: Language.get( 'asmt_dvcd'	, '부자재구분코드'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'asmt_dvcd' ),
					},{	dataIndex:	'asmt_spec'	, width: 100, align : 'left'  , text: Language.get( 'asmt_spec'	, '부자재규격'		),
					},{	dataIndex:	'unit_name'	, width:  70, align : 'center', text: Language.get( 'unit_name'	, '단위'			),
					},{	dataIndex:	'stnd_pric'	, width:  70, align : 'right' , text: Language.get( 'stnd_pric'	, '표준단가'		), xtype: 'numericcolumn',
					},{	dataIndex:	'asmt_idcd'	, width: 100, align : 'left'  , text: Language.get( 'asmt_idcd'	, '부자재ID'		),
						hidden : true
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var	me = this,
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
		var me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id});

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
				 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
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
						astm_idcd : eachrow.get('astm_idcd')
					});
				});
				var store = Ext.create(me.store);
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

