Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-estimast2-lister-detail2',
	store: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Detail2',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					'->', '-' ,
//					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
//					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, width: 150, align : 'center'	, text: Language.get(''		, '관리번호'	)
					},{	dataIndex: 'amnd_degr'		, width:  80, align : 'center'	, text: Language.get(''		, 'AMD'		)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get(''		, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width: 150, align : 'center'	, text: Language.get(''		, '거래처코드'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get(''		, '견적일자'	)
					},{	dataIndex: 'esti_case_name'	, width: 150, align : 'left'	, text: Language.get(''		, '건명'		)
					},{	dataIndex: 'boss_name'		, width: 100, align : 'left'	, text: Language.get(''		, '대표자명'	)
					},{	dataIndex: 'tele_numb'		, width: 150, align : 'left'	, text: Language.get(''		, '전화번호'	)
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get(''		, '영업담당'	)
					},{	dataIndex: 'user_memo'		, flex : 100, align : 'left'	, text: Language.get('user_memo'		, '비고'		)
					}
				]
			}
		;
		return item;
	}
});