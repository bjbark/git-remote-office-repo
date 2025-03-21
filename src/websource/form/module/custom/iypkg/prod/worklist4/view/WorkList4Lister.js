Ext.define('module.custom.iypkg.prod.worklist4.view.WorkList4Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist4-lister',
	store		: 'module.custom.iypkg.prod.worklist4.store.WorkList4',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계'){
				return 'text-warn';
			}else if(record.get('wkct_name') == '월계'){
				return 'text-warn';
			}else if(record.get('wkct_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '1'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
				, pagingButton : false
			};
		return item ;
	},

	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '발주일자'	)
					},{	dataIndex:	'wkct_name'		, width: 100, align : 'left'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'	, '외주처명'	)
					},{	dataIndex:	'acpt_date'		, width: 100, align : 'center'	, text: Language.get('acpt_date'	, '수주일자'	)
					},{	dataIndex:	'acpt_cstm_name', width: 200, align : 'left'	, text: Language.get('cstm_name'	, '수주처명'	)
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get('prod_name'	, '제품명'		)
					},{	dataIndex:	'prod_spec'		, width: 150, align : 'left'	, text: Language.get('prod_spec'	, '제품규격'	)
					},{	dataIndex:	'offr_qntt'		, width:  80, align : 'right'	, text: Language.get('offr_qntt'	, '발주량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'unistt'		, width:  80, align : 'right'	, text: Language.get('unistt'		, '미입고잔량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get('wkun_dvcd'	, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					}
				]
			};
		return item;
	}
 });