Ext.define('module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkExprMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork-expr-master',
	store		: 'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkExprMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
					{	text : '<span class="write-button">유통기한 처리</span>'	, action : 'popupAction' , cls: 'button1-style' , hidden :_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false,},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : 'exportAction3' , cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'	) , width : 100 , align : 'left',
					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'		) , width : 80  , align : 'center',
					},{ dataIndex: 'rtil_ddln_date'	, text : Language.get('rtil_ddln_date'	,'유통기한'		) , width : 80  , align : 'center',
					},{ dataIndex: 'remn_date'		, text : Language.get('remn_date'		,'남은일자'		) , width : 80  , align : 'right',
						renderer:function(val){
							if (val < 0) {
								return '<span style="color:red; font-weight:bold">'+val+'</span>';
							} else {
								return val;
							}
		                },
					},{ dataIndex: 'proc_date'		, text : Language.get('proc_date'		,'처리일자'		) , width : 80  , align : 'center',
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업내용'		) , width : 600 , align : 'left',
					}
				]
			}
		;
		return item;
	}
});