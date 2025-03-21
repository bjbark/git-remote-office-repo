Ext.define('module.qc.insp.inspreport2.view.InspReport2Lister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-inspreport2-lister2',

	store		: 'module.qc.insp.inspreport2.store.InspReport2Lister2',

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
					{	text : '<span class="write-button">검사기준서 발행</span>', action : 'printAction', cls: 'button1-style', width: 100	,itemId:'lister2'},
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
					{	dataIndex: 'insp_sbsc_name'	, width: 120, align : 'center'	, text: Language.get( 'insp_sbsc_name'	, '검사항목')
					},{	dataIndex: 'cvic_name'		, width: 120, align : 'center'	, text: Language.get( 'cvic_name'		, '검사장비')
					},{	dataIndex: 'insp_cond'		, width: 120, align : 'center'	, text: Language.get( 'insp_cond'		, '규격')
					},{	dataIndex: 'insp_strt_time'	, width: 60	, align : 'center'	, text: Language.get( 'insp_strt_time'	, '검사시간'),hidden:true
					},{	dataIndex: 'x1'				, width: 60	, align : 'right'	, text: Language.get( 'x1'				, '초')
					},{	dataIndex: 'x2'				, width: 60	, align : 'right'	, text: Language.get( 'x2'				, '중')
					},{	dataIndex: 'x3'				, width: 60	, align : 'right'	, text: Language.get( 'x3'				, '종')
					}
				]
			};
		return item;
	}
 });
