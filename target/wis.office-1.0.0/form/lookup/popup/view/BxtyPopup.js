/**
 */
Ext.define('lookup.popup.view.BxtyPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-bxty-popup',
	alias	: 'widget.lookup-bxty-popup',
	store	: 'lookup.popup.store.BoxTypePopup',

	title	: Language.get('bxty_popup','상자형식 선택'),
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
											emptyText	: '형식코드 또는 형식명을 입력하세요....',
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
					{	dataIndex:	'line_stat'			, width:  60, align : 'center'	, text: Language.get( 'line_stat'		, '상태'				), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),hidden :true,
					},{	dataIndex:	'bxty_code'			, width:  57, align : 'center'	, text: Language.get( 'bxty_code'		, '형식코드'			),
					},{	dataIndex:	'bxty_name'			, width: 130, align : 'left'	, text: Language.get( 'bxty_name'		, '상자형식명'		),
					},{	dataIndex:	'bxty_imge_name'	, width: 100, align : 'left'	, text: Language.get( 'bxty_imge_name'	, '형식도면'			),hidden :true,
					},{	dataIndex:	'scre_dvcd'			, width:  73, align : 'center'	, text: Language.get( 'scre_dvcd'		, '스코어구분'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('scre_dvcd')
					},{	dataIndex:	'fabc_ttln_calc'	, width: 135, align : 'left'	, text: Language.get( 'fabc_ttln_calc'	, '원단총장 계산공식'	),
					},{	dataIndex:	'mxm2_gath'			, width:  70, align : 'right'	, text: Language.get( 'mxm2_gath'		, 'm2집합'			), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_gath'			, width:  70, align : 'right'	, text: Language.get( 'offr_gath'		, '발주집합'			), xtype : 'numericcolumn'
					},{	dataIndex:	'fabc_ttwd_calc'	, width: 135, align : 'left'	, text: Language.get( 'fabc_ttwd_calc'	, '원단총폭 계산공식'	),
					},{	dataIndex:	'sgam_relx'			, width:  80, align : 'right'	, text: Language.get( 'sgam_relx'		, '외낱개여유'		), xtype : 'numericcolumn'
					},{	dataIndex:	'mxm2_fdat_loss'	, width:  85, align : 'right'	, text: Language.get( 'mxm2_fdat_loss'	, 'm2재단Loss'		), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_fdat_loss'	, width:  85, align : 'right'	, text: Language.get( 'offr_fdat_loss'	, '발주재단Loss'		), xtype : 'numericcolumn'
					},{	dataIndex:	'scre_calc'			, width: 135, align : 'left'	, text: Language.get( 'scre_calc'		, '스코어규격 계산식'	),
					},{	dataIndex:	'tsum_ttln_calc'	, width: 135, align : 'left'	, text: Language.get( 'tsum_ttln_calc'	, '2합총장 계산식'		),
					},{	dataIndex:	'tsum_stnd'			, width: 100, align : 'right'	, text: Language.get( 'tsum_stnd'		, '2합기준'			),xtype : 'numericcolumn'
					},{	dataIndex:	'mxm2_tsum'			, width:  70, align : 'right'	, text: Language.get( 'mxm2_tsum'		, 'm2/2합'			),xtype : 'numericcolumn'
					},{	dataIndex:	'offr_tsum'			, width:  70, align : 'right'	, text: Language.get( 'offr_tsum'		, '발주/2합'			),xtype : 'numericcolumn'
					},{	dataIndex:	'minm_leng'			, width:  60, align : 'right'	, text: Language.get( 'minm_leng'		, '최소장'			),xtype : 'numericcolumn'
					},{	dataIndex:	'maxm_leng'			, width:  60, align : 'right'	, text: Language.get( 'maxm_leng'		, '최대장'			),xtype : 'numericcolumn'
					},{	dataIndex:	'minm_widh'			, width:  60, align : 'right'	, text: Language.get( 'minm_widh'		, '최소폭'			),xtype : 'numericcolumn'
					},{	dataIndex:	'maxm_widh'			, width:  60, align : 'right'	, text: Language.get( 'maxm_widh'		, '최대폭'			),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_leng'			, width:  40, align : 'right'	, text: Language.get( 'bxty_leng'		, '장'				),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_widh'			, width:  40, align : 'right'	, text: Language.get( 'bxty_widh'		, '폭'				),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_hght'			, width:  40, align : 'right'	, text: Language.get( 'bxty_hght'		, '고'				),xtype : 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'right'	, text: Language.get( 'user_memo'		, '비고'				)
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
						bxty_idcd : eachrow.get('bxty_idcd')
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
