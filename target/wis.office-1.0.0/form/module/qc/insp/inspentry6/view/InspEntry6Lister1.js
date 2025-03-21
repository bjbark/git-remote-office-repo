Ext.define('module.qc.insp.inspentry6.view.InspEntry6Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry6-lister1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.qc.insp.inspentry6.store.InspEntry6Lister1',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->', '-' ,
					{	text : '<span class="write-button">재작업지시</span>'	, action : 'reWorkAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
//					{	text : '<span class="write-button">반품</span>'	, action : 'returnAction'		, cls: 'button1-style',
////						hidden	: !_global.auth.auth_sale_1003
//					} ,
					{	text : '<span class="write-button">폐기</span>'	, action : 'dropAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : '<span class="write-button">특채</span>'	, action : 'specialAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',

					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width : 60  , align : 'center' ,hidden : true
					},{ dataIndex: 'insp_sbsc_seqn' , text : Language.get('insp_sbsc_seqn', '검사항목순번')	, hidden: true
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb', 'invoice 번호')	, hidden: true
					},{ dataIndex: 'wkct_insp_dvcd'	, text : Language.get('insp_dvcd', '공정검사 구분코드')	, hidden: true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번')		, width : 60  , align : 'center'
					},{ dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		,'지시번호')	, width : 120 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자')	, width : 120,align:'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')	, width : 160 ,
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')		, width : 200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')		, width : 120
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드')	, width : 120 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명')	, width : 200
					},{ dataIndex: 'insp_mthd_dvcd'	, text : Language.get('insp_mthd_dvcd'	,'검사방법')	, width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'), align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량')	, width : 80  , xtype :'numericcolumn'
					},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'pass_qntt'		, text : Language.get('pass_qntt'		,'합격수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'dsse_qntt'		, text : Language.get('dsse_qntt'		,'폐기수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'scex_qntt'		, text : Language.get('scex_qntt'		,'특채수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'rewk_qntt'		, text : Language.get('rewk_qntt'		,'재작업수량')	, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'judt_dvcd'		, text : Language.get('judt_dvcd'		,'판정')		, width : 120 , align : 'center',xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')
					},{ dataIndex: 'insp_strt_time'	, text : Language.get('insp_strt_time'	,'검사시작시간')	, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'insp_cvic_idcd'	, text : Language.get('insp_cvic_idcd'	,'검사설비id')	, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'검사장비')	, width : 120 , align : 'center'
					},{	dataIndex: 'trtm_drtr_idcd'	, width:  80	, align : 'left'	, text: Language.get( 'trtm_drtr_idcd'	, '처리담당자id'), hidden:true
					},{	dataIndex: 'trtm_drtr_name'	, width:  80	, align : 'left'	, text: Language.get( 'trtm_drtr_name'	, '처리담당자')
					},{	dataIndex: 'trtm_date'		, width: 100	, align : 'center'	, text: Language.get( 'trtm_date'		, '처리일자')
					}
				]
			}
		;
		return item;
	},
});