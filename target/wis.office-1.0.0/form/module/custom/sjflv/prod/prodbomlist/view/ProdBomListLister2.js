Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister2', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-sjflv-prodbomlist-lister2',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister2',

	border		: 0  ,
	title		: Language.get('','리비전'),
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	//selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					{	xtype		: 'lookupfield',
						name		: 'revs_dvcd',
						editable	: false,
						width		: 100,
						lookupValue	: resource.lookup('revs_dvcd'),
						value		: '1',
						hidden		: true,
						listeners	:{
							change:function(){
								var	search	= Ext.ComponentQuery.query('module-sjflv-bommast-search')[0],
									master	= Ext.ComponentQuery.query('module-sjflv-bommast-lister1')[0],
									lister3	= Ext.ComponentQuery.query('module-sjflv-bommast-lister3')[0],
									record	= master.getSelectionModel().getSelection()[0]
								;
								if(record){
									me.select({
										callback:function(records, operation, success) {
										}, scope:me
									},Ext.merge(search.getValues(),{
										hq_id		: _global.hq_id,
										item_idcd	: record.get('item_idcd') ,
										revs_dvcd	: this.getValue() ,
									}));
									lister3.getStore().clearData();
									lister3.getStore().removeAll();
								}
							}
						}
					}
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
				items  : [
					{	text : Language.get('revs_numb'			, 'No'			) , dataIndex: 'revs_numb'		, width : 30
					},{	text : Language.get('adpt_date'			, '적용일자'		) , dataIndex: 'adpt_date'		, width : 100, align : 'center'
					},{	text : Language.get('remk_text'			, '비고'			) , dataIndex: 'remk_text'		, width : 200,
					}
				]
			};
		return item;
	}

});





