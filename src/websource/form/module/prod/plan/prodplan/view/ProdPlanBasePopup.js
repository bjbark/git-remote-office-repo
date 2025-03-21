Ext.define('module.prod.plan.prodplan.view.ProdPlanBasePopup', { extend: 'Axt.popup.Search',

	id		: 'lookup-prod-base-popup',
	alias	: 'widget.lookup-prod-base-popup',
	store	: 'module.prod.plan.prodplan.store.ProdPlanBasePopup',
	title	: '기초 코드 정보',
	closable: true,
	autoShow: true,
	width	: 400,
	height	: 500,
	layout	: {
		type: 'border'
	},
	lookupTitle : [
		['1102'		, 'common'		, Language.get('acct_bacd_popup'		, ' 계정구분 찾기'			)]
		,['1103'	, 'common'		, Language.get('crdt_bacd_popup'		, ' 신용등급 찾기'			)]
		,['1202'	, 'common'		, Language.get('make_natn_popup'		, ' 국가(국적,원산지)찾기'	)]
		,['3102'	, 'common'		, Language.get('ostt_type_popup'		, ' 출고유형 찾기'			)]
		,['3103'	, 'common'		, Language.get('ostt_usge_popup'		, ' 출고용도 찾기'			)]
		,['3107'	, 'common'		, Language.get('istt_type_popup'		, ' 입고사유 찾기'			)]
		,['4100'	, 'common'		, Language.get('insp_bacd_popup'		, ' 검사항목 코드 찾기'		)]
		,['6000'	, 'common'		, Language.get('poor_type_popup'		, ' 불량유형 코드 찾기'		)]
		,['6001'	, 'common'		, Language.get('poor_bacd_popup'		, ' 불량원인 코드 찾기'		)]
		,['6100'	, 'common'		, Language.get('loss_bacd_popup'		, ' 유실공수 코드 찾기'		)]
		,['7000'	, 'common'		, Language.get('clss_popup'				, ' 등급 코드 찾기'			)]
		,['3101'	, 'N1000DOOIN'	, Language.get('mtrl_bacd_popup'		, ' 재질 찾기'				)]
		,['3104'	, 'N1000DOOIN'	, Language.get('colr_bacd_popup'		, ' 컬러(색상) 찾기'		)]
		,['3105'	, 'N1000DOOIN'	, Language.get('mold_grad_bacd_popup'	, ' 금형 등급 찾기'			)]
		,['8004'	, 'N1000DOOIN'	, Language.get('pckg_bacd_popup'		, ' 포장용기 코드 찾기'		)]
		,['3101'	, 'N1000NBOLT'	, Language.get('mtrl_bacd_popup'		, ' 재질 찾기'				)]
		,['8001'	, 'N1000NBOLT'	, Language.get('item_grop_bacd_popup'	, ' 품목군 코드 찾기'		)]
		,['8002'	, 'N1000NBOLT'	, Language.get('item_bacd_popup'		, ' 품목구분 코드 찾기'		)]
		,['8003'	, 'N1000NBOLT'	, Language.get('make_bacd_popup'		, ' 제조구분 코드 찾기'		)]
		,['6501'	, 'N1000INKOP'	, Language.get('cost_larg_clss_popup'	, ' 원가대분류 코드 찾기'		)]
		,['6502'	, 'N1000INKOP'	, Language.get('cost_smll_clss_popup'	, ' 원가중분류 코드 찾기'		)]
		,['6503'	, 'N1000INKOP'	, Language.get('cost_type_popup'		, ' 원가소분류 코드 찾기'		)]
		,['6505'	, 'N1000INKOP'	, Language.get('cost_type_popup'		, ' 원가Type 코드 찾기'		)]
		,['8001'	, 'N1000INKOP'	, Language.get('made_type_popup'		, ' 가공형태 코드 찾기'		)]
		,['3101'	, 'N1000DEHAN'	, Language.get('mtrl_bacd_popup'		, ' 매쉬소재'				)]
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
					{	text : Language.get( 'base_code'		, '원재료코드'	)	, dataIndex: 'base_code'		, width: 100
					},{	text : Language.get( 'base_name'		, '원재료'		)	, dataIndex: 'base_name'		, width: 100
					},{	text : Language.get( 'base_engl_name'	, 'GRADE'		)	, dataIndex: 'base_engl_name'	, flex : 200
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
			}
		});
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
