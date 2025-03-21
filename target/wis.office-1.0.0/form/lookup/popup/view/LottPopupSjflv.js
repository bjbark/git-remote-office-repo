/**
 */
Ext.define('lookup.popup.view.LottPopupSjflv', { extend: 'Axt.popup.Search',
	id: 'lookup-lott-popup-sjflv',
	alias: 'widget.lookup-lott-popup-sjflv',
	store: 'lookup.popup.store.LottPopup',
	title: Language.get('','Lot 번호 선택'),
	closable: true,
	autoShow: true,
	width: 895,
	height: 500,
	layout: {
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

	listeners:{
		show:function(){
			if(!this.popup.params.item_idcd){
				Ext.Msg.alert('알림','품목을 선택하여주세요.');
				this.hide();
			}
		}
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this, form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ],
			items : [ me.createGrid() ]
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
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel	: { selType: 'cellmodel' },
			features	: [{ ftype : 'grid-summary'  , remote : false }],
			plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
			store		: Ext.create(me.store),
			paging		: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns:[
				{ text: Language.get(''			, '선택'		) ,	dataIndex:	'chk'	   , width:  35 , align : 'center'  , xtype:'checkcolumn'
					, listeners:{
						checkchange:function(element, rowindex, bool, rec) {
							var record = this.up('grid').getStore().getAt(rowindex);
							if (bool) {
//								if ("10" == me.popup.params.acct_bacd.substr(0,2)) {
									record.set('ostt_qntt2', me.popup.params.qntt);
//								} else {
//									record.set('ostt_qntt2', record.get('stok_qntt'));
//								}
							} else {
								record.set('ostt_qntt2',0);
							}
						}
					}
				},
				{ text: Language.get('lott_numb', 'Lot 번호'	) , dataIndex: 'lott_numb' , width: 100 , align: 'left'},
				{ text: Language.get('item_code', '코드'	 	) , dataIndex: 'item_code' , width: 80  , align: 'left'},
				{ text: Language.get('','입고누계'				) , dataIndex: 'istt_qntt' , width: 70  , align: 'right'	, xtype: 'numericcolumn'  ,  format:  '#,##0.###'},
				{ text: Language.get('','출고누계'				) , dataIndex: 'ostt_qntt' , width: 70  , align: 'right'	, xtype: 'numericcolumn'  ,  format:  '#,##0.###'},
				{ text: Language.get('','현재고' 				) , dataIndex: 'stok_qntt' , width: 70  , align: 'right'	, xtype: 'numericcolumn'  ,  format:  '#,##0.###'},
				{ text: Language.get('ostt_qntt2','출고수량'	) , dataIndex: 'ostt_qntt2', width : 80 , align: 'right'    , xtype: 'numericcolumn'  ,  format:  '#,##0.###' , summaryType: 'sum'
					, tdCls : 'editingcolumn'
					, editor: {
						xtype           :'numericfield',
						selectOnFocus   : true,
						allowBlank	    : true,
						enableKeyEvents : true,
						listeners       : {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = grid.getStore()
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									grid.plugins[0].startEdit(row, grid.columns[5]);
								}
							}
						}
					}
				},
				{ text: Language.get('','제조일자'				) , dataIndex: 'make_date' , width: 80  , align: 'center'},
				{ text: Language.get('','최종입고일자'			) , dataIndex: 'istt_date' , width: 80  , align: 'center'},
				{ text: Language.get('','최종출고일자'			) , dataIndex: 'ostt_date' , width: 80  , align: 'center'},
				{ text: Language.get('','비고'				) , dataIndex: 'user_memo' , width: 130 , align: 'center'},
				{ text: Language.get('','창고ID'				) , dataIndex: 'wrhs_idcd' , width: 80  , align: 'center'	, hidden : true},

			],
			listeners: {
				 render: function(){
					var me = this
					;
					new Ext.util.KeyMap({
						 target: me.getEl(),
						 eventName : 'keyup',
						 binding:[
							  {
								 key: Ext.EventObject.ENTER,
								 fn: function(key,e){
									me.fireEvent('itemdblclick', me.getView() );
								 }
							  }
						]
					});
				},
				edit : function(editor, context) {
					if (context.field == "ostt_qntt2") {
						var stok_qntt  = context.record.data.stok_qntt;

						if (context.value > stok_qntt) {
							Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
							context.record.set('ostt_qntt2',0);
						}
					}
				},
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
			param = Ext.merge( me.down('form').getValues() , {
			}, me.popup.params, {hq_id : _global.hq_id} )
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				 if(records){
						//me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},
	/**
	  * 확인 버튼 이벤트
	  */
	finishAction: function(){
		var me      = this,
			panel   = me.down('grid'),
			store   = panel.getStore(),
			selects = panel.getSelectionModel().getSelection(),
			request = []
		;
		// 출고수량 계산
		var lott_numb_sum = "";
		var ostt_qntt_sum = 0.0;

		for(var i = 0; i < store.getUpdatedRecords().length; i++) {
			var lott_numb = store.getUpdatedRecords()[i].data.lott_numb;
			var ostt_qntt = store.getUpdatedRecords()[i].data.ostt_qntt2;

			if (!Ext.isEmpty(lott_numb_sum)) {
				lott_numb_sum += ",";
			}

			lott_numb_sum += lott_numb + "^" + ostt_qntt;
			ostt_qntt_sum = (ostt_qntt_sum + ostt_qntt);

		}
		ostt_qntt_sum = ostt_qntt_sum.toFixed(6); // 소수점계산 임시조치 2024.01.10 ISC

		// 출고수량 검증
		if ("10" == me.popup.params.acct_bacd.substr(0,2)) {

			if (ostt_qntt_sum != me.popup.params.qntt.toFixed(6)) {
				Ext.Msg.alert('알림','Batch 총 출고수량이 제품출고수량과 다릅니다.');
				return;
			}
		} else {
			if (ostt_qntt_sum > me.popup.params.qntt.toFixed(6)) {
				Ext.Msg.alert('알림','Batch 총 출고수량이 제품출고수량보다  큽니다.');
				return;
			}
		}

		var jsonObj1			= new Object();
		jsonObj1.ostt_qntt		= ostt_qntt_sum;
		jsonObj1.lott_numb		= store.getUpdatedRecords()[0].data.lott_numb;
		jsonObj1.lott_numb_sum	= lott_numb_sum;


		var jsonObj2	= new Object();
		jsonObj2.data	= jsonObj1;

		var jsonArray = new Array();
		jsonArray.push(jsonObj2);

		me.setResponse(jsonArray);
	},
});
