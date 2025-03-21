Ext.define('modulemtrl.isttcalc.purcbillwork.view.PurcBillWorkListerMaster2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcbillwork-lister-master2',
	store		: 'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster2',
	border		: 0,
	columnLines	: true,
//	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'		, width:  90, align : 'center'	, text: Language.get( ''		, '입고일자'	)
					},{	dataIndex:	'invc_numb'		, width:  90, align : 'center'	, text: Language.get( ''		, '입고번호'	)
					},{	dataIndex:	'cstm_code'		, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 230, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'tele_numb'		, width: 120, align : 'left'	, text: Language.get( ''		, '전화번호'	)
					},{	dataIndex:	'buss_numb'		, width: 160, align : 'left'	, text: Language.get( ''		, '사업자등록번호')
					},{	dataIndex:	'mail_addr'		, width: 170, align : 'left'	, text: Language.get( ''		, '이메일'		)
					},{	dataIndex:	'dept_name'		, width:  90, align : 'left'	, text: Language.get( ''		, '부서'		)
					},{	dataIndex:	'user_name'		, width:  90, align : 'left'	, text: Language.get( ''		, '담당자'		)
					}
				]
			};
		return item;
	}
 });