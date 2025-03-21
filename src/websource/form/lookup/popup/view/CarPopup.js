/**
 */
Ext.define('lookup.popup.view.CarPopup', { extend: 'Axt.popup.Search',

	id			: 'lookup-car-popup',
	alias		: 'widget.lookup-car-popup',
	store		: 'lookup.popup.store.CarPopup',

	title		: Language.get( '' , '차량 찾기') ,
	closable	: true,
	autoShow	: true,
	width		: 700,
	height		: 500,
	layout		: {
		type	: 'border'
	},
	matcode		: undefined,
	matname		: undefined,
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
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
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
											emptyText	: '차량코드 또는 차량명을 입력하세요....',
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
					xtype : 'container'  , layout: 'border', border : 0 , height: 3
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
				store: Ext.create( me.store ),
				paging:{
					xtype: 'grid-paging',
					items:[
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns:[
					{	dataIndex:	'line_stat'		, width:  50, align : 'center',	text: Language.get( ''		, '상태'			), xtype :'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'cars_code'		, width: 100, align : 'center',	text: Language.get( ''		, '차량코드'		)
					},{	dataIndex:	'crty_bacd'		, width: 100, align : 'left',	text: Language.get( ''		, '차종'			), xtype :'lookupcolumn', lookupValue : resource.lookup('crty_bacd')
					},{	dataIndex:	'load_volm'		, width:  60, align : 'center',	text: Language.get( ''		, '적재량'		)
					},{	dataIndex:	'cars_numb'		, width: 100, align : 'left',	text: Language.get( ''		, '차량번호'		)
					},{	dataIndex:	'cars_alis'		, width: 100, align : 'left',	text: Language.get( ''		, '차량명'		)
					},{	dataIndex:	'puch_date'		, width: 100, align : 'center',	text: Language.get( ''		, '구입일자'		)
					},{	dataIndex:	'cars_year_prod', width:  60, align : 'center',	text: Language.get( ''		, '년식'			)
					},{	dataIndex:	'insp_date'		, width: 100, align : 'center',	text: Language.get( ''		, '검사일자'		)
					},{	dataIndex:	'runn_dvcd'		, width: 100, align : 'left',	text: Language.get( ''		, '운행구분'		), xtype :'lookupcolumn', lookupValue : resource.lookup('runn_dvcd')
					},{	dataIndex:	'nwek_name'		, width: 100, align : 'left',	text: Language.get( ''		, '차주명'		)
					},{	dataIndex:	'inst_totl_amnt', width:  80, align : 'right',	text: Language.get( ''		, '할부총액'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'inst_mont'		, width:  60, align : 'center',	text: Language.get( ''		, '할부개월'		)
					},{	dataIndex:	'monh_paid_amnt', width:  80, align : 'right',	text: Language.get( ''		, '월불입금'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'paid_date'		, width:  60, align : 'center',	text: Language.get( ''		, '불입일'		)
					},{	dataIndex:	'expr_date'		, width: 100, align : 'center',	text: Language.get( ''		, '만기일자'		)
					},{	dataIndex:	'inst_bank_name', width:  80, align : 'left',	text: Language.get( ''		, '할부금융사'	)
					},{	dataIndex:	'insu_amnt'		, width: 100, align : 'right',	text: Language.get( ''		, '보험금액'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'insu_dvcd'		, width: 100, align : 'left',	text: Language.get( ''		, '보험구분'		), xtype :'lookupcolumn', lookupValue : resource.lookup('insu_dvcd')
					},{	dataIndex:	'insu_trff'		, width:  60, align : 'center',	text: Language.get( ''		, '보험요율'		)
					},{	dataIndex:	'insu_open_date', width: 100, align : 'center',	text: Language.get( ''		, '보험개시일'	)
					},{	dataIndex:	'insu_expr_date', width: 100, align : 'center',	text: Language.get( ''		, '보험만기일'	)
					},{	dataIndex:	'paid_mthd_dvcd', width: 100, align : 'left',	text: Language.get( ''		, '납입구분'		), xtype :'lookupcolumn', lookupValue : resource.lookup('paid_mthd_dvcd')
					},{	dataIndex:	'insu_cmpy_name', width: 100, align : 'left',	text: Language.get( ''		, '보험사명'		)
					},{	dataIndex:	'insu_drtr_name', width: 100, align : 'left',	text: Language.get( ''		, '담당자'		)
					},{	dataIndex:	'tele_numb'		, width: 100, align : 'center',	text: Language.get( ''		, '전화번호'		)
					},{	dataIndex:	'hdph_numb'		, width: 100, align : 'center',	text: Language.get( ''		, '휴대폰번호'	)
					},{	dataIndex:	'emgc_tele_numb', width: 100, align : 'center',	text: Language.get( ''		, '비상전화'		)
					},{	dataIndex:	'frst_date'		, width: 100, align : 'center',	text: Language.get( ''		, '1회일자'		)
					},{	dataIndex:	'frst_amnt'		, width:  60, align : 'right',	text: Language.get( ''		, '1회금액'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'secd_date'		, width: 100, align : 'center',	text: Language.get( ''		, '2회일자'		)
					},{	dataIndex:	'secd_amnt'		, width:  60, align : 'right',	text: Language.get( ''		, '2회금액'		), xtype: 'numericcolumn', format: '#,##0'
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
			}
		;
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
		var me    = this,
			panel    = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						cars_idcd  : eachrow.get('cars_idcd' )
					});
				});
				var store = Ext.create( me.store );
				param = Ext.merge( me.popup.params, {
					records : request
				});
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params   : {param:JSON.stringify(param)},
					scope    : me,
					callback : function(records, operation, success) {
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
