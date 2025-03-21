Ext.define('module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcbillwork-lister-master',
	store		: 'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],
	columnLines : true,

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
					'->',
					{	text : '<span class="write-button">세금계산서 삭제</span>'	, action : ''		, cls: 'button1-style' ,width:  100,	} ,
					'->',
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
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 230, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'mail_addr'			, width: 230, align : 'left'	, text: Language.get( ''		, '이메일'		)
					},{	dataIndex:	'publ_date'			, width: 120, align : 'center'	, text: Language.get( ''		, '발행일자'	)
					},{	dataIndex:	'rqod_rcvd_dvcd'	, width: 120, align : 'center'	, text: Language.get( ''		, '영수/청구'	), align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('rqod_rcvd_dvcd')
					},{	dataIndex:	'dept_name'			, width: 160, align : 'left'	, text: Language.get( ''		, '부서'		)
					},{	dataIndex:	'user_name'			, width: 160, align : 'left'	, text: Language.get( ''		, '담당자'		)
					},{	dataIndex:	'sply_amnt'			, width: 170, align : 'right'	, text: Language.get( ''		, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( ''		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width:  90, align : 'right'	, text: Language.get( ''		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
 });