Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mmbrmast-lister'			,
	store		: 'module.workshop.print.basic.mmbrmast.store.MmbrMast'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{	text : '<span class="write-button">가입승인</span>'	, action : 'Action'	, cls: 'button1-style'	} ,
					{	text : '<span class="write-button">강제탈퇴</span>'	, action : 'orderAction'	, cls: 'button1-style'	} ,
//					{	text : '<span class="write-button">등급조정</span>', action : 'priceAction'		, cls: 'button1-style',width : 80 	},
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'regi_dvcd'			, width:  90, align : 'center'	, text: Language.get( 'regi_dvcd'		, '등록구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'regi_dvcd' )
					},{	dataIndex:	'mmbr_name'			, width: 120, align : 'left'	, text: Language.get( 'mmbr_name'		, '회원명'		)
					},{	dataIndex:	'mail_addr'			, width: 100, align : 'center'	, text: Language.get( 'mail_addr'		, '이메일'		)
					},{	dataIndex:	'entr_date'			, width: 100, align : 'center'	, text: Language.get( 'entr_date'		, '가입일자'		)
					},{	dataIndex:	'mmbr_stat_dvcd'	, width:  70, align : 'center'	, text: Language.get( 'mmbr_stat_dvcd'	, '회원상태'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'mmbr_stat_dvcd' )
					},{	dataIndex:	'scsn_date'			, width: 100, align : 'center'	, text: Language.get( 'scsn_date'		, '탈퇴일자'		)
					},{	dataIndex:	'entr_dvcd'			, width:  90, align : 'center'	, text: Language.get( 'entr_dvcd'		, '가입구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'entr_dvcd' )
					},{	dataIndex:	'mmbr_dvcd'			, width:  90, align : 'center'	, text: Language.get( 'mmbr_dvcd'		, '회원구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'mmbr_dvcd' )
					},{	dataIndex:	'mmbr_grad'			, width:  90, align : 'center'	, text: Language.get( 'mmbr_grad'		, '회원등급'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'mmbr_grad' )
					},{	dataIndex:	'tele_numb'			, width: 100, align : 'left'	, text: Language.get( 'tele_numb'		, '전화번호'		)
					},{	dataIndex:	'asgn_mmbr_name'	, width: 200, align : 'left'	, text: Language.get( 'asgn_mmbr_name'	, '소속회사'		)
					}
				]
			}
		;
		return item;
	}
});
