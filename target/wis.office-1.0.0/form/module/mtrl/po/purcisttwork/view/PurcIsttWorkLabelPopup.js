Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryProrPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-purcisttwork-label-popup',
	alias	: 'widget.module-purcisttwork-label-popup',
	title	: Language.get('label_popup','라벨발행'),
	closable: true,
	autoShow: true,
	width	: 690,
	height	: 563,
	layout	: {
		type: 'border'
	},
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
//				store		: Ext.create(me.store),
				store		: Ext.getStore('module.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup'),
				defaults: {style: 'text-align:center'},
				listeners	:{
					afterrender:function(){
						var store = Ext.getStore('module.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup');
						store.clearData();
						store.removeAll();
						store.commitChanges();

						Ext.each(me.params.records,function(record){
							store.add(record.data);
						});
					},
					edit: function(editor, context) {
						var me = this;
						me.cellEditAfter(editor, context);
					},
				},
				paging		: {
					xtype	: 'grid-paging',
					paging	: false,
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'	) , width : 100  , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 130 , align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 150 , align : 'left'
					},{	dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'qntt'			, text : Language.get('qntt'			,'분할수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)
									;
									if(e.keyCode == e.DOWN){
										grid.plugins[0].startEdit(row+1,grid.columns[index]);
									}else if(e.keyCode==e.UP){
										grid.plugins[0].startEdit(row-1,grid.columns[index]);
									}
								}
							}
						},
					}
				],
				cellEditAfter : function (editor, context) {
					var	me      = this
						value   = context.value,
						records = context.record,
						grid    = context.grid,
						store   = grid.getStore()
						row     = store.indexOf(records),
						colIdx  = context.colIdx
					;
					if(value > records.get('istt_qntt')){
						records.set('qntt',records.get('istt_qntt'));
						grid.plugins[0].startEdit(row,colIdx);
						return;
					}
				},
			}
		;
		return grid;
	},


	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me		= this,
			panel	= me.down('grid'),
			store	= panel.getStore(),
			jrf = 'sjflv_label.jrf',
			a = "",
			resId = _global.hq_id.toUpperCase(),
			i=0
		;

		if(resId == 'N1000SJUNG'){
			jrf = 'sjung_label_purc.jrf';
		}else{
			jrf = 'sjflv_label.jrf';
		}

		a += "[";
		store.each(function(record){
			if(record.get('qntt')>0){
				if(i>0){
					a+= ",";
				}
				a+= '{\'invc_numb\':\''+record.get('invc_numb')+'\',\'line_seqn\':'+ record.get('line_seqn')+',\'istt_qntt\':'+ record.get('istt_qntt')+'\,\'qntt\':'+ record.get('qntt')+'}';
				i++;
			}
		})
		a+= "]";
		if(a != "[]"){
			var _param = '_param~{\'type\':\'PURC\' ,\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'report','width=1400,height=800')
			this.close();
		}else{
			return;
		}
	}
});
