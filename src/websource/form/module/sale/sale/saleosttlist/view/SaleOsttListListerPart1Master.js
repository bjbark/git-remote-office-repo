Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart1Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part1-master',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListMaster',

	width		: 450,
	minWidth	: 200,
	split 		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : [
		{ ptype:'gridcolumnmenu'  } ,
		{	// grid의 columns hide정보를 저장/복원하는 플러그인
			ptype:'gridcolumnconfig'
		}
	],

	viewConfig 	: { markDirty: false, loadMask : false, enableTextSelection: true },


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
					items :[
						'-','->', '-' ,
						{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'part1master' ,cls: 'button-style'} , '-'
					]
				};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'마감'		)	, width :  40, align:'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
						},{	dataIndex: 'invc_date'		, text : Language.get('ostt_date'		,'출고일자'	)	, width :  80
						},{	dataIndex: 'invc_numb'		, text : Language.get(''				,'출고번호'	)	, width : 120, summaryType : 'count'
						},{	dataIndex: 'cust_name'		, text : Language.get('cust'			,'거래처'	)	, width : 120
						},{	dataIndex: 'sale_amnt'		, text : Language.get('sply_amnt'		,'공급가액'	)	, width :  80, align:'right' , xtype : 'numericcolumn' , font_color : 'red' , summaryType : 'sum'
						},{	dataIndex: 'vatx_amnt'		, text : Language.get('tax_amt'			,'부가세'	)	, width :  80, align:'right' , xtype : 'numericcolumn' , font_color : 'green' , summaryType : 'sum'
						},{	dataIndex: 'inv_amt'		, text : Language.get('ttsm_amnt'		,'합계금액'	)	, width :  80, align:'right' , xtype : 'numericcolumn' , font_color : 'blue' , summaryType : 'sum'
						},{	dataIndex: 'reve_tel_no'	, text : Language.get('tel_no'			,'전화번호'	)	, width : 110
						},{	dataIndex: 'reve_hp_no'		, text : Language.get('hp_no'			,'휴대전화'	)	, width : 110
						},{	dataIndex: 'reve_email'		, text : Language.get('e_mail'			,'e_Mail'	)	, width : 180
						},{	dataIndex: 'reve_zip_cd'	, text : Language.get('zip_code'		,'우편번호'	)	, width :  70
						},{	dataIndex: 'reve_addr_2'	, text : Language.get('address_detail'	,'상세주소'	)	, width : 160
						},{	dataIndex: 'inv_user_nm'	, text : Language.get('sale_drtr_name'	,'작업담당'	)	, width : 100
						},{	dataIndex: 'crt_dttm'		, text : Language.get('generate_date'	,'생성일시'	)	, width : 130
						},{	dataIndex: 'upt_dttm'		, text : Language.get('alter_date'		, '변경일시'	)	, width : 130
						},{	dataIndex: 'upt_usr_nm'		, text : Language.get('man_alter'		, '변경자'	)	, width :  80
						}
					]
				};
	return item;
	}
 });






