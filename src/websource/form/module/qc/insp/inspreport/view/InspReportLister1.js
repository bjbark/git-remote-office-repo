Ext.define('module.qc.insp.inspreport.view.InspReportLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspreport-lister1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.qc.insp.inspreport.store.InspReportLister1',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary'  } ],
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)	, width : 60  , align : 'center' ,hidden : true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번'	)	, width : 60  , align : 'center'
					},{ dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		,'지시번호')	, width : 120 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자')	, width : 120,align:'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')	, width : 160 ,
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	)	, width : 200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'	)	, width : 120
					},{ dataIndex: 'lott_numb2'		, text : Language.get('lott_numb2'		,'Lot No')	, width : 120
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드'	)	, width : 120 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	)	, width : 120
					},{ dataIndex: 'insp_mthd_dvcd'	, text : Language.get('insp_mthd_dvcd'	,'검사방법'	)	, width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'), align : 'center'
					},{ dataIndex: 'insp_sbsc_name'	, text : Language.get('insp_sbsc_name'	,'검사명'	)	, width : 160
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'prod_balan'		, text : Language.get('prod_balan'		,'생산잔량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		,'합격수량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'msmt_valu_1fst'	, text : Language.get('msmt_valu_1fst'	,'1차 검사값')	, width : 120
					},{ dataIndex: 'msmt_valu_2snd'	, text : Language.get('msmt_valu_2snd'	,'2차 검사값')	, width : 120
					},{ dataIndex: 'judt_dvcd'		, text : Language.get('judt_dvcd'		,'판정'	)	, width : 120 , align : 'center',xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')
					},{ dataIndex: 'insp_strt_time'	, text : Language.get('insp_strt_time'	,'검사시작시간')	, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'insp_cvic_idcd'	, text : Language.get('insp_cvic_idcd'	,'검사설비id')	, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'검사장비'	)	, width : 120 , align : 'center'
					}
				]
			}
		;
		return item;
	},
});