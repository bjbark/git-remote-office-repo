Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkRegiLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-etcisttwork-regi-lister',
	store		: 'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkRegiStore',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }],

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->',
					{ text: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action: Const.EXPORT.action, cls: 'button-style' },
					'->', '-' ,
					{ text: Const.UPDATE.text, iconCls: Const.UPDATE.icon, action: Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text, iconCls: Const.CANCEL.icon, action: Const.CANCEL.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'item_code'		, text: Language.get('item_code'		,'품목코드'		)	, width: 180	, align: 'left'
					},{	dataIndex: 'item_name'		, text: Language.get('item_name'		,'품명'			)	, width: 220	, align: 'left'
					},{	dataIndex: 'item_spec'		, text: Language.get('item_spec'		,'규격'			)	, width: 180	, align: 'left'
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		,'거래처명'		)	, width: 150	, align: 'left'
					},{	dataIndex: 'make_natn_name'	, text: Language.get('make_natn'		,'제조국'		)	, width: 100	, align: 'left'		, hidden: (_global.options.haccp_item_yorn == 0),
					},{	dataIndex: 'make_cmpy_name2', text: Language.get('make_cmpy_name'	,'제조회사'		)	, width: 150	, align: 'left'		, hidden: (_global.options.haccp_item_yorn == 0),
					},{	dataIndex: 'lott_numb'		, text: Language.get('lott_numb'		, 'Batch No'	)	, width: 120	, align: 'left'
					},{	dataIndex: 'istt_qntt'		, text: Language.get('istt_qntt'		, '입고수량'	)	, width: 80		, align: 'right'	, xtype: 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex: 'unit_idcd'		, text: Language.get('unit_idcd'		,'단위'			)	, width: 50		, align: 'center'
					},{	dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'		)	, width: 80		, align: 'center' ,
						hidden	: (_global.options.haccp_item_yorn == 0),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}

										if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
											grid.plugins[0].startEdit(row,grid.columns[20]);
										}else{
											grid.plugins[0].startEdit(row,  grid.columns[29]);
										}
									}
								}
							}
						},
						renderer	: Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex	: 'rtil_ddln_date'		, text : Language.get('rtil_ddln_date'		,'유통기한'	) , width : 80  , align : 'center',
						hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false:true,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
										if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
											grid.plugins[0].startEdit(row,grid.columns[28]);
										}else{
											grid.plugins[0].startEdit(row,  grid.columns[30]);
										}
									}
								}
							}
						},
						renderer	: Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex: 'proc_drtr_name'	, text: Language.get(''			, '처리담당자'	)	, width: 90  	, align: 'center'
					},{	dataIndex: 'remk_text'		, text: Language.get('remk_text', '비고'		)	, minWidth: 150 , align: 'left'	, flex: 1	,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype	:'textfield',
							selectOnFocus: true,
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
								var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER){
										self.up("grid").plugins[0].startEdit(index+1 , 16);
									}else if(e.keyCode == e.TAB){
										var selection = self.up('grid').view.getSelectionModel().getCurrentPosition();
											if(index == (me.getStore().data.length-1) && selection.column == 16){
												selection = me.getSelectionModel().getSelection()[0],
												self.blur();
											}else{
												self.up("grid").plugins[0].startEdit(index , 24);
											}
									}
								}
							}
						}
					}
				]
			}
		;
		return item;
	},

});
