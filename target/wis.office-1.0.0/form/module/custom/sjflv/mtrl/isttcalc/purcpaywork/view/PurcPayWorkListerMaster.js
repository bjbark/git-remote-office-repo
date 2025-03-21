Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-purcpaywork-lister-master',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , itemId:'master', cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'			, width:  90, align : 'center'	, text: Language.get( 'invc_date'		, '지급일자'	)
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center'	, text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 200, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'dept_name'			, width:  80, align : 'left'	, text: Language.get( 'dept_name'		, '부서'		)
					},{	dataIndex:	'drtr_name'			, width:  90, align : 'left'	, text: Language.get( 'drtr_name'		, '담당자'		)
					},{	dataIndex:	'sply_amnt'			, width: 110, align : 'right'	, text: Language.get( 'sply_amnt'		, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 110, align : 'right'	, text: Language.get( 'vatx_amnt'		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 130, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'stot_dvcd'			, width : 80, align : 'center'	,text : Language.get('stot_dvcd'		,'결제구분'		) , xtype : 'lookupcolumn', lookupValue : resource.lookup('stot_dvcd')
					},{ dataIndex:	'paym_bank_name'	, width : 80, align : 'left'	, text : Language.get('paym_bank_name'	,'계좌은행'		)
					},{ dataIndex:	'stot_bass'			, width : 180, align : 'left'	, text : Language.get('stot_bass'		,'결제근거'		)
					}
				]
			};
		return item;
	}
 });