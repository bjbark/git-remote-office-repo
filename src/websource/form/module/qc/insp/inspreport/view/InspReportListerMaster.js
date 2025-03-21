Ext.define('module.qc.insp.inspreport.view.InspReportListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-inspreport-lister-master',

	store		: 'module.qc.insp.inspreport.store.InspReportMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					},{	dataIndex: 'istt_wrhs_name'	, width: 150	, align : 'left'	, text: Language.get( 'istt_wrhs_name'	, '입고창고')
					},{	dataIndex: 'cstm_name'		, width: 180	, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명')
					},{	dataIndex: 'dept_name'		, width: 120	, align : 'left'	, text: Language.get( 'dept_name'		, '처리부서') , hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? true : false,
					},{	dataIndex: 'drtr_name'		, width: 100	, align : 'left'	, text: Language.get( 'drtr_name'		, '처리담당')
					},{	dataIndex: 'item_code'		, width:  90	, align : 'left'	, text: Language.get( 'item_code'		, '품목코드')
					},{	dataIndex: 'item_name'		, width: 200	, align : 'left'	, text: Language.get( 'item_name'		, '품명'	)
					},{	dataIndex: 'item_spec'		, width: 150	, align : 'left'	, text: Language.get( 'item_spec'		, '규격'	)
					},{	dataIndex: 'istt_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'istt_qntt'		, '입고수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'insp_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'insp_qntt'		, '검사수량')	, xtype: 'numericcolumn' , summaryType: 'sum' ,format:  '#,##0.##'
					},{	dataIndex: 'pass_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'pass_qntt'		, '합격수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'poor_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'poor_qntt'		, '불량수량')	, xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex: 'orig_invc_numb'	, width: 110	, align : 'left'	, text: Language.get( 'offr_numb'		, '발주번호')
					},{	dataIndex: 'orig_seqn'		, width:  40	, align : 'center'	, text: Language.get( 'offr_seqn'		, '항번'	)
					},{	dataIndex: 'line_stat'		, width:  50	, align : 'center'	, text: Language.get( 'line_stat'		, '상태'	)	, xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'line_stat' )
					},{	dataIndex: 'insp_date'		, width:  80	, align : 'left'	, text: Language.get( 'insp_date'		, '검사일자')
					},{	dataIndex: 'insp_sbsc_name'	, width:  100	, align : 'left'	, text: Language.get( 'insp_sbsc_name'	, '검사항목')	, hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
					},{	dataIndex: 'judt_dvcd'		, width:  80	, align : 'left'	, text: Language.get( 'judt_dvcd'		, '판정구분')	, xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'judt_dvcd' )
					},{	dataIndex: 'remk_text'		, flex:    1	, align : 'left'	, text: Language.get( 'remk_text'		, '비고')
					}
				]
			};
		return item;
	}
 });
