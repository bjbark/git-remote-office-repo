Ext.define('module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-isttwork2-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork2.store.IsttWork2Master',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					'->','-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
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
					{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get('invc_date'		, '입고일자'	)
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get('cstm_name'		, '거래처명'	)
					},{ dataIndex: 'asmt_code'		, width: 100, align: 'center', text: Language.get('asmt_code'		, '품목코드'	)
					},{ dataIndex: 'asmt_name'		, width: 200, align: 'left'  , text: Language.get('asmt_name'		, '품목명'		)
					},{ dataIndex: 'asmt_dvcd'		, width:  80, align: 'center', text: Language.get('asmt_dvcd'		, '구분'		), xtype: 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{ dataIndex: 'offr_qntt'		, width:  70, align: 'right' , text: Language.get('offr_qntt'		, '발주수량'	), xtype: 'numericcolumn'
					},{ dataIndex: 'istt_qntt'		, width:  70, align: 'right' , text: Language.get('istt_qntt'		, '입고수량'	), xtype: 'numericcolumn'
					},{ dataIndex: 'unit_name'		, width:  70, align: 'center', text: Language.get('unit_name'		, '단위'		)
					},{ dataIndex: 'istt_pric'		, width:  80, align: 'right' , text: Language.get('istt_pric'		, '단가'		), xtype: 'numericcolumn'
					},{ dataIndex: 'vatx_incl_yorn'	, width:  70, align: 'center', text: Language.get('vatx_incl_yorn'	, '자료구분'	), xtype: 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'istt_amnt'		, width: 100, align: 'right' , text: Language.get('istt_amnt'		, '공급가'		), xtype: 'numericcolumn'
					},{ dataIndex: 'istt_vatx'		, width: 100, align: 'right' , text: Language.get('istt_vatx'		, '부가세'		), xtype: 'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'		, width: 100, align: 'right' , text: Language.get('ttsm_amnt'		, '합계'		), xtype: 'numericcolumn'
					},{ dataIndex: 'acpt_cstm_name'	, width: 150, align: 'left'  , text: Language.get('acpt_cstm_name'	, '수주처명'	)
					}
				]
			}
		;
		return item;
	}
 });
