Ext.define('module.project.rndtool.view.RndToolListerDomain', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rndtool-lister-domain',
	store: 'module.project.rndtool.store.RndToolDomain',
	columnLines: true ,
//	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	selModel: { selType: 'checkboxmodel'   ,  mode : 'MULTI' },
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins :[{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },


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
			xtype : 'grid-paging',
			items: [
			 	'->', '-' ,
   	 	 		{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
   	 	 		{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style'},
   	 		 	{text : Const.DELETE.text , iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' },
   	 	 		{text : Const.EXPORT.text , iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
		    ]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center', align: 'center'},
				items :
				[
					{	dataIndex: 'fied_idcd'      , width: 120, text: '필드ID', align: 'left'
					},{	dataIndex: 'fied_name'      , width: 120, text: '필드명' , align: 'left'
					},{	dataIndex: 'tabl_name'      , width: 110, text: '테이블명', align: 'left'
					},{	dataIndex: 'data_type'   , width:  80, text: '타입'
					},{	dataIndex: 'lnth'        , width:  40, text: '길이'
					},{	dataIndex: 'old_id'      , width: 120, text: '참조ID' , align: 'left', font_color : Const.COLOR.FONT.tax_amt
					},{	dataIndex: 'old_nm'      , width: 380, text: '참조설명' , align: 'left'
					},{	dataIndex: 'word_1'       , width:  70, text: '단어명1'
					},{	dataIndex: 'id_1'        , width:  60, text: '코드1'
					},{	dataIndex: 'word_2'       , width:  70, text: '단어명2'
					},{	dataIndex: 'id_2'        , width:  60, text: '코드2'
					},{	dataIndex: 'word_3'       , width:  70, text: '단어명3'
					},{	dataIndex: 'id_3'        , width:  60, text: '코드3'
					},{	dataIndex: 'word_4'       , width:  70, text: '단어명4'
					},{	dataIndex: 'id_4'        , width:  60, text: '코드4'
					},{	dataIndex: 'word_5'       , width:  70, text: '단어명5'
					},{	dataIndex: 'id_5'        , width:  60, text: '코드5'
					},{	dataIndex: 'word_6'       , width:  70, text: '단어명6'
					},{	dataIndex: 'id_6'        , width:  60, text: '코드6'
					}
	         	]
			}
		;
		return item;
	}
});





