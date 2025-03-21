Ext.define('module.custom.iypkg.prod.workentry2.view.WorkEntry2Master2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-workentry2-master2',
	store		: 'module.custom.iypkg.prod.workentry2.store.WorkEntry2Master2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					'->','-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'rnum'			, width:  35, align: 'center', text: Language.get(''		, '순위'		)
					},{	dataIndex: 'invc_numb'		, width: 120, align: 'center', text: Language.get(''		, '수주번호'	)
					},{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get(''		, '수주일자'	), hidden : true
					},{ dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get(''		, '수주처'		)
					},{ dataIndex: 'prod_name'		, flex :   1, align: 'left'  , text: Language.get(''		, '품명'		)
					},{ dataIndex: 'acpt_qntt'		, width:  70, align: 'right' , text: Language.get(''		, '수주량'		)
					}
				]
			}
		;
		return item;
	}
 });
