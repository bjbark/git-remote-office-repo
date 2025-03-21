Ext.define('module.custom.iypkg.sale.sale.salecolt.view.SaleColtListerPopup', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iypkg-salecolt-lister-popup',
	store		: 'module.custom.iypkg.sale.sale.salecolt.store.SaleColtListerPopup',
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	border		: 0,
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

				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'			, text : Language.get('line_seqn'	,'순번'			) , width : 40 , align : 'center'
					},{	dataIndex: 'acpt_numb'			, text : Language.get('acpt_numb'	,'수주번호'		) , width : 80 , align : 'center'
					},{	dataIndex: 'ttsm_amnt'			, text : Language.get('ttsm_amnt'	,'발행금액'		) , width : 110 , xtype : 'numericcolumn'
					},{	dataIndex: 'yotp_amnt'			, text : Language.get('yotp_amnt'	,'미수금액'		) , width : 110, xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'colt_amnt'			, text : Language.get('colt_amnt'	,'수금액'		) , width : 110 , xtype : 'numericcolumn', summaryType: 'sum'
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
										if(value > record.get('yotp_amnt')){
											record.set('colt_amnt',0);
											Ext.Msg.alert("알림","수금액을 확인해주십시오.");
										}
									}
									if (e.keyCode=="13") {
										if(this.getValue() > record.get('yotp_amnt')){
											this.setValue(0);
											Ext.Msg.alert("알림","수금액을 확인해주십시오.");
											return;
										}
									}
								},
								blur:function(){
									var a = me.view.getSelectionModel().getCurrentPosition();
									var record = me.store.getAt(a.row);
									if(this.getValue()>record.get('yotp_amnt')){
										console.log('is');
										this.setValue(0);
										record.set('colt_amnt',0);
										Ext.Msg.alert("알림","수금액을 확인해주십시오.");

									}
								},


							}
						},
					},{	dataIndex: 'colt_dvcd'			, text : Language.get('colt_dvcd'	,'수금구분'		) , width : 100 , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'colt_dvcd' ),align:'center'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							lookupValue: resource.lookup( 'colt_dvcd' )
						},
					}
				]
			}
		;
		return item;
	}
});