Ext.define('module.stock.isos.mtrlisttwork.view.MtrlIsttWorkLister2Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mtrlisttwork-lister2-master',
	store		: 'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster2',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig	: {
		markDirty: false, loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				{	text : '<span class="write-button">입고등록</span>', action : 'passAction', cls: 'button1-style'	},
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align: 'center', text: Language.get('line_clos'		, '마감'				), xtype: 'lookupcolumn' , lookupValue: resource.lookup('line_clos'), hidden: true
					},{	dataIndex: 'istt_dvcd'		, width:  70, align: 'center', text: Language.get('istt_dvcd'		, '입고구분'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup('istt_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 130, align: 'center', text: Language.get('istt_numb'		, '입고번호'			)
					},{	dataIndex: 'cstm_name'		, width: 200, align: 'left'  , text: Language.get('cstm_name'		, '거래처명'			)
					},{	dataIndex: 'dept_name'		, width: 120, align: 'left'  , text: Language.get('dept_name'		, '처리부서'			)
					},{	dataIndex: 'drtr_name'		, width:  80, align: 'left'  , text: Language.get('drtr_name'		, '처리담당'			)
					},{ dataIndex: 'istt_qntt'		, width:  65, align: 'right' , text: Language.get('qntt'			, '수량'				), xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_amnt'		, width:  80, align: 'right' , text: Language.get('amnt'			, '금액'				), xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, width:  80, align: 'right' , text: Language.get('vatx'			, '부가세'			), xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, width:  80, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'			), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'remk_text'		, flex :   1, align: 'left'  , text: Language.get('remk_text'		, '비고'				)
					},{	dataIndex: 'coun_iout_dvcd'	, width: 100, align: 'center', text: Language.get('coun_iout_dvcd'	, '내외자구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup('istt_dvcd'), hidden: true
					},{	dataIndex: 'vatx_incl_yorn'	, width: 100, align: 'center', text: Language.get('vatx_incl_yorn'	, '부가세 포함 여부'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup('vatx_incl_yorn'), hidden: true
					},{ dataIndex: 'vatx_rate'		, width:  60, align: 'right' , text: Language.get('vatx_rate'		, '부가세율'			), xtype: 'numericcolumn', hidden: true
					},{ dataIndex: 'krwn_pric'		, width: 100, align: 'right' , text: Language.get('krwn_pric'		, '원화단가'			), xtype: 'numericcolumn', hidden: true
					},{ dataIndex: 'krwn_amnt'		, width: 100, align: 'right' , text: Language.get('krwn_amnt'		, '원화금액'			), xtype: 'numericcolumn', summaryType: 'sum', hidden: true
					}
				]
			};
		return item;
	}
 });
