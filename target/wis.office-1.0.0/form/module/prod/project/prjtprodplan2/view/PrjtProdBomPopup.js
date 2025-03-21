Ext.define('module.prod.project.prjtprodplan2.view.PrjtProdBomPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-prjtprodplan2-popup-bom'			,
	store		: 'module.prod.project.prjtprodplan2.store.PrjtProdBomPopup',

	title: '이미지 선택',
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
		var me = this
		;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
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
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: Language.get('acpt_numb', '금형코드')+'를 입력하세요.',
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
						{	xtype	: 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
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
		var me = this, grid =
		{
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
					{xtype: 'button' , text : '이미지추가', scope: me, handler: me.popupopen, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
				]
			},
			columns:[
				{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
				},{	dataIndex:	'pjod_idcd'		, width: 160, align : 'center'	, text: Language.get('pjod_idcd'	, '프로젝트수주id'),hidden : true
				},{	dataIndex:	'item_idcd'		, width: 100, align : 'left'	, text: Language.get('item_idcd'	, '품목id'	),hidden : false
				},{	dataIndex:	'item_name'		, width:  80, align : 'left'	, text: Language.get('item_name'	, '품명'		)
				},{	dataIndex:	'item_spec'		, width: 100, align : 'left'	, text: Language.get('item_spce'	, '규격'	)
				},{	dataIndex:	'item_mtrl'		, width:  80, align : 'center'	, text: Language.get('item_mtrl'	, '재질'	)
				},{ dataIndex: 'imge_1fst'		, text : Language.get('imge_1fst'		,'이미지'	) , width  :  400,
					renderer:function(value){
						img = new Uint8Array(value.split(","));
						blob = new Blob([img],{type:'image/png'})
						url = URL.createObjectURL(blob);
						return '<img src="'+url+'"/>';
					}
				},{	dataIndex:	'ivst_wkct_idcd', width:  80, align : 'right'	, text: Language.get('ivst_wkct_idcd'	, '투입공정id'	),hidden : true
				},{	dataIndex:	'unit_idcd'		, width:  80, align : 'right'	, text: Language.get('unit_idcd'		, '단위id'	),hidden : true
//				},{	dataIndex:	'supl_dvcd'		, width:  60, align : 'center'	, text: Language.get('supl_dvcd'		, '조달구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'supl_dvcd' )
				},{	dataIndex:	'cstm_idcd'		, width:  80, align : 'right'	, text: Language.get('cstm_idcd'		, '거래처id'	),hidden : true
				},{	dataIndex:	'stok_unit_idcd', width:  80, align : 'center'	, text: Language.get('stok_unit_idcd'	, '재고단위id'	),hidden : true
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
						binding:[
							{	key: Ext.EventObject.ENTER,
								fn: function(key,e){
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
		var me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
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
		var me    = this,
			panel    = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			params =  me.popup.params,
			request = []
		;

		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/project/prjtprodplan2/set/bomImage.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						id				: params.id,
						ordr_degr		: params.ordr_degr,
						work_ordr_dvcd	: params.work_ordr_dvcd,
						pjod_idcd		: params.pjod_idcd,
						work_schd_dvcd	: params.work_schd_dvcd,
						imge_1fst		: selects[0].get('imge_1fst'),
						item_idcd		: selects[0].get('item_idcd')
					})
				},
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						me.close();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	popupopen:function(){
		var me    = this,
			panel    = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			params =  me.popup.params,
			request = []
		;
		resource.loadPopup({
			widget : 'module-prjtprodplan2-popup-image',
			params : {
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				id				: params.id,
				ordr_degr		: params.ordr_degr,
				work_ordr_dvcd	: params.work_ordr_dvcd,
				pjod_idcd		: params.pjod_idcd,
				work_schd_dvcd	: params.work_schd_dvcd
			}
		});
	}
});