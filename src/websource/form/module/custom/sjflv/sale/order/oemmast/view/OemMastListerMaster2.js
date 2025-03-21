Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster2', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-sjflv-oemmast-lister-master2',
	store		: 'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster2',

	border		: 0  ,
	title		: Language.get('','리비전'),
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	//selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	viewConfig: {
		listeners: {
			refresh: function(view) {
				var lister = Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0].getSelectionModel().getSelection()[0];
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					console.log(lister.data.orig_seqn==i);
					var node = nodes[i];
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					if(lister.data.orig_seqn == (i+1)){
						for(var j = 0; j < cells.length; j++) {					//출고완료
							Ext.fly(cells[j]).setStyle('background-color', '#99ccff');
							Ext.fly(cells[j]).setStyle('color', 'Green');
						}
					}
				}
			}
		},
		markDirty: false,
		loadMask : false
	},
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
						hidden		: true,
						width		: 100,
						lookupValue	: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? resource.lookup('revs_dvcd') : resource.lookup('').concat(resource.lookup('revs_dvcd').slice(0,1)),
						value		: '1',
						listeners	:{
							change:function(obj, newValue, oldValue){
								var	search	= Ext.ComponentQuery.query('module-sjflv-oemmast-search')[0],
									master	= Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0],
									master2	= Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master2')[0],
									master3	= Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master3')[0],
									record	= master.getSelectionModel().getSelection()[0]
								;
								console.log(record);
								if(record){
									if('1001' == record.get('acct_bacd') || '2003' == record.get('acct_bacd')) {
										if ('1' == newValue) {
											Ext.Msg.alert("알림", "계정이 " + ('1001' == record.get('acct_bacd') ? "원재료" : "품목보고" ) + "는 생산을 선택할 수 없습니다.");
						  					this.setValue('2');
											return;
										}
									}
									me.select({
										callback:function(records, operation, success) {
										}, scope:me
									},Ext.merge(search.getValues(),{
										hq_id		: _global.hq_id,
										item_idcd	: record.get('item_idcd') ,
										revs_dvcd	: this.getValue() ,
									}));
									master3.getStore().clearData();
									master3.getStore().removeAll();
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
					{	text : Language.get('revs_numb'			, 'No'			) , dataIndex: 'revs_numb'		, width : 30, align : 'center'
					},{	text : Language.get('adpt_date'			, '적용일자'		) , dataIndex: 'adpt_date'		, width : 75, align : 'center'
					},{	text : Language.get('befr_splr_name'	, '(전)공급사'		) , dataIndex: 'befr_splr_name'	, width : 80,
					},{	text : Language.get('splr_name'			, '(후)공급사'		) , dataIndex: 'splr_name'		, width : 80,
					},{	text : Language.get('usag_qntt_memo'	, '사용량메모'		) , dataIndex: 'usag_qntt_memo'	, width : 70,
					},{	text : Language.get('ecod_purp'			, '목적'			) , dataIndex: 'ecod_purp'		, width : 70,
					},{	text : Language.get('drtr_name'			, '담당자'			) , dataIndex: 'drtr_name'		, width : 70,
					},{	text : Language.get('remk_text'			, '비고'			) , dataIndex: 'remk_text'		, width : 90,
					}
				]
			};
		return item;
	}

});





