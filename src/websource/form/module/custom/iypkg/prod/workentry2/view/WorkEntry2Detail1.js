Ext.define('module.custom.iypkg.prod.workentry2.view.WorkEntry2Detail1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-workentry2-detail1',
	store		: 'module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					{	dataIndex: 'wkct_name'		, width:  80, align: 'center', text: Language.get('wkct_name'		, '공정명'		)
					},{	dataIndex: 'invc_numb'		, width: 120, align: 'center', text: Language.get('invc_numb'		, '입고번호'	)
					},{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get('invc_date'		, '입고일자'	)
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get('cstm_name'		, '외주처명'	)
					},{ dataIndex: 'wkun_dvcd'		, width:  80, align: 'center', text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{ dataIndex: 'istt_qntt'		, width:  80, align: 'right' , text: Language.get('istt_qntt'		, '입고량'		), xtype : 'numericcolumn',
					},{ dataIndex: 'subt_qntt'		, width:  60, align: 'right' , text: Language.get('subt_qntt'		, '감량'		), xtype : 'numericcolumn',
					},{ dataIndex: 'unit_name'		, width:  80, align: 'center', text: Language.get('unit_name'		, '수량단위'	)
					},{ dataIndex: 'istt_pric'		, width:  80, align: 'right' , text: Language.get('istt_pric'		, '단가'		), xtype : 'numericcolumn',
					},{ dataIndex: 'vatx_incl_yorn'	, width:  60, align: 'center', text: Language.get(''				, '자료구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'istt_amnt'		, width:  80, align: 'right' , text: Language.get('istt_amnt'		, '공급가액'	), xtype : 'numericcolumn',
					},{ dataIndex: 'istt_vatx'		, width:  80, align: 'right' , text: Language.get('istt_vatx'		, '부가세'		), xtype : 'numericcolumn',
					},{ dataIndex: 'ttsm_amnt'		, width:  80, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn',
					}
				]
			}
		;
		return item;
	}
 });
