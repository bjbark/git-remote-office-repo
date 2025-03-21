Ext.define('module.project.rndtool.view.RndToolLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rndtool-lister',
	store: 'module.project.rndtool.store.RndTool',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

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
			 	{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
			 	{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
   	 		 	{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
				items : [
					{	dataIndex: 'ord'           , width :  50, align: 'center' , text: 'Ord'
		            },{ dataIndex: 'row_no'        , width :  50, align: 'center' , text: 'RowNo'
		            },{ dataIndex: 'modl_id'       , width : 120, align: 'center' , text: 'Module Id', hidden : true
		            },{ dataIndex: 'view_id'       , width : 120, align: 'center' , text: 'View Id', hidden : true
		            },{ dataIndex: 'modl_nm'       , width : 200, align: 'center' , text: 'Module Name' , hidden : true
		            },{ dataIndex: 'view_nm'       , width : 200, align: 'center' , text: 'View Name', hidden : true
		            },{ dataIndex: 'data_index'    , width : 150, align: 'left'   , text: 'Data Index'
		            },{ dataIndex: 'view_text'     , width : 150, align: 'left'   , text: 'Text'
		            },{ dataIndex: 'tabl_name'        , width : 100, align: 'center' , text: 'Table'
		            },{ dataIndex: 'xtype'         , width : 100, align: 'center' , text: 'xtype'
		            },{ dataIndex: 'lnth'          , width :  50, align: 'center' , text: '길이'
		            },{ dataIndex: 'align'         , width :  70, align: 'center' , text: 'Align'
		            },{ dataIndex: 'sum_type'      , width :  70, align: 'center' , text: 'Summary'
		            },{ dataIndex: 'format_str'    , width :  80, align: 'center' , text: 'Format'
		            },{ dataIndex: 'hidden'        , width :  60, align: 'center' , text: 'Hidden'
		            },{ dataIndex: 'lookup_str'    , width : 100, align: 'center' , text: 'LookUp'
		            },{ dataIndex: 'remarks'       , width : 200, align: 'center' , text: '비고'
					}
	         	]
			}
		;
		return item;
	}
});





