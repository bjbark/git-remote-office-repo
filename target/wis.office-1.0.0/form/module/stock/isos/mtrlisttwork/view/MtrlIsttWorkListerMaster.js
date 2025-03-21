Ext.define('module.stock.isos.mtrlisttwork.view.MtrlIsttWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mtrlisttwork-lister-master',
	store		: 'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,

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
					{	text : '<span class="write-button">입고취소</span>', action : 'rejectAction', cls: 'button1-style'	},
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, width:  40, align: 'center', text: Language.get('line_stat'		, '상태'			), xtype : 'lookupcolumn', lookupValue: resource.lookup('line_stat')
					},{ dataIndex: 'istt_wrhs_name'	, width:  80, align: 'left'  , text: Language.get('istt_wrhs_name'	, '입고창고'		)
					},{ dataIndex: 'invc_date'		, width:  80, align: 'center', text: Language.get('istt_date'		, '입고일자'		)
					},{ dataIndex: 'drtr_name'		, width:  80, align: 'left'  , text: Language.get('drtr_name'		, '입고담당'		)
					},{ dataIndex: 'cstm_name'		, width: 200, align: 'left'  , text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'invc_numb'		, width: 130, align: 'center', text: Language.get('istt_numb'		, '입고번호'		)
					},{	dataIndex: 'item_code'		, width:  80, align: 'center', text: Language.get('item_code'		, '품목코드'		)
					},{ dataIndex: 'item_name'		, width: 200, align: 'left'  , text: Language.get('item_name'		, '품명'			)
					},{ dataIndex: 'item_spec'		, width: 150, align: 'left'  , text: Language.get('item_spec'		, '규격'			)
					},{ dataIndex: 'modl_name'		, width: 100, align: 'left'  , text: Language.get('modl_name'		, '모델명'		)
					},{ dataIndex: 'unit_name'		, width:  60, align: 'left'  , text: Language.get('unit_name'		, '단위'			)
					},{ dataIndex: 'make_cmpy_name'	, width: 100, align: 'left'  , text: Language.get('make_cmpy_name'	, '제조회사명'	), hidden: (_global.options.haccp_item_yorn == 0)
					},{ dataIndex: 'make_date'		, width:  80, align: 'center', text: Language.get('make_date'		, '제조일자'		), hidden: (_global.options.haccp_item_yorn == 0)
					},{ dataIndex: 'rtil_ddln'		, width:  80, align: 'left'  , text: Language.get('rtil_ddln'		, '유통기한'		), hidden: (_global.options.haccp_item_yorn == 0)
					},{ dataIndex: 'istt_qntt'		, width:  45, align: 'right' , text: Language.get('qntt'			, '수량'			), xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'istt_pric'		, width:  80, align: 'right' , text: Language.get('pric'			, '단가'			)
					},{ dataIndex: 'istt_amnt'		, width:  80, align: 'right' , text: Language.get('amnt'			, '금액'			), xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, width:  80, align: 'right' , text: Language.get('vatx'			, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, width:  80, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'orig_invc_numb'	, width: 100, align: 'center', text: Language.get('offr_numb'		, '발주번호'		)
					},{ dataIndex: 'remk_text'		, flex :   1, align: 'left'  , text: Language.get('remk_text'		, '비고'			)
					},{ dataIndex: 'cstm_code'		, width: 100, align: 'center', text: Language.get('cstm_code'		, '거래처코드'	), hidden : true
					}
				]
			}
		;
		return item;
	}
 });
