/**
 */
Ext.define('lookup.popup.view.InspTypeItemPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-insptypeitem-popup',
	alias	: 'widget.lookup-insptypeitem-popup',
	store	: 'lookup.popup.store.InspTypeItemPopup',

	title	: Language.get('insptypeitem_popup','검사항목 찾기'),
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}
		me.items = [me.createForm(tema)];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(tema){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid(tema) ]  //me.createToolbar(),
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
											emptyText	: '검사 유형코드 또는 검사 유형명을 입력하세요....',
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
				cls			: tema,
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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'		, '순번'			),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'insp_sbsc_name', width: 150, align : 'left'	, text: Language.get('insp_sbsc_name'	, '검사항목명'		),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'insp_cond'		, flex : 200, align : 'left'	, text: Language.get('insp_cond'		, '검사조건'		),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'msmt_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('msmt_mthd_dvcd'	, '측정방법'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('msmt_mthd_dvcd'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'rslt_iput_dvcd', width:  80, align : 'center'	, text: Language.get('rslt_iput_dvcd'	, '입력구분'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('rslt_iput_dvcd'),
					},{	dataIndex:	'goal_levl'		, width:  70, align : 'left'	, text: Language.get('goal_levl'		, '목표수준'		)	/*, hidden : (_global.options.insp_item_goal == 0)*/
					},{	dataIndex:	'uppr_valu'		, width:  70, align : 'left'	, text: Language.get('uppr_valu'		, '상한값'			)	/*, hidden : (_global.options.insp_item_uppr == 0)*/
					},{	dataIndex:	'lwlt_valu'		, width:  70, align : 'left'	, text: Language.get('lwlt_valu'		, '하한값'			)	/*, hidden : (_global.options.insp_item_lwlt == 0)*/
					},{	dataIndex:	'remk_text'		, width: 200, align : 'left'	, text: Language.get('remk_text'		, '참고사항'		)
					}
				],
				listeners: {
//					itemdblclick: function(dataview, index, item, e) {
//						me.finishAction();
//					},
//					 render: function(){
//						var me = this ;
//						new Ext.util.KeyMap({
//							target		: me.getEl(),
//							eventName	: 'keyup',
//							binding		: [
//								{	key: Ext.EventObject.ENTER,
//									fn: function(key,e){
//										me.fireEvent('itemdblclick', me.getView() );
//									}
//								}
//							]
//						});
//					}
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
						insp_type_idcd : eachrow.get('insp_type_idcd')
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
