Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-noteiomy-lister'			,
	store		: 'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('row_type') == '3'){
				return 'text-warn';
			}else if(record.get('row_type') == '2'){
				return 'text-blue';
			}else if(record.get('row_type') == '1'){
				return 'text-green';
			}
		},
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'->', '-' ,
					{	text : '<span class="write-button">어음입금 등록</span>'	, action : 'insertAction'	, cls: 'button-style', width: 90	} ,
					{	text : '<span class="write-button">어음입금 삭제</span>'	, action : 'deleteAction'	, cls: 'button-style', width: 90	} ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{	dataIndex: 'invc_date'		, width:  85, align: 'center', text: Language.get(''			, '전표일자'	)
					},{	dataIndex: 'cstm_code'		, width: 100, align: 'center', text: Language.get('cstm_code'	, '거래처코드')
					},{ dataIndex: 'cstm_name'		, width: 300, align: 'left'  , text: Language.get('cstm_name'	, '거래처명'	)
					},{ dataIndex: 'stot_bass'		, width: 200, align: 'left'  , text: Language.get(''			, '어음번호'	)
					},{ dataIndex: 'paym_bank_name'	, width: 110, align: 'left'  , text: Language.get(''			, '발행인'	)
					},{	dataIndex: 'publ_date'		, width:  85, align: 'center', text: Language.get('publ_date'	, '발행일자'	)
					},{	dataIndex: 'expr_date'		, width:  85, align: 'center', text: Language.get('expr_date'	, '만기일자'	)
					},{ dataIndex: 'plan_amnt'		, width: 130, align: 'right' , text: Language.get(''			, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.###'
					},{	dataIndex: 'iomy_date'		, width:  85, align: 'center', text: Language.get('iomy_date'	, '입금일자'	)
					},{ dataIndex: 'iomy_amnt'		, width: 130, align: 'right' , text: Language.get('iomy_amnt'	, '입금금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.###'
					},{ dataIndex: 'remk_text'		, flex :   1, align: 'left'  , text: Language.get('remk_text'	, '입금비고'	)
					}
				]
			}
		;
		return item;
	},
});
