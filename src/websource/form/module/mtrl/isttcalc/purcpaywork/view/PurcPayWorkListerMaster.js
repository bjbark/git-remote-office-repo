Ext.define('module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcpaywork-lister-master',
	store		: 'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->', '-',
					{	text : '<span class="write-button">지급내역  삭제</span>'	, action : 'deleteAction'		, cls: 'button1-style' ,width:  110,	} , '-',
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'			, width:  90, align : 'center'	, text: Language.get( ''		, '접수일자'	)
					},{	dataIndex:	'invc_numb'			, width:  80, align : 'center'	, text: Language.get( ''		, 'invoice'	),hidden : true
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 200, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'mail_addr'			, width: 170, align : 'left'	, text: Language.get( ''		, '이메일'		)
					},{	dataIndex:	'invc_date'			, width:  90, align : 'center'	, text: Language.get( ''		, '발행일자'	)
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''		, '영수/청구'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	'dept_name'			, width:  80, align : 'left'	, text: Language.get( ''		, '부서'		)
					},{	dataIndex:	'drtr_name'			, width:  90, align : 'left'	, text: Language.get( ''		, '담당자'		)
					},{	dataIndex:	'sply_amnt'			, width: 150, align : 'right'	, text: Language.get( ''		, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 150, align : 'right'	, text: Language.get( ''		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 190, align : 'right'	, text: Language.get( ''		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
 });