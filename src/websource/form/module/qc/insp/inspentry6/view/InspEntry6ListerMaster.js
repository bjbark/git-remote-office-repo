Ext.define('module.qc.insp.inspentry6.view.InspEntry6ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-inspentry6-lister-master',

	store		: 'module.qc.insp.inspentry6.store.InspEntry6Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'  }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : '<span class="write-button">불량폐기</span>'	, action : 'dsseAction'		, cls: 'button1-style',
					} , '-',
					{	text : '<span class="write-button">업체반품</span>'	, action : 'returnAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
//					{	text : '<span class="write-button">특채</span>'	, action : 'okAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
//					} ,
					'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,

				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40	, align : 'center'	, text: Language.get( 'line_clos'		, '마감')		, xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 120	, align : 'center'	, text: Language.get( 'invc_numb'		, '전표번호')
					},{	dataIndex: 'invc_date'		, width:  90	, align : 'center'	, text: Language.get( 'istt_date'		, '입고일자')
					},{	dataIndex: 'dlvy_wrhs_name'	, width: 110	, align : 'left'	, text: Language.get( 'dlvy_wrhs_name'	, '입고창고')
					},{	dataIndex: 'cstm_name'		, width: 180	, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명')
					},{	dataIndex: 'insp_drtr_name'	, width:  80	, align : 'left'	, text: Language.get( 'insp_drtr_name'	, '검사담당')
					},{	dataIndex: 'item_code'		, width:  90	, align : 'left'	, text: Language.get( 'item_code'		, '품목코드')
					},{	dataIndex: 'item_name'		, width: 200	, align : 'left'	, text: Language.get( 'item_name'		, '품명'	)
					},{	dataIndex: 'item_spec'		, width: 150	, align : 'left'	, text: Language.get( 'item_spec'		, '규격'	)
					},{	dataIndex: 'invc_date'		, width:  80	, align : 'left'	, text: Language.get( 'insp_date'		, '검사일자')
					},{	dataIndex: 'insp_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'insp_qntt'		, '검사수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'poor_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'poor_qntt'		, '불량수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'judt_dvcd'		, width:  80	, align : 'left'	, text: Language.get( 'judt_dvcd'		, '판정구분')	, xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'judt_dvcd' )
					},{	dataIndex: 'pass_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'pass_qntt'		, '합격수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'dsse_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'dsse_qntt'		, '폐기수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'rett_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'rett_qntt'		, '반품수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'trtm_drtr_name'	, width:  80	, align : 'left'	, text: Language.get( 'trtm_drtr_name'	, '처리담당자')
					},{	dataIndex: 'trtm_date'		, width: 100	, align : 'center'	, text: Language.get( 'trtm_date'		, '처리일자')
					},{	dataIndex: 'remk_text'		, flex:    1	, align : 'left'	, text: Language.get( 'remk_text'		, '비고')
					}
				]
			};
		return item;
	}
 });
