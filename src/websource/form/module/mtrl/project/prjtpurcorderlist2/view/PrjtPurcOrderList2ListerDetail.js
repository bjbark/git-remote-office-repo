Ext.define('module.project.lot.prjtpurcorderlist2.view.PrjtPurcOrderList2ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtpurcorderlist2-lister-detail',
	store		: 'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2ListerDetail',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
					'-', '->',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					,'-',
//					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
//					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId:'detail' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'invc_numb'		, text : Language.get('offr_numb'	, '발주번호'	) , width : 100 , align : 'center'
					},{	dataIndex: 'istt_invc_numb'	, text : Language.get('istt_numb'	, '입고번호'	) , width : 100 , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'	, '품명'		) , width : 120
					},{	dataIndex: 'stot_dvcd'		, text : Language.get('stot_dvcd'	, '결제구분'	) , width : 80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('stot_dvcd'), tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							lookupValue: resource.lookup( 'stot_dvcd' )
						}
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'	) , width :  70, xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'매입금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세' 	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'publ_date'		, text : Language.get('publ_date'		,'발행일자'	) , width : 100  , align : 'center' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},
						renderer : function(val){
							var value = '';
							var y,m,d;
							if(val){
								if(val.match(/[^0-9]/)){
									y = new Date(val).getFullYear().toString();
									m = (new Date(val).getMonth()+1).toString();
									d = new Date(val).getDate().toString();
									value = y+'-'+(m[1]?m:'0'+m[0])+'-'+(d[1]?d:'0'+d[0]);
								}else{
									value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return value
						}
					},{ dataIndex: 'expr_date'		, text : Language.get('expr_date'		,'만기일자'	) , width : 100  , align : 'center' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},
						renderer : function(val){
							var value = '';
							var y,m,d;
							if(val){
								if(val.match(/[^0-9]/)){
									y = new Date(val).getFullYear().toString();
									m = (new Date(val).getMonth()+1).toString();
									d = new Date(val).getDate().toString();
									value = y+'-'+(m[1]?m:'0'+m[0])+'-'+(d[1]?d:'0'+d[0]);
								}else{
									value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return value
						}
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'	) , width : 100,
						tdCls : 'editingcolumn',
						editor	: {
							xtype	:'textfield'
						}
					}
				]
			}
		;
		return item;
	},
	listeners: {

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	}
});