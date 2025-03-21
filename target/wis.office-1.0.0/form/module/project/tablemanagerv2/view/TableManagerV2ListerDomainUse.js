Ext.define('module.project.tablemanagerv2.view.TableManagerV2ListerDomainUse', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-tablemanagerv2-lister-domain-use',
	store		: 'module.project.tablemanagerv2.store.TableManagerV2DomainUse',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel'	, mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'		, remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' }	, { ptype: 'gridcolumnconfig'}],
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
					{	dataIndex: 'tabl_idcd'    , width:  90, text: 'Table ID'	, align: 'left'
					},{	dataIndex: 'tabl_name'    , width: 120, text: 'Table Name'	, align: 'left'
					}
				]
			}
		;
		return item;
	}
});





