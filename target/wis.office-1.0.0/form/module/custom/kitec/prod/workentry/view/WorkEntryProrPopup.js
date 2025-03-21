Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryProrPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-kitec-workenty-pror-popup',
	alias	: 'widget.lookup-kitec-workenty-pror-popup',
	store	: 'module.custom.kitec.prod.workentry.store.WorkEntryProrPopup',

	title	: Language.get('pror_popup','작업지시 선택'),
	closable: true,
	autoShow: true,
	width	: 1320,
	height	: 563,
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
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
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
											emptyText	: '공정코드 또는 공정명을 입력하세요....',
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
						{	xtype	: 'button',
							scope	: me,
							handler	: me.selectAction,
							width	: 40,
							height	: 36,
							region	: 'north',
							margin	: '2 2 0 0',
							action	: Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout			: { type: 'vbox' },
			fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items			: [
				// 기타 검색 조건이 필요한 경우
			]
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
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'지시번호'	) , width : 250 , align : 'center',hidden : true,
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'	) , width : 300 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'bomt_degr'		, text : Language.get('bomt_degr'		,'BOM차수'	) , width : 70  , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'착수예정'	) , width : 425 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료예정'	) , width : 425 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	) , width  : 400 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 320 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 180  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum',
						renderer: function(value, meta){
							meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					 render: function(){
						var me = this ;
						new Ext.util.KeyMap({
							target		: me.getEl(),
							eventName	: 'keyup',
							binding		: [
								{	key: Ext.EventObject.ENTER,
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
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge(me.down('form').getValues(),
								{hq_id : _global.hq_id },
								me.popup.params
					)
		;

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
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
						cvic_idcd : eachrow.get('cvic_idcd')
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
