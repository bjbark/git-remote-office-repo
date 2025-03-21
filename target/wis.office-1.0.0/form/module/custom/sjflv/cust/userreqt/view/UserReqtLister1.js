Ext.define('module.custom.sjflv.cust.userreqt.view.UserReqtLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-userreqt-lister1',
	
	store		: 'module.custom.sjflv.cust.userreqt.store.UserReqtStore1',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	
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
				dock	: 'bottom',
				items	: [
					{	text	: '승인/거부',
						menu	: [
							{	text : '승인', action : ''
							},{	text : '거부', action : ''
							}
						]
					},
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
					{	text: Language.get(''	, '사용자명'	) , dataIndex: 'user_name'		, width: 70		, align: 'left'
					},{	text: Language.get(''	, '요청일자'	) , dataIndex: 'sign_reqt_date'	, width: 90		, align: 'center'
					},{	text: Language.get(''	, '휴대폰번호'	) , dataIndex: 'hdph_numb'		, width: 110	, align: 'center'
					},{	text: Language.get(''	, '소속 회사'	) , dataIndex: 'cstm_name'		, width: 120	, align: 'left'
					},{	text: Language.get(''	, '이메일주소'	) , dataIndex: 'mail_addr'		, width: 180	, align: 'left'
					},{	text: Language.get(''	, '상태'		) , dataIndex: 'line_stat'		, width: 80		, align: 'center'	, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('dele_yorn')
					}
				]
			};
		return item;
	},
});

