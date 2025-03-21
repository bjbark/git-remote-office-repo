Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart2Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part2-master',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListPart2Master',

	width		: 450,
	minWidth	: 200,
	split		: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary', remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu' }, { ptype:'gridcolumnconfig' }],

	viewConfig	: { markDirty: false , loadMask : false },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item =
				{	xtype : 'grid-paging',
					items : [
						'->', '-' ,
						{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'part2master' ,cls: 'button-style'} , '-'
					]
				};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'row_clos'	, text: Language.get('close_gb'			,'마감'		)	, width:  40, align: 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('row_clos')
						},{	dataIndex: 'inv_dt'		, text: Language.get('date'				,'일자'		)	, width:  80
						},{	dataIndex: 'invc_numb'	, text: Language.get('order_no'			,'주문번호'	)	, width: 130, summaryType : 'count'
						},{	dataIndex: 'mmb_nm'		, text: Language.get('member_nm'		,'거래처명'	)	, width: 100
						},{	dataIndex: 'biz_no'		, text: Language.get('business_no'		,'사업자번호')	, width: 120
						},{	dataIndex: 'tel_no'		, text: Language.get('tel_no'			,'전화번호'	)	, width: 100
						},{	dataIndex: 'hp_no'		, text: Language.get('hp_no'			,'휴대전화'	)	, width: 100
						},{	dataIndex: 'taxtn_amt'	, text: Language.get(''					,'공급가'	)	, width:  80, align: 'right', xtype : 'numericcolumn', font_color : 'red'	, summaryType : 'sum'
						},{	dataIndex: 'tax_amt'	, text: Language.get(''					,'부가세'	)	, width:  80, align: 'right', xtype : 'numericcolumn', font_color : 'green'	, summaryType : 'sum'
						},{	dataIndex: 'inv_amt'	, text: Language.get(''					,'합계'		)	, width: 100, align: 'right', xtype : 'numericcolumn', font_color : 'blue'	, summaryType : 'sum'
						},{	text	: '수령자',
							defaults: { style: 'text-align: center'},
							columns : [
								{	dataIndex: 'reve_nm'		, text : Language.get('nm'			,'이름'	)	, width: 100
								},{	dataIndex: 'reve_tel_no'	, text : Language.get('tel_no'		,'전화번호'	)	, width: 100
								},{	dataIndex: 'reve_hp_no'		, text : Language.get('hp_no'		,'휴대전화'	)	, width: 100
								},{	dataIndex: 'reve_email'		, text : Language.get('e_mail'		,'e_Mail')	, width: 130
								},{	dataIndex: 'reve_zip_cd'	, text : Language.get('zip_code'	,'우편번호')	, width:  80
								},{	dataIndex: 'reve_addr_1'	, text : Language.get(''			, '주소'	)	, width: 160
								},{	dataIndex: 'reve_addr_2'	, text : Language.get('address_detail', '상세주소')	, width: 160
								}
							]
						},{	text	: Resource.getWord('po_mst', '데이터 기록'),
							defaults: {style: 'text-align:center'},
							columns : [
								{	dataIndex: 'org_invc_numb'	, text : Language.get('po_no1'			,'주문번호'		)	, width : 120
								},{	dataIndex: 'crt_dttm'		, text : Language.get('generate_date'	,'생성일시'		)	, width : 120
								},{	dataIndex: 'upt_dttm'		, text : Language.get('alter_date'		,'변경일시'		)	, width : 120
								},{	dataIndex: 'upt_usr_nm'		, text : Language.get('man_alter'		,'변경자'		)	, width : 80
								}
							]
						}
					]
				};
	return item;
	}
 });






