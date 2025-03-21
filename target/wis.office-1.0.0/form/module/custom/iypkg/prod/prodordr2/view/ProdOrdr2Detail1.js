Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Detail1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodordr2-detail1',
	store		: 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail1',

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
					},{	dataIndex: 'invc_numb'		, width: 130, align: 'center', text: Language.get('invc_numb'		, '발주번호'	)
					},{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get('invc_date'		, '발주일자'	)
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get('cstm_name'		, '외주처명'	)
					},{ dataIndex: 'wkun_dvcd'		, width: 100, align: 'center', text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{ dataIndex: 'plan_qntt'		, width:  80, align: 'right' , text: Language.get('plan_qntt'		, '소요량'		), xtype : 'numericcolumn'
					},{ dataIndex: 'offr_qntt'		, width:  80, align: 'right' , text: Language.get('offr_qntt'		, '발주수량'	), xtype : 'numericcolumn'
					},{ dataIndex: 'unit_name'		, width:  70, align: 'center', text: Language.get('unit_name'		, '수량단위'	)
					},{ dataIndex: 'offr_pric'		, width:  80, align: 'right' , text: Language.get('offr_pric'		, '단가'		), xtype : 'numericcolumn'
					},{ dataIndex: 'deli_date'		, width: 100, align: 'center', text: Language.get('deli_date'		, '납기일자'	)
					}
				]
			}
		;
		return item;
	}
 });
