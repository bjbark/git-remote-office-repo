Ext.define('module.qc.basic.insptypeitem.view.InspTypeItemListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-insptypeitem-lister-master',

	store		: 'module.qc.basic.insptypeitem.store.InspTypeItemMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : '<span class="write-button">검사항목입력</span>'	, action : Const.MODIFY.action , cls: 'button1-style'	} , '-',
//					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
//					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_stat'		, width:  50, align : 'center'	, text: Language.get( 'line_stat'		, '사용'		), width : 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'insp_type_code'	, width: 100, align : 'center'	, text: Language.get( 'insp_type_code'	, '코드'		)
					},{	dataIndex: 'insp_type_name'	, width: 350, align : 'left'	, text: Language.get( 'insp_type_name'	, '코드명'	)
					},{	dataIndex: 'insp_mthd_dvcd'	, width: 150, align : 'center'	, text: Language.get( 'insp_mthd_dvcd'	, '검사방법'	),xtype :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')
					},{	dataIndex: 'smor_rate'		, width: 70 , align : 'right'	, text: Language.get( 'smor_rate'		, '시료(%)'	)
					},{	dataIndex: 'wkct_insp_yorn'	, width: 100, align : 'center'	, text: Language.get( 'wkct_insp_yorn'	, '공정검사'	),xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'rcpt_insp_yorn'	, width: 100, align : 'center'	, text: Language.get( 'rcpt_insp_yorn'	, '인수검사'	),xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'last_insp_yorn'	, width: 100, align : 'center'	, text: Language.get( 'last_insp_yorn'	, '최종검사'	),xtype :'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden: _global.hq_id.toUpperCase() != 'N1000KOMEC' ? false : true,
					},{	dataIndex: 'shpm_insp_yorn'	, width: 100, align : 'center'	, text: Language.get( 'shpm_insp_yorn'	, '출고검사'	),xtype :'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden: _global.hq_id.toUpperCase() != 'N1000KOMEC' ? false : true,
					},{	dataIndex: 'shpm_insp_yorn'	, width: 100, align : 'center'	, text: Language.get( 'shpm_insp_yorn'	, '출하검사'	),xtype :'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden: _global.hq_id.toUpperCase() != 'N1000KOMEC' ? true : false,
					},{	dataIndex: 'crte_dttm'		, width: 110, align : 'center'	, text: Language.get( 'crte_dttm'		, '등록일자'	), renderer: function (crte_dttm) {return Ext.util.Format.substr(crte_dttm,0,10);}
					},{	dataIndex: 'insp_cond'		, flex : 100, align : 'left'	, text: Language.get( 'insp_cond'		, '검사조건'	)
					}
				]
			};
		return item;
	}
});
