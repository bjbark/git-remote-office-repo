Ext.define('module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplanmtrl-lister1',
	
	store		: 'module.custom.sjflv.prod.prodplanmtrl.store.ProdPlanMtrlStore1',
	border		: 0,
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
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
		btnText = '<span style="font-size: small !important; color: white;">재고할당 등록</span>',
			item = {
				xtype	: 'grid-paging',
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action: Const.EXPORT.action, cls: 'button-style' },
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
					{	text : Language.get('',	'발주요청일'	) , dataIndex: 'invc_date'		, width : 100, align : 'center'
					},{	text : Language.get('',	'자재코드'		) , dataIndex: 'item_code'		, width : 120, align : 'left'
					},{	text : Language.get('',	'원재료명'		) , dataIndex: 'item_name'		, width : 250, align : 'left'
					},{	text : Language.get('',	'제품코드'		) , dataIndex: 'prnt_item_code'	, width : 120, align : 'left'
					},{	text : Language.get('',	'품명'			) , dataIndex: 'prnt_item_name'	, width : 250, align : 'left'
					},{	text : Language.get('',	'규격'			) , dataIndex: 'prnt_item_spec'	, width : 100, align : 'left'
					},{	text : Language.get('',	'의뢰수량'		) , dataIndex: 'purc_qntt'		, width : 80, align : 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text : Language.get('',	'생산계획여부'	) , dataIndex: 'plan_yorn'		, width : 80, align : 'center'
						, renderer: function(val, meta, rec) {
							return 'Y';
						}
					},{	text : Language.get('',	'발주여부'		) , dataIndex: ''				, width : 90, align : 'center'
						, renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">발주실행</span>',
									width	: 60,
									height	: 19,
									cls		: 'button-style',
									handler	: function(b, e){
										me.loadPopup(rec);
									}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						}
					},
				]
			};
		return item;
	},

	loadPopup: function(record) {
		var me = this;
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'purc_trst_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				record.set('invc_numb', result.records[0].seq);
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		
		resource.loadPopup({
			widget	: 'module-sjflv-prodplanmtrl-popup',
			params	: record
		});
	}
});

