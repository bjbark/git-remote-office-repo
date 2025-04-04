Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkListerMaster2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salework-lister-master2',
	store		: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerMaster2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , itemId:'saleWorkMaster2' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'	, width:  90, align : 'center'	, text: Language.get( 'invc_date'		, '출고일자'	)
					},{	dataIndex:	'invc_numb'	, width: 100, align : 'center'	, text: Language.get( 'invc_numb'		, '출고번호'	)
					},{	dataIndex:	'cstm_code'	, width: 100, align : 'center'	, text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'	, width: 230, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'tele_numb'	, width: 120, align : 'left'	, text: Language.get( 'tele_numb'		, '전화번호'	)
					},{	dataIndex:	'buss_numb'	, width: 160, align : 'left'	, text: Language.get( 'buss_numb'		, '사업자등록번호')
					},{	dataIndex:	'mail_addr'	, width: 170, align : 'left'	, text: Language.get( 'mail_addr'		, '이메일'	)
					},{	dataIndex:	'ostt_dvcd'	, width: 100, align : 'center'	, text: Language.get( 'ostt_dvcd'		, '출고구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd')
					},{	dataIndex:	'dept_name'	, width:  90, align : 'left'	, text: Language.get( 'dept_name'		, '부서'		)
					},{	dataIndex:	'drtr_name'	, width:  90, align : 'left'	, text: Language.get( 'drtr_name'		, '담당자'		)
					}
				]
			};
		return item;
	}
 });