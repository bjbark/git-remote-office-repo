Ext.define('module.custom.komec.stock.isos.prodnotwork.view.ProdNotWork', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodnotwork-lister',
	store		: 'module.custom.komec.stock.isos.prodnotwork.store.ProdNotWork',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,
					{	text : '<span class="write-button">불량처리</span>'	, action : 'errorAction' , cls: 'button1-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'		, '품목ID'	), hidden : true
					},{	dataIndex:	'invc_date'			, width: 90 , align : 'center' , text: Language.get( 'istt_date'		, '일자'		)
//					},{	dataIndex:	'istt_wrhs_name'	, width: 120, align : 'left'   , text: Language.get( 'istt_wrhs_name'	, '입고창고'	)
//					},{	dataIndex:	'istt_dvcd'			, width:  80, align : 'center' , text: Language.get( 'istt_dvcd'		, '입고구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'istt_dvcd' )
//					},{	dataIndex:	'invc_numb'			, width:  80, align : 'center' , text: Language.get( 'istt_dvcd'		, 'invoice'	)
					},{	dataIndex:	'item_code'			, width:  90, align : 'center' , text: Language.get( 'item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 150, align : 'left'   , text: Language.get( 'item_spec'		, '규격'		)
					},{	dataIndex:	'unit_idcd'			, width:  80, align : 'left'   , text: Language.get( 'unit_idcd'		, '단위ID'	), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'center' , text: Language.get( 'unit_name'		, '단위'		)
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'		, 'LOT번호'	)
					},{	dataIndex:	'indn'				, width:  80, align : 'right'  , text: Language.get( 'istt_qntt'		, '지시수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex:	'prod'				, width:  80, align : 'right'  , text: Language.get( 'istt_qntt'		, '생산수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex:	'poor'			, width:  80, align : 'right'  , text: Language.get( 'poor_qntt'		, '불량수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex:	'qntt'				, width:  80, align : 'right'  , text: Language.get( 'poor_qntt'		, '수량'		), xtype: 'numericcolumn'  ,
						xtype	: 'numericcolumn'		, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'stnd_unit'			, width:  80, align : 'left'   , text: Language.get( 'stnd_unit'		, '기준단위'	), hidden : true
					},{	dataIndex:	'stnd_unit_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stnd_unit_qntt'	, '기준단위수량'), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##', hidden: true
					},{	dataIndex:	'istt_wrhs_idcd'	, width:  80, align : 'left'   , text: Language.get( 'ostt_wrhs_idcd'	, '입고창고ID'), hidden : true
					},{	dataIndex:	'istt_wrhs_name'	, width: 120, align : 'left'   , text: Language.get( 'ostt_wrhs_name'	, '입고창고'	), hidden : true
//					},{	dataIndex:	'orig_invc_numb'	, width: 100, align : 'left'   , text: Language.get( 'reqt_numb'		, '요청번호'	)
//					},{	dataIndex:	'orig_line_seqn'	, width:  60, align : 'center' , text: Language.get( 'reqt_seqn'		, '요청항번'	), xtype: 'numericcolumn'
//					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'		, '상태'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' )
					},{	dataIndex:	'remk_text'			, flex :   1, align : 'left'   , text: Language.get( 'remk_text'		, '비고'		)
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context, rowIndexNum) {
		var	me		= this,
		grid		= this,
		rowIndex,
		a	,
		b	,
		c	,
		d	,
		e	,
		f 	,
		g	,
		i	,
		va
		;
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		models = grid.getStore().getRange();

		a =  grid.getStore().getAt(rowIndex).get('prod');		//수주량
		b =  grid.getStore().getAt(rowIndex).get('poor_qntt');		//납품수량

		if(a<b ){
			Ext.Msg.alert("알림", "생산수량을 초과입력했습니다. 불량수량을 다시 입력해주십시오.");
			models[rowIndex].set('poor_qntt',0);
			return;
		}

	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'prod' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
				});
				return false;
			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
	}
});