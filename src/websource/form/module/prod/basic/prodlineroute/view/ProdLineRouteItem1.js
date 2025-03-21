Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteItem1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodlineroute-lister-item1'			,
	store		: 'module.prod.basic.prodlineroute.store.ProdLineRouteItem1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	columnLines : true,
	initComponent : function () {
		var me = this
		me.paging		= me.pagingItem() ;
		me.columns		= me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : 'updateAction2', cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
					{	dataIndex : 'wkfw_idcd'			, text : Language.get('wkfw_idcd'		,'ID'			) , width : 50  ,align :'center', hidden : true
					},{	dataIndex : 'line_seqn'			, text : Language.get('line_seqn'		,'항번'			) , width : 50  ,align :'center'
					},{ dataIndex: 'wkct_code'			, text : Language.get('wkct_code'		,'공정코드'		) , width : 100,align :'center'
					},{ dataIndex: 'wkct_name'			, text : Language.get('wkfw_name'		,'공정명'		) , width : 160
					},{	dataIndex: 'work_item_idcd'		, text : Language.get('work_item_idcd'	, '작업품목'		) , width: 150, align : 'center', hidden : true
					},{	dataIndex: 'work_item_code'		, text : Language.get('work_item_code'	, '작업품목코드'	) , width: 100, align : 'center'
					},{	dataIndex: 'work_item_name'		, text : Language.get('work_item_name'	, '작업품명'	) , width: 200, align : 'left'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-popup',
										result	: function(records) {
											var parent = records[0];
											record.set('work_item_idcd',parent.data.item_idcd);
											record.set('work_item_code',parent.data.item_code);
											record.set('work_item_name',parent.data.item_name);
										}
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'wkct_insp_yorn'		, text : Language.get('wkct_insp_yorn'	,'공정검사여부')		, width : 90, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype			:'combobox',
							displayField	: 'name',
							valueField		: 'wkct_insp_yorn',
							 editable		: false,
							 mode			: 'local',
							store : Ext.create('Ext.data.Store',{
								queryMode: 'local',
								storeId: 'columnStore',
								fields: ['name', 'wkct_insp_yorn'],
								data:[
									{name:'예',wkct_insp_yorn:'1'},
									{name:'아니오',wkct_insp_yorn:'0'}
								]
							})
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'last_wkct_yorn'		, text : Language.get('last_wkct_yorn'	,'최종공정여부')		, width : 90, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype			:'combobox',
							displayField	: 'name',
							valueField		: 'last_wkct_yorn',
							 editable		: false,
							 mode			: 'local',
							store : Ext.create('Ext.data.Store',{
								queryMode: 'local',
								storeId: 'columnStore',
								fields: ['name', 'last_wkct_yorn'],
								data:[
									{name:'예',last_wkct_yorn:'1'},
									{name:'아니오',last_wkct_yorn:'0'}
								]
							})
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'aftr_wkct_ordr'		, text : Language.get('aftr_wkct_ordr'	,'다음공정순서')		, width : 90, align : 'right'
						, tdCls : 'editingcolumn'		, hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'mtrl_cost_rate', text : Language.get('mtrl_cost_rate'	,'재료비진척율')	, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'labo_cost_rate', text : Language.get('labo_cost_rate'	,'노무비진척율')	, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'expn_rate'		, text : Language.get('expn_rate'	,'경비진척율')		, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'temp_valu'		, text : Language.get('temp_valu'	,'온도')		, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'temp_appr'		, text : Language.get('temp_appr'	,'온도오차')		, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'rpm_valu'		, text : Language.get('rpm_valu'	,'RPM')		, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'rpm_appr'		, text : Language.get('rpm_appr'	,'RPM오차')		, width : 90, xtype:'numericcolumn'
						, tdCls : 'editingcolumn'		, hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC'),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
								console.log(a);
							}
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.trst_qntt;
		var b = this.getSelectionModel().getSelection()[0].data.ostt_qntt;
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;
		var d = this.getSelectionModel().getSelection()[0].data.ostt_qntt2;
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		if(a<d || d<0){
			Ext.Msg.alert("알림", "지시수량을 다시 입력해주십시오.");
			models[pos].set('ostt_qntt2',0);
			return;
		}else if(a>=d){
			models[pos].set('ostt_qntt',d);
			models[pos].set('unpaid',c-d);
		}
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	}
});

