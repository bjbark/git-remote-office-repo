Ext.define('module.mtrl.po.purcisttwork.view.PurcIsttWorkLabelPopup', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork-label-popup'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup',
	border		: 0,
	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : false } ],
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
					'->', '-' ,
					{text : '<span class="btnTemp" style="font-size:1.8em;">'+Language.get('delete'	,'삭제') +'</span>', iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button1-style', width: 90, height : 35, margin: '0 5 0 0' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'cstm_name'			, text : Language.get('cstm_name'	,'거래처'		) , width : 80 , align : 'center'
					},{	dataIndex: 'item_code'			, text : Language.get('item_code'	,'품목코드'		) , width : 110
					},{	dataIndex: 'item_name'			, text : Language.get('item_name'	,'품명'			) , width : 110
					},{	dataIndex: 'istt_qntt'			, text : Language.get('istt_qntt'	,'입고수량'		) , width : 110, xtype : 'numericcolumn'
					},{	dataIndex: 'qntt'				, text : Language.get('qntt'		,'분할수량'		) , width : 110 , xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents: true ,
							listeners:{
								keydown : function(self, e) {
									var a = me.view.getSelectionModel().getCurrentPosition();
									var record = me.store.getAt(a.row);
									var value = record.get('colt_amnt');
									if (e.keyCode == 9) {
										if(this.getValue()>record.get('istt_qntt')){
											record.set('colt_amnt',0);
											Ext.Msg.alert("알림","분할수량이 입고수량보다 많습니다.분할수량을 확인해주세요.");
										}
									}
									if (e.keyCode=="13") {
										if(this.getValue()>record.get('istt_qntt')){
											this.setValue(0);
											Ext.Msg.alert("알림","분할수량이 입고수량보다 많습니다.분할수량을 확인해주세요.");
											return;
										}
									}
								},
								blur:function(){
									var a = me.view.getSelectionModel().getCurrentPosition();
									var record = me.store.getAt(a.row);
									if(this.getValue()>record.get('istt_qntt')){
										this.setValue(0);
										record.set('qntt',0);
										Ext.Msg.alert("알림","분할수량이 입고수량보다 많습니다.분할수량을 확인해주세요.");

									}
								},
							}
						},
					}
				]
			}
		;
		return item;
	}
});