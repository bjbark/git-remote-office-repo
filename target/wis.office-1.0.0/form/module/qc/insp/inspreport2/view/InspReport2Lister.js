Ext.define('module.qc.insp.inspreport2.view.InspReport2Lister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-inspreport2-lister',

	store		: 'module.qc.insp.inspreport2.store.InspReport2Lister',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
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
					{	text : '<span class="write-button">자주검사 체크시트</span>', action : 'printAction', cls: 'button1-style', width: 100,itemId:'lister1'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,

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
					{	dataIndex: 'insp_sbsc_name'	, width: 100, align : 'left'	, text: Language.get( 'insp_sbsc_name'	, '검사항목')
					},{	dataIndex: 'insp_cond'		, width: 140, align : 'left'	, text: Language.get( 'insp_cond'		, '검사조건')
					},{	dataIndex: 'insp_strt_time'	, width: 60	, align : 'center'	, text: Language.get( 'insp_strt_time'	, '검사시간'),hidden:true
					},{	dataIndex: 'x1'				, width: 60	, align : 'right'	, text: Language.get( 'x1'				, 'x1')
					},{	dataIndex: 'x2'				, width: 60	, align : 'right'	, text: Language.get( 'x2'				, 'x2')
					},{	dataIndex: 'x3'				, width: 60	, align : 'right'	, text: Language.get( 'x3'				, 'x3')
					},{	dataIndex: 'x4'				, width: 60	, align : 'right'	, text: Language.get( 'x4'				, 'x4')
					},{	dataIndex: 'x5'				, width: 60	, align : 'right'	, text: Language.get( 'x5'				, 'x5')
					},{	dataIndex: 'x6'				, width: 60	, align : 'right'	, text: Language.get( 'x6'				, 'x6')
					},{	dataIndex: 'x7'				, width: 60	, align : 'right'	, text: Language.get( 'x7'				, 'x7')
					},{	dataIndex: 'x8'				, width: 60	, align : 'right'	, text: Language.get( 'x8'				, 'x8')
					},{	dataIndex: 'x9'				, width: 60	, align : 'right'	, text: Language.get( 'x9'				, 'x9')
					},{	dataIndex: 'x10'			, width: 60	, align : 'right'	, text: Language.get( 'x10'				, 'x10')
					},{	dataIndex: 'x11'			, width: 60	, align : 'right'	, text: Language.get( 'x11'				, 'x11')
					},{	dataIndex: 'x12'			, width: 60	, align : 'right'	, text: Language.get( 'x12'				, 'x12')
					},{	dataIndex: 'x13'			, width: 60	, align : 'right'	, text: Language.get( 'x13'				, 'x13')
					},{	dataIndex: 'x14'			, width: 60	, align : 'right'	, text: Language.get( 'x14'				, 'x14')
					},{	dataIndex: 'x15'			, width: 60	, align : 'right'	, text: Language.get( 'x15'				, 'x15')
					},{	dataIndex: 'x16'			, width: 60	, align : 'right'	, text: Language.get( 'x16'				, 'x16')
					},{	dataIndex: 'x17'			, width: 60	, align : 'right'	, text: Language.get( 'x17'				, 'x17')
					},{	dataIndex: 'x18'			, width: 60	, align : 'right'	, text: Language.get( 'x18'				, 'x18')
					},{	dataIndex: 'x19'			, width: 60	, align : 'right'	, text: Language.get( 'x19'				, 'x19')
					},{	dataIndex: 'x20'			, width: 60	, align : 'right'	, text: Language.get( 'x20'				, 'x20')
					},{	dataIndex: 'x21'			, width: 60	, align : 'right'	, text: Language.get( 'x21'				, 'x21')
					},{	dataIndex: 'x22'			, width: 60	, align : 'right'	, text: Language.get( 'x22'				, 'x22')
					},{	dataIndex: 'x23'			, width: 60	, align : 'right'	, text: Language.get( 'x23'				, 'x23')
					},{	dataIndex: 'x24'			, width: 60	, align : 'right'	, text: Language.get( 'x24'				, 'x24')
					},{	dataIndex: 'judt_dvcd'		, width: 60	, align : 'right'	, text: Language.get( 'judt_dvcd'		, '판정'), xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd'), align : 'center'
					}
				]
			};
		return item;
	}
 });
