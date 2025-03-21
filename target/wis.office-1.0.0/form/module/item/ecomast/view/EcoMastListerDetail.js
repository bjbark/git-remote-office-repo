Ext.define('module.item.ecomast.view.EcoMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-ecomast-lister-detail',

	store: 'module.item.ecomast.store.EcoMastDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	text : '순번'		, dataIndex: 'bomt_seqn'		, width :  40	, align : 'center', hidden:true
					},{	text : '순번'		, dataIndex: 'disp_seqn'		, width : 40	, align : 'center'
					},{	text : '품목코드'	, dataIndex: 'item_idcd'		, width : 160	, align : 'center'
					},{	text : '품명'		, dataIndex: 'item_name'		, width : 220,
						renderer: function(value) {
							return	'<span data-qwidth="200" '+
									'data-qtip="'+value+'">'+
									value+'</span>';
						}
					},{	text : '규격'		, dataIndex: 'item_spec'		, width : 180,
						renderer: function(value) {
							return '<span data-qwidth="200" '+
									'data-qtip="'+value+'">'+
									value+'</span>';
						}
					},{	text : '투입단위'	, dataIndex: 'unit_name'		, width :  80	, align : 'center'
					},{	text : '투입공정'	, dataIndex: 'wkct_name'		, width : 130
					},{	text : '투입(분자)'	, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{	text : '투입(분모)'	, dataIndex: 'ndqt_dnmn'		, width :  85	, xtype : 'numericcolumn'
					},{	text : 'LOSS율'		, dataIndex: 'incm_loss_rate'	, width :  80	, xtype : 'numericcolumn'
					},{	text : '외주LOSS율'	, dataIndex: 'otcm_loss_rate'	, width :  80	, xtype : 'numericcolumn', hidden:true
					},{	text : '변경일자'	, dataIndex: 'updt_dttm'		, width : 80	,renderer:function(value){return value.substr(0,10);},align : 'center',hidden:true
					},{	text : '비고'		, dataIndex: 'user_memo'		, flex  : 100	, align : 'left'
					},{	text : '상태'		, dataIndex: 'line_stat'		, width:  80,xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center', hidden: true
					}
				]
			};
		return item;
	}
});
