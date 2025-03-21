Ext.define('module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLabelPopup', { extend: 'Axt.popup.Search',
//	id 		: 'module-osttwork-label-popup',
	alias	: 'widget.module-osttwork-label-popup',
	store	: 'module.custom.sjflv.stock.isos.osttwork.store.OsttWorkLabelPopup',

	title	: Language.get('label_popup','라벨발행'),
	closable: true,
	autoShow: true,
	width	: 900,
	height	: 563,
	layout	: {
		type: 'border'
	},
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selection();
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
	createGrid: function(){7
		var me = this,
			grid = {
				xtype   : 'grid-panel',
				header  : false,
				region  : 'center',
				height	: 260,
				viewConfig: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel: {selType:'cellmodel'},
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store    : Ext.create( me.store ),
//				listeners	:{
//					afterrender:function(){
//						var store = Ext.getStore('module.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup');
//						store.clearData();
//						store.removeAll();
//						store.commitChanges();
//
//						Ext.each(me.params.records,function(record){
//							store.add(record.data);
//						});
//					},
//					edit: function(editor, context) {
//						var me = this;
//						me.cellEditAfter(editor, context);
//					},
//				},
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
					{   dataIndex: 'dely_cstm_name'	, text : Language.get(''		 , '배송처명'	) , width : 150 , align : 'left',
					},{ dataIndex: 'dely_cstm_name2', text : Language.get(''		 , '배송처명'	) , width : 270 , align : 'left', hidden	: true,
					},{ dataIndex: 'item_name'		, text : Language.get(''		 , '제품명'	) , width : 270 , align : 'left',
					},{	dataIndex: 'box_qntt'		, text : Language.get(''		 , '박스중량'  	) , width : 150 , align : 'left'
					},{ dataIndex: 'make_date'		, text : Language.get(''		 , '제조일자'	) , width : 315 , align : 'left',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[4]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[4]);
									}
								}
							}
						}
					}
				],
//				cellEditAfter : function (editor, context) {
//					var	me      = this
//						value   = context.value,
//						records = context.record,
//						grid    = context.grid,
//						store   = grid.getStore()
//						row     = store.indexOf(records),
//						colIdx  = context.colIdx
//					;
//					if(value > records.get('istt_qntt')){
//						records.set('qntt',records.get('istt_qntt'));
//						grid.plugins[0].startEdit(row,colIdx);
//						return;
//					}
//				},
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
			jrf = 'sjflv_product_label.jrf',
			a = "",
			resId = _global.hq_id.toUpperCase(),
			i=0
		;
		a += "[";
		store.each(function(record){
			if(i>0){
				a+= ",";
			}
			a+= '{\'qntt\':\''+record.get('box_qntt')+'\',\'make_date\':\''+ record.get('make_date')+'\',\'cstm_name\':\''+ record.get('dely_cstm_name2')+'\',\'item_name\':\''+ record.get('item_name')+'\'}';
			i++;
		})
		a+= "]";
		if(a != ""){
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'report','width=1400,height=800')
			this.close();
		}else{
			return;
		}
	},

	selection:function(){
		var	me		= this,
			grid	= me.down('grid')
		;
		if(me.params.records){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

			mask.show();

			grid.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, { records : me.params.records});

		}
	}
});
