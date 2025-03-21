Ext.define('module.sale.clam.clamentry1.view.ClamEntry1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-clamentry1-lister',
	store		: 'module.sale.clam.clamentry1.store.ClamEntry1Lister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	text : '마감/해지',
						hidden	: true,
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">실험의뢰서 발행</span>'	, action : 'printAction'		, cls: 'button1-style' ,width:100,	} , '->',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'line_clos'		, width:  50, align : 'center'	, text: Language.get( ''		, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_date'		, width:  90, align : 'center'	, text: Language.get( ''		, '접수일자'	)
					},{	dataIndex:	'clam_numb'		, width:  80, align : 'center'	, text: Language.get( ''		, '접수번호'	)
					},{	dataIndex:	'cstm_code'		, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 140, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'ostt_date'		, width:  90, align : 'center'	, text: Language.get( ''		, '출고일자'	)
					},{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get( ''		, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get( ''		, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get( ''		, '규격'		)
					},{	dataIndex:	'clam_qntt'		, width:  70, align : 'right'	, text: Language.get( ''		, '수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'lott_numb'		, width: 110, align : 'left'	, text: Language.get( ''		, 'Batch No')
					},{	dataIndex:	'drtr_name'		, width:  90, align : 'left'	, text: Language.get( ''		, '담당자'	)
					},{	dataIndex:	'labr_drtr_name', width:  90, align : 'left'	, text: Language.get( ''		, '실험담당자'	)
					},{	dataIndex:	'prod_drtr_name', width:  90, align : 'left'	, text: Language.get( ''		, '생산담당자'	)
					},{	dataIndex:	'pckg_drtr_name', width:  90, align : 'left'	, text: Language.get( ''		, '포장담당자'	)
					},{	dataIndex:	'clam_dvcd'		, width: 110, align : 'center'	, text: Language.get( ''		, '클레임종류'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('clam_dvcd')
					},{	dataIndex:	'clam_cont'		, width: 110, align : 'left'	, text: Language.get( ''		, '클레임내용'	)
					},{	dataIndex:	'proc_date'		, width:  90, align : 'center'	, text: Language.get( ''		, '처리일자'	)
					},{	dataIndex:	'proc_drtr_name', width:  90, align : 'left'	, text: Language.get( ''		, '처리담당자'	)
					}
				]
			};
		return item;
	}
 });